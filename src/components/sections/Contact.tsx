import { useState, useContext } from "react";
import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { ContentContext } from "../../context/ContentContext";

const Contact = ({ isPage = false }: { isPage?: boolean }) => {
    const { settings } = useContext(ContentContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Hello TechxPrime!%0A%0A*New Enquiry*%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
        const whatsappNumber = settings.contact_whatsapp || "917906055529";
        window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`, '_blank');
    };

    return (
        <section className={`${isPage ? "pt-0 pb-20 md:pb-32" : "py-20 md:py-32"} px-4 md:px-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8"
                        >
                            Let's build <br />
                            <span className="opacity-40 text-balance">something iconic.</span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg sm:text-xl opacity-60 mb-8 md:mb-12 font-light leading-relaxed max-w-md prose prose-invert"
                            dangerouslySetInnerHTML={{
                                __html: settings.contact_page_content || `Have a visionary project in mind? We'd love to hear about it. 
              Our team is ready to turn your ideas into reality.` }}
                        />

                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-center space-x-4 md:space-x-6">
                                <div className="p-3 md:p-4 bg-foreground/5 rounded-2xl">
                                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] md:text-sm opacity-40 uppercase tracking-widest font-bold mb-1">Email Us</div>
                                    <div className="text-lg md:text-xl font-medium">{settings.contact_email || "sales@techxprime.com"}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 md:space-x-6">
                                <div className="p-3 md:p-4 bg-foreground/5 rounded-2xl">
                                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <div className="text-[10px] md:text-sm opacity-40 uppercase tracking-widest font-bold mb-1">Contact Us</div>
                                    <div className="text-lg md:text-xl font-medium">{settings.contact_phone || "+91 7906055529"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-foreground/[0.02] backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-foreground/5"
                    >
                        <form className="space-y-6" onSubmit={handleWhatsAppRedirect}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-sm font-semibold opacity-40 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Steve"
                                        aria-label="First Name"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors w-full text-sm sm:text-base placeholder:text-foreground/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-sm font-semibold opacity-40 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jobs"
                                        aria-label="Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors w-full text-sm sm:text-base placeholder:text-foreground/50"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-sm font-semibold opacity-40 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="steve@apple.com"
                                    aria-label="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors w-full text-sm sm:text-base placeholder:text-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-sm font-semibold opacity-40 ml-1">Your Message</label>
                                <textarea
                                    placeholder="Tell us about your vision..."
                                    aria-label="Your Message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors w-full resize-none text-sm sm:text-base placeholder:text-foreground/50"
                                />
                            </div>
                            <button type="submit" className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                                Send via WhatsApp
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
