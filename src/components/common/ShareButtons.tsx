import { useState } from "react";
import { Twitter, Linkedin, MessageCircle, Instagram, Copy, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ShareButtons = ({ title }: { title: string }) => {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "Twitter",
            icon: <Twitter className="w-5 h-5" />,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: "hover:text-[#1DA1F2]"
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="w-5 h-5" />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-[#0A66C2]"
        },
        {
            name: "WhatsApp",
            icon: <MessageCircle className="w-5 h-5" />,
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`,
            color: "hover:text-[#25D366]"
        },
        {
            name: "Instagram",
            icon: <Instagram className="w-5 h-5" />,
            url: `https://www.instagram.com/`,
            color: "hover:text-[#E4405F]"
        }
    ];

    return (
        <div className="flex items-center gap-4 py-4">
            <span className="text-xs uppercase tracking-widest opacity-40 font-bold">Share</span>
            <div className="flex items-center gap-3">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`opacity-60 transition-all ${link.color} hover:opacity-100 hover:scale-110`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                ))}
                <button
                    onClick={handleCopy}
                    className={`opacity-60 transition-all hover:text-orange-500 hover:opacity-100 hover:scale-110 relative`}
                    title="Copy Link"
                >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-foreground text-background px-2 py-1 rounded-md whitespace-nowrap"
                        >
                            Copied!
                        </motion.span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;
