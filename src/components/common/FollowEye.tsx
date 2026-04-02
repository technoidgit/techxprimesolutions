import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FollowEye = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const calculatePosition = (baseX: number, baseY: number, strength: number) => {
        const dx = mousePos.x - (window.innerWidth / 2 + baseX);
        const dy = mousePos.y - (window.innerHeight / 2 + baseY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const limitedDistance = Math.min(distance, strength);
        return {
            x: Math.cos(angle) * limitedDistance,
            y: Math.sin(angle) * limitedDistance
        };
    };

    const eye1 = calculatePosition(-100, 0, 10);
    const eye2 = calculatePosition(100, 0, 10);

    return (
        <div className="flex gap-4 opacity-20">
            {[eye1, eye2].map((pos, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-foreground/10 border border-foreground/10 p-1">
                    <motion.div
                        animate={{ x: pos.x, y: pos.y }}
                        className="w-3 h-3 bg-foreground rounded-full"
                    />
                </div>
            ))}
        </div>
    );
};

export default FollowEye;
