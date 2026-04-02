import { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

const TermsAndConditions = () => {
    const { settings } = useContext(ContentContext);
    return (
        <div className="pt-0 pb-20 px-4 max-w-4xl mx-auto prose prose-invert">
            <h1 className="text-5xl font-black mb-8">Terms & Conditions</h1>
            <div dangerouslySetInnerHTML={{
                __html: settings.terms_conditions || `<p>By accessing or using our services, you agree to be bound by these terms.</p>
      <h2>Service Provision</h2>
      <p>TechxPrime Solutions provides technology consulting and engineering services as described on our website.</p>
      <h2>Intellectual Property</h2>
      <p>All content and materials provided as part of our services are the intellectual property of TechxPrime Solutions unless otherwise stated.</p>` }} />
        </div>
    );
};

export default TermsAndConditions;
