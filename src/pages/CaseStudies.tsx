import { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentContext } from "../context/ContentContext";
import { ThemeContext } from "../context/ThemeContext";

const CaseStudies = () => {
    const { caseStudies } = useContext(ContentContext);
    const { isDark } = useContext(ThemeContext);
    return (
        <div className="pt-12 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Case Studies</h1>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">Deep dives into how we solve complex problems and deliver measurable results.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {caseStudies.map((study) => (
                        <Link
                            key={study.id}
                            to={study.path}
                            className="group bg-foreground/5 rounded-3xl overflow-hidden border border-foreground/10 hover:border-orange-500/50 transition-all"
                        >
                            <div className="aspect-video overflow-hidden relative">
                                <img
                                    src={(isDark ? study.thumbnail_dark : study.thumbnail_light) || study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    {study.category}
                                </div>
                            </div>
                            <div className="p-8 space-y-4">
                                <h2 className="text-3xl font-bold group-hover:text-orange-500 transition-colors">{study.title}</h2>
                                <p className="text-foreground/60 line-clamp-2">{study.description}</p>
                                <div className="flex items-center gap-2 text-orange-500 font-bold">
                                    Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
