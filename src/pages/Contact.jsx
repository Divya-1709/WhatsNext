import { useState, useRef, useEffect } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import {
    Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, Globe,
    ArrowRight, Users, Folder, Star, Sparkles, CheckCircle2, ChevronRight, Loader2, Copy, Check
} from "lucide-react";
import Layout from "../components/layout/Layout";

/* ── FAQ data ── */
const faqs = [
    { question: "What is your typical project timeline?", answer: "Project timelines vary based on scope and complexity. A standard SaaS MVP typically takes 8–12 weeks, while enterprise architecture overhauls can span 6+ months. We provide a detailed timeline during the discovery phase." },
    { question: "Do you work with startups or enterprise clients?", answer: "Both. We have dedicated teams for rapid startup MVP development and separate engineering squads experienced in complex, scalable enterprise architectures." },
    { question: "Do you offer post-launch support and maintenance?", answer: "Absolutely. We offer flexible SLA-based retainer packages to ensure your platform remains secure, performant, and up-to-date with the latest technologies." },
    { question: "What is your pricing model?", answer: "We primarily work on a fixed-bid basis for clearly scoped projects, and a time-and-materials (T&M) model for ongoing development or projects with evolving requirements." },
];

/* ══════════════════════════════════════════════════════════════
   SMOOTH RE-COUNTING NUMBER ANIMATOR (Counts up EVERY time in view)
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

/* ── Main Contact Component ── */
const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | success
    const [openFaq, setOpenFaq] = useState(null);
    const [copiedField, setCopiedField] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const copyToClipboard = (text, fieldName) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY";

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: apiKey,
                    subject: `New Project Inquiry from ${form.name} — WhatsNext`,
                    from_name: "WhatsNext Contact Form",
                    to_email: "whatsnextdest@gmail.com",
                    name: form.name,
                    email: form.email,
                    company: form.company || "N/A",
                    message: form.message,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setStatus("success");
                setForm({ name: "", email: "", company: "", message: "" });
            } else {
                throw new Error(result.message || "Failed to send");
            }
        } catch (err) {
            console.warn("Web3Forms fallback to direct mailto:", err);
            const subject = encodeURIComponent(`New Project Inquiry from ${form.name} — WhatsNext`);
            const body = encodeURIComponent(
                `Hi Whatsnext Team,\n\nHere are my details:\n\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\n\nProject Details:\n${form.message}\n\nThank you.`
            );
            window.open(`mailto:whatsnextdest@gmail.com?subject=${subject}&body=${body}`, "_blank");
            setStatus("success");
            setForm({ name: "", email: "", company: "", message: "" });
        }
    };

    return (
        <Layout>
            <div className="bg-[#020617] text-white min-h-screen relative overflow-hidden font-sans">

                {/* ══════════════════════════════════════════════════
                    MAIN FUTURISTIC HERO SECTION (GLASSMORPHISM OPTION 1)
                ══════════════════════════════════════════════════ */}
                <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">

                    {/* Ambient Radial Glow Orbs */}
                    <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
                    <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
                    <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

                    {/* Bottom Left Particle Wave / Grid Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none opacity-20 z-0">
                        <svg viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M0 250 Q360 150 720 280 T1440 200 L1440 400 L0 400 Z" fill="url(#waveGrad)" />
                            <defs>
                                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="400">
                                    <stop stopColor="#2563eb" stopOpacity="0.4" />
                                    <stop offset="1" stopColor="#020617" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

                        {/* 3-COLUMN HERO GRID */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">

                            {/* ── LEFT COLUMN: HEADLINE & VALUE PROP (4 cols) ── */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="lg:col-span-4 lg:pr-4"
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 mb-6 backdrop-blur-md hover:border-blue-400/60 transition-all cursor-default">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-300 font-mono">
                                        LET'S CONNECT
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] font-heading tracking-tight mb-6">
                                    Great ideas <br />
                                    start with a <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
                                        conversation.
                                    </span>
                                </h1>

                                <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-md">
                                    From big projects to small questions, we're here to listen and help you bring your ideas to life.
                                </p>
                            </motion.div>

                            {/* ── MIDDLE COLUMN: 3 INTERACTIVE CONTACT CARDS (4 cols) ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="lg:col-span-4 flex flex-col gap-4"
                            >
                                {/* CARD 1: Email Us */}
                                <div
                                    onClick={() => copyToClipboard("whatsnextdest@gmail.com", "email")}
                                    className="group cursor-pointer relative rounded-2xl border border-white/10 hover:border-blue-500/60 p-5 bg-slate-950/60 hover:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(37,99,235,0.3)] hover:-translate-y-1 flex items-center justify-between gap-4 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                                            <Mail size={22} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h3 className="text-sm font-bold text-white font-heading">Email Us</h3>
                                                {copiedField === "email" && (
                                                    <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/40 animate-bounce">
                                                        Copied!
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors block">
                                                whatsnextdest@gmail.com
                                            </span>
                                            <span className="text-xs text-slate-400">We reply within 24 hours</span>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shrink-0">
                                        {copiedField === "email" ? <Check size={16} className="text-cyan-300" /> : <ArrowRight size={16} />}
                                    </div>
                                </div>

                                {/* CARD 2: Call Us */}
                                <div
                                    onClick={() => copyToClipboard("+919629568371", "phone")}
                                    className="group cursor-pointer relative rounded-2xl border border-white/10 hover:border-orange-500/60 p-5 bg-slate-950/60 hover:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] hover:-translate-y-1 flex items-center justify-between gap-4 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-md">
                                            <Phone size={22} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h3 className="text-sm font-bold text-white font-heading">Call Us</h3>
                                                {copiedField === "phone" && (
                                                    <span className="text-[10px] font-bold text-orange-300 bg-orange-500/20 px-2 py-0.5 rounded-full border border-orange-400/40 animate-bounce">
                                                        Copied!
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-slate-200 group-hover:text-orange-300 transition-colors block">
                                                +91 96295 68371
                                            </span>
                                            <span className="text-xs text-slate-400">Mon–Fri, 9am to 6pm IST</span>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all shrink-0">
                                        {copiedField === "phone" ? <Check size={16} className="text-orange-300" /> : <ArrowRight size={16} />}
                                    </div>
                                </div>

                                {/* CARD 3: Headquarters */}
                                <div className="group relative rounded-2xl border border-white/10 hover:border-purple-500/60 p-5 bg-slate-950/60 hover:bg-slate-900/90 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:-translate-y-1 flex items-center justify-between gap-4 overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-md">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white font-heading mb-0.5">Headquarters</h3>
                                            <p className="text-sm font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">Chennai, India</p>
                                            <span className="text-xs text-slate-400">No 53 Anna St, Valasaravakkam</span>
                                        </div>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-all shrink-0">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* ── RIGHT COLUMN: FUTURISTIC GLASS FORM CARD (4 cols) ── */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="lg:col-span-4"
                            >
                                <div className="relative rounded-3xl border border-blue-500/40 hover:border-blue-400/60 bg-slate-950/80 backdrop-blur-2xl p-7 lg:p-8 shadow-[0_0_50px_rgba(37,99,235,0.2)] hover:shadow-[0_0_60px_rgba(37,99,235,0.3)] transition-all duration-400 overflow-hidden">

                                    {/* Top Ambient Glow Line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500" />

                                    {/* Floating Chat Icon (Top Right) */}
                                    <div className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                        <MessageSquare size={20} />
                                    </div>

                                    {/* Header */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-extrabold text-white font-heading mb-1 tracking-tight">
                                            Send us a message
                                        </h2>
                                        <p className="text-xs text-slate-400 font-medium">
                                            We'd love to hear about your project
                                        </p>
                                    </div>

                                    {/* Feature Checkmarks Row (2x2 Grid) */}
                                    <div className="grid grid-cols-2 gap-2 mb-6 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
                                        {[
                                            "Free initial consultation",
                                            "Detailed project estimate",
                                            "No commitment required",
                                            "Serving clients globally",
                                        ].map((feat) => (
                                            <div key={feat} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors">
                                                <CheckCircle2 size={13} className="text-blue-400 shrink-0" />
                                                <span className="truncate">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Success Message State */}
                                    {status === "success" ? (
                                        <div className="py-12 text-center">
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Message Dispatched!</h3>
                                            <p className="text-xs text-slate-300 mb-6 max-w-xs mx-auto">
                                                Thank you for reaching out. We have received your inquiry and will get back to you within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setStatus("idle")}
                                                className="px-6 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    ) : (
                                        /* Interactive Form */
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        placeholder="Your Name"
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)] text-xs text-white placeholder-slate-500 outline-none transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="Email Address"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)] text-xs text-white placeholder-slate-500 outline-none transition-all duration-300"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Company (Optional)"
                                                    value={form.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)] text-xs text-white placeholder-slate-500 outline-none transition-all duration-300"
                                                />
                                            </div>

                                            <div>
                                                <textarea
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    placeholder="Tell us about your project"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 hover:border-white/20 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(56,189,248,0.25)] text-xs text-white placeholder-slate-500 outline-none transition-all duration-300 resize-none"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "sending"}
                                                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 hover:from-blue-500 hover:to-pink-400 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.5)] hover:scale-[1.015] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                                            >
                                                {status === "sending" ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin text-white" />
                                                        <span>Sending message...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <Send size={16} className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>

                        </div>

                        {/* ── BOTTOM FULL-WIDTH GLASS STATS BAR (RE-COUNTING NUMBERS ON SCROLL) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 items-center shadow-2xl relative overflow-hidden"
                        >
                            {/* Stat 1 */}
                            <div className="group flex items-center gap-4 border-r border-white/10 last:border-r-0 pr-4 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    <Users size={22} />
                                </div>
                                <div>
                                    <div className="text-2xl lg:text-3xl font-extrabold text-white font-heading">
                                        <AnimatedNumber value={50} />+
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                                        Team Members
                                    </div>
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="group flex items-center gap-4 border-r border-white/10 last:border-r-0 pr-4 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-400/20 group-hover:bg-orange-500 group-hover:text-slate-950 flex items-center justify-center text-orange-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    <Folder size={22} />
                                </div>
                                <div>
                                    <div className="text-2xl lg:text-3xl font-extrabold text-white font-heading">
                                        <AnimatedNumber value={100} />+
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                                        Projects Delivered
                                    </div>
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="group flex items-center gap-4 border-r border-white/10 last:border-r-0 pr-4 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    <Globe size={22} />
                                </div>
                                <div>
                                    <div className="text-2xl lg:text-3xl font-extrabold text-white font-heading">
                                        <AnimatedNumber value={4} />
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                                        Global Locations
                                    </div>
                                </div>
                            </div>

                            {/* Stat 4 */}
                            <div className="group flex items-center gap-4 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/20 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-all duration-300 shadow-md">
                                    <Star size={22} />
                                </div>
                                <div>
                                    <div className="text-2xl lg:text-3xl font-extrabold text-white font-heading">
                                        <AnimatedNumber value={98} />%
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                                        Client Satisfaction
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    FAQ ACCORDION SECTION
                ══════════════════════════════════════════════════ */}
                <section className="py-24 relative border-t border-white/[0.05] bg-slate-950/40">
                    <div className="max-w-[860px] mx-auto px-6 lg:px-12 relative z-10">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">FAQ</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white font-heading mb-3 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-slate-400 text-sm">Everything you need to know before we get started.</p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-cyan-400/50"
                                    style={{
                                        border: openFaq === i ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(255,255,255,0.08)",
                                        background: openFaq === i ? "rgba(15,23,42,0.9)" : "rgba(15,23,42,0.4)",
                                    }}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <div className="flex items-center justify-between px-6 py-5">
                                        <h4 className="font-bold text-white text-base">{faq.question}</h4>
                                        <motion.span
                                            animate={{ rotate: openFaq === i ? 45 : 0 }}
                                            transition={{ duration: 0.22 }}
                                            className="text-xl font-light leading-none inline-block flex-shrink-0 ml-4"
                                            style={{ color: openFaq === i ? "#38bdf8" : "rgba(255,255,255,0.4)" }}
                                        >
                                            +
                                        </motion.span>
                                    </div>
                                    {openFaq === i && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="px-6 pb-5 pt-1 border-t border-white/5">
                                            <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    );
};

export default Contact;
