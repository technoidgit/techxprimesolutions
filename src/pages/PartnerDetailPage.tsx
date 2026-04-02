import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ContentContext } from "../context/ContentContext";

const PartnerDetailPage = () => {
    const { id } = useParams();
    const { partners } = useContext(ContentContext);
    const partner = partners.find(p => p.path === `/partners/${id}`);

    if (!partner) return <div className="pt-12 text-center">Partner not found</div>;

    return (
        <div className="pt-0 pb-20 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 border border-foreground/10 bg-white dark:bg-black p-12 flex items-center justify-center">
                    <img
                        src={partner.thumbnail_light}
                        alt={partner.title}
                        className="w-full h-full object-contain dark:hidden"
                    />
                    <img
                        src={partner.thumbnail_dark || partner.thumbnail_light}
                        alt={partner.title}
                        className="w-full h-full object-contain hidden dark:block"
                    />
                </div>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">{partner.title}</h1>
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-bold uppercase tracking-widest">{partner.category}</span>
                            {partner.website && (
                                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-4 h-4" />
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div className="text-xl opacity-80 leading-relaxed">
                            <Markdown rehypePlugins={[rehypeRaw]}>{partner.fullDescription || partner.description}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetailPage;
