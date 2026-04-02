import { useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext";

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { services, projects, blogPosts } = useContext(ContentContext);

    const allData = [
        ...services.map(s => ({ ...s, type: 'Service' })),
        ...projects.map(p => ({ ...p, type: 'Project' })),
        ...blogPosts.map(b => ({ ...b, type: 'Blog' })),
    ];

    const filteredResults = query.trim() === ""
        ? []
        : allData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-start justify-center pt-[10vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative bg-background w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-foreground/10"
                    >
                        <div className="p-6 border-b border-foreground/5 flex items-center gap-4">
                            <Search className="w-6 h-6 opacity-40" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search services, projects, blog..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none focus:outline-none text-xl font-medium"
                            />
                            <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded-xl transition-colors">
                                <X className="w-5 h-5 opacity-40" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {filteredResults.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredResults.map((result, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                navigate(result.path);
                                                onClose();
                                            }}
                                            className="w-full text-left p-4 rounded-2xl hover:bg-foreground/5 transition-all group flex items-center justify-between"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded-md">
                                                        {result.type}
                                                    </span>
                                                    <h4 className="font-bold">{result.title}</h4>
                                                </div>
                                                <p className="text-sm opacity-60 line-clamp-1">{result.description}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            ) : query.trim() !== "" ? (
                                <div className="py-12 text-center opacity-40">
                                    <p>No results found for "{query}"</p>
                                </div>
                            ) : (
                                <div className="py-12 text-center opacity-40">
                                    <p>Start typing to search...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
