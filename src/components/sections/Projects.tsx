import { useContext } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext";
import { ThemeContext } from "../../context/ThemeContext";

const Projects = () => {
    const { projects } = useContext(ContentContext);
    const { isDark } = useContext(ThemeContext);
    const featuredProjects = projects.filter(p => p.isFeatured).length > 0 ? projects.filter(p => p.isFeatured) : projects.slice(0, 4);

    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6"
                        >
                            Featured Work
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg sm:text-xl opacity-60 max-w-2xl font-light"
                        >
                            Explore our portfolio of iconic digital products.
                        </motion.p>
                    </div>
                    <Link to="/projects" className="text-orange-500 font-bold hover:opacity-80 transition-opacity">
                        View All Projects →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={project.path} className="group block aspect-video bg-foreground/5 rounded-3xl border border-foreground/10 overflow-hidden relative transition-all">
                                <img
                                    src={(isDark ? project.thumbnail_dark : project.thumbnail_light) || `https://picsum.photos/seed/${project.id}/800/600`}
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                                    <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</div>
                                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                    <p className="opacity-60 text-sm max-w-xs">{project.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
