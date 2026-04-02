import { useContext } from "react";
import { motion } from "motion/react";
import { useScroll, useTransform } from "motion/react";
import { ContentContext } from "../../context/ContentContext";

const About = ({ isPage = false }: { isPage?: boolean }) => {
    const { scrollYProgress } = useScroll();
    const { settings } = useContext(ContentContext);
    const y = useTransform(scrollYProgress, [0.2, 0.5], [0, -50]);

    const stats = [
        { label: "Years Experience", value: "10+" },
        { label: "Projects Delivered", value: "250+" },
        { label: "Client Satisfaction", value: "99%" },
        { label: "Global Partners", value: "40+" }
    ];

    const values = [
        { title: "Innovation First", description: "We constantly push the boundaries of what's possible in digital engineering." },
        { title: "Quality Driven", description: "Every line of code is written with precision and long-term scalability in mind." },
        { title: "Client Centric", description: "Your success is our primary metric. We build partnerships, not just products." }
    ];

    return (
        <section className={`${isPage ? "pt-0 pb-20 md:pb-32" : "pt-16 pb-20 md:pt-24 md:pb-32"} px-4 md:px-6 bg-foreground/[0.02]`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center mb-10 md:mb-32">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8"
                        >
                            <span dangerouslySetInnerHTML={{ __html: settings.about_title || "We are TechxPrime." }} /> <br />
                            <span className="opacity-40" dangerouslySetInnerHTML={{ __html: settings.about_subtitle || "The future of software." }} />
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg sm:text-xl opacity-60 mb-8 md:mb-12 font-light leading-relaxed prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: settings.about_content || `Founded on the principles of precision and innovation, TechxPrime has grown 
              from a boutique design studio into a global technology powerhouse. 
              We specialize in solving complex business problems through elegant code and 
              visionary design. Our mission is to empower businesses with the tools they 
              need to thrive in an increasingly digital world.` }}
                        />
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-[10px] sm:text-sm uppercase tracking-widest opacity-40 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        style={{ y }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-500/20 to-orange-500/20 border border-foreground/10 flex items-center justify-center p-8 sm:p-12"
                    >
                        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1200/1200')] opacity-20 mix-blend-overlay grayscale" />
                        <div className="relative z-10 text-center">
                            <div className="text-6xl sm:text-8xl font-black mb-4 tracking-tighter opacity-20 text-orange-500">TXP</div>
                            <div className="text-[10px] sm:text-sm font-medium tracking-[0.3em] uppercase opacity-40">Established 2016</div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 sm:p-8 rounded-3xl border border-foreground/5 bg-foreground/[0.01]"
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4">{value.title}</h3>
                            <p className="opacity-60 leading-relaxed text-sm sm:text-base">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
