import { useState, useContext } from "react";
import { motion } from "motion/react";
import { Lock, Plus, Edit, Trash2, FileText, Sparkles, Briefcase as BriefcaseIcon, Users, Star, Info, ShieldCheck, Zap, Layout as LayoutIcon, Image as ImageIcon } from "lucide-react";
import { ContentContext } from "../context/ContentContext";
import { stripHtml } from "../utils/stripHtml";
import CMSForm from "./CMSForm";
import MediaManager from "./MediaManager";

const SecretContent = () => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("hero_banner");
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isAdding, setIsAdding] = useState(false);

    const { services, projects, caseStudies, blogPosts, jobs, testimonials, partners, settings, refreshContent } = useContext(ContentContext);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "passkey123") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    const handleDelete = async (id: any) => {
        if (!window.confirm("Are you sure you want to delete this?")) return;
        try {
            await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
            refreshContent();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleSave = async (data: any) => {
        try {
            const method = editingItem ? "PUT" : "POST";
            let url = editingItem ? `/api/${activeTab}/${editingItem.id}` : `/api/${activeTab}`;

            if (activeTab === "site_settings" || activeTab === "hero_banner" || activeTab === "about_page" || activeTab === "privacy_policy" || activeTab === "terms_conditions" || activeTab === "cookie_policy") {
                url = editingItem ? `/api/site_settings/${editingItem.key}` : `/api/site_settings`;
            }

            // Prepare data (stringify arrays)
            let payload = { ...data };

            // Generate ID for new items
            if (!editingItem && !payload.id && activeTab !== "site_settings") {
                payload.id = crypto.randomUUID();
            }

            // Filter payload based on table columns
            if (activeTab === "site_settings" || activeTab === "hero_banner" || activeTab === "about_page" || activeTab === "privacy_policy" || activeTab === "terms_conditions" || activeTab === "cookie_policy") {
                payload = { key: payload.key, value: payload.value };
            } else if (activeTab === "services") {
                const allowed = ["id", "title", "description", "fullDescription", "features", "icon", "color", "size", "path", "thumbnail_light", "thumbnail_dark", "externalLink"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "projects") {
                const allowed = ["id", "title", "description", "fullDescription", "category", "client", "year", "results", "challenge", "solution", "path", "thumbnail_light", "thumbnail_dark", "impact", "keyPoints", "isFeatured"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "case_studies") {
                const allowed = ["id", "title", "description", "fullDescription", "category", "client", "year", "challenge", "solution", "results", "image", "path", "thumbnail_light", "thumbnail_dark", "impact", "keyPoints", "isFeatured"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "blog_posts") {
                const allowed = ["id", "title", "description", "fullDescription", "category", "author", "date", "path", "thumbnail_light", "thumbnail_dark", "impact", "keyPoints", "results", "isFeatured"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "jobs") {
                const allowed = ["id", "title", "department", "location", "type", "description"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "testimonials") {
                const allowed = ["id", "title", "name", "role", "content", "fullContent", "avatar", "rating", "isFeatured", "path"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            } else if (activeTab === "partners") {
                const allowed = ["id", "title", "description", "fullDescription", "category", "path", "thumbnail_light", "thumbnail_dark", "website", "isFeatured"];
                payload = Object.fromEntries(Object.entries(payload).filter(([k]) => allowed.includes(k)));
            }

            if (payload.features && Array.isArray(payload.features)) payload.features = JSON.stringify(payload.features);
            if (payload.results && Array.isArray(payload.results)) payload.results = JSON.stringify(payload.results);
            if (payload.keyPoints && Array.isArray(payload.keyPoints)) payload.keyPoints = JSON.stringify(payload.keyPoints);
            if (payload.isFeatured !== undefined) payload.isFeatured = !!payload.isFeatured;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Save failed");
            }

            setEditingItem(null);
            setIsAdding(false);
            refreshContent();
        } catch (err) {
            console.error("Save failed", err);
        }
    };

    const getActiveList = () => {
        switch (activeTab) {
            case "services": return services;
            case "projects": return projects;
            case "case_studies": return caseStudies;
            case "blog_posts": return blogPosts;
            case "jobs": return jobs;
            case "testimonials": return testimonials;
            case "partners": return partners;
            case "about_page":
                return Object.entries(settings)
                    .filter(([key]) => key.startsWith('about_'))
                    .map(([key, value]) => ({ id: key, key, value, title: key.replace(/_/g, ' ').toUpperCase(), description: value }));
            case "privacy_policy":
                return Object.entries(settings)
                    .filter(([key]) => key === 'privacy_policy')
                    .map(([key, value]) => ({ id: key, key, value, title: "Privacy Policy", description: value }));
            case "terms_conditions":
                return Object.entries(settings)
                    .filter(([key]) => key === 'terms_conditions')
                    .map(([key, value]) => ({ id: key, key, value, title: "Terms & Conditions", description: value }));
            case "cookie_policy":
                return Object.entries(settings)
                    .filter(([key]) => key === 'cookie_policy')
                    .map(([key, value]) => ({ id: key, key, value, title: "Cookie Policy", description: value }));
            case "site_settings":
                return Object.entries(settings)
                    .filter(([key]) => !key.startsWith('about_') && !['privacy_policy', 'terms_conditions', 'cookie_policy', 'offer_text', 'homepage_hero_bg', 'hero_image', 'homepage_hero_title', 'homepage_hero_description', 'homepage_established_text'].includes(key))
                    .map(([key, value]) => ({ id: key, key, value, title: key.replace(/_/g, ' ').toUpperCase(), description: value }));
            case "hero_banner":
                return Object.entries(settings)
                    .filter(([key]) => ['offer_text', 'homepage_hero_bg', 'hero_image', 'homepage_hero_title', 'homepage_hero_description', 'homepage_established_text'].includes(key))
                    .map(([key, value]) => ({ id: key, key, value, title: key.replace(/_/g, ' ').toUpperCase(), description: value }));
            default: return [];
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-foreground/[0.02] p-10 rounded-[2rem] border border-foreground/10 w-full max-w-md text-center"
                >
                    <Lock className="w-12 h-12 text-orange-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-6">Secret Content</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-background border border-foreground/10 rounded-xl px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors text-center"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all">
                            Unlock
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-0 pb-20 px-4 md:px-6 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Content Manager</h1>
                        <p className="opacity-60">Manage your website's dynamic content and SEO.</p>
                    </div>
                    <button
                        onClick={() => { setIsAdding(true); setEditingItem(null); }}
                        className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Content
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 p-2 bg-foreground/5 rounded-3xl border border-foreground/10">
                    {[
                        { id: "hero_banner", label: "Hero & Banner", icon: <LayoutIcon className="w-4 h-4" /> },
                        { id: "blog_posts", label: "Blogs", icon: <FileText className="w-4 h-4" /> },
                        { id: "projects", label: "Projects", icon: <LayoutIcon className="w-4 h-4" /> },
                        { id: "case_studies", label: "Case Studies", icon: <Sparkles className="w-4 h-4" /> },
                        { id: "services", label: "Services", icon: <BriefcaseIcon className="w-4 h-4" /> },
                        { id: "partners", label: "Partners", icon: <Users className="w-4 h-4" /> },
                        { id: "jobs", label: "Careers", icon: <BriefcaseIcon className="w-4 h-4" /> },
                        { id: "testimonials", label: "Reviews", icon: <Star className="w-4 h-4" /> },
                        { id: "about_page", label: "About Page", icon: <Info className="w-4 h-4" /> },
                        { id: "privacy_policy", label: "Privacy Policy", icon: <ShieldCheck className="w-4 h-4" /> },
                        { id: "terms_conditions", label: "Terms & Conditions", icon: <FileText className="w-4 h-4" /> },
                        { id: "cookie_policy", label: "Cookie Policy", icon: <Zap className="w-4 h-4" /> },
                        { id: "site_settings", label: "Settings", icon: <Zap className="w-4 h-4" /> },
                        { id: "media", label: "Media", icon: <ImageIcon className="w-4 h-4" /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsAdding(false); setEditingItem(null); }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${activeTab === tab.id ? "bg-foreground text-background" : "hover:bg-foreground/10 opacity-60 hover:opacity-100"}`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {(isAdding || editingItem) ? (
                    <CMSForm
                        type={activeTab === "hero_banner" || activeTab === "about_page" || activeTab === "privacy_policy" || activeTab === "terms_conditions" || activeTab === "cookie_policy" ? "site_settings" : activeTab}
                        item={editingItem}
                        onSave={handleSave}
                        onCancel={() => { setIsAdding(false); setEditingItem(null); }}
                    />
                ) : activeTab === "media" ? (
                    <MediaManager />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getActiveList().map((item: any) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group p-6 rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 hover:border-orange-500/30 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                                            {item.category || item.department || (activeTab === "site_settings" || activeTab === "about_page" || activeTab === "privacy_policy" || activeTab === "terms_conditions" || activeTab === "cookie_policy" ? item.key : "Content")}
                                        </span>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingItem(item)} className="p-2 rounded-xl bg-foreground/5 hover:bg-orange-500/10 hover:text-orange-500 transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            {activeTab !== "site_settings" && activeTab !== "about_page" && activeTab !== "privacy_policy" && activeTab !== "terms_conditions" && activeTab !== "cookie_policy" && (
                                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                                        {activeTab === "site_settings" || activeTab === "about_page" || activeTab === "privacy_policy" || activeTab === "terms_conditions" || activeTab === "cookie_policy" ? (
                                            <span className="flex items-center gap-2">
                                                <span className="text-orange-500">{item.key}:</span>
                                                <span className="opacity-60 text-sm font-normal">
                                                    {item.key === 'contact_email' && "Email"}
                                                    {item.key === 'contact_phone' && "Phone"}
                                                    {item.key === 'contact_whatsapp' && "WhatsApp"}
                                                    {item.key === 'contact_address' && "Address"}
                                                    {item.key === 'company_name' && "Company"}
                                                    {item.key === 'hiring_emails' && "Hiring"}
                                                    {item.key === 'gemini_api_key' && "Support Chat Key"}
                                                    {item.key === 'offer_text' && "Offer Banner"}
                                                    {item.key === 'privacy_policy' && "Privacy Policy"}
                                                    {item.key === 'terms_conditions' && "Terms & Conditions"}
                                                    {item.key === 'cookie_policy' && "Cookie Policy"}
                                                    {item.key.startsWith('about_') && "About Content"}
                                                </span>
                                            </span>
                                        ) : item.title}
                                    </h3>
                                    <p className="text-sm opacity-60 line-clamp-3 mb-6">{stripHtml(item.description)}</p>
                                </div>
                                {item.thumbnail_light && (
                                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-foreground/10">
                                        <img src={item.thumbnail_light} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        {getActiveList().length === 0 && (
                            <div className="col-span-full py-20 text-center opacity-40">
                                <p className="text-xl font-bold">No content found in this section.</p>
                                <p>Click "Add New Content" to get started.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecretContent;
