import React, { useState, useEffect } from &rsquo;react&rsquo;;
import { motion, AnimatePresence } from &rsquo;framer-motion&rsquo;;
import { MessageCircle, X, Send, Loader2, ShieldCheck } from &rsquo;lucide-react&rsquo;;
import IntegratedAiChat from &rsquo;@/components/integrated-ai-chat.jsx&rsquo;;
import { useLeadCapture } from &rsquo;@/hooks/useLeadCapture.js&rsquo;;
import { Button } from &rsquo;@/components/ui/button&rsquo;;
import { Input } from &rsquo;@/components/ui/input&rsquo;;
import { Label } from &rsquo;@/components/ui/label&rsquo;;
import pb from &rsquo;@/lib/pocketbaseClient.js&rsquo;;
import apiServerClient from &rsquo;@/lib/apiServerClient.js&rsquo;;
import { toast } from &rsquo;sonner&rsquo;;

const ScoopyHelperWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [chatStartTime, setChatStartTime] = useState(null);
  const [customerContext, setCustomerContext] = useState(null);
  
  const { submitLead, isLeadCaptured, isLoading } = useLeadCapture();
  
  const [formData, setFormData] = useState({
    name: &rsquo;&rsquo;,
    phone: &rsquo;&rsquo;,
    zipCode: &rsquo;&rsquo;,
    numberOfDogs: &rsquo;1&rsquo;
  });

  // Auto-open after 3 seconds
  useEffect(() => {
    const openTimer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsOpen(true);
        setHasAutoOpened(true);
      }
    }, 3000);
    
    return () => clearTimeout(openTimer);
  }, [hasAutoOpened]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    
    // Save to local state so we can pass it down to the chat
    const contextData = {
      name: formData.name,
      phone: formData.phone,
      zipCode: formData.zipCode,
      numberOfDogs: formData.numberOfDogs
    };
    
    try {
      await submitLead(formData);
      setCustomerContext(contextData);
      
      // Send lead email immediately
      try {
        await apiServerClient.fetch(&rsquo;/lead-email&rsquo;, {
          method: &rsquo;POST&rsquo;,
          headers: { &rsquo;Content-Type&rsquo;: &rsquo;application/json&rsquo; },
          body: JSON.stringify(contextData)
        });
        toast.success(&rsquo;Lead information sent!&rsquo;);
      } catch (emailErr) {
        console.error(&rsquo;Failed to send lead email:&rsquo;, emailErr);
      }
      
      // PocketBase auth skipped - not required for AI chat
      
      setChatStartTime(new Date().toISOString());
    } catch (err) {
      console.error(&rsquo;Failed to initialize chat session:&rsquo;, err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const sendTranscript = async () => {
    try {
      if (!pb.authStore.isValid) return;

      const records = await pb.collection(&rsquo;_integratedAiMessages&rsquo;).getFullList({
        sort: &rsquo;created&rsquo;,
        $autoCancel: false
      });

      if (!records || records.length === 0) return;

      const formattedMessages = records.map(record => {
        let textContent = &rsquo;&rsquo;;
        if (Array.isArray(record.content)) {
          textContent = record.content
            .filter(b => b.type === &rsquo;text&rsquo; || b.type === &rsquo;content&rsquo;)
            .map(b => b.text || b.data?.content || &rsquo;&rsquo;)
            .join(&rsquo;\n&rsquo;);
        }
        return {
          role: record.role,
          content: textContent || &rsquo;[Complex Content]&rsquo;
        };
      });

      const customerInfo = {
        name: customerContext?.name || formData.name || null,
        email: null,
        phone: customerContext?.phone || formData.phone || null,
        numberOfDogs: customerContext?.numberOfDogs || formData.numberOfDogs || null,
        zipCode: customerContext?.zipCode || formData.zipCode || null
      };

      await apiServerClient.fetch(&rsquo;/chatbot-transcript&rsquo;, {
        method: &rsquo;POST&rsquo;,
        headers: { &rsquo;Content-Type&rsquo;: &rsquo;application/json&rsquo; },
        body: JSON.stringify({
          messages: formattedMessages,
          customerInfo,
          conversationStartTime: chatStartTime || new Date().toISOString()
        })
      });
    } catch (err) {
      // Silent fail
      console.error(&rsquo;Failed to send chatbot transcript silently:&rsquo;, err);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (isLeadCaptured) {
      sendTranscript();
    }
  };

  const isFormLoading = isLoading || isAuthenticating;

  return (
    <div className=&rdquo;fixed bottom-6 right-6 z-50 flex flex-col items-end&rdquo;>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className=&rdquo;mb-4 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col&rdquo;
          >
            {/* Widget Header */}
            <div className=&rdquo;bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0&rdquo;>
              <div className=&rdquo;flex items-center space-x-2&rdquo;>
                <div className=&rdquo;bg-white/20 p-1.5 rounded-full&rdquo;>
                  <MessageCircle className=&rdquo;w-5 h-5&rdquo; />
                </div>
                <div>
                  <h3 className=&rdquo;font-bold text-sm&rdquo;>Scoopy Helper</h3>
                  <p className=&rdquo;text-xs text-primary-foreground/80&rdquo;>Online & ready to help</p>
                </div>
              </div>
              <Button 
                variant=&rdquo;ghost&rdquo; 
                size=&rdquo;icon&rdquo; 
                className=&rdquo;text-primary-foreground hover:bg-white/20 hover:text-white rounded-full h-8 w-8&rdquo;
                onClick={handleClose}
              >
                <X className=&rdquo;w-5 h-5&rdquo; />
              </Button>
            </div>

            {/* Widget Body */}
            <div className=&rdquo;flex-1 overflow-hidden flex flex-col bg-muted/30&rdquo;>
              {!isLeadCaptured ? (
                <div className=&rdquo;p-6 flex-1 overflow-y-auto&rdquo;>
                  <div className=&rdquo;mb-6 text-center&rdquo;>
                    <div className=&rdquo;inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3&rdquo;>
                      <ShieldCheck className=&rdquo;w-6 h-6&rdquo; />
                    </div>
                    <h4 className=&rdquo;text-lg font-semibold text-foreground mb-2&rdquo;>Let&rsquo;s get started!</h4>
                    <p className=&rdquo;text-sm text-muted-foreground&rdquo;>
                      Please provide a few details so we can give you the most accurate service information for your area.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className=&rdquo;space-y-4&rdquo;>
                    <div className=&rdquo;space-y-2&rdquo;>
                      <Label htmlFor=&rdquo;name&rdquo;>Full Name</Label>
                      <Input 
                        id=&rdquo;name&rdquo; 
                        name=&rdquo;name&rdquo; 
                        required 
                        placeholder=&rdquo;Maya Chen&rdquo;
                        value={formData.name}
                        onChange={handleInputChange}
                        className=&rdquo;bg-background text-foreground placeholder:text-muted-foreground&rdquo;
                      />
                    </div>
                    <div className=&rdquo;space-y-2&rdquo;>
                      <Label htmlFor=&rdquo;phone&rdquo;>Phone Number</Label>
                      <Input 
                        id=&rdquo;phone&rdquo; 
                        name=&rdquo;phone&rdquo; 
                        type=&rdquo;tel&rdquo;
                        required 
                        placeholder=&rdquo;(423) 555-0123&rdquo;
                        value={formData.phone}
                        onChange={handleInputChange}
                        className=&rdquo;bg-background text-foreground placeholder:text-muted-foreground&rdquo;
                      />
                    </div>
                    <div className=&rdquo;grid grid-cols-2 gap-4&rdquo;>
                      <div className=&rdquo;space-y-2&rdquo;>
                        <Label htmlFor=&rdquo;zipCode&rdquo;>Zip Code</Label>
                        <Input 
                          id=&rdquo;zipCode&rdquo; 
                          name=&rdquo;zipCode&rdquo; 
                          required 
                          placeholder=&rdquo;37402&rdquo;
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className=&rdquo;bg-background text-foreground placeholder:text-muted-foreground&rdquo;
                        />
                      </div>
                      <div className=&rdquo;space-y-2&rdquo;>
                        <Label htmlFor=&rdquo;numberOfDogs&rdquo;>Number of Dogs</Label>
                        <Input 
                          id=&rdquo;numberOfDogs&rdquo; 
                          name=&rdquo;numberOfDogs&rdquo; 
                          type=&rdquo;number&rdquo;
                          min=&rdquo;1&rdquo;
                          max=&rdquo;20&rdquo;
                          required 
                          placeholder=&rdquo;1&rdquo;
                          value={formData.numberOfDogs}
                          onChange={handleInputChange}
                          className=&rdquo;bg-background text-foreground placeholder:text-muted-foreground&rdquo;
                        />
                      </div>
                    </div>
                    <Button 
                      type=&rdquo;submit&rdquo; 
                      className=&rdquo;w-full mt-4&rdquo; 
                      disabled={isFormLoading}
                    >
                      {isFormLoading ? (
                        <>
                          <Loader2 className=&rdquo;mr-2 h-4 w-4 animate-spin&rdquo; />
                          Connecting...
                        </>
                      ) : (
                        <>
                          Start Chat <Send className=&rdquo;ml-2 h-4 w-4&rdquo; />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className=&rdquo;flex-1 overflow-hidden [&>div]:h-full [&>div>div:first-child]:hidden&rdquo;>
                  {/* Pass the extracted customer context down to IntegratedAiChat */}
                  <IntegratedAiChat customerContext={customerContext} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isOpen ? handleClose : () => setIsOpen(true)}
        className=&rdquo;bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary&rdquo;
        aria-label={isOpen ? &rdquo;Close chat&rdquo; : &rdquo;Open chat&rdquo;}
      >
        <AnimatePresence mode=&rdquo;wait&rdquo;>
          {isOpen ? (
            <motion.div
              key=&rdquo;close&rdquo;
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className=&rdquo;w-6 h-6&rdquo; />
            </motion.div>
          ) : (
            <motion.div
              key=&rdquo;open&rdquo;
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className=&rdquo;w-6 h-6&rdquo; />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ScoopyHelperWidget;