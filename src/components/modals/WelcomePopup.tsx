import { motion, AnimatePresence } from "motion/react";

const WelcomePopup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 40 }}
                        className="relative bg-background border border-foreground/10 w-full max-w-[500px] rounded-[3rem] shadow-2xl overflow-hidden p-12 text-center"
                    >
                        <div className="mb-8 flex justify-center">
                            <div className="w-24 h-24 bg-foreground/5 rounded-3xl flex items-center justify-center p-4 border border-foreground/10 shadow-xl">
                                <img
                                    src="https://www.portal.techxprime.com/uploads/company/image%20(1).png"
                                    alt="TechxPrime Logo"
                                    className="w-full h-auto object-contain"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">Welcome to TechxPrime</h2>
                        <p className="text-lg opacity-60 mb-10 leading-relaxed">
                            Experience the next generation of digital engineering. We're excited to help you build something iconic.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full bg-foreground text-background py-5 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl"
                        >
                            Get Started
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;
