import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import { useLenis } from "../../hooks/useLenis";

// Page transition variants — cinematic enter/exit
const pageVariants = {
    initial: { opacity: 0, y: 24, filter: "blur(4px)" },
    enter: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -16,
        filter: "blur(4px)",
        transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] },
    },
};

const Layout = ({ children, footerBgColor = "bg-white" }) => {
    const location = useLocation();
    useLenis(); // Initialize Lenis smooth scroll globally

    // Add class to enable custom cursor CSS
    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (!isTouchDevice) {
            document.documentElement.classList.add("has-custom-cursor");
        }
        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, []);

    useEffect(() => {
        // If there's a hash, scroll smoothly to that element with header offset
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                setTimeout(() => {
                    const navHeaderHeight = 140;
                    const targetY = element.getBoundingClientRect().top + window.scrollY - navHeaderHeight;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                }, 250);
            }
        } else {
            // On route change scroll to top — Lenis handles the smoothness
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }, [location]);

    return (
        <>
            {/* Global custom cursor — sits outside page transitions */}
            <CustomCursor />

            <Navbar />

            <AnimatePresence mode="wait" initial={false}>
                <motion.main
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            <Footer bgColor={footerBgColor} />
        </>
    );
};

export default Layout;