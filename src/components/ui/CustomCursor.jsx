import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium custom cursor:
 * - Small dot that follows the mouse exactly
 * - Larger ring that follows with spring lag
 * - Expands + changes color on [data-cursor="pointer"] elements
 * - Hidden on touch devices
 */
const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Ring follows with spring lag for that premium trailing feel
    const springConfig = { stiffness: 200, damping: 28, mass: 0.5 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Hide on touch devices
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            setIsTouch(true);
            return;
        }

        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const checkHover = (e) => {
            const target = e.target;
            const isInteractive =
                target.closest("[data-cursor='pointer']") ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest("input") ||
                target.closest("textarea") ||
                target.closest("select");
            setIsHovering(!!isInteractive);
        };

        const hideCursor = () => setIsVisible(false);
        const showCursor = () => setIsVisible(true);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousemove", checkHover);
        document.addEventListener("mouseleave", hideCursor);
        document.addEventListener("mouseenter", showCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousemove", checkHover);
            document.removeEventListener("mouseleave", hideCursor);
            document.removeEventListener("mouseenter", showCursor);
        };
    }, [isVisible, mouseX, mouseY]);

    if (isTouch) return null;

    return (
        <>
            {/* Dot — tracks mouse exactly */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#fff",
                    }}
                />
            </motion.div>

            {/* Ring — spring lag, grows on hover */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    width: isHovering ? 52 : 32,
                    height: isHovering ? 52 : 32,
                    borderColor: isHovering
                        ? "rgba(37, 99, 235, 0.9)"
                        : "rgba(255, 255, 255, 0.6)",
                    backgroundColor: isHovering
                        ? "rgba(37, 99, 235, 0.12)"
                        : "transparent",
                }}
                transition={{
                    opacity: { duration: 0.2 },
                    width: { type: "spring", stiffness: 300, damping: 28 },
                    height: { type: "spring", stiffness: 300, damping: 28 },
                    borderColor: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 },
                }}
                style2={undefined}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: "1.5px solid",
                        borderColor: "inherit",
                        backgroundColor: "inherit",
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
