import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import DetailPage from "./DetailPage";
import BlogAIChat from "./BlogAIChat";
import { stripHtml } from "../utils/stripHtml";

const BlogDetailPage = () => {
    const { id } = useParams();
    const { blogPosts } = useContext(ContentContext);
    const item = blogPosts.find(b => b.id === id);
    if (!item) return <div className="pt-12 text-center">Post not found</div>;
    return <DetailPage
        title={item.title}
        description={item.description}
        content={item.fullDescription}
        category={item.category}
        author={item.author}
        date={item.date}
        impact={item.impact}
        keyPoints={item.keyPoints}
        results={item.results}
        thumbnail_light={item.thumbnail_light}
        thumbnail_dark={item.thumbnail_dark}
    >
        <BlogAIChat blogTitle={item.title} blogContent={stripHtml(item.fullDescription)} />
    </DetailPage>;
};

export default BlogDetailPage;
