import React from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MouseGlow from "../common/MouseGlow";

const Layout = ({ children, onOpenEnquiry, onOpenSearch, setIsAIChatOpen }: { children: React.ReactNode, onOpenEnquiry: () => void, onOpenSearch: () => void, setIsAIChatOpen: (open: boolean) => void }) => {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-[100]"
                style={{ scaleX: scrollYProgress }}
            />
            <MouseGlow />
            <div className="flex flex-col min-h-screen">
                <div className="fixed top-0 left-0 right-0 z-[60]">
                    <Navbar onOpenEnquiry={onOpenEnquiry} onOpenSearch={onOpenSearch} setIsAIChatOpen={setIsAIChatOpen} />
                </div>
                <main className="min-h-screen pt-28">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
