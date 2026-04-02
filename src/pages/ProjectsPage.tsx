import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import { ThemeContext } from "../context/ThemeContext";

const ProjectsPage = () => {
    const { projects } = useContext(ContentContext);
    const { isDark } = useContext(ThemeContext);

    return (
        <div>
            <section className="pb-20 md:pb-32 pt-0 px-4 text-center">
                <h1 className="text-5xl font-bold mb-8">Our Projects</h1>
                <p className="opacity-60 max-w-2xl mx-auto">Explore our portfolio of iconic digital products and engineering marvels.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <Link key={index} to={project.path} className="group aspect-video bg-foreground/5 rounded-3xl border border-foreground/10 flex flex-col items-center justify-center overflow-hidden relative transition-all">
                            <img
                                src={(isDark ? project.thumbnail_dark : project.thumbnail_light) || `https://picsum.photos/seed/${project.id}/800/600`}
                                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                                referrerPolicy="no-referrer"
                            />
                            <div className="relative z-10 p-8 text-center">
                                <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2">{project.category}</div>
                                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                                <p className="opacity-60 text-sm max-w-xs mx-auto">{project.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;
