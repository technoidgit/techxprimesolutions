import { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

const CookiePolicy = () => {
    const { settings } = useContext(ContentContext);
    return (
        <div className="pt-0 pb-20 px-4 max-w-4xl mx-auto prose prose-invert">
            <h1 className="text-5xl font-black mb-8">Cookie Policy</h1>
            <div dangerouslySetInnerHTML={{
                __html: settings.cookie_policy || `<p>We use cookies to improve your experience on our website.</p>
      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website.</p>
      <h2>How we use them</h2>
      <p>We use cookies to understand how you use our site and to remember your preferences.</p>` }} />
        </div>
    );
};

export default CookiePolicy;
