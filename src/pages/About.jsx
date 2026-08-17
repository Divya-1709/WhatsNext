import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import {
    CheckCircle2, Shield, Lightbulb, Users, Code2,
    ArrowRight, Zap, Globe, Star, Target,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import CTA from "../components/sections/home/CTA";
import TeamShowcase from "../components/sections/about/TeamShowcase";
import { Link } from "react-router-dom";
import aboutIsometric from "../assets/images/about_isometric_cube.png";

const YT_VIDEO_ID = "Zu7BZKOQSgk";

/* ── Countable Animated Stat Number (Re-animates every time visited) ── */
const CountableStatNumber = ({ numericValue, suffix, color }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-40px" });
    const spring = useSpring(0, { stiffness: 45, damping: 18 });
    const display = useTransform(spring, (v) => Math.round(v));

    useEffect(() => {
        if (inView) {
            spring.set(numericValue);
        } else {
            spring.set(0);
        }
    }, [inView, spring, numericValue]);

    return (
        <span ref={ref} className="text-5xl lg:text-6xl font-extrabold font-heading mb-2 inline-block" style={{ color }}>
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    );
};

const values = [
    { icon: Code2, title: "Engineering Excellence", description: "Clean, scalable, maintainable code. Technical debt actively managed for long-term stability.", color: "#3b82f6" },
    { icon: Shield, title: "Uncompromising Security", description: "Enterprise-grade security baked into every layer of our development lifecycle.", color: "#8b5cf6" },
    { icon: Lightbulb, title: "Continuous Innovation", description: "Constantly exploring emerging technologies to give clients a competitive edge.", color: "#f97316" },
    { icon: Users, title: "Radical Transparency", description: "Clear communication and full visibility into our engineering processes from day one.", color: "#10b981" },
];

const team = [
    { name: "John Doe", role: "Chief Executive Officer", initials: "JD", color: "from-blue-600 to-indigo-600" },
    { name: "Jane Smith", role: "Chief Technology Officer", initials: "JS", color: "from-cyan-500 to-blue-500" },
    { name: "Michael Chen", role: "Head of Engineering", initials: "MC", color: "from-orange-500 to-red-500" },
    { name: "Sarah Williams", role: "Lead Product Designer", initials: "SW", color: "from-teal-500 to-emerald-500" },
];

const milestones = [
    { year: "2023", label: "Founded", desc: "Started as a 3-person agency with a vision to modernise digital infrastructure." },
    { year: "2024", label: "First 50 Clients", desc: "Rapid growth through referrals; expanded to a full engineering team." },
    { year: "2025", label: "Enterprise Scale", desc: "Delivered cloud-native transformations for Fortune 500 companies." },
    { year: "2026", label: "Global Reach", desc: "Serving clients across 4+ countries with 100+ successful projects." },
];

/* ── Badge ── */
const Badge = ({ children }) => (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-6 w-fit text-[11px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-blue-300 backdrop-blur-sm">
        {children}
    </div>
);

/* ── Parallax text wrapper — moves at slower rate than scroll ── */
const ParallaxText = ({ children, speed = 0.35, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `-${speed * 100}px`]);
    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};

const About = () => {
    /* Hero parallax */
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroTextY = useTransform(heroScroll, [0, 1], ["0px", "160px"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);


    return (
        <Layout footerBgColor="bg-navy-950">

            {/*
            ┌─────────────────────────────────────────────────┐
            │  KEY TRICK:                                      │
            │  1. Video wrapper is position:sticky top:0       │
            │     → stays locked to viewport top as you scroll │
            │  2. Content wrapper starts with marginTop:-100vh │
            │     → slides over the sticky video               │
            │  Works perfectly with Lenis (no position:fixed)  │
            └─────────────────────────────────────────────────┘
            */}

            {/* ── STICKY VIDEO LAYER ── */}
            <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 0, overflow: "hidden" }}>

                {/*
                  HTML5 <video> — zero play button, zero branding, full control.
                  Free stock tech background video (Pexels license — free for commercial use).
                  Multiple sources for browser compatibility.
                */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "177.78vh",
                        minWidth: "100%",
                        height: "56.25vw",
                        minHeight: "100%",
                        transform: "translate(-50%, -50%)",
                        objectFit: "cover",
                        pointerEvents: "none",
                    }}
                >
                    {/* Pexels free tech / digital abstract background videos */}
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>

                {/* Minimal dark overlay — let the video be visible */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(4,10,24,0.22)", zIndex: 1 }} />
            </div>



            {/* ── ALL CONTENT — slides over the sticky video ── */}
            <div style={{ position: "relative", zIndex: 10, marginTop: "-100vh" }}>

                {/* ══════════════════════════════════════════
                    HERO — transparent, video shows through
                ══════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    style={{ height: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
                >
                    {/* Left gradient — only enough to read text */}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/30 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating particles */}
                    {[
                        { top: "18%", left: "60%", size: 5, color: "#3b82f6", dur: 4.2 },
                        { top: "68%", left: "74%", size: 3, color: "#8b5cf6", dur: 5.8 },
                        { top: "35%", left: "86%", size: 6, color: "#f97316", dur: 3.5 },
                        { top: "78%", left: "42%", size: 4, color: "#10b981", dur: 6.1 },
                    ].map((d, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: d.color }}
                            animate={{ y: [0, -20, 0], opacity: [0.35, 0.9, 0.35] }}
                            transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                        />
                    ))}

                    {/* Hero text — parallax upward drift */}
                    <motion.div
                        style={{ y: heroTextY, opacity: heroOpacity }}
                        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Badge>Who We Are</Badge>
                            <h1 className="text-[52px] md:text-[68px] lg:text-[86px] font-extrabold text-white font-heading tracking-tight leading-[1.0] mb-8 max-w-[740px]">
                                Engineering<br />
                                the future of<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                                    digital business.
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300/90 leading-relaxed mb-10 max-w-[520px]">
                                A collective of software architects, designers, and growth strategists
                                building enterprise-grade digital products that scale with ambition.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                                        className="group inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-[15px] shadow-2xl shadow-brand-blue/40 hover:bg-blue-500 transition-all"
                                    >
                                        Let&#39;s talk <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link to="/services">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/20 transition-all"
                                    >
                                        Our Services
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    >
                        <span className="text-white/40 tracking-[0.22em] text-[10px] uppercase font-medium">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-10"
                            style={{ background: "linear-gradient(to bottom,rgba(99,179,237,0.7),transparent)" }}
                        />
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════════
                    STATS — dark glass strip, video behind
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y-2 lg:divide-y-0 lg:divide-x divide-white/10">
                            {[
                                { numericValue: 100, suffix: "+", label: "Projects Delivered", color: "#3b82f6" },
                                { numericValue: 98, suffix: "%", label: "Client Satisfaction", color: "#f97316" },
                                { numericValue: 3, suffix: "+", label: "Years Experience", color: "#8b5cf6" },
                                { numericValue: 4, suffix: "+", label: "Countries Served", color: "#10b981" },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: i * 0.12, duration: 0.6 }}
                                    className="text-center py-6 lg:py-0 lg:px-10"
                                >
                                    <CountableStatNumber numericValue={s.numericValue} suffix={s.suffix} color={s.color} />
                                    <div className="text-[14px] text-gray-400 font-medium">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    OUR STORY — parallax text, glass card
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-navy-950/32 backdrop-blur-[1px]" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <ParallaxText speed={0.18}>
                                <Badge>Our Story</Badge>
                                <h2 className="text-4xl lg:text-5xl font-extrabold text-white font-heading leading-[1.15] tracking-tight mb-6">
                                    Bridging engineering<br />and{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                        business growth.
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed mb-5">
                                    Founded on the principle that exceptional software requires both technical
                                    mastery and strategic foresight, Whatsnext Infotech has grown into a
                                    trusted technology partner for modern enterprises.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                    Our mission: empower organizations by replacing outdated legacy systems
                                    with scalable, cloud-native architectures and data-driven marketing
                                    frameworks that genuinely move the needle.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "100% in-house engineering talent",
                                        "Agile, iterative delivery models",
                                        "Deep expertise in modern JS ecosystems",
                                        "Commitment to open-source contributions",
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -14 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.09 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
                                            <span className="text-[15px] font-medium text-gray-200">{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </ParallaxText>

                            {/* Glass card — different speed for depth */}
                            <ParallaxText speed={0.08}>
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.75 }}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
                                >
                                    <p className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-8">What drives us</p>
                                    <div className="grid grid-cols-2 gap-8">
                                        {[
                                            { icon: Zap, label: "Speed", sub: "Ship fast without breaking things", color: "#3b82f6" },
                                            { icon: Star, label: "Quality", sub: "99% uptime, zero tolerance for bugs", color: "#f97316" },
                                            { icon: Target, label: "Precision", sub: "Every pixel and every API endpoint", color: "#8b5cf6" },
                                            { icon: Globe, label: "Scale", sub: "Built for millions, not dozens", color: "#10b981" },
                                        ].map((item, i) => (
                                            <motion.div key={item.label}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 + 0.3 }}
                                                className="flex flex-col gap-3"
                                            >
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}35` }}>
                                                    <item.icon size={18} style={{ color: item.color }} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-base mb-0.5">{item.label}</p>
                                                    <p className="text-gray-400 text-[13px] leading-snug">{item.sub}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </ParallaxText>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    PHILOSOPHY — thinnest overlay → video most vivid
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-navy-950/15" />
                    <div className="relative z-10 py-44 flex items-center justify-center">
                        <ParallaxText speed={0.22} className="text-center px-6 max-w-[820px] mx-auto w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 36 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9 }}
                            >
                                <p className="text-blue-300 text-sm font-semibold tracking-[0.28em] uppercase mb-6">
                                    Our Philosophy
                                </p>
                                <h2 className="text-4xl lg:text-6xl font-extrabold text-white font-heading leading-[1.12] drop-shadow-2xl">
                                    Every line of code is a{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                        promise to our clients.
                                    </span>
                                </h2>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="mt-10 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-center"
                                />
                            </motion.div>
                        </ParallaxText>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    CORE VALUES — glass cards, staggered parallax
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-black/42 backdrop-blur-[2px]" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28">
                        <ParallaxText speed={0.12} className="text-center max-w-2xl mx-auto mb-16">
                            <Badge>Core Values</Badge>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-white font-heading mb-4 tracking-tight">
                                Principles we live and build by
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                The philosophy guiding our engineering processes, client relationships, and culture.
                            </p>
                        </ParallaxText>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {values.map((v, i) => (
                                <ParallaxText key={v.title} speed={0.06 + i * 0.04}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.55, delay: i * 0.1 }}
                                        whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                        className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-300 overflow-hidden"
                                    >
                                        <div
                                            className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: `radial-gradient(circle,${v.color}28 0%,transparent 70%)`, transform: "translate(35%,-35%)" }}
                                        />
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                            style={{ background: `${v.color}18`, border: `1px solid ${v.color}35` }}>
                                            <v.icon size={22} style={{ color: v.color }} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white font-heading mb-3">{v.title}</h3>
                                        <p className="text-[14px] text-gray-400 leading-relaxed">{v.description}</p>
                                    </motion.div>
                                </ParallaxText>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    TIMELINE — light overlay, video prominent
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-navy-950/20" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28">
                        <ParallaxText speed={0.14} className="text-center mb-16">
                            <Badge>Our Journey</Badge>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-white font-heading mb-4 tracking-tight">
                                Our journey of relentless growth
                            </h2>
                            <p className="text-lg text-gray-400 max-w-xl mx-auto">
                                From a scrappy startup to a global engineering force — every milestone shaped who we are.
                            </p>
                        </ParallaxText>
                        <div className="relative">
                            <div className="hidden lg:block absolute top-[38px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                                {milestones.map((m, i) => (
                                    <ParallaxText key={m.year} speed={0.05 + i * 0.05}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 44 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative text-center lg:text-left"
                                        >
                                            <div className="flex items-center justify-center lg:justify-start mb-6">
                                                <div className="relative">
                                                    <div className="w-[76px] h-[76px] rounded-full bg-white/10 backdrop-blur-lg border border-blue-400/40 flex items-center justify-center shadow-xl">
                                                        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-cyan-400 font-heading">
                                                            {m.year}
                                                        </span>
                                                    </div>
                                                    <motion.div
                                                        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                                                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.45 }}
                                                        className="absolute inset-0 rounded-full border border-blue-400/35"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-white font-heading mb-2">{m.label}</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">{m.desc}</p>
                                        </motion.div>
                                    </ParallaxText>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    MISSION / ISOMETRIC
                ══════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute inset-0 bg-black/38 backdrop-blur-[2px]" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            {/* Isometric — slower parallax */}
                            <ParallaxText speed={0.1}>
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.75 }}
                                    className="relative h-[500px] flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-blue-400/25" />
                                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                                            className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-cyan-400/20" />
                                    </div>
                                    <div className="relative z-10">
                                        <motion.img
                                            src={aboutIsometric}
                                            alt="Technology"
                                            animate={{ y: [0, -18, 0] }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-[300px] h-auto object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                    {[
                                        { top: "8%", left: "0%", label: "Custom Software", icon: "⚙️", yDir: -1 },
                                        { top: "5%", right: "0%", label: "Cloud Solutions", icon: "☁️", yDir: 1 },
                                        { bottom: "8%", left: "2%", label: "UI/UX Design", icon: "🎨", yDir: 1 },
                                        { bottom: "5%", right: "0%", label: "AI & Automation", icon: "🤖", yDir: -1 },
                                    ].map((c, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, c.yDir * 10, 0] }}
                                            transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                                            className="absolute z-20 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 flex flex-col items-center gap-2 w-[128px] shadow-xl"
                                            style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom }}
                                        >
                                            <div className="text-xl">{c.icon}</div>
                                            <p className="text-[11px] font-bold text-white text-center leading-tight">{c.label}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </ParallaxText>

                            {/* Text — faster parallax = more depth */}
                            <ParallaxText speed={0.22}>
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.75 }}
                                >
                                    <Badge>Mission &amp; Vision</Badge>
                                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white font-heading leading-[1.15] tracking-tight mb-6">
                                        Built to scale<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                                            ambitious ideas.
                                        </span>
                                    </h2>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                        Our cross-functional teams blend engineering, design, and marketing to
                                        ensure your product not only works flawlessly — it reaches the right
                                        audience at exactly the right moment.
                                    </p>
                                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                        We don&#39;t just ship features; we architect lasting digital experiences
                                        that compound in value over time.
                                    </p>
                                    <Link to="/services">
                                        <motion.button
                                            whileHover={{ x: 6 }}
                                            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-blue-400 transition-colors text-[15px]"
                                        >
                                            Explore our services <ArrowRight size={17} />
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </ParallaxText>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    OUR TEAM SHOWCASE
                ══════════════════════════════════════════ */}
                <TeamShowcase />

                <CTA />
            </div>{/* end content wrapper */}

        </Layout>
    );
};

export default About;
