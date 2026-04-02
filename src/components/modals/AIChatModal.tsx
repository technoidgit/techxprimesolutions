import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send } from "lucide-react";
import { SERVICES, PROJECTS } from "../../constants";

const AIChatModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [messages, setMessages] = useState<{ role: "user" | "model", text: string }[]>([
        { role: "model", text: "Hello! I'm here to help you with any questions about TechxPrime Solutions. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const systemInstruction = `You are a helpful and professional assistant for TechxPrime Solutions. 
      TechxPrime is a global technology powerhouse specializing in visionary design and world-class engineering.
      Founded in 2016.
      
      Our Services:
      ${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}
      
      Our Featured Projects:
      ${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n')}
      
      Our Process: Strategic Discovery, Iterative Design, Agile Development, Quality Assurance, Seamless Launch.
      Contact: sales@techxprime.com, WhatsApp: +91 7906055529.
      
      Tone: Professional, innovative, helpful, and concise. 
      Always encourage users to "Start Project" or "Contact Us" for more details.
      If you cannot answer a question or if the user needs direct support, recommend they contact us via WhatsApp at +91 7906055529.
      Do not use markdown formatting like double asterisks for bolding. Use plain text.`;

            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history,
                    systemInstruction
                })
            });

            const data = await response.json();
            let aiText = data.text || "I'm sorry, I couldn't process that. Please try again or contact us via WhatsApp.";

            // Strip markdown bolding (double asterisks) just in case
            aiText = aiText.replace(/\*\*/g, '');

            setMessages(prev => [...prev, { role: "model", text: aiText }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting right now. Please try again later or reach out to our team via WhatsApp at +91 7906055529." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-background w-full max-w-[450px] h-[70vh] sm:h-[600px] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-foreground/10"
                    >
                        <div className="p-6 border-b border-foreground/5 bg-orange-500 text-white flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Support Assistant</h3>
                                    <p className="text-[10px] opacity-80">Online Now</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-foreground/[0.02]">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-orange-500 text-white rounded-tr-none"
                                        : "bg-background border border-foreground/10 rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-background border border-foreground/10 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-foreground/5 bg-background">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center space-x-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-11 h-11 bg-orange-500 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AIChatModal;
