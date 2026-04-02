import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import { ThemeContext } from "../context/ThemeContext";

const BlogPage = () => {
    const { blogPosts } = useContext(ContentContext);
    const { isDark } = useContext(ThemeContext);

    return (
        <div>
            <section className="pb-20 md:pb-32 pt-0 px-4 text-center">
                <h1 className="text-5xl font-bold mb-8">Tech Insights</h1>
                <p className="opacity-60 max-w-2xl mx-auto">Latest trends in design, engineering, and AI.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {blogPosts.map((post, index) => (
                        <Link key={index} to={post.path} className="group p-8 bg-foreground/5 rounded-3xl border border-foreground/10 text-left hover:bg-foreground/10 transition-all overflow-hidden flex flex-col">
                            {(post.thumbnail_light || post.thumbnail_dark) && (
                                <div className="aspect-video rounded-2xl overflow-hidden mb-6 border border-foreground/10">
                                    <img
                                        src={(isDark ? post.thumbnail_dark : post.thumbnail_light) || post.thumbnail_light || post.thumbnail_dark}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            )}
                            <div className="text-orange-500 font-bold mb-2">{post.category}</div>
                            <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                            <p className="opacity-60 text-sm">{post.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
