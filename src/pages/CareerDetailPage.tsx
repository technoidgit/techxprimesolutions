import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ContentContext } from "../context/ContentContext";
import DetailPage from "./DetailPage";

const CareerDetailPage = () => {
    const { id } = useParams();
    const { jobs } = useContext(ContentContext);
    const job = jobs.find(j => j.title.toLowerCase().replace(/ /g, '-') === id);
    if (!job) return <div className="pt-12 text-center">Position not found</div>;
    return <DetailPage title={job.title} description={`Join our ${job.department} team in ${job.location}.`} content="We are looking for passionate individuals to help us build the future of digital engineering." />;
};

export default CareerDetailPage;
