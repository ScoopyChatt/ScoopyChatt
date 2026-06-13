import { useCallback, useEffect, useMemo, useRef, useState } from &rsquo;react&rsquo;;
import { useAnimatedText } from &rsquo;@/hooks/use-animated-text.jsx&rsquo;;
import { useIntegratedAi } from &rsquo;@/hooks/use-integrated-ai.jsx&rsquo;;
import { Send, Image as ImageIcon, X, MessageSquare as BotMessageSquare, CheckCircle, Loader2 } from &rsquo;lucide-react&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;
import pb from &rsquo;@/lib/pocketbaseClient.js&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const VALID_IMAGE_TYPES = [&rsquo;image/jpeg&rsquo;, &rsquo;image/png&rsquo;, &rsquo;image/webp&rsquo;];
const getImageKey = file => `${file.name}:${file.size}:${file.lastModified}`;

export default function IntegratedAiChat({ customerContext }) {
	const [input, setInput] = useState(&rsquo;&rsquo;);
	const [selectedImages, setSelectedImages] = useState([]);
	const [isSendingSummary, setIsSendingSummary] = useState(false);
	
	const { messages, isStreaming, isLoadingHistory, sendMessage, clearMessages } = useIntegratedAi();
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	const imagePreviews = useMemo(() => selectedImages.map(file => ({
		key: getImageKey(file),
		file,
		url: URL.createObjectURL(file),
	})), [selectedImages]);

	useEffect(() => () => {
		imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
	}, [imagePreviews]);

	const lastMessage = messages[messages.length - 1];
	const isLastMessageStreaming = isStreaming && lastMessage?.role === &rsquo;assistant&rsquo;;
	const animatedText = useAnimatedText(isLastMessageStreaming ? lastMessage.content : &rsquo;&rsquo;);

	useEffect(() => {
		const scrollToBottom = () => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({
					behavior: &rsquo;smooth&rsquo;,
					block: &rsquo;end&rsquo;,
				});
			}
		};

		scrollToBottom();
	}, [messages]);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();

		const trimmed = input.trim();

		if ((!trimmed && selectedImages.length === 0) || isStreaming) {
			return;
		}

		setInput(&rsquo;&rsquo;);
		sendMessage(trimmed, selectedImages);
		setSelectedImages([]);
	}, [input, selectedImages, isStreaming, sendMessage]);

	const handleImageSelect = useCallback((e) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter(file => VALID_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE);

		setSelectedImages((prev) => {
			const uniqueFilesMap = new Map(prev.map(file => [getImageKey(file), file]));
			validFiles.forEach(file => uniqueFilesMap.set(getImageKey(file), file));
			return Array.from(uniqueFilesMap.values()).slice(0, MAX_IMAGES);
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = &rsquo;&rsquo;;
		}
	}, [fileInputRef]);

	const removeImage = useCallback((index) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	}, []);

	const handleEndChatAndSendSummary = async () => {
		if (!messages || messages.length === 0) return;
		
		setIsSendingSummary(true);
		
		try {
			// 1 & 2. Format messages
			const formattedMessages = messages.map(msg => ({
				role: msg.role,
				content: msg.content || (msg.images?.length ? &rsquo;[Images Attached]&rsquo; : &rsquo;&rsquo;),
				timestamp: new Date().toISOString()
			}));

			const currentUser = pb.authStore.model;
			
			// If not authenticated, we can&rsquo;t save the summary due to DB rules
			if (!currentUser) {
				throw new Error(&rdquo;You must be connected to send a summary.&rdquo;);
			}

			const userEmail = currentUser?.email || customerContext?.email || &rsquo;customer@scoopychatt.com&rsquo;;
			const userName = currentUser?.name || customerContext?.name || &rsquo;Customer&rsquo;;

			// 3. Call backend endpoint
			const response = await apiServerClient.fetch(&rsquo;/chat-summary/send-summary&rsquo;, {
				method: &rsquo;POST&rsquo;,
				headers: { &rsquo;Content-Type&rsquo;: &rsquo;application/json&rsquo; },
				body: JSON.stringify({
					userId: currentUser.id,
					conversationMessages: formattedMessages,
					userEmail: userEmail,
					userName: userName,
					businessOwnerEmail: &rsquo;admin@scoopyhelper.com&rsquo; // Explicitly requested in task
				})
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || &rsquo;Failed to send conversation summary&rsquo;);
			}

			// 4. Show success toast
			toast.success(&rsquo;Conversation summary sent to business owner&rsquo;);
			
			// 6. Clear messages after successful send
			clearMessages();
			
		} catch (error) {
			console.error(&rsquo;Failed to send summary:&rsquo;, error);
			// 5. Handle errors with error toast
			toast.error(error.message || &rsquo;Failed to send chat summary. Please try again.&rsquo;);
		} finally {
			setIsSendingSummary(false);
		}
	};

	return (
		<div className=&rdquo;flex flex-col h-full w-full bg-background overflow-hidden&rdquo;>
			{/* Header */}
			<div className=&rdquo;flex items-center justify-between p-4 bg-primary text-primary-foreground border-b border-primary/20 shrink-0 shadow-sm z-10&rdquo;>
				<div className=&rdquo;flex items-center gap-2&rdquo;>
					<BotMessageSquare className=&rdquo;w-5 h-5&rdquo; />
					<h2 className=&rdquo;text-lg font-semibold tracking-tight&rdquo;>AI Assistant</h2>
				</div>
				{messages.length > 0 && (
					<div className=&rdquo;flex items-center gap-3&rdquo;>
						<button
							onClick={clearMessages}
							disabled={isStreaming || isSendingSummary}
							className=&rdquo;text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors&rdquo;
						>
							Clear
						</button>
						<button
							onClick={handleEndChatAndSendSummary}
							disabled={isStreaming || isSendingSummary}
							className=&rdquo;text-sm font-medium bg-primary-foreground text-primary px-3 py-1.5 rounded-lg shadow-sm hover:bg-primary-foreground/90 hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all flex items-center gap-1.5&rdquo;
						>
							{isSendingSummary ? (
								<Loader2 className=&rdquo;w-3.5 h-3.5 animate-spin&rdquo; />
							) : (
								<CheckCircle className=&rdquo;w-3.5 h-3.5&rdquo; />
							)}
							End & Send
						</button>
					</div>
				)}
			</div>

			{/* Message List */}
			<div className=&rdquo;flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth bg-background&rdquo;>
				{isLoadingHistory && (
					<div className=&rdquo;text-center text-sm text-muted-foreground py-4 flex items-center justify-center gap-2&rdquo;>
						<Loader2 className=&rdquo;w-4 h-4 animate-spin&rdquo; />
						Loading history...
					</div>
				)}
				
				{messages.length === 0 && !isLoadingHistory && (
					<div className=&rdquo;h-full flex flex-col items-center justify-center text-center px-4 opacity-70&rdquo;>
						<div className=&rdquo;w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4&rdquo;>
							<BotMessageSquare className=&rdquo;w-8 h-8&rdquo; />
						</div>
						<p className=&rdquo;text-foreground font-medium text-lg mb-2&rdquo;>How can I help you today?</p>
						<p className=&rdquo;text-muted-foreground text-sm max-w-[250px]&rdquo;>
							Ask me about our pricing, services, or how to get your yard clean and safe.
						</p>
					</div>
				)}

				{messages.map((msg, i) => {
					const isLastStreamingMessage = isStreaming && i === messages.length - 1 && msg.role === &rsquo;assistant&rsquo;;
					const displayContent = isLastStreamingMessage ? animatedText : msg.content;

					return (
						<div key={i} className={`flex ${msg.role === &rsquo;user&rsquo; ? &rsquo;justify-end&rsquo; : &rsquo;justify-start&rsquo;}`}>
							<div
								className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
									msg.role === &rsquo;user&rsquo;
										? &rsquo;bg-primary text-primary-foreground rounded-tr-sm&rsquo;
										: &rsquo;bg-muted text-foreground rounded-tl-sm border border-border&rsquo;
								}`}
							>
								<p className=&rdquo;whitespace-pre-wrap text-[15px] leading-relaxed&rdquo;>{displayContent}</p>
								{msg.images?.map((url, j) => (
									<img
										key={j}
										src={url}
										alt=&rdquo;AI generated&rdquo;
										className=&rdquo;mt-3 rounded-lg max-w-full border border-border shadow-sm&rdquo;
									/>
								))}
								{msg.role === &rsquo;assistant&rsquo; && isStreaming && i === messages.length - 1 && !msg.content && (
									<span className=&rdquo;inline-block w-2 h-4 bg-muted-foreground animate-pulse ml-1 align-middle&rdquo; />
								)}
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} className=&rdquo;h-1&rdquo; />
			</div>

			{/* Input Area */}
			<div className=&rdquo;p-4 border-t border-border bg-background shrink-0&rdquo;>
				{selectedImages.length > 0 && (
					<div className=&rdquo;mb-3 flex gap-2 flex-wrap&rdquo;>
						{imagePreviews.map(({ key, file, url }, index) => (
							<div key={key} className=&rdquo;relative group&rdquo;>
								<img
									src={url}
									alt={file.name}
									className=&rdquo;w-16 h-16 object-cover rounded-lg border border-border shadow-sm&rdquo;
								/>
								<button
									type=&rdquo;button&rdquo;
									onClick={() => removeImage(index)}
									className=&rdquo;absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm&rdquo;
								>
									<X className=&rdquo;w-3 h-3&rdquo; />
								</button>
							</div>
						))}
					</div>
				)}
				<form onSubmit={handleSubmit} className=&rdquo;flex gap-2 items-end&rdquo;>
					<input
						ref={fileInputRef}
						type=&rdquo;file&rdquo;
						accept={VALID_IMAGE_TYPES.join(&rsquo;,&rsquo;)}
						multiple
						onChange={handleImageSelect}
						className=&rdquo;hidden&rdquo;
						disabled={isStreaming || isLoadingHistory || isSendingSummary}
					/>
					<button
						type=&rdquo;button&rdquo;
						onClick={() => fileInputRef.current?.click()}
						className=&rdquo;rounded-xl border border-input bg-background text-foreground px-3 py-3 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm h-[46px] flex items-center justify-center&rdquo;
						disabled={isStreaming || isLoadingHistory || selectedImages.length >= MAX_IMAGES || isSendingSummary}
						title=&rdquo;Upload images&rdquo;
					>
						<ImageIcon className=&rdquo;w-5 h-5&rdquo; />
					</button>
					<input
						type=&rdquo;text&rdquo;
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder=&rdquo;Type your message...&rdquo;
						className=&rdquo;flex-1 rounded-xl border border-input bg-background text-foreground px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground shadow-sm h-[46px]&rdquo;
						disabled={isStreaming || isLoadingHistory || isSendingSummary}
					/>
					<button
						type=&rdquo;submit&rdquo;
						disabled={isStreaming || (!input.trim() && selectedImages.length === 0) || isSendingSummary}
						className=&rdquo;rounded-xl bg-primary px-5 py-3 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm h-[46px] flex items-center justify-center&rdquo;
					>
						<Send className=&rdquo;w-5 h-5&rdquo; />
					</button>
				</form>
			</div>
		</div>
	);
}