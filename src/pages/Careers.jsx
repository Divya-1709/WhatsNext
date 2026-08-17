import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import {
    Globe2, Laptop, GraduationCap, HeartPulse, Clock, TrendingUp,
    ArrowRight, MapPin, Briefcase, ChevronRight, Sparkles, Users, Zap,
    CheckCircle2, MessageSquare, Code2, Gift, FileText, ArrowUpRight, Cloud, ShieldCheck, Database, BarChart3, Smartphone, Cpu, ChevronDown, Plus, Minus, Bookmark, Rocket, Star, Target
} from "lucide-react";
import Layout from "../components/layout/Layout";
import CTA from "../components/sections/home/CTA";
import { Link } from "react-router-dom";
import MagneticButton from "../components/ui/MagneticButton";
import ReactCountUp from "react-countup";
import parallaxOffice from "../assets/images/parallax-office.png";

const CountUp = ReactCountUp.default || ReactCountUp;

/* ─── DATA ──────────────────────────────────────────────────────────────── */
/* ─── PERKS DATA ORGANIZED INTO ACCORDION ROWS (Matching Home Services) ─── */
const perkRows = [
    // Row 1
    [
        {
            id: "remote",
            title: "REMOTE-FIRST CULTURE",
            category: "CULTURE",
            count: "GLOBAL WORK",
            variant: "azure",
            icon: Globe2,
            description: "Work from anywhere in the world. We care about your output and impact, not your geographical location or office hours. Our async-first culture means you design your ideal workday.",
            subServices: ["Async-First", "Flexible Hours", "Global Team", "Home Office"],
            features: ["100% Remote Flexibility", "Async Workflow"],
        },
        {
            id: "learning",
            title: "CONTINUOUS LEARNING",
            category: "GROWTH",
            count: "ANNUAL BUDGET",
            variant: "dark",
            icon: GraduationCap,
            description: "Generous annual budget for courses, conferences, and books. We invest heavily in your professional and personal growth journey.",
            subServices: ["$2,500/yr Budget", "Conferences", "Mentorship", "Certifications"],
            features: ["Paid Conference Tickets", "1-on-1 Career Coaching"],
        },
        {
            id: "techstack",
            title: "MODERN TECH STACK",
            category: "ENGINEERING",
            count: "SHARP TOOLS",
            variant: "azure",
            icon: Laptop,
            description: "Build with React 19, TypeScript, Next.js, Node.js, and modern cloud architectures. We keep our tools sharp and free from legacy drag.",
            subServices: ["React & TypeScript", "Next.js & Node", "AWS & Docker", "CI/CD Pipelines"],
            features: ["Modern Developer Hardware", "Automated CI/CD"],
        },
    ],
    // Row 2
    [
        {
            id: "wellness",
            title: "HEALTH & WELLNESS",
            category: "WELLNESS",
            count: "FULL COVERAGE",
            variant: "dark",
            icon: HeartPulse,
            description: "Comprehensive health insurance, mental health support days, gym/fitness stipends, and wellness allowance to keep you feeling your absolute best.",
            subServices: ["Full Healthcare", "Mental Health Days", "Gym Stipend", "Wellness Perks"],
            features: ["Top-Tier Medical", "Monthly Fitness Allowance"],
        },
        {
            id: "schedule",
            title: "FLEXIBLE SCHEDULE",
            category: "LIFESTYLE",
            count: "OWN YOUR TIME",
            variant: "dark",
            icon: Clock,
            description: "Design your own workday around your life, family, and peak productivity hours without micromanagement or artificial face-time metrics.",
            subServices: ["No Micromanagement", "Outcome Focused", "Family Friendly", "Timezone Sync"],
            features: ["Self-Designed Work Hours", "No Mandatory Face-Time"],
        },
        {
            id: "equity",
            title: "EQUITY & OWNERSHIP",
            category: "OWNERSHIP",
            count: "SHARED UPSIDE",
            variant: "azure",
            icon: TrendingUp,
            description: "Competitive equity packages and profit sharing for all full-time team members. We want everyone to act, build, and share in the financial upside like a true owner.",
            subServices: ["Stock Options", "Profit Sharing", "Performance Bonus", "Transparent Growth"],
            features: ["Generous Stock Options", "Shared Company Upside"],
        },
    ],
];

/* ─── Accordion Bento Perk Card Component (Identical to Home Page Services) ─── */
const AccordionBentoPerkCard = ({ perk, isExpanded, isShrunk, onSelect, onHover, onLeave }) => {
    const themeStyles = {
        azure: {
            bg: "bg-gradient-to-br from-[#0284C7] via-[#2563EB] to-[#1D4ED8]",
            text: "text-white",
            subText: "text-cyan-100",
            pillBg: "bg-white/20 text-white border-white/30",
            iconBg: "bg-white text-[#0284C7]",
            arrowBg: "bg-white text-[#0284C7]",
            badgeBorder: "border-white/30",
            hoverGlow: "shadow-[0_14px_36px_-8px_rgba(2,132,199,0.55)]",
            featureCheck: "text-cyan-300",
        },
        dark: {
            bg: "bg-[#0D1527]",
            text: "text-white",
            subText: "text-slate-400",
            pillBg: "bg-white/10 text-white border-white/15",
            iconBg: "bg-white/10 text-white border border-white/20",
            arrowBg: "bg-sky-500 text-white",
            badgeBorder: "border-white/15",
            hoverGlow: "shadow-[0_14px_36px_-8px_rgba(2,132,199,0.25)]",
            featureCheck: "text-sky-400",
        },
    };

    const currentTheme = themeStyles[perk.variant] || themeStyles.dark;
    const flexGrowVal = isExpanded ? 2.4 : isShrunk ? 0.75 : 1;

    return (
        <div
            onClick={onSelect}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                flex: flexGrowVal,
                transition: "flex 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s ease, box-shadow 0.3s ease",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
            }}
            className={`relative rounded-2xl p-5 sm:p-6 ${currentTheme.bg} ${currentTheme.hoverGlow} flex flex-col justify-between overflow-hidden cursor-pointer min-h-[160px] select-none border border-white/10`}
        >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 mb-3">
                <div className="relative">
                    <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform duration-300 ${
                            isExpanded ? "rotate-45" : ""
                        } ${currentTheme.iconBg}`}
                    >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                    </div>
                </div>

                {!isShrunk && (
                    <span
                        className={`text-[9px] font-black tracking-[0.2em] uppercase font-mono px-2.5 py-1 rounded-full border ${currentTheme.badgeBorder} ${currentTheme.subText} truncate max-w-[120px]`}
                    >
                        {perk.category}
                    </span>
                )}
            </div>

            {/* Title + Count */}
            <div className="z-10 my-auto">
                <h3
                    className={`font-black font-heading tracking-tight leading-tight uppercase transition-all duration-300 ${currentTheme.text} ${
                        isExpanded ? "text-xl sm:text-2xl" : isShrunk ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                    }`}
                >
                    {perk.title}
                </h3>

                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 font-mono ${currentTheme.subText}`}>
                    {perk.count}
                </p>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden z-10 pt-3 border-t border-white/10"
                    >
                        <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-3.5 ${currentTheme.text}`}>
                            {perk.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 mb-3.5">
                            {perk.subServices.map((sub) => (
                                <div
                                    key={sub}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${currentTheme.pillBg}`}
                                >
                                    <div className="w-1 h-2.5 rounded-full bg-current opacity-60" />
                                    <span className="truncate">{sub}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {perk.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-1.5 text-xs font-semibold">
                                    <CheckCircle2 size={13} className={currentTheme.featureCheck} />
                                    <span className={currentTheme.text}>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <a
                                href="#open-positions"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md transition-transform hover:scale-105 ${currentTheme.arrowBg}`}
                            >
                                <span>Explore Open Roles</span>
                                <ArrowUpRight size={13} />
                            </a>

                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${currentTheme.subText}`}>
                                Culture Perk
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const departments = ["All Roles", "Engineering", "Design", "Marketing", "Product", "Data"];

const jobs = [
    {
        id: 1,
        featured: true,
        title: "Senior React Developer",
        department: "Engineering",
        location: "Remote Worldwide",
        type: "Full-Time",
        description: "Lead the frontend architecture for our enterprise SaaS clients using React, TypeScript, and modern state management.",
        color: "#2563eb",
    },
    {
        id: 2,
        title: "Cloud Infrastructure Engineer",
        department: "Engineering",
        location: "Remote (US/EU)",
        type: "Full-Time",
        description: "Design and maintain highly available AWS and GCP environments using Terraform and Kubernetes.",
        color: "#8b5cf6",
    },
    {
        id: 3,
        title: "Senior Product Designer",
        department: "Design",
        location: "Remote Worldwide",
        type: "Full-Time",
        description: "Own the end-to-end product design process and create intuitive, user-centered experiences.",
        color: "#f97316",
    },
    {
        id: 4,
        title: "Backend Developer",
        department: "Engineering",
        location: "Remote Worldwide",
        type: "Full-Time",
        description: "Build scalable APIs and microservices using Node.js, TypeScript, and modern frameworks.",
        color: "#06b6d4",
    },
    {
        id: 5,
        title: "Performance Marketing Manager",
        department: "Marketing",
        location: "Remote Worldwide",
        type: "Full-Time",
        description: "Drive user acquisition strategies and manage performance marketing campaigns at scale.",
        color: "#10b981",
    },
];

const stats = [
    { value: 100, suffix: "+", label: "Projects Delivered", icon: Briefcase },
    { value: 15, suffix: "+", label: "Technologies", icon: Code2 },
    { value: 4, suffix: "", label: "Global Hubs", icon: Globe2 },
    { value: 1, prefix: "Top ", suffix: "%", label: "Velocity Culture", icon: Zap },
    { value: 99.9, suffix: "%", label: "Uptime Mindset", icon: ShieldCheck },
];

const hiringSteps = [
    { step: "01", title: "Apply Online",     desc: "Submit your application, portfolio, and a brief note about why Whatsnext excites you.",                     icon: FileText,      color: "#2563eb" },
    { step: "02", title: "Intro Call",        desc: "A relaxed 30-minute conversation with our People team to understand your goals and experience.",            icon: MessageSquare, color: "#8b5cf6" },
    { step: "03", title: "Skills Assessment", desc: "A practical take-home challenge relevant to your role. No trick questions — just real work.",               icon: Code2,         color: "#f97316" },
    { step: "04", title: "Offer & Welcome",   desc: "We move fast. Expect a decision within 5 business days, followed by a warm, thorough onboarding.",         icon: Gift,          color: "#10b981" },
];

/* ══════════════════════════════════════════════════════════════
   SMOOTH SPRING-ANIMATED NUMBER COUNTER (0 -> TARGET VALUE)
══════════════════════════════════════════════════════════════ */
const AnimatedNumber = ({ value, decimals = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const spring = useSpring(0, { stiffness: 35, damping: 18, restDelta: 0.01 });
    const [displayVal, setDisplayVal] = useState(0);

    useEffect(() => {
        if (isInView) {
            spring.jump(0);
            const timer = setTimeout(() => {
                spring.set(value);
            }, 80);
            return () => clearTimeout(timer);
        } else {
            spring.jump(0);
            setDisplayVal(0);
        }
    }, [isInView, spring, value]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            setDisplayVal(decimals > 0 ? latest.toFixed(decimals) : Math.round(latest));
        });
        return () => unsubscribe();
    }, [spring, decimals]);

    return <span ref={ref}>{displayVal}</span>;
};

/* ══════════════════════════════════════════════════════════════
   MOUSE PARALLAX HOOK
══════════════════════════════════════════════════════════════ */
const useMouseParallax = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

    const handleMouseMove = useCallback((e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mouseX.set((e.clientX - cx) / cx);
        mouseY.set((e.clientY - cy) / cy);
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    return { springX, springY };
};

/* ─── Image Parallax Container ─────────────────────────────────────────── */
const ImageParallax = ({ src, speed = 0.5, className = "", children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`]);
    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.img
                style={{ y, scale: 1.25 }}
                src={src}
                className="absolute inset-0 w-full h-full object-cover origin-center"
                alt=""
            />
            {children}
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   ISOMETRIC 3D TECH & BRAND ILLUSTRATION (Matching Reference Image)
══════════════════════════════════════════════════════════════ */
const IsometricTechIllustration = ({ springX, springY }) => {
    // Parallax layers for 3D depth
    const move1X = useTransform(springX, [-1, 1], [-18, 18]);
    const move1Y = useTransform(springY, [-1, 1], [-12, 12]);
    const move2X = useTransform(springX, [-1, 1], [15, -15]);
    const move2Y = useTransform(springY, [-1, 1], [10, -10]);
    const move3X = useTransform(springX, [-1, 1], [-10, 10]);
    const move3Y = useTransform(springY, [-1, 1], [14, -14]);

    return (
        <div className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center select-none">
            {/* Ambient Lighting Orbs */}
            <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-[90px] pointer-events-none -top-10 right-10" />
            <div className="absolute w-60 h-60 rounded-full bg-orange-500/15 blur-[80px] pointer-events-none bottom-0 left-10" />

            {/* Isometric Circuit Grid Floor */}
            <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 600 500" fill="none">
                {/* Circuit Grid Lines */}
                <path d="M50 250 L300 120 L550 250 L300 380 Z" stroke="rgba(37, 99, 235, 0.25)" strokeWidth="1.5" fill="none" />
                <path d="M100 250 L300 150 L500 250 L300 350 Z" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1" fill="none" />
                <path d="M150 250 L300 180 L450 250 L300 320 Z" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" fill="none" />
                
                {/* Circuit Traces */}
                <path d="M300 120 L300 50" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M550 250 L600 250" stroke="rgba(37, 99, 235, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M50 250 L0 250" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M300 380 L300 450" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Animated Light Pulses Travelling Along Circuit Lines */}
                <motion.circle
                    r="3"
                    fill="#3b82f6"
                    animate={{ cx: [50, 300, 550], cy: [250, 120, 250] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                    r="3.5"
                    fill="#f97316"
                    animate={{ cx: [550, 300, 50], cy: [250, 380, 250] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
                />
            </svg>

            {/* 3D Isometric Stage Platform */}
            <motion.div 
                style={{ x: move1X, y: move1Y }}
                className="relative w-[480px] h-[380px] flex items-center justify-center"
            >
                {/* CENTRAL WHATSNEXT BRAND PEDESTAL CARD */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-30 w-44 h-44 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a122e] to-slate-950 border-2 border-blue-500/40 p-6 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(2,6,23,0.9),0_0_30px_rgba(37,99,235,0.3)] transform -rotate-12 rotate-x-12 hover:border-orange-500/60 transition-colors duration-500 group"
                >
                    {/* Dual Glow Edges */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-orange-500/20 pointer-events-none opacity-80" />
                    
                    {/* Whatsnext Official Logo Graphic */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <img 
                            src="/logo.png" 
                            alt="Whatsnext Logo" 
                            className="h-12 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.5)] group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 mt-1" />
                    </div>
                </motion.div>

                {/* FLOATING MODULE 1: Cloud Architecture (Top Right) */}
                <motion.div
                    style={{ x: move2X, y: move2Y }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-4 right-8 z-20 w-24 h-24 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-blue-500/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(37,99,235,0.3)] group hover:scale-110 transition-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:text-cyan-300">
                        <Cloud size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 tracking-wider">CLOUD</span>
                </motion.div>

                {/* FLOATING MODULE 2: Code Engine (Top Left) */}
                <motion.div
                    style={{ x: move3X, y: move3Y }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute top-10 left-6 z-20 w-24 h-24 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-orange-500/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(249,115,22,0.3)] group hover:scale-110 transition-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:text-amber-300">
                        <Code2 size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 tracking-wider">&lt;/&gt; CODE</span>
                </motion.div>

                {/* FLOATING MODULE 3: Security & Trust (Middle Right) */}
                <motion.div
                    style={{ x: move1X, y: move3Y }}
                    animate={{ y: [0, -16, 0] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-16 right-2 z-20 w-24 h-24 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-blue-400/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.3)] group hover:scale-110 transition-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:text-white">
                        <ShieldCheck size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 tracking-wider">SECURITY</span>
                </motion.div>

                {/* FLOATING MODULE 4: Enterprise Data (Bottom Left) */}
                <motion.div
                    style={{ x: move3X, y: move1Y }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="absolute bottom-8 left-10 z-20 w-24 h-24 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,214,218,0.25)] group hover:scale-110 transition-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                        <Database size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 tracking-wider">DATA</span>
                </motion.div>

                {/* FLOATING MODULE 5: AI & Mobile Innovation (Bottom Center) */}
                <motion.div
                    style={{ x: move2X, y: move2Y }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 w-24 h-24 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-orange-400/40 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(249,115,22,0.3)] group hover:scale-110 transition-transform"
                >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Cpu size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 mt-2 tracking-wider">AI TECH</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   MAIN CAREERS PAGE
══════════════════════════════════════════════════════════════ */
const Careers = () => {
    const [activeDept, setActiveDept] = useState("All");
    const [activePerkId, setActivePerkId] = useState(null);
    const [hoveredPerkId, setHoveredPerkId] = useState(null);

    const toggleSelectPerk = (id) => {
        setActivePerkId((prev) => (prev === id ? null : id));
    };

    const activePerkServiceId = hoveredPerkId || activePerkId;

    const handleMouseLeavePerksSection = () => {
        setHoveredPerkId(null);
        setActivePerkId(null);
    };
    
    // Parallax logic for Hero
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const { springX, springY } = useMouseParallax();

    const heroY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

    const filteredJobs = jobs.filter(
        (job) => activeDept === "All" || job.department === activeDept
    );

    return (
        <Layout footerBgColor="bg-navy-950">
            <div className="bg-white min-h-screen">
                
                {/* ══════════════════════════════════════════════════
                    §1 — PREMIUM DARK TECHNOLOGY CAREERS HERO (DARK BANNER)
                ══════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#020617] text-white"
                >
                    {/* Subtle Blue/Orange Glow Highlights */}
                    <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute bottom-10 right-10 w-[500px] h-[450px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

                    {/* Minimal Circuit / Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10 my-auto">
                        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                            
                            {/* ── LEFT COLUMN (Headline, Subcopy & Buttons) ── */}
                            <div className="lg:col-span-6 flex flex-col items-start text-left">
                                {/* Small Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-flex items-center gap-2 mb-6"
                                >
                                    <span className="text-xs font-bold font-mono tracking-[0.25em] text-orange-400 uppercase">
                                        CAREERS AT WHATSNEXT —
                                    </span>
                                </motion.div>

                                {/* Large Headline */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-white font-heading leading-[1.04] tracking-tight mb-6"
                                >
                                    Build. Impact. <br />
                                    <span className="text-orange-500 font-serif font-black">
                                        Grow.
                                    </span>
                                </motion.h1>

                                {/* Short Professional Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mb-10 font-medium"
                                >
                                    Work with curious minds, use cutting-edge technologies and build products that power businesses worldwide.
                                </motion.p>

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex flex-wrap items-center gap-4"
                                >
                                    <MagneticButton strength={24}>
                                        <a
                                            href="#open-positions"
                                            className="inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                                        >
                                            Explore Open Roles <ArrowRight size={18} />
                                        </a>
                                    </MagneticButton>

                                    <a
                                        href="#why-us"
                                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-base px-8 py-4 rounded-full transition-all backdrop-blur-md"
                                    >
                                        Life at Whatsnext
                                    </a>
                                </motion.div>
                            </div>

                            {/* ── RIGHT COLUMN (Custom 3D / Isometric Technology Illustration) ── */}
                            <div className="lg:col-span-6 relative">
                                <IsometricTechIllustration springX={springX} springY={springY} />
                            </div>

                        </motion.div>
                    </div>

                    {/* ══════════════════════════════════════════════════
                        BOTTOM INTEGRATED STATISTICS BAR
                    ══════════════════════════════════════════════════ */}
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-20 mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 shadow-2xl"
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                                {stats.map((s, i) => (
                                    <div key={s.label} className={`flex items-center gap-3 ${i !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0">
                                            <s.icon size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                                                {s.prefix || ""}
                                                <AnimatedNumber value={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />
                                                <span className="text-orange-400">{s.suffix}</span>
                                            </div>
                                            <span className="text-[11px] text-slate-400 font-medium leading-tight">{s.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    §2 — ACCORDION BENTO BENEFITS (WHITE SECTION)
                ══════════════════════════════════════════════════ */}
                <section
                    id="why-us"
                    onMouseLeave={handleMouseLeavePerksSection}
                    className="py-20 lg:py-28 relative overflow-hidden bg-white"
                >
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                        {/* Header */}
                        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center gap-2 mb-2"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] font-mono text-sky-700">
                                        BENEFITS & CULTURE
                                    </span>
                                    <div className="w-6 h-0.5 bg-gradient-to-r from-sky-600 to-blue-600" />
                                </motion.div>

                                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading tracking-tight uppercase text-slate-900">
                                    BEYOND THE SALARY.
                                </h2>
                            </div>

                            <p className="text-slate-600 text-xs sm:text-sm max-w-md font-medium">
                                Hover or click any box to expand details. Moving your cursor away restores all cards to their equal original size.
                            </p>
                        </div>

                        {/* Accordion Rows */}
                        <div className="space-y-4">
                            {perkRows.map((row, rowIndex) => {
                                const activeItemInRow = row.find(
                                    (item) => item.id === activePerkServiceId
                                );

                                return (
                                    <div
                                        key={rowIndex}
                                        className="flex flex-col sm:flex-row gap-4 items-stretch w-full"
                                    >
                                        {row.map((perk) => {
                                            const isExpanded = activePerkServiceId === perk.id;
                                            const isShrunk =
                                                Boolean(activeItemInRow) && !isExpanded;

                                            return (
                                                <AccordionBentoPerkCard
                                                    key={perk.id}
                                                    perk={perk}
                                                    isExpanded={isExpanded}
                                                    isShrunk={isShrunk}
                                                    onSelect={() => toggleSelectPerk(perk.id)}
                                                    onHover={() => setHoveredPerkId(perk.id)}
                                                    onLeave={() => setHoveredPerkId(null)}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    §3 — CINEMATIC IMAGE PARALLAX
                ══════════════════════════════════════════════════ */}
                <ImageParallax src={parallaxOffice} speed={0.4} className="h-[400px] lg:h-[500px]">
                    <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white font-heading leading-tight tracking-tight max-w-4xl mx-auto">
                                We don&apos;t just build products —<br className="hidden md:block"/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                                    we build careers.
                                </span>
                            </p>
                            <div className="w-20 h-1 mt-8 mb-4 mx-auto bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                            <span className="text-xs text-sky-200/70 font-bold tracking-[0.2em] uppercase">
                                — WhatsNext Leadership
                            </span>
                        </motion.div>
                    </div>
                </ImageParallax>

                {/* ══════════════════════════════════════════════════
                    §4 — HIRING PROCESS TIMELINE (LIGHT THEME)
                ══════════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 relative overflow-hidden bg-slate-50 border-t border-b border-slate-200">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-16">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
                                <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 font-heading mb-4 tracking-tight">
                                    Our Hiring Process
                                </h2>
                                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                    We respect your time. Our process is transparent, practical, and fast.
                                </p>
                            </motion.div>
                        </div>

                        <div className="relative">
                            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200" />
                            
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
                                {hiringSteps.map((step, i) => (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="flex flex-col items-center text-center relative z-10 group"
                                    >
                                        <div className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-white bg-slate-100 group-hover:scale-110 transition-all duration-300">
                                            <div className="absolute inset-2 rounded-full flex items-center justify-center transition-all duration-300"
                                                 style={{ background: `${step.color}15`, color: step.color }}>
                                                <step.icon size={26} strokeWidth={2} />
                                            </div>
                                            <div className="absolute -top-2 -right-1 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                                                {i + 1}
                                            </div>
                                        </div>

                                        {i !== hiringSteps.length - 1 && (
                                            <div className="lg:hidden w-px h-12 bg-slate-200 absolute top-20 mt-2" />
                                        )}

                                        <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">{step.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed max-w-[260px]">{step.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    §5 — OPEN ROLES (WHITE SECTION WITH CLEAN CARDS)
                ══════════════════════════════════════════════════ */}
                <section id="open-positions" className="py-20 lg:py-28 relative overflow-hidden bg-white">
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                    <span className="text-[11px] font-bold tracking-wider text-orange-700 uppercase">
                                        CAREERS AT WHATSNEXT
                                    </span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
                                    Open Roles
                                </h2>
                                <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                                    Join our mission to build innovative digital products and create real impact worldwide.
                                </p>
                            </div>

                            {/* Mini Stats Widget */}
                            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5 px-7 flex items-center gap-8 shadow-sm overflow-hidden shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-slate-900 font-heading">50+</div>
                                        <div className="text-xs text-slate-500 font-medium">Team Members</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-slate-200" />
                                <div>
                                    <div className="text-xl font-bold text-slate-900 font-heading">100%</div>
                                    <div className="text-xs text-slate-500 font-medium">Remote First</div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Pills Bar */}
                        <div className="flex items-center gap-2.5 mb-10 overflow-x-auto pb-2 no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveDept(dept)}
                                    className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                                        activeDept === dept
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-600"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        {/* Asymmetric Role Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                            {/* TOP LEFT (7 cols): FEATURED ROLE CARD */}
                            {jobs.find(j => j.featured) && (activeDept === "All Roles" || activeDept === "All" || activeDept === "Engineering") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="lg:col-span-7 group relative rounded-3xl border border-slate-200 hover:border-sky-400 bg-white p-8 lg:p-10 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1"
                                    style={{ minHeight: "340px" }}
                                >
                                    <div className="relative z-10 max-w-lg">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                                                <Star size={12} className="fill-blue-600" /> FEATURED ROLE
                                            </span>
                                            <span className="text-xs font-mono font-bold tracking-widest text-sky-700 uppercase">
                                                ENGINEERING
                                            </span>
                                        </div>

                                        <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-heading mb-4 tracking-tight group-hover:text-sky-600 transition-colors">
                                            Senior React Developer
                                        </h3>

                                        <p className="text-slate-600 text-sm lg:text-base leading-relaxed mb-6">
                                            Lead the frontend architecture for our enterprise SaaS clients using React, TypeScript, and modern state management.
                                        </p>

                                        <div className="flex items-center gap-6 text-xs font-semibold text-slate-500 mb-8">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={15} className="text-sky-600" /> Remote Worldwide
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase size={15} className="text-sky-600" /> Full-Time
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <Link to="/contact">
                                            <button className="px-6 py-2.5 rounded-full bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 font-bold text-xs tracking-wide transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm">
                                                <span>Apply Now</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}

                            {/* TOP RIGHT (5 cols): CLOUD INFRASTRUCTURE ENGINEER CARD */}
                            {jobs.find(j => j.id === 2) && (activeDept === "All Roles" || activeDept === "All" || activeDept === "Engineering") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="lg:col-span-5 group relative rounded-3xl border border-slate-200 hover:border-purple-400 bg-white p-8 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1"
                                    style={{ minHeight: "340px" }}
                                >
                                    <div className="relative z-10">
                                        <span className="text-xs font-mono font-bold tracking-widest text-purple-700 uppercase mb-4 block">
                                            ENGINEERING
                                        </span>

                                        <h3 className="text-2xl font-bold text-slate-900 font-heading mb-3 tracking-tight group-hover:text-purple-600 transition-colors">
                                            Cloud Infrastructure Engineer
                                        </h3>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm">
                                            Design and maintain highly available AWS and GCP environments using Terraform and Kubernetes.
                                        </p>

                                        <div className="flex items-center gap-5 text-xs font-semibold text-slate-500 mb-8">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-purple-600" /> Remote (US/EU)
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Briefcase size={14} className="text-purple-600" /> Full-Time
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <Link to="/contact">
                                            <button className="px-6 py-2.5 rounded-full bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 font-bold text-xs tracking-wide transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm">
                                                <span>Apply Now</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* BOTTOM ROW: 3 EQUAL COLUMNS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {/* Card 1: Senior Product Designer */}
                            {(activeDept === "All Roles" || activeDept === "All" || activeDept === "Design") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 }}
                                    className="group relative rounded-3xl border border-slate-200 hover:border-orange-400 bg-white p-7 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1"
                                    style={{ minHeight: "290px" }}
                                >
                                    <div className="relative z-10">
                                        <span className="text-xs font-mono font-bold tracking-widest text-orange-700 uppercase mb-3 block">
                                            DESIGN
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 font-heading mb-3 tracking-tight group-hover:text-orange-600 transition-colors">
                                            Senior Product Designer
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xs">
                                            Own the end-to-end product design process and create intuitive, user-centered experiences.
                                        </p>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-orange-600" /> Remote Worldwide</span>
                                            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-orange-600" /> Full-Time</span>
                                        </div>

                                        <Link to="/contact">
                                            <button className="px-6 py-2.5 rounded-full bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white border border-orange-200 font-bold text-xs tracking-wide transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm">
                                                <span>Apply Now</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}

                            {/* Card 2: Backend Developer */}
                            {(activeDept === "All Roles" || activeDept === "All" || activeDept === "Engineering") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="group relative rounded-3xl border border-slate-200 hover:border-cyan-400 bg-white p-7 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1"
                                    style={{ minHeight: "290px" }}
                                >
                                    <div className="relative z-10">
                                        <span className="text-xs font-mono font-bold tracking-widest text-cyan-700 uppercase mb-3 block">
                                            ENGINEERING
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 font-heading mb-3 tracking-tight group-hover:text-cyan-600 transition-colors">
                                            Backend Developer
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xs">
                                            Build scalable APIs and microservices using Node.js, TypeScript, and modern frameworks.
                                        </p>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-cyan-600" /> Remote Worldwide</span>
                                            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-cyan-600" /> Full-Time</span>
                                        </div>

                                        <Link to="/contact">
                                            <button className="px-6 py-2.5 rounded-full bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white border border-cyan-200 font-bold text-xs tracking-wide transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm">
                                                <span>Apply Now</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}

                            {/* Card 3: Performance Marketing Manager */}
                            {(activeDept === "All Roles" || activeDept === "All" || activeDept === "Marketing") && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.25 }}
                                    className="group relative rounded-3xl border border-slate-200 hover:border-emerald-400 bg-white p-7 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1"
                                    style={{ minHeight: "290px" }}
                                >
                                    <div className="relative z-10">
                                        <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase mb-3 block">
                                            MARKETING
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 font-heading mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">
                                            Performance Marketing Manager
                                        </h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xs">
                                            Drive user acquisition strategies and manage performance marketing campaigns at scale.
                                        </p>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-emerald-600" /> Remote Worldwide</span>
                                            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-emerald-600" /> Full-Time</span>
                                        </div>

                                        <Link to="/contact">
                                            <button className="px-6 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 font-bold text-xs tracking-wide transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm">
                                                <span>Apply Now</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* SPECULATIVE APPLICATION BOTTOM BANNER */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden text-white"
                        >
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-lg">
                                    <Rocket size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-white font-heading mb-1.5">
                                        Don’t see the right role?
                                    </h3>
                                    <p className="text-slate-300 text-sm max-w-xl">
                                        We’re always looking for exceptional talent. Send us your resume and let’s connect.
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 shrink-0">
                                <Link to="/contact">
                                    <button className="px-7 py-3.5 rounded-full border border-blue-400/60 hover:bg-blue-600 text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-300 inline-flex items-center gap-2">
                                        <span>Send a Speculative Application</span>
                                        <ArrowUpRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
                
                <CTA />
            </div>
        </Layout>
    );
};

export default Careers;
