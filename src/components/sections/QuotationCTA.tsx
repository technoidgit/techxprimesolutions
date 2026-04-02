import { useContext } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext";

const QuotationCTA = () => {
    const { settings } = useContext(ContentContext);
    return (
        <section className="py-20 md:py-40 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/5 -z-10" />
            <div className="max-w-6xl mx-auto bg-orange-500 rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden group shadow-2xl shadow-orange-500/20">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.9]" dangerouslySetInnerHTML={{ __html: settings.quotation_text || "GET THE QUOTATION FREE!!!" }} />
                        <div
                            className="text-lg md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-medium prose prose-invert"
                            dangerouslySetInnerHTML={{ __html: settings.quotation_description || `Ready to transform your vision into reality? Our experts are standing by to provide you with a comprehensive, no-obligation technical roadmap and cost analysis.` }}
                        />
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-orange-500 px-12 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition-all shadow-2xl"
                            >
                                Request Free Quote
                                <ArrowRight className="ml-2 w-6 h-6" />
                            </Link>
                            <div className="flex items-center gap-4 text-sm font-bold opacity-80">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <img key={i} src={`https://picsum.photos/seed/${i + 100}/40/40`} className="w-8 h-8 rounded-full border-2 border-orange-500" />
                                    ))}
                                </div>
                                <span>Joined by 500+ Visionaries</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default QuotationCTA;
