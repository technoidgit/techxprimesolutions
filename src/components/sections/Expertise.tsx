import { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";

const Expertise = () => {
    const { settings } = useContext(ContentContext);
    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-foreground/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: settings.our_expertise_title || "Our Expertise" }} />
                    <div
                        className="text-lg sm:text-xl opacity-60 font-light leading-relaxed max-w-3xl mx-auto prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: settings.our_expertise_content || `Deep technical knowledge across the entire digital spectrum.` }}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Cloud Native", desc: "AWS, Azure, GCP experts." },
                        { title: "AI & Data", desc: "ML, LLMs, and big data." },
                        { title: "Web & Mobile", desc: "React, Next.js, Flutter." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 bg-background rounded-[2rem] border border-foreground/5 text-center">
                            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                            <p className="opacity-60">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
