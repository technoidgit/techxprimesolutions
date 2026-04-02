import { useContext } from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { ContentContext } from "../../context/ContentContext";
import Logo from "../common/Logo";

const Footer = () => {
    const { settings } = useContext(ContentContext);
    return (
        <footer className="py-12 border-t border-foreground/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <Logo />

                    <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-sm opacity-60">
                        <Link to="/testimonials" className="hover:opacity-100 transition-opacity">Testimonials</Link>
                        <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
                        <Link to="/terms-and-conditions" className="hover:opacity-100 transition-opacity">Terms & Conditions</Link>
                        <Link to="/cookie-policy" className="hover:opacity-100 transition-opacity">Cookie Policy</Link>
                    </div>

                    <div className="flex space-x-4">
                        <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors">
                            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        <a href={settings.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors">
                            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground/5 transition-colors">
                            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] sm:text-xs opacity-40">
                    &copy; {new Date().getFullYear()} TechxPrime. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
