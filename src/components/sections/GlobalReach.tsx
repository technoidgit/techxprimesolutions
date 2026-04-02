import { useContext } from "react";
import { motion } from "framer-motion";
import { ContentContext } from "../../context/ContentContext";

const GlobalReach = () => {
    const { settings } = useContext(ContentContext);
    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground/5">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-16" dangerouslySetInnerHTML={{ __html: settings.global_reach_title || "Global Impact, Local Expertise." }} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {[
                        { label: settings.stat_1_label || "Countries Served", value: settings.stat_1_value || "25+" },
                        { label: settings.stat_2_label || "Projects Delivered", value: settings.stat_2_value || "500+" },
                        { label: settings.stat_3_label || "Active Users", value: settings.stat_3_value || "10M+" },
                        { label: settings.stat_4_label || "Expert Engineers", value: settings.stat_4_value || "150+" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="text-4xl md:text-6xl font-black text-orange-500 mb-2">{stat.value}</div>
                            <div className="text-xs sm:text-sm font-bold opacity-40 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalReach;
