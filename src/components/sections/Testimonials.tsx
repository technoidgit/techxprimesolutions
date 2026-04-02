import { useContext } from "react";
import { motion } from "motion/react";
import { Quote, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext";

const Testimonials = ({ isPage = false }: { isPage?: boolean }) => {
    const { testimonials, settings } = useContext(ContentContext);
    const displayTestimonials = isPage ? testimonials : (testimonials.filter(t => t.isFeatured).length > 0 ? testimonials.filter(t => t.isFeatured) : testimonials.slice(0, 3));

    return (
        <section className={`${isPage ? "pt-0 pb-20 md:pb-32" : "py-20 md:py-32"} px-4 md:px-6 overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        {isPage ? "All Client Stories" : "Client Stories"}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl opacity-60 max-w-2xl mx-auto font-light"
                    >
                        {isPage
                            ? "Explore our full collection of success stories and partner testimonials."
                            : "We've helped hundreds of businesses transform their digital presence. Here's what some of our visionary partners have to say."
                        }
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {displayTestimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                            whileHover={{ y: -5 }}
                            className="group relative p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-foreground/5 bg-foreground/[0.02] backdrop-blur-sm transition-all hover:bg-foreground/[0.04]"
                        >
                            <Quote className="absolute top-8 right-10 w-10 h-10 sm:w-12 sm:h-12 opacity-5 text-foreground group-hover:opacity-10 transition-opacity" />
                            <div className="flex mb-6">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 fill-orange-500" />
                                ))}
                            </div>
                            {t.title && <h4 className="text-xl font-bold mb-4">{t.title}</h4>}
                            <div
                                className="text-lg sm:text-xl leading-relaxed mb-8 sm:mb-10 opacity-80 italic font-light prose prose-invert line-clamp-4"
                                dangerouslySetInnerHTML={{ __html: t.content }}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        src={t.avatar || `https://picsum.photos/seed/${t.id}/100/100`}
                                        alt={t.name}
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-4 object-cover border-2 border-foreground/10"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div>
                                        <div className="font-bold text-base sm:text-lg">{t.name}</div>
                                        <div className="text-[10px] sm:text-sm opacity-40 font-medium uppercase tracking-wider">{t.role}</div>
                                    </div>
                                </div>
                                <Link
                                    to={t.path || `/testimonials/${t.id}`}
                                    className="p-3 rounded-full bg-foreground/5 hover:bg-orange-500 hover:text-white transition-all group/btn"
                                >
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {!isPage && (
                    <div className="mt-16 text-center">
                        <Link
                            to="/testimonials"
                            className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-4 transition-all"
                        >
                            View All Stories <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}

                {settings.expert_logo && (
                    <div className="mt-16 md:mt-24 pt-12 border-t border-foreground/5">
                        <div className="flex justify-center">
                            <img
                                src={settings.expert_logo}
                                alt="Expert Partners"
                                className="max-h-12 md:max-h-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 object-contain"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
