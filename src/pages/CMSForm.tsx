import { useState } from "react";
import { motion } from "motion/react";
import { Save, Upload, Users, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "../components/common/RichTextEditor";

const CMSForm = ({ type, item, onSave, onCancel }: { type: string, item?: any, onSave: (data: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(item || {
        title: "",
        description: "",
        fullDescription: "",
        category: "",
        client: "",
        year: "",
        author: "",
        date: new Date().toISOString().split('T')[0],
        path: "",
        icon: "Rocket",
        color: "orange",
        size: "large",
        features: [],
        results: [],
        challenge: "",
        solution: "",
        department: "",
        location: "",
        jobType: "Full-time",
        thumbnail_light: "",
        thumbnail_dark: "",
        impact: "",
        keyPoints: [],
        name: "",
        role: "",
        content: "",
        avatar: "",
        rating: 5,
        fullContent: "",
        key: "",
        value: "",
        externalLink: "",
        isFeatured: false
    });

    const [uploading, setUploading] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(field);
        const formDataUpload = new FormData();
        formDataUpload.append("image", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formDataUpload,
            });
            const data = await res.json();
            setFormData({ ...formData, [field]: data.url });
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-foreground/10 rounded-[2.5rem] p-8 space-y-8"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                    {item ? "Edit" : "Add New"} {type.slice(0, -1).replace('_', ' ')}
                </h3>
                <button onClick={onCancel} className="opacity-60 hover:opacity-100">Cancel</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {type !== "site_settings" && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-40 uppercase">Title</label>
                        <input
                            required
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                )}

                {type !== "site_settings" && type !== "jobs" && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-40 uppercase">Path (e.g. /testimonials/client-name)</label>
                        <input
                            required
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                            value={formData.path}
                            onChange={e => setFormData({ ...formData, path: e.target.value })}
                        />
                    </div>
                )}

                {type !== "site_settings" && (
                    <>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Short Description</label>
                            <textarea
                                required
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all min-h-[100px]"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Full Content / Story (Rich Text Editor)</label>
                            <RichTextEditor
                                value={type === "testimonials" ? formData.fullContent : (type === "jobs" ? formData.description : formData.fullDescription)}
                                onChange={val => setFormData({ ...formData, [type === "testimonials" ? "fullContent" : (type === "jobs" ? "description" : "fullDescription")]: val })}
                            />
                        </div>
                    </>
                )}

                {/* Dynamic Fields based on type */}
                {type === "services" && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-40 uppercase">External Link (Optional)</label>
                        <input
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                            placeholder="https://example.com"
                            value={formData.externalLink}
                            onChange={e => setFormData({ ...formData, externalLink: e.target.value })}
                        />
                    </div>
                )}

                {type === "partners" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Website URL</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                placeholder="https://partner.com"
                                value={formData.website}
                                onChange={e => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {(type === "projects" || type === "case_studies" || type === "blog_posts" || type === "testimonials" || type === "partners") && (
                    <div className="flex items-center gap-3 p-4 bg-foreground/5 rounded-2xl border border-foreground/10">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            className="w-5 h-5 accent-orange-500"
                            checked={formData.isFeatured}
                            onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                        />
                        <label htmlFor="isFeatured" className="text-sm font-bold opacity-60 uppercase cursor-pointer">Featured on Homepage</label>
                    </div>
                )}

                {type === "testimonials" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Name</label>
                            <input
                                required
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Role</label>
                            <input
                                required
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Testimonial Content</label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={val => setFormData({ ...formData, content: val })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Rating (1-5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.rating}
                                onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold opacity-40 uppercase block">Avatar Image</label>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-foreground/10 overflow-hidden flex items-center justify-center">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} className="w-full h-full object-cover" />
                                    ) : (
                                        <Users className="w-6 h-6 opacity-20" />
                                    )}
                                </div>
                                <label className="cursor-pointer bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    {uploading === "avatar" ? "Uploading..." : "Upload"}
                                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, "avatar")} />
                                </label>
                            </div>
                        </div>
                    </>
                )}

                {type === "site_settings" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Setting Label (What is this?)</label>
                            <div className="text-xs font-medium opacity-60 p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                                {formData.key === 'homepage_hero_bg' && "Homepage Hero Background Image URL (Large high-quality image recommended)"}
                                {formData.key === 'hero_image' && "Hero Image URL (Alternative to background)"}
                                {formData.key === 'homepage_established_text' && "Homepage 'Established Since' Text (e.g., TXP ESTABLISHED 2016)"}
                                {formData.key === 'offer_text' && "Top Header Offer/Promo Text (e.g., GET 20% OFF ON YOUR FIRST PROJECT)"}
                                {formData.key === 'expert_logo' && "Expert Partner Logos Image URL (Displayed below testimonials)"}
                                {formData.key === 'why_choose_us_title' && "Homepage 'Why Choose Us' Section Title"}
                                {formData.key === 'why_choose_us_content' && "Homepage 'Why Choose Us' Description (Rich Text supported)"}
                                {formData.key === 'our_expertise_title' && "Homepage 'Our Expertise' Section Title"}
                                {formData.key === 'our_expertise_content' && "Homepage 'Our Expertise' Description (Rich Text supported)"}
                                {formData.key === 'quotation_text' && "Homepage 'Get the Quotation' Main Heading"}
                                {formData.key === 'quotation_description' && "Homepage 'Get the Quotation' Subtext (Rich Text supported)"}
                                {formData.key === 'values_title' && "Homepage 'Our Values' Section Main Heading"}
                                {formData.key === 'values_description' && "Homepage 'Our Values' Section Description (Rich Text supported)"}
                                {formData.key === 'values_quote' && "Homepage 'Our Values' Floating Quote Text"}
                                {formData.key === 'values_image' && "Homepage 'Our Values' Section Main Image URL"}
                                {formData.key === 'value_1_title' && "Value #1: Heading"}
                                {formData.key === 'value_1_desc' && "Value #1: Detailed Description"}
                                {formData.key === 'value_2_title' && "Value #2: Heading"}
                                {formData.key === 'value_2_desc' && "Value #2: Detailed Description"}
                                {formData.key === 'value_3_title' && "Value #3: Heading"}
                                {formData.key === 'value_3_desc' && "Value #3: Detailed Description"}
                                {formData.key === 'global_reach_title' && "Homepage 'Global Reach' Section Heading"}
                                {formData.key === 'stat_1_label' && "Stat #1: Label (e.g., Countries Served)"}
                                {formData.key === 'stat_1_value' && "Stat #1: Value (e.g., 25+)"}
                                {formData.key === 'stat_2_label' && "Stat #2: Label (e.g., Projects Delivered)"}
                                {formData.key === 'stat_2_value' && "Stat #2: Value (e.g., 500+)"}
                                {formData.key === 'stat_3_label' && "Stat #3: Label (e.g., Active Users)"}
                                {formData.key === 'stat_3_value' && "Stat #3: Value (e.g., 10M+)"}
                                {formData.key === 'stat_4_label' && "Stat #4: Label (e.g., Expert Engineers)"}
                                {formData.key === 'stat_4_value' && "Stat #4: Value (e.g., 150+)"}
                                {formData.key === 'about_title' && "About Us Page: Main Heading"}
                                {formData.key === 'about_subtitle' && "About Us Page: Sub-heading"}
                                {formData.key === 'about_content' && "About Us Page: Detailed Story/Content (Rich Text supported)"}
                                {formData.key === 'contact_page_content' && "Contact Page: Introductory Text (Rich Text supported)"}
                                {formData.key === 'contact_email' && "Public Contact Email Address"}
                                {formData.key === 'contact_phone' && "Public Contact Phone Number"}
                                {formData.key === 'contact_whatsapp' && "WhatsApp Number (Include country code, no '+' sign, e.g., 917906055529)"}
                                {formData.key === 'contact_address' && "Company Office Address"}
                                {formData.key === 'company_name' && "Company Full Name"}
                                {formData.key === 'hiring_emails' && "Emails for Hiring/Careers (Comma separated)"}
                                {formData.key === 'gemini_api_key' && "Gemini API Key (For AI Assistant features)"}
                                {formData.key === 'twitter_url' && "Social: Twitter/X Profile URL"}
                                {formData.key === 'linkedin_url' && "Social: LinkedIn Profile URL"}
                                {formData.key === 'instagram_url' && "Social: Instagram Profile URL"}
                                {formData.key === 'privacy_policy' && "Legal: Privacy Policy Content (Rich Text supported)"}
                                {formData.key === 'terms_conditions' && "Legal: Terms & Conditions Content (Rich Text supported)"}
                                {formData.key === 'cookie_policy' && "Legal: Cookie Policy Content (Rich Text supported)"}
                                {!['homepage_hero_bg', 'hero_image', 'homepage_established_text', 'offer_text', 'expert_logo', 'why_choose_us_title', 'why_choose_us_content', 'our_expertise_title', 'our_expertise_content', 'quotation_text', 'quotation_description', 'values_title', 'values_description', 'values_quote', 'values_image', 'value_1_title', 'value_1_desc', 'value_2_title', 'value_2_desc', 'value_3_title', 'value_3_desc', 'global_reach_title', 'stat_1_label', 'stat_1_value', 'stat_2_label', 'stat_2_value', 'stat_3_label', 'stat_3_value', 'stat_4_label', 'stat_4_value', 'about_title', 'about_subtitle', 'about_content', 'contact_page_content', 'contact_email', 'contact_phone', 'contact_whatsapp', 'contact_address', 'company_name', 'hiring_emails', 'gemini_api_key', 'twitter_url', 'linkedin_url', 'instagram_url', 'privacy_policy', 'terms_conditions', 'cookie_policy'].includes(formData.key) && formData.key}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Internal Key (Do not change)</label>
                            <input
                                required
                                disabled={!!item}
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all disabled:opacity-50 font-mono text-xs"
                                value={formData.key}
                                onChange={e => setFormData({ ...formData, key: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Setting Value</label>
                            {formData.key.includes('image') || formData.key.includes('logo') || formData.key.includes('bg') ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-xl bg-foreground/10 overflow-hidden flex items-center justify-center">
                                        {formData.value ? (
                                            <img src={formData.value} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 opacity-20" />
                                        )}
                                    </div>
                                    <label className="cursor-pointer bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                                        <Upload className="w-4 h-4" />
                                        {uploading === "value" ? "Uploading..." : "Upload"}
                                        <input type="file" className="hidden" onChange={e => handleImageUpload(e, "value")} />
                                    </label>
                                </div>
                            ) : formData.key.includes('_content') || formData.key.includes('why_choose_us') || formData.key.includes('our_expertise') || formData.key.includes('quotation') || formData.key.includes('values_description') || formData.key.includes('about_content') || formData.key.includes('contact_page_content') || formData.key.includes('policy') || formData.key.includes('terms') || formData.key.includes('desc') || formData.key.includes('offer_text') || formData.key.includes('hero_description') || formData.key.includes('title') || formData.key.includes('subtitle') || formData.key.includes('quote') || formData.key.includes('text') ? (
                                <RichTextEditor
                                    value={formData.value}
                                    onChange={val => setFormData({ ...formData, value: val })}
                                />
                            ) : (
                                <textarea
                                    required
                                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all min-h-[100px]"
                                    value={formData.value}
                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                />
                            )}
                        </div>
                    </>
                )}

                {(type === "projects" || type === "case_studies" || type === "blog_posts") && (
                    <div className="space-y-2">
                        <label className="text-sm font-bold opacity-40 uppercase">Category</label>
                        <input
                            className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                )}

                {(type === "projects" || type === "case_studies") && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Client</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.client}
                                onChange={e => setFormData({ ...formData, client: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Year</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.year}
                                onChange={e => setFormData({ ...formData, year: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">The Challenge</label>
                            <RichTextEditor
                                value={formData.challenge}
                                onChange={val => setFormData({ ...formData, challenge: val })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">The Solution</label>
                            <RichTextEditor
                                value={formData.solution}
                                onChange={val => setFormData({ ...formData, solution: val })}
                            />
                        </div>
                    </>
                )}

                {type === "blog_posts" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Author</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Date</label>
                            <input
                                type="date"
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {type === "jobs" && (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Department</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Location</label>
                            <input
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                    </>
                )}

                {(type === "projects" || type === "case_studies" || type === "blog_posts") && (
                    <>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Impact</label>
                            <RichTextEditor
                                value={formData.impact}
                                onChange={val => setFormData({ ...formData, impact: val })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Key Points (One per line)</label>
                            <textarea
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all min-h-[120px]"
                                placeholder={"Key takeaway 1\nKey takeaway 2..."}
                                value={Array.isArray(formData.keyPoints) ? formData.keyPoints.join('\n') : formData.keyPoints}
                                onChange={e => setFormData({ ...formData, keyPoints: e.target.value.split('\n') })}
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold opacity-40 uppercase">Results (One per line)</label>
                            <textarea
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none transition-all min-h-[120px]"
                                placeholder={"Result 1\nResult 2..."}
                                value={Array.isArray(formData.results) ? formData.results.join('\n') : formData.results}
                                onChange={e => setFormData({ ...formData, results: e.target.value.split('\n') })}
                            />
                        </div>
                    </>
                )}

                {/* Image Uploads */}
                {(type === "blog_posts" || type === "projects" || type === "case_studies" || type === "partners") && (
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-foreground/5 rounded-3xl border border-foreground/10">
                        <div className="space-y-4">
                            <label className="text-sm font-bold opacity-40 uppercase block">Thumbnail (Light Mode)</label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-xl bg-background border border-foreground/10 overflow-hidden flex items-center justify-center">
                                    {formData.thumbnail_light ? (
                                        <img src={formData.thumbnail_light} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 opacity-20" />
                                    )}
                                </div>
                                <label className="cursor-pointer bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    {uploading === "thumbnail_light" ? "Uploading..." : "Upload"}
                                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, "thumbnail_light")} />
                                </label>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold opacity-40 uppercase block">Thumbnail (Dark Mode)</label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                                    {formData.thumbnail_dark ? (
                                        <img src={formData.thumbnail_dark} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-white opacity-20" />
                                    )}
                                </div>
                                <label className="cursor-pointer bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    {uploading === "thumbnail_dark" ? "Uploading..." : "Upload"}
                                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, "thumbnail_dark")} />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="md:col-span-2 pt-6">
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Content
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default CMSForm;
