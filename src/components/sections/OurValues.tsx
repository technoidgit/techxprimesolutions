import { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";

const OurValues = () => {
    const { settings } = useContext(ContentContext);
    return (
        <section className="py-12 sm:py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-8" dangerouslySetInnerHTML={{ __html: settings.values_title || "Guided by Excellence, Driven by Innovation." }} />
                        <div
                            className="text-lg opacity-60 font-light leading-relaxed mb-12 prose prose-invert"
                            dangerouslySetInnerHTML={{ __html: settings.values_description || `At TechxPrime, we don't just build software; we architect the future. Our core values define every interaction and every line of code we write.` }}
                        />
                        <div className="space-y-8">
                            {[
                                { title: settings.value_1_title || "Radical Transparency", desc: settings.value_1_desc || "We believe in honest, open communication at every stage of the project." },
                                { title: settings.value_2_title || "Relentless Quality", desc: settings.value_2_desc || "Good enough is never enough. We strive for perfection in every detail." },
                                { title: settings.value_3_title || "Human-Centric Design", desc: settings.value_3_desc || "Technology should serve people, not the other way around." }
                            ].map((v, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">
                                        0{i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: v.title }} />
                                        <div className="opacity-60 text-sm leading-relaxed prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: v.desc }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden border border-foreground/10">
                            <img src={settings.values_image || "https://picsum.photos/seed/values/800/800"} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Our Values" />
                        </div>
                        <div className="absolute bottom-4 left-4 p-6 bg-orange-500 text-white rounded-2xl shadow-xl max-w-[200px] md:max-w-xs">
                            <div className="text-lg md:text-xl font-bold italic" dangerouslySetInnerHTML={{ __html: `"${settings.values_quote || "Innovation is the only way to win."}"` }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValues;
