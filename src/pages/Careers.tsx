import { useContext } from "react";
import { Link } from "react-router-dom";
import { Users, Zap, Heart, Rocket, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ContentContext } from "../context/ContentContext";
import Reveal from "../components/common/Reveal";

const Careers = () => {
    const { jobs } = useContext(ContentContext);
    const benefits = [
        {
            icon: <Users className="w-6 h-6 text-orange-500" />,
            title: "Collaborative Culture",
            description: "Work with the brightest minds in an environment that values every voice and idea."
        },
        {
            icon: <Zap className="w-6 h-6 text-orange-500" />,
            title: "Rapid Growth",
            description: "We invest in your future with continuous learning, mentorship, and clear career paths."
        },
        {
            icon: <Heart className="w-6 h-6 text-orange-500" />,
            title: "Wellness & Balance",
            description: "Flexible hours, remote-first options, and comprehensive health benefits for you and your family."
        },
        {
            icon: <Rocket className="w-6 h-6 text-orange-500" />,
            title: "Global Impact",
            description: "Build products used by millions and solve complex problems for world-leading brands."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pb-20 md:pb-32 pt-0 px-4 md:px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-500">We're Hiring</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-8"
                    >
                        Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Future</span> With Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl opacity-60 max-w-2xl mx-auto leading-relaxed"
                    >
                        Join a team of visionary designers and world-class engineers dedicated to crafting digital products that define industries.
                    </motion.p>
                </div>
            </section>

            {/* Why Work With Us */}
            <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Work With Us</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">We've built a culture that empowers individuals to do their best work while maintaining a healthy life balance.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, i) => (
                            <div key={i}>
                                <Reveal>
                                    <div className="p-8 rounded-3xl border border-foreground/5 bg-background hover:border-orange-500/30 transition-all duration-500 group">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                                        <p className="opacity-60 text-sm leading-relaxed">{benefit.description}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Open Positions</h2>
                            <p className="opacity-60">Find the role that matches your expertise and passion.</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-bold opacity-40 uppercase tracking-widest">{jobs.length} Roles Available</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {jobs.map((job, i) => (
                            <div key={i}>
                                <Reveal>
                                    <div className="p-6 md:p-10 rounded-[2.5rem] border border-foreground/5 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-all duration-500 group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider">{job.department}</span>
                                                    <span className="text-xs opacity-40 font-medium">{job.location} • {job.type}</span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{job.title}</h3>
                                                <p className="opacity-60 text-base leading-relaxed max-w-2xl">{job.description}</p>
                                            </div>
                                            <Link
                                                to={`/career/${job.title.toLowerCase().replace(/ /g, '-')}`}
                                                className="bg-foreground text-background px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all flex items-center justify-center group/btn whitespace-nowrap"
                                            >
                                                Apply Now
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-orange-500 to-orange-600 text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't see a perfect fit?</h2>
                            <p className="text-white/80 mb-10 max-w-xl mx-auto">We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.</p>
                            <button className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold hover:bg-white/90 transition-all">
                                Send General Application
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
