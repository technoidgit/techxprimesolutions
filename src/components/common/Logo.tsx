import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Logo = () => {
    const { isDark } = useContext(ThemeContext);
    return (
        <div className="flex items-center group">
            <img
                src="https://www.portal.techxprime.com/uploads/company/image%20(1).png"
                alt="TechxPrime Logo"
                className={`h-8 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${!isDark ? "opacity-90" : ""}`}
                referrerPolicy="no-referrer"
            />
        </div>
    );
};

export default Logo;
