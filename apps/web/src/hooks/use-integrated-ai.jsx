import { useCallback, useEffect, useRef, useState } from &rsquo;react&rsquo;;
import { toast } from &rsquo;@/hooks/use-toast&rsquo;;
import { integratedAiClient } from &rsquo;@/lib/integratedAiClient&rsquo;;
import { pocketbaseClient } from &rsquo;@/lib/pocketbaseClient&rsquo;;

/**
 * @typedef {object} TextContentBlock
 * @property {string} text
 * @property {&rsquo;text&rsquo;} type
 */

/**
 * @typedef {object} ImageContentBlock
 * @property {string} image
 * @property {&rsquo;image&rsquo;} type
 */

/**
 * @typedef {TextContentBlock | ImageContentBlock} ContentBlock
 */

/**
 * @typedef {object} SSEEventContent
 * @property {&rsquo;content&rsquo;} type
 * @property {{ content: string }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {object} SSEEventToolUse
 * @property {&rsquo;tool_use&rsquo;} type
 * @property {{ toolId: string, toolName: string, inputParams: Record<string, any> }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {object} SSEEventToolResult
 * @property {&rsquo;tool_result&rsquo;} type
 * @property {{ toolCallId: string, content: string }} data
 * @property {{ agentName?: string }} [metadata]
 */

/**
 * @typedef {SSEEventContent | SSEEventToolUse | SSEEventToolResult} SSEEventHistory
 */

/**
 * @typedef {object} HistoryMessage
 * @property {string} role
 * @property {string} content
 * @property {string[]} [images]
 * @property {Array<{ id: string, type: string, function: { name: string, arguments: string } }>} [tool_calls]
 * @property {string} [tool_call_id]
 * @property {string} [agent_name]
 */

const MessageRole = Object.freeze({
	User: &rsquo;user&rsquo;,
	Assistant: &rsquo;assistant&rsquo;,
	Tool: &rsquo;tool&rsquo;,
});

const ContentBlockType = Object.freeze({
	Text: &rsquo;text&rsquo;,
	Image: &rsquo;image&rsquo;,
});

const SSEEventType = Object.freeze({
	Content: &rsquo;content&rsquo;,
	Reasoning: &rsquo;reasoning&rsquo;,
	ToolUse: &rsquo;tool_use&rsquo;,
	ToolResult: &rsquo;tool_result&rsquo;,
	Usage: &rsquo;usage&rsquo;,
	Error: &rsquo;error&rsquo;,
	Done: &rsquo;done&rsquo;,
	Completed: &rsquo;completed&rsquo;,
});

/**
 * Extracts generated images from tool call results in the message history.
 *
 * @param {object} msg - The message to extract images from
 * @param {Array} history - The full message history
 * @returns {Array} Array of image URLs
 */
function extractGeneratedImages(msg, history) {
	const images = [];
	if (msg.role !== &rsquo;assistant&rsquo;) {
		return images;
	}

	const generateImageToolCall = msg.tool_calls?.find(toolCall => toolCall.function.name === &rsquo;generate_image&rsquo;);

	if (generateImageToolCall) {
		const generateImageToolCallResult = history.find(historyMessage => historyMessage.role === &rsquo;tool&rsquo; && historyMessage.tool_call_id === generateImageToolCall.id)?.content;
		if (generateImageToolCallResult) {
			images.push(generateImageToolCallResult);
		}
	}

	return images;
}

/**
 * @param {{ message: ContentBlock[] }} params
 * @returns {HistoryMessage}
 */
function mapUserMessage({ message }) {
	const textParts = message.filter(b => b.type === ContentBlockType.Text).map(b => b.text);
	const images = message.filter(b => b.type === ContentBlockType.Image).map(b => b.image);

	return {
		role: MessageRole.User,
		content: textParts.join(&rsquo;\n&rsquo;),
		...(images.length > 0 && { images }),
	};
}

/**
 * @param {{ message: SSEEventHistory[] }} params
 * @returns {HistoryMessage[]}
 */
function mapAssistantMessages({ message }) {
	/** @type {HistoryMessage[]} */
	const mapped = [];

	for (const event of message) {
		const agentName = event?.metadata?.agent_name;

		if (event.type === SSEEventType.ToolResult) {
			mapped.push({
				role: MessageRole.Tool,
				tool_call_id: event.data.tool_call_id,
				content: event.data.content,
				...(agentName && { agent_name: agentName }),
			});
			continue;
		}

		mapped.push({
			role: MessageRole.Assistant,
			content: event.data.content,
			...(event.type === SSEEventType.ToolUse && {
				tool_calls: event.data.tool_calls.map(toolCall => ({
					id: toolCall.id,
					type: &rsquo;function&rsquo;,
					function: {
						name: toolCall.name,
						arguments: JSON.stringify(toolCall.input),
					},
				})),
			}),
			...(agentName && { agent_name: agentName }),
		});
	}

	return mapped;
}

/**
 * Hook for streaming AI chat responses using fetch-based SSE.
 */
function useIntegratedAi() {
	const [messages, setMessages] = useState([]);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isLoadingHistory, setIsLoadingHistory] = useState(true);
	const abortControllerRef = useRef(null);

	useEffect(() => {
		async function loadHistory() {
			try {
				if (!pocketbaseClient.authStore.isValid) {
					return [];
				}
			
				const records = await pocketbaseClient.collection(&rsquo;_integratedAiMessages&rsquo;).getFullList({
					sort: &rsquo;created&rsquo;,
				});
			
				/** @type {HistoryMessage[]} */
				const historyMessages = [];
			
				for (const record of records) {
					if (record.role === MessageRole.User) {
						historyMessages.push(mapUserMessage({ message: record.content }));
						continue;
					}
			
					historyMessages.push(...mapAssistantMessages({ message: record.content }));
				}
			
				const chatMessages = historyMessages
					.filter(msg => msg.role === &rsquo;user&rsquo; || msg.role === &rsquo;assistant&rsquo;)
					.map((msg) => {
						const images = [...(msg.images || []), ...extractGeneratedImages(msg, historyMessages)];

						return {
							role: msg.role,
							content: msg.content,
							...(images.length > 0 && { images }),
						};
					});

				setMessages(chatMessages);
			} catch (err) {
				toast({
					variant: &rsquo;destructive&rsquo;,
					title: &rsquo;Error&rsquo;,
					description: err.message,
				});
			} finally {
				setIsLoadingHistory(false);
			}
		}

		loadHistory();
	}, []);

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, []);

	const handleSSEEvent = useCallback((parsed) => {
		if (parsed.type === SSEEventType.Content) {
			setMessages((prev) => {
				const updated = [...prev];
				const last = updated[updated.length - 1];
				updated[updated.length - 1] = {
					...last,
					content: last.content + parsed.data.content,
				};

				return updated;
			});
		}

		if (parsed.type === SSEEventType.ToolResult) {
			const isImageResult = parsed.data.tool_name === &rsquo;generate_image&rsquo; && parsed.data.content;

			if (isImageResult) {
				setMessages((prev) => {
					const updated = [...prev];
					const last = updated[updated.length - 1];
					updated[updated.length - 1] = {
						...last,
						images: [...(last.images || []), parsed.data.content],
					};

					return updated;
				});
			}
		}
	}, []);

	const sendMessage = useCallback(async (userMessage, images = []) => {
		setIsStreaming(true);

		setMessages(prev => [
			...prev,
			{
				role: &rsquo;user&rsquo;,
				content: userMessage,
				...(images.length > 0 && {
					images: images.map(img => URL.createObjectURL(img)),
				}),
			},
			{ role: &rsquo;assistant&rsquo;, content: &rsquo;&rsquo; },
		]);

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		try {
			const response = await integratedAiClient.stream(&rsquo;/integrated-ai/stream&rsquo;, {
				body: { message: [{ text: userMessage, type: &rsquo;text&rsquo; }] },
				signal: abortController.signal,
				images,
			});

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let buffer = &rsquo;&rsquo;;

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				buffer += decoder.decode(value, { stream: true });

				const events = buffer.split(&rsquo;\n\n&rsquo;);
				buffer = events.pop() || &rsquo;&rsquo;;

				for (const event of events) {
					if (!event.trim()) {
						continue;
					}

					const lines = event.split(&rsquo;\n&rsquo;);
					let eventData = &rsquo;&rsquo;;

					for (const line of lines) {
						if (line.startsWith(&rsquo;data: &rsquo;)) {
							eventData += line.slice(6);
						}
					}

					if (!eventData) {
						continue;
					}

					const parsed = JSON.parse(eventData);

					if (parsed.type === SSEEventType.Error) {
						throw new Error(parsed.data.content);
					}

					if (parsed.type === SSEEventType.Completed) {
						return;
					}

					handleSSEEvent(parsed);
				}
			}
		} catch (err) {
			toast({
				variant: &rsquo;destructive&rsquo;,
				title: &rsquo;Error&rsquo;,
				description: err.message,
			});

			setMessages(prev => {
				const updated = [...prev];
				const last = updated[updated.length - 1];
				if (last?.role === &rsquo;assistant&rsquo; && !last.content) {
					updated.pop();
				}
				return updated;
			});
		} finally {
			abortControllerRef.current = null;
			setIsStreaming(false);
		}
	}, [handleSSEEvent]);

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	return {
		messages,
		isStreaming,
		isLoadingHistory,
		sendMessage,
		clearMessages,
	};
}

export default useIntegratedAi;
export { useIntegratedAi };