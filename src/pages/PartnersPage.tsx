import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";

const PartnersPage = () => {
    const { partners } = useContext(ContentContext);

    return (
        <div className="pb-20 md:pb-32 pt-0 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">Our Partners</h1>
                    <p className="text-xl opacity-60 max-w-2xl">We collaborate with industry leaders to deliver exceptional value and innovation to our clients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner) => (
                        <Link
                            key={partner.id}
                            to={partner.path}
                            className="group p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-orange-500/30 transition-all"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden mb-6 border border-foreground/10 bg-white dark:bg-black p-8 flex items-center justify-center">
                                <img
                                    src={partner.thumbnail_light}
                                    alt={partner.title}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 dark:hidden"
                                />
                                <img
                                    src={partner.thumbnail_dark || partner.thumbnail_light}
                                    alt={partner.title}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 hidden dark:block"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{partner.title}</h3>
                            <p className="opacity-60 line-clamp-2">{partner.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnersPage;
