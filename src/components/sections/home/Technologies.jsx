import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CharReveal from "../../ui/CharReveal";

/* ── Technology data with SVG inline icons ── */
const TECHS = [
    // Row 1
    {
        name: "React",
        color: "#61DAFB",
        bg: "rgba(97,218,251,0.1)",
        border: "rgba(97,218,251,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
            </svg>
        ),
    },
    {
        name: "Node.js",
        color: "#68A063",
        bg: "rgba(104,160,99,0.1)",
        border: "rgba(104,160,99,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#68A063" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 2v20M2 7l10 5M22 7l-10 5" stroke="#68A063" strokeWidth="1.2" opacity="0.5" />
            </svg>
        ),
    },
    {
        name: "TypeScript",
        color: "#3178C6",
        bg: "rgba(49,120,198,0.1)",
        border: "rgba(49,120,198,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <rect width="24" height="24" rx="4" fill="#3178C6" opacity="0.9" />
                <text x="4" y="17" fontSize="10" fontWeight="900" fill="white" fontFamily="monospace">TS</text>
            </svg>
        ),
    },
    {
        name: "Next.js",
        color: "#0F172A",
        bg: "rgba(15,23,42,0.06)",
        border: "rgba(15,23,42,0.18)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <circle cx="12" cy="12" r="10" stroke="#0F172A" strokeWidth="1.5" />
                <path d="M9 8l7 8M16 8v8" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "Python",
        color: "#FFD43B",
        bg: "rgba(255,212,59,0.1)",
        border: "rgba(255,212,59,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M12 2C8 2 6 4 6 7v2h6v1H5C3 10 2 11 2 14s1 5 3 5h2v-2.5C7 14 9 13 12 13s5 1 5 3.5V19h2c2 0 3-2 3-5s-1-4-3-4h-7V8h6V7c0-3-2-5-6-5z" stroke="#FFD43B" strokeWidth="1.5" fill="none" />
                <circle cx="9" cy="6" r="1" fill="#FFD43B" />
                <circle cx="15" cy="18" r="1" fill="#4B8BBE" />
            </svg>
        ),
    },
    {
        name: "React Native",
        color: "#61DAFB",
        bg: "rgba(97,218,251,0.1)",
        border: "rgba(97,218,251,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
            </svg>
        ),
    },
    // Row 2
    {
        name: "AWS",
        color: "#FF9900",
        bg: "rgba(255,153,0,0.1)",
        border: "rgba(255,153,0,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M6 15s-3-1-3-4 3-4 3-4" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 15s3-1 3-4-3-4-3-4" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="6" y="7" width="12" height="10" rx="3" stroke="#FF9900" strokeWidth="1.5" />
                <path d="M4 19c3-2 13-2 16 0" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "Docker",
        color: "#2496ED",
        bg: "rgba(36,150,237,0.1)",
        border: "rgba(36,150,237,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <rect x="2" y="10" width="14" height="8" rx="2" stroke="#2496ED" strokeWidth="1.5" />
                <rect x="5" y="6" width="3" height="4" stroke="#2496ED" strokeWidth="1.2" />
                <rect x="9" y="6" width="3" height="4" stroke="#2496ED" strokeWidth="1.2" />
                <rect x="9" y="2" width="3" height="4" stroke="#2496ED" strokeWidth="1.2" />
                <rect x="13" y="6" width="3" height="4" stroke="#2496ED" strokeWidth="1.2" />
                <path d="M16 14c2-1 4-0.5 5 2-1 0-4 1-6 0" stroke="#2496ED" strokeWidth="1.2" fill="none" />
            </svg>
        ),
    },
    {
        name: "MongoDB",
        color: "#47A248",
        bg: "rgba(71,162,72,0.1)",
        border: "rgba(71,162,72,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M12 2C9 6 7 10 7 13c0 2.8 2.2 5 5 5s5-2.2 5-5c0-3-2-7-5-11z" stroke="#47A248" strokeWidth="1.5" fill="none" />
                <path d="M12 18v4" stroke="#47A248" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "PostgreSQL",
        color: "#336791",
        bg: "rgba(51,103,145,0.1)",
        border: "rgba(51,103,145,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <ellipse cx="12" cy="6" rx="7" ry="3" stroke="#336791" strokeWidth="1.5" />
                <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#336791" strokeWidth="1.5" />
                <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#336791" strokeWidth="1.2" strokeDasharray="2 2" />
            </svg>
        ),
    },
    {
        name: "Figma",
        color: "#F24E1E",
        bg: "rgba(242,78,30,0.1)",
        border: "rgba(242,78,30,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <rect x="7" y="2" width="5" height="5" rx="2.5" fill="#F24E1E" />
                <rect x="12" y="2" width="5" height="5" rx="2.5" fill="#FF7262" />
                <rect x="7" y="7" width="5" height="5" fill="#A259FF" />
                <rect x="7" y="12" width="5" height="5" rx="2.5" fill="#1ABCFE" />
                <circle cx="14.5" cy="14.5" r="2.5" fill="#0ACF83" />
            </svg>
        ),
    },
    {
        name: "Kubernetes",
        color: "#326CE5",
        bg: "rgba(50,108,229,0.1)",
        border: "rgba(50,108,229,0.25)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="#326CE5" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2" fill="#326CE5" />
                <path d="M12 4v3M12 17v3M4 8l2.6 1.5M17.4 14.5L20 16M4 16l2.6-1.5M17.4 9.5L20 8" stroke="#326CE5" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
        ),
    },
];

const TechCard = ({ tech, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1, y: -6 }}
        className="group flex flex-col items-center gap-3 cursor-default"
        data-cursor="pointer"
    >
        <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
            style={{
                background: tech.bg,
                border: `1.5px solid ${tech.border}`,
            }}
        >
            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    boxShadow: `0 0 24px ${tech.color}40, 0 0 45px ${tech.color}20`,
                }}
            />
            {/* Animated border on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: `1.5px solid ${tech.color}60` }}
            />
            <div className="relative z-10 scale-110">
                {tech.icon}
            </div>
        </div>
        <span
            className="text-sm font-extrabold transition-colors duration-300 group-hover:text-slate-900 text-slate-700"
        >
            {tech.name}
        </span>
    </motion.div>
);

const Technologies = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const row1 = TECHS.slice(0, 6);
    const row2 = TECHS.slice(6, 12);

    return (
        <section
            id="technologies-section"
            ref={ref}
            className="relative min-h-screen flex flex-col justify-center items-center py-20 lg:py-28 overflow-hidden bg-white border-b border-slate-200/80"
        >
            {/* Animated background */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
                <div style={{
                    position: "absolute", top: "20%", right: "10%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(circle, rgba(0,168,255,0.06) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }} />
                <div style={{
                    position: "absolute", bottom: "10%", left: "10%",
                    width: "350px", height: "350px",
                    background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }} />
            </motion.div>

            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col justify-center items-center">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-sky-50 border border-sky-200 shadow-sm"
                    >
                        <span className="text-sky-600 text-xs">◈</span>
                        <span className="text-xs font-bold tracking-widest uppercase text-sky-700">
                            Technology Stack
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.2] mb-4">
                        <CharReveal text="We Work With" delay={0.05} stagger={0.022} className="block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                            <CharReveal text="Best-in-Class Tech" delay={0.3} stagger={0.025} />
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
                    >
                        Our engineers are certified experts in the technologies that power modern digital enterprises.
                    </motion.p>
                </div>

                {/* 6-Column Grid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl justify-items-center">
                    {TECHS.map((tech, i) => (
                        <TechCard key={tech.name} tech={tech} index={i} />
                    ))}
                </div>

                {/* More tech label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <span className="text-gray-600 text-sm">+ many more</span>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent)" }} />
        </section>
    );
};

export default Technologies;
