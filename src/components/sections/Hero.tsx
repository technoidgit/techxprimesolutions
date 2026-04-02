import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContentContext } from "../../context/ContentContext";

const Hero = () => {
    const { scrollYProgress } = useScroll();
    const { settings } = useContext(ContentContext);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center pb-12 overflow-hidden">
            {(settings.homepage_hero_bg || settings.hero_image) && (
                <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
                    <img src={settings.homepage_hero_bg || settings.hero_image} className="w-full h-full object-cover" alt="Hero Background" />
                </div>
            )}
            <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-flex items-center space-x-2 bg-foreground/5 border border-foreground/10 px-4 py-1.5 rounded-full"
                >
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase opacity-70" dangerouslySetInnerHTML={{ __html: settings.homepage_established_text || "TXP ESTABLISHED 2016" }} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter mb-6 sm:mb-8 leading-[1] sm:leading-[0.95] text-balance"
                >
                    {settings.homepage_hero_title ? (
                        <span dangerouslySetInnerHTML={{ __html: settings.homepage_hero_title }} />
                    ) : (
                        <>
                            Designing the <br />
                            <span className='text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600'>Next Generation</span>
                        </>
                    )}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto text-base sm:text-xl md:text-2xl opacity-60 mb-8 sm:mb-12 font-light leading-relaxed text-balance prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: settings.homepage_hero_description || "TechxPrime is where visionary design meets world-class engineering. We craft digital products that define industries and inspire millions." }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-row items-center justify-center gap-2 sm:gap-6 px-2"
                >
                    <Link
                        to="/contact"
                        className="flex-1 sm:flex-none bg-foreground text-background px-4 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-[10px] sm:text-lg font-bold hover:opacity-90 transition-all flex items-center justify-center group shadow-2xl shadow-orange-500/10 whitespace-nowrap"
                    >
                        Start Your Journey
                        <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/projects"
                        className="flex-1 sm:flex-none border border-foreground/10 px-4 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-[10px] sm:text-lg font-bold hover:bg-foreground/5 transition-all backdrop-blur-sm flex items-center justify-center whitespace-nowrap"
                    >
                        Explore Portfolio
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
