import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import DetailPage from "./DetailPage";

const TestimonialDetailPage = () => {
    const { id } = useParams();
    const { testimonials } = useContext(ContentContext);
    const item = testimonials.find(t => t.id?.toString() === id || t.path === `/testimonials/${id}`);
    if (!item) return <div className="pt-12 text-center">Client story not found</div>;
    return <DetailPage
        title={`${item.name}'s Success Story`}
        description={`${item.role} at ${item.title}`}
        content={item.fullContent || item.content}
        category="Client Story"
        author={item.name}
        thumbnail_light={item.avatar}
        thumbnail_dark={item.avatar}
    />;
};

export default TestimonialDetailPage;
