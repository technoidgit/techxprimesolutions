import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, Sun, Moon, ChevronRight, Globe } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { ContentContext } from "../../context/ContentContext";
import Logo from "../common/Logo";

const Navbar = ({ onOpenEnquiry, onOpenSearch, setIsAIChatOpen }: { onOpenEnquiry: () => void, onOpenSearch: () => void, setIsAIChatOpen: (open: boolean) => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { isDark, toggle } = useContext(ThemeContext);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Projects", path: "/projects" },
        {
            name: "Insights",
            path: "/blog",
            dropdown: [
                { name: "Blogs", path: "/blog" },
                { name: "Case Studies", path: "/case-studies" }
            ]
        },
        { name: "Partners", path: "/partners" },
        { name: "Career", path: "/career" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <div className="flex justify-center pt-4 px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`flex justify-between items-center w-full max-w-7xl px-4 md:px-6 py-2 rounded-2xl transition-all duration-500 pointer-events-auto border backdrop-blur-xl ${isScrolled
                        ? "bg-background/90 dark:bg-background/80 border-foreground/10 shadow-2xl"
                        : "bg-white/70 dark:bg-background/40 border-foreground/10 dark:border-foreground/5 shadow-lg"
                    }`}
                style={{
                    boxShadow: isScrolled ? "0 8px 32px 0 rgba(249, 115, 22, 0.07)" : "none",
                }}
            >
                <div className="flex items-center flex-shrink-0">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center bg-foreground/5 p-1 rounded-xl border border-foreground/5 overflow-x-auto no-scrollbar max-w-[60%]">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path || (link.dropdown?.some(d => location.pathname === d.path));
                        return (
                            <div
                                key={link.path}
                                className="relative group flex-shrink-0"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`relative px-3 py-1.5 text-[10px] xl:text-xs font-bold transition-all duration-300 rounded-lg flex items-center gap-1 ${isActive
                                            ? "text-foreground"
                                            : "text-foreground/50 hover:text-foreground hover:opacity-100"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-background rounded-lg shadow-sm z-[-1] border border-foreground/5"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {link.name}
                                </Link>

                                <AnimatePresence>
                                    {activeDropdown === link.name && link.dropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-xl shadow-2xl overflow-hidden p-2 z-[60]"
                                        >
                                            <div className="flex flex-col gap-1">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className="px-3 py-2 text-[10px] font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all flex items-center justify-between group/item"
                                                    >
                                                        <span className="truncate">{item.name}</span>
                                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center space-x-2 md:space-x-3">
                    <button
                        onClick={onOpenSearch}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 transition-colors"
                        aria-label="Search"
                    >
                        <Search className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => setIsAIChatOpen(true)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-colors group"
                        aria-label="AI Assistant"
                    >
                        <Bot className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                        onClick={toggle}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5 hover:bg-foreground/10 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onOpenEnquiry}
                        className="hidden sm:flex h-9 items-center justify-center bg-orange-500 text-white px-5 rounded-xl text-xs font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
                    >
                        Start Project
                    </motion.button>
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
