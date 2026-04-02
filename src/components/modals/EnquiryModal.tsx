import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const EnquiryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative bg-background w-full max-w-[650px] h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-foreground/5"
                    >
                        <div className="flex justify-between items-center p-8 border-b border-foreground/5 bg-foreground/[0.02]">
                            <div>
                                <h3 className="text-2xl font-bold font-display">Enquiry Form</h3>
                                <p className="text-sm opacity-60 mt-1">Fill out the form below and we'll get back to you shortly.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 hover:bg-foreground/10 rounded-full transition-colors group"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative bg-white">
                            <iframe
                                src="https://www.portal.techxprime.com/forms/wtl/517ee8a2b572ae461fe135ce0fa38422"
                                className="w-full h-full border-none"
                                title="Enquiry Form"
                                sandbox="allow-top-navigation allow-forms allow-scripts allow-same-origin allow-popups"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EnquiryModal;
