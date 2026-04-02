import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import DetailPage from "./DetailPage";

const ProjectDetailPage = () => {
    const { id } = useParams();
    const { projects } = useContext(ContentContext);
    const item = projects.find(p => p.id === id);
    if (!item) return <div className="pt-12 text-center">Project not found</div>;
    return <DetailPage
        title={item.title}
        description={item.description}
        content={item.fullDescription}
        category={item.category}
        client={item.client}
        year={item.year}
        results={item.results}
        challenge={item.challenge}
        solution={item.solution}
        impact={item.impact}
        keyPoints={item.keyPoints}
        thumbnail_light={item.thumbnail_light}
        thumbnail_dark={item.thumbnail_dark}
    />;
};

export default ProjectDetailPage;
