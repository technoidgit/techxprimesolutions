import { useState, useEffect, useRef } from "react";
import { Bot, Sparkles, FileText, Zap, MessageCircle, Send } from "lucide-react";

const BlogAIChat = ({ blogTitle, blogContent }: { blogTitle: string, blogContent: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "model", text: string }[]>([
        { role: "model", text: `Hi! I've read "${blogTitle}". How can I help you understand it better? I can summarize it, answer questions, or provide more insights.` }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (text?: string) => {
        const userMessage = text || input.trim();
        if (!userMessage || isLoading) return;

        if (!text) setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const systemInstruction = `You are an expert assistant for TechxPrime Solutions, specifically helping a reader understand a blog post titled "${blogTitle}".
      
      Blog Content:
      ${blogContent}
      
      Your goals:
      1. Summarize the blog post if asked.
      2. Answer specific questions about the content.
      3. Provide related insights or practical applications of the topics discussed.
      4. Maintain a professional, insightful, and helpful tone.
      
      If the user's question is completely unrelated to the blog post or TechxPrime's expertise, politely redirect them back to the blog topic or suggest they contact TechxPrime for broader inquiries.
      
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
            let aiText = data.text || "I'm sorry, I couldn't process that. Please try again.";
            aiText = aiText.replace(/\*\*/g, '');

            setMessages(prev => [...prev, { role: "model", text: aiText }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: "model", text: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-12 p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Bot className="w-32 h-32 text-orange-500" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Insights Assistant</h3>
                        <p className="opacity-60">Ask anything about this post</p>
                    </div>
                </div>

                {!isOpen ? (
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => { setIsOpen(true); handleSend("Can you summarize this blog post for me?"); }}
                            className="px-6 py-3 bg-background border border-foreground/10 rounded-xl text-sm font-bold hover:bg-foreground/5 transition-all flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4 text-orange-500" /> Summarize Post
                        </button>
                        <button
                            onClick={() => { setIsOpen(true); handleSend("What are the key takeaways from this article?"); }}
                            className="px-6 py-3 bg-background border border-foreground/10 rounded-xl text-sm font-bold hover:bg-foreground/5 transition-all flex items-center gap-2"
                        >
                            <Zap className="w-4 h-4 text-orange-500" /> Key Takeaways
                        </button>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" /> Start Chat
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div ref={scrollRef} className="h-[300px] overflow-y-auto p-4 bg-background/50 rounded-2xl border border-foreground/5 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-orange-500 text-white rounded-tr-none"
                                        : "bg-foreground/5 text-foreground rounded-tl-none border border-foreground/5"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-foreground/5 p-4 rounded-2xl rounded-tl-none border border-foreground/5 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-background border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={isLoading}
                                className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogAIChat;
