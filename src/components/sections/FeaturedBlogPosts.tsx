import { useContext } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentContext } from "../../context/ContentContext";

const FeaturedBlogPosts = () => {
    const { blogPosts } = useContext(ContentContext);
    const featuredPosts = blogPosts.filter(b => b.isFeatured);

    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">Latest Insights</h2>
                        <p className="text-lg sm:text-xl opacity-60 max-w-2xl font-light">Thought leadership and industry updates from our experts.</p>
                    </div>
                    <Link to="/blog" className="group flex items-center gap-2 text-orange-500 font-bold">
                        View All Posts <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(featuredPosts.length > 0 ? featuredPosts : blogPosts.slice(0, 2)).map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link to={post.path} className="block group p-8 bg-foreground/5 rounded-[2.5rem] border border-foreground/10 hover:bg-foreground/[0.08] transition-all">
                                <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4">{post.category}</div>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-orange-500 transition-colors">{post.title}</h3>
                                <p className="opacity-60 mb-8 line-clamp-2">{post.description}</p>
                                <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                                    <div className="text-sm font-medium">{post.author}</div>
                                    <div className="text-sm opacity-40">{post.date}</div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogPosts;
