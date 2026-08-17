import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionTemplate,
} from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CharReveal from "../../ui/CharReveal";
import { useCardTilt } from "../../../hooks/useCardTilt";

/* ─── features list ─── */
const features = [
    "Enterprise-Grade Architecture",
    "Agile Development Methodology",
    "Dedicated Technical Support",
    "Data-Driven Growth Strategies",
];

/* ─── Keyboard row configs ─── */
const KEY_ROWS = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.8],
    [2.3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3],
];

/* ─── Single keyboard key ─── */
const Key = ({ flex = 1 }) => (
    <div style={{
        flex,
        height: 5,
        margin: "0 1.5px",
        borderRadius: 2,
        background: "linear-gradient(180deg,#a2a8b4 0%,#737985 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2),0 1.5px 2px rgba(0,0,0,0.4)",
    }} />
);

/* ─── Dot speaker grill ─── */
const SpeakerGrill = () => (
    <div className="flex flex-col gap-[2.5px]">
        {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="flex gap-[2.5px]">
                {Array.from({ length: 8 }).map((_, c) => (
                    <div key={c} className="w-[2px] h-[2px] rounded-full" style={{ background: "rgba(0,0,0,0.3)" }} />
                ))}
            </div>
        ))}
    </div>
);

/* ─────────────────────────────────────────────
   MacBook component
   lidRotation  : MotionValue (degrees, negative = open backwards)
   screenOpacity: MotionValue 0→1
   bodyOpacity  : MotionValue 1→0
───────────────────────────────────────────── */
const MacBook = ({ lidRotation, screenOpacity, bodyOpacity }) => {
    const BEZEL = 12; // px

    return (
        <motion.div
            style={{ opacity: bodyOpacity }}
            className="flex flex-col items-center"
            style2={undefined} // keep clear
        >
            {/* ══ LID ══ */}
            {/* perspective lives on the *parent* of the rotated element */}
            <div style={{ perspective: "1600px", perspectiveOrigin: "50% 100%", width: "min(76vw,840px)" }}>
                <motion.div
                    style={{ rotateX: lidRotation, transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
                >
                    {/* aluminium outer shell */}
                    <div style={{
                        width: "min(76vw,840px)",
                        height: "calc(min(76vw,840px) * 0.625)",
                        borderRadius: "14px 14px 0 0",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(158deg,#d5d9e1 0%,#b4bac6 20%,#9ca4b2 45%,#878f9d 68%,#707780 88%,#626870 100%)",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.13),inset 0 2px 5px rgba(255,255,255,0.22),0 -8px 40px rgba(0,0,0,0.38)",
                    }}>
                        {/* brushed-metal grain */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            opacity: 0.055,
                            backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.9) 0px,rgba(255,255,255,0.9) 1px,transparent 1px,transparent 3px)",
                        }} />

                        {/* top-edge highlight */}
                        <div className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.42)" }} />

                        {/* Apple logo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.16 }}>
                            <svg width="38" height="47" viewBox="0 0 814 1000" fill="white">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.9-57.3-163.1-126.5C92.6 750.7 10 557.6 10 482.5c0-232.4 152.4-355.5 302.3-355.5 79.1 0 144.8 52.5 194 52.5 46.9 0 120.4-57.1 206.3-57.1 32.4 0 117.1 2.6 177.9 83.3zm-98-220.6c-30.4 35.8-82.4 63.3-134.4 63.3-4.5 0-9.1-.4-13.6-1.3-2.4-69.5 24.2-141.4 66.8-186.5 35.6-38.4 99.1-66.5 152.7-68.1.1 3.1.1 6.2.1 9.2 0 67.3-29.1 135.2-71.6 183.4z" />
                            </svg>
                        </div>

                        {/* ── Screen bezel ── */}
                        <div style={{
                            position: "absolute",
                            inset: `${BEZEL}px ${BEZEL}px 0 ${BEZEL}px`,
                            background: "#090909",
                            borderRadius: "7px 7px 0 0",
                            overflow: "hidden",
                            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                        }}>
                            {/* webcam */}
                            <div className="absolute top-[9px] left-1/2 -translate-x-1/2">
                                <div className="w-[6px] h-[6px] rounded-full" style={{
                                    background: "radial-gradient(circle at 35% 35%,#3a3a3a,#111)",
                                    boxShadow: "0 0 0 1px #222",
                                }} />
                            </div>

                            {/* Active display (below top bezel) */}
                            <div style={{ position: "absolute", inset: "22px 0 0 0", background: "#050505", overflow: "hidden" }}>

                                {/* Screen OFF */}
                                <motion.div style={{ opacity: useTransform(screenOpacity, [0, 0.4], [1, 0]) }}
                                    className="absolute inset-0 bg-[#060608]" />

                                {/* Screen ON */}
                                <motion.div style={{ opacity: screenOpacity }} className="absolute inset-0 flex flex-col">
                                    {/* wallpaper */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#081525] via-[#0c1c3e] to-[#020712]" />

                                    {/* scanline boot sweep — one-shot via CSS animation */}
                                    <motion.div
                                        className="absolute inset-x-0 h-20 pointer-events-none"
                                        initial={{ top: "-25%" }}
                                        animate={{ top: "130%" }}
                                        transition={{ duration: 0.7, ease: "linear", delay: 0.15 }}
                                        style={{ background: "linear-gradient(to bottom,transparent,rgba(147,197,253,0.1),transparent)" }}
                                    />

                                    {/* macOS menu bar */}
                                    <div className="relative z-10 h-[22px] flex-shrink-0 flex items-center px-3 gap-3 border-b border-white/5" style={{ background: "rgba(0,0,0,0.38)" }}>
                                        <svg className="w-3 h-3 text-white/70" viewBox="0 0 814 1000" fill="currentColor">
                                            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.9-57.3-163.1-126.5C92.6 750.7 10 557.6 10 482.5c0-232.4 152.4-355.5 302.3-355.5 79.1 0 144.8 52.5 194 52.5 46.9 0 120.4-57.1 206.3-57.1 32.4 0 117.1 2.6 177.9 83.3zm-98-220.6c-30.4 35.8-82.4 63.3-134.4 63.3-4.5 0-9.1-.4-13.6-1.3-2.4-69.5 24.2-141.4 66.8-186.5 35.6-38.4 99.1-66.5 152.7-68.1.1 3.1.1 6.2.1 9.2 0 67.3-29.1 135.2-71.6 183.4z" />
                                        </svg>
                                        {["Finder", "File", "Edit", "View", "Go"].map(m => (
                                            <span key={m} className="text-white/60 font-medium" style={{ fontSize: 7 }}>{m}</span>
                                        ))}
                                        <div className="ml-auto text-white/40" style={{ fontSize: 6.5 }}>9:41 AM</div>
                                    </div>

                                    {/* Desktop: "Who We Are" mini preview */}
                                    <div className="flex-1 flex items-center justify-center px-4 py-3 relative z-10">
                                        <div className="text-center text-white">
                                            <div className="inline-block px-3 py-[3px] rounded-full border border-white/15 mb-2"
                                                style={{ fontSize: 7, background: "rgba(255,255,255,0.06)", letterSpacing: "0.1em", color: "rgba(147,197,253,0.9)", textTransform: "uppercase" }}>
                                                Who We Are
                                            </div>
                                            <div className="font-bold leading-tight mb-2" style={{ fontSize: 12 }}>
                                                Engineering the future<br />of your digital business.
                                            </div>
                                            <div className="text-white/55 leading-relaxed" style={{ fontSize: 7 }}>
                                                Deep engineering expertise · Strategic design<br />
                                                Products that scale for ambitious companies.
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* screen glare */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: "linear-gradient(135deg,rgba(255,255,255,0.055) 0%,transparent 45%,rgba(255,255,255,0.018) 100%)",
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* hinge chamfer */}
                    <div style={{
                        height: 7,
                        background: "linear-gradient(to bottom,#58606e,#3a404a)",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.65)",
                    }} />
                </motion.div>
            </div>

            {/* ══ BASE ══ */}
            <div style={{
                width: "min(76vw,840px)",
                height: "calc(min(76vw,840px) * 0.12)",
                borderRadius: "0 0 18px 18px",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(180deg,#bbc2ce 0%,#9fa7b4 42%,#8d95a2 80%,#7c838f 100%)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.58),0 6px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.22)",
            }}>
                {/* keyboard */}
                <div style={{ position: "absolute", top: 10, left: "8%", right: "8%" }}>
                    {KEY_ROWS.map((row, ri) => (
                        <div key={ri} className="flex mb-[3.5px]">
                            {row.map((flex, ki) => <Key key={ki} flex={flex} />)}
                        </div>
                    ))}
                    {/* spacebar */}
                    <div className="flex justify-center mt-[3.5px]">
                        <div style={{
                            width: "44%", height: 5,
                            background: "linear-gradient(180deg,#a2a8b4 0%,#737985 100%)",
                            borderRadius: 2,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2),0 1.5px 2px rgba(0,0,0,0.4)",
                        }} />
                    </div>
                </div>

                {/* trackpad */}
                <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2" style={{
                    width: "22%", height: "28%",
                    background: "linear-gradient(140deg,#aeb6c4 0%,#8c939f 50%,#9aa2af 100%)",
                    borderRadius: 5,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28),inset 0 0 0 1px rgba(0,0,0,0.12),0 1px 4px rgba(0,0,0,0.22)",
                }} />

                {/* speaker grills */}
                <div className="absolute left-[4%] top-1/2 -translate-y-1/2"><SpeakerGrill /></div>
                <div className="absolute right-[4%] top-1/2 -translate-y-1/2"><SpeakerGrill /></div>
            </div>

            {/* desk shadow */}
            <div style={{
                width: "75%", height: 14, marginTop: 4,
                background: "radial-gradient(ellipse,rgba(0,0,0,0.48) 0%,transparent 72%)",
                filter: "blur(8px)",
            }} />
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   3D Tilt Stats Card (right column of Who We Are)
───────────────────────────────────────────── */
const statsData = [
    { value: "100+", label: "Projects Delivered", icon: "🚀", color: "#3b82f6" },
    { value: "98%", label: "Client Satisfaction", icon: "⭐", color: "#f97316" },
    { value: "3+", label: "Years Experience", icon: "📅", color: "#8b5cf6" },
    { value: "24/7", label: "Expert Support", icon: "💬", color: "#10b981" },
];

const TiltStatsCard = () => {
    const { ref, rotateX, rotateY, glareX, glareY, onMouseMove, onMouseLeave } =
        useCardTilt({ maxTilt: 8 });

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;

    return (
        <div className="hidden lg:flex items-center justify-center perspective-1200">
            <motion.div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full rounded-3xl overflow-hidden bg-gradient-to-br from-navy-950 to-[#0d1f42] p-10 shadow-2xl border border-white/5 relative will-change-transform"
                data-cursor="pointer"
            >
                {/* Glare */}
                <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                    style={{ background: glareBackground }}
                />
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-3xl pointer-events-none" />

                <div className="grid grid-cols-2 gap-8 relative z-10">
                    {statsData.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                className="text-3xl mb-2"
                            >
                                {s.icon}
                            </motion.div>
                            <div className="text-3xl font-extrabold font-heading mb-1" style={{ color: s.color }}>
                                {s.value}
                            </div>
                            <div className="text-sm text-white/50 font-medium">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
const About = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /* ── Smooth laptop animation steps (no spring jitter/wobble) ── */
    /* ── LID OPENS: 0 → 0.18 ── */
    const lidRotation = useTransform(scrollYProgress, [0, 0.18], [-89, -12]);

    /* ── SCREEN POWERS ON: 0.12 → 0.22 ── */
    const screenOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0, 1]);

    /* ── ZOOM INTO SCREEN: 0.20 → 0.32 ── */
    const zoomScale = useTransform(scrollYProgress, [0.20, 0.32], [1, 9]);

    /* ── LAPTOP BODY FADES: 0.24 → 0.32 ── */
    const bodyOpacity = useTransform(scrollYProgress, [0.24, 0.32], [1, 0]);

    /* ── WHITE FLASH: 0.28 → 0.34 ── */
    const whiteFlash = useTransform(scrollYProgress, [0.28, 0.34], [0, 1]);

    /* ── CONTENT FADES IN AT 0.32 AND REMAINS 100% SOLID & STATIC TILL 1.0 ── */
    const contentOpacity = useTransform(scrollYProgress, [0.32, 0.36], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.32, 0.36], [20, 0]);

    /* ── Studio spotlight opacity ── */
    const studioOpacity = useTransform(scrollYProgress, [0, 0.10], [0.5, 1]);

    /* ── Scroll hint fades immediately ── */
    const hintOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

    return (
        /* 340vh container — user scrolls through this while viewport is pinned */
        <div ref={containerRef} id="about-section" style={{ height: "340vh" }} className="relative">

            {/* STICKY PANEL (pinned to viewport) */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}>

                {/* studio light from top */}
                <motion.div style={{ opacity: studioOpacity }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[65%]" style={{
                        background: "radial-gradient(ellipse 52% 52% at 50% 0%,rgba(16,185,129,0.12) 0%,transparent 100%)",
                    }} />
                </motion.div>

                {/* screen ambient glow on floor */}
                <motion.div style={{ opacity: screenOpacity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[28%] pointer-events-none"
                >
                    <div className="w-full h-full" style={{
                        background: "radial-gradient(ellipse,rgba(37,99,235,0.09) 0%,transparent 72%)",
                    }} />
                </motion.div>

                {/* ── MacBook + zoom wrapper ── */}
                <motion.div
                    style={{ scale: zoomScale, transformOrigin: "50% 37%" }}
                    className="absolute flex items-end justify-center w-full"
                >
                    <MacBook
                        lidRotation={lidRotation}
                        screenOpacity={screenOpacity}
                        bodyOpacity={bodyOpacity}
                    />
                </motion.div>

                {/* ── White flash bridge ── */}
                <motion.div
                    style={{ opacity: whiteFlash }}
                    className="absolute inset-0 bg-navy-950/80 z-10 pointer-events-none"
                />

                {/* ── "Who We Are" full section ── */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex items-center justify-center"
                >
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-16" style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textRendering: "optimizeLegibility" }}>
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                            {/* Left text */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-6 shadow-sm"
                                >
                                    <span className="text-xs font-bold text-sky-700 tracking-wide uppercase">Who We Are</span>
                                </motion.div>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading leading-[1.2] tracking-tight">
                                    Engineering the<br />
                                    future of your{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                                        digital business.
                                    </span>
                                </h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.55, duration: 0.6 }}
                                    className="mt-6 text-lg text-slate-600 leading-relaxed"
                                >
                                    At What&apos;s Next Infotech, we combine deep engineering expertise with strategic design to build digital products that scale. We partner with ambitious companies to solve complex technical challenges.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.65, duration: 0.6 }}
                                    className="mt-4 text-lg text-slate-600 leading-relaxed"
                                >
                                    Our cross-functional teams bring together the best of web development, mobile architecture, and digital marketing to ensure your product not only works perfectly, but reaches the right audience.
                                </motion.p>
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {features.map((f, fi) => (
                                        <motion.div
                                            key={f}
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.7 + fi * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 size={20} className="text-sky-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-[15px] font-semibold text-slate-800 leading-snug">{f}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <Link to="/about">
                                    <motion.button
                                        data-cursor="pointer"
                                        whileHover={{ x: 4 }}
                                        className="mt-10 inline-flex items-center gap-2 text-sky-700 font-bold hover:text-sky-800 transition-colors"
                                    >
                                        Learn more about our company <ArrowRight size={18} />
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Right stats card — 3D tilt glassmorphism */}
                            <TiltStatsCard />
                        </div>
                    </div>
                </motion.div>

                {/* ── Scroll hint ── */}
                <motion.div
                    style={{ opacity: hintOpacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
                >
                    <span className="text-gray-400 tracking-[0.2em] uppercase font-medium" style={{ fontSize: 10 }}>
                        Scroll to open
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-10 rounded-full"
                        style={{ background: "linear-gradient(to bottom,#9ca3af,transparent)" }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default About;
