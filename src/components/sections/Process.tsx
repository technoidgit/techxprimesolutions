import { motion } from "motion/react";

const Process = () => {
    const steps = [
        { number: "01", title: "Strategic Discovery", description: "We deep dive into your business goals, target audience, and current digital footprint to build a solid foundation." },
        { number: "02", title: "Iterative Design", description: "Crafting a bespoke roadmap that aligns creative vision with measurable KPIs through rapid prototyping and feedback." },
        { number: "03", title: "Agile Development", description: "Our engineering team builds scalable, high-performance solutions using the latest tech stacks and agile methodologies." },
        { number: "04", title: "Quality Assurance", description: "Rigorous testing across all devices and scenarios to ensure a flawless, bug-free user experience." },
        { number: "05", title: "Seamless Launch", description: "Deploying your solution with precision timing and continuous monitoring for immediate impact and long-term success." }
    ];

    return (
        <section className="py-24 md:py-40 px-4 md:px-6 bg-foreground/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Our Methodology
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter mb-8"
                    >
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Work</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl opacity-60 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        Our proven framework for scalable success, engineered for visionary brands.
                    </motion.p>
                </div>

                <div className="relative">
                    <div className="absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-foreground/10 hidden md:block">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-8 relative">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.15 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative z-10 mb-10">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-20 h-20 rounded-[2rem] bg-background border border-foreground/10 flex items-center justify-center text-2xl font-black shadow-2xl group-hover:border-orange-500/50 transition-all duration-500 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10 group-hover:text-orange-500 transition-colors">{step.number}</span>
                                    </motion.div>
                                    <div className="absolute inset-0 rounded-[2rem] bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 scale-150" />
                                </div>

                                <div className="space-y-4 px-4">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-orange-500 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="opacity-50 text-sm leading-relaxed font-medium group-hover:opacity-80 transition-opacity duration-300">
                                        {step.description}
                                    </p>
                                </div>

                                {i < steps.length - 1 && (
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/10 to-transparent mt-8 md:hidden" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
