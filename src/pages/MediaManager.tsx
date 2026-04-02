import { useState } from "react";
import { motion } from "motion/react";
import { Upload, Image as ImageIcon, Copy, CheckCircle } from "lucide-react";

const MediaManager = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setUploadedImages(prev => [data.url, ...prev]);
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopySuccess(url);
        setTimeout(() => setCopySuccess(null), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="p-10 bg-foreground/[0.02] border border-dashed border-foreground/20 rounded-[2.5rem] text-center">
                <ImageIcon className="w-12 h-12 text-orange-500 mx-auto mb-4 opacity-40" />
                <h3 className="text-2xl font-bold mb-2">Upload Media</h3>
                <p className="opacity-60 mb-6">Upload images to use in your blog posts or other content.</p>
                <label className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all cursor-pointer">
                    <Upload className="w-5 h-5" />
                    {uploading ? "Uploading..." : "Select Image"}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedImages.map((url, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative aspect-video bg-foreground/5 rounded-3xl overflow-hidden border border-foreground/10"
                    >
                        <img src={url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button
                                onClick={() => copyToClipboard(url)}
                                className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-all flex items-center gap-2 font-bold text-sm"
                            >
                                {copySuccess === url ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copySuccess === url ? "Copied!" : "Copy URL"}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MediaManager;
