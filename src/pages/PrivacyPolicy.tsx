import { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

const PrivacyPolicy = () => {
    const { settings } = useContext(ContentContext);
    return (
        <div className="pt-0 pb-20 px-4 max-w-4xl mx-auto prose prose-invert">
            <h1 className="text-5xl font-black mb-8">Privacy Policy</h1>
            <div dangerouslySetInnerHTML={{
                __html: settings.privacy_policy || `<p>At TechxPrime Solutions, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
      <h2>Information Collection</h2>
      <p>We collect information you provide directly to us, such as when you fill out a contact form or enquire about our services.</p>
      <h2>Use of Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
      <h2>Data Security</h2>
      <p>We implement industry-standard security measures to protect your data from unauthorized access.</p>` }} />
        </div>
    );
};

export default PrivacyPolicy;
