import { useContext } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { ContentContext } from "../../context/ContentContext";
import { ThemeContext } from "../../context/ThemeContext";
import { IconMap } from "../../constants";

const Services = ({ isPage = false }: { isPage?: boolean }) => {
    const { services } = useContext(ContentContext);
    const { isDark } = useContext(ThemeContext);
    return (
        <section className={`${isPage ? "pt-0 pb-20 md:pb-32" : "py-20 md:py-32"} px-4 md:px-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl opacity-60 max-w-2xl mx-auto font-light"
                    >
                        We combine technical excellence with creative vision to deliver
                        unparalleled digital solutions that drive real business growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            to={service.path}
                            className={`group relative p-6 sm:p-8 rounded-3xl overflow-hidden border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm transition-all hover:bg-foreground/[0.04] ${service.size}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Thumbnail Support */}
                                {(isDark ? service.thumbnail_dark : service.thumbnail_light) && (
                                    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <img
                                            src={isDark ? service.thumbnail_dark : service.thumbnail_light}
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="mb-6 p-4 bg-foreground/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                                        {IconMap[service.icon] || <Rocket className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="opacity-60 leading-relaxed text-base sm:text-lg mb-6">{service.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature, fIndex) => (
                                            <span key={fIndex} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-foreground/5 rounded-full opacity-40">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
