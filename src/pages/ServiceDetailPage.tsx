import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import DetailPage from "./DetailPage";

const ServiceDetailPage = () => {
    const { id } = useParams();
    const { services } = useContext(ContentContext);
    const item = services.find(s => s.id === id);
    if (!item) return <div className="pt-12 text-center">Service not found</div>;
    return <DetailPage
        title={item.title}
        description={item.description}
        content={item.fullDescription}
        features={item.features}
        icon={item.icon}
        thumbnail_light={item.thumbnail_light}
        thumbnail_dark={item.thumbnail_dark}
    />;
};

export default ServiceDetailPage;
