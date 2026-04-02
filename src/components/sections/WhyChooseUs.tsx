import { useContext } from "react";
import { ContentContext } from "../../context/ContentContext";

const WhyChooseUs = () => {
    const { settings } = useContext(ContentContext);
    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8" dangerouslySetInnerHTML={{ __html: settings.why_choose_us_title || "Why Choose Us?" }} />
                        <div
                            className="text-lg sm:text-xl opacity-60 font-light leading-relaxed prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: settings.why_choose_us_content || `We combine technical excellence with strategic thinking to deliver products that don't just work, but win.` }}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: "Expert Team", desc: "Our engineers and designers are industry veterans." },
                            { title: "Cutting Edge", desc: "We use the latest tech to keep you ahead." },
                            { title: "Scalable Solutions", desc: "Built to grow with your business." },
                            { title: "24/7 Support", desc: "We're here whenever you need us." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-foreground/5 rounded-3xl border border-foreground/10">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="opacity-60 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
