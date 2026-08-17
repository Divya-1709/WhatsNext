import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import CharReveal from "../../ui/CharReveal";

const testimonials = [
    {
        id: 1,
        quote: "WhatsNext Infotech transformed our legacy monolith into a modern microservices architecture. The team's technical depth and project management were world-class. We went from 4-hour deployments to 4-minute releases.",
        name: "Arunachalam Murugan",
        role: "CTO",
        company: "FinServe Technologies",
        industry: "Fintech",
        rating: 5,
        color: "#00A8FF",
        initials: "AM",
    },
    {
        id: 2,
        quote: "We needed a mobile app in 12 weeks — they delivered in 10, with better UX than we spec'd. The React Native codebase they handed over was so clean our in-house team immediately felt at home. Exceptional.",
        name: "Priya Sundaram",
        role: "VP of Product",
        company: "EduGrowth India",
        industry: "EdTech",
        rating: 5,
        color: "#a78bfa",
        initials: "PS",
    },
    {
        id: 3,
        quote: "Their IT consulting team identified $180K in annual infrastructure waste within the first two weeks of an audit. ROI from our engagement was positive before the project even ended.",
        name: "Ramesh Kanna",
        role: "Director of Engineering",
        company: "LogiChain Solutions",
        industry: "Supply Chain",
        rating: 5,
        color: "#34d399",
        initials: "RK",
    },
    {
        id: 4,
        quote: "From the initial discovery workshop to the final launch, WhatsNext felt like an extension of our own team — not a vendor. Communication was transparent, quality was elite, and they genuinely cared about our outcomes.",
        name: "Saranya Periyasamy",
        role: "Head of Digital",
        company: "RetailFirst Group",
        industry: "Retail & eCommerce",
        rating: 5,
        color: "#f97316",
        initials: "SP",
    },
    {
        id: 5,
        quote: "We've worked with many dev agencies, and WhatsNext Infotech stands apart. Their AI-integrated HR consulting solution reduced our talent acquisition cycle by 45%. Genuinely impressed by their strategic thinking.",
        name: "Karthik Natarajan",
        role: "CHRO",
        company: "NovaCorp Enterprises",
        industry: "HR & Talent",
        rating: 5,
        color: "#06D6DA",
        initials: "KN",
    },
];

const StarRating = ({ rating, color }) => (
    <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={14}
                fill={i < rating ? "#facc15" : "none"}
                color={i < rating ? "#facc15" : "rgba(255,255,255,0.2)"}
            />
        ))}
    </div>
);

const Testimonials = () => {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    const go = useCallback((dir) => {
        setDirection(dir);
        setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
    }, []);

    /* ─── Auto-Swipe Timer (every 4.5 seconds) ─── */
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            go(1);
        }, 4500);

        return () => clearInterval(interval);
    }, [isPaused, go]);

    const current = testimonials[active];

    const slideVariants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, filter: "blur(6px)" }),
        center: { opacity: 1, x: 0, filter: "blur(0px)" },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, filter: "blur(6px)" }),
    };

    return (
        <section
            id="testimonials-section"
            ref={ref}
            className="relative py-28 lg:py-36 overflow-hidden bg-slate-50 border-b border-slate-200/80"
        >
            <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-50 border border-amber-200 shadow-sm"
                    >
                        <Star size={12} fill="#d97706" color="#d97706" />
                        <span className="text-xs font-bold tracking-widest uppercase text-amber-800">
                            Client Stories
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.2]">
                        <CharReveal text="What Our Clients" delay={0.05} stagger={0.022} className="block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                            <CharReveal text="Say About Us" delay={0.32} stagger={0.028} />
                        </span>
                    </h2>
                </div>

                {/* Main testimonial card with Hover Pause */}
                <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="relative rounded-3xl overflow-hidden cursor-pointer bg-white border border-slate-200/80 shadow-xl"
                >
                    {/* Top accent bar */}
                    <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${current.color}, transparent)`, transition: "background 0.5s ease" }} />

                    <div className="p-8 lg:p-14">
                        {/* Quote icon */}
                        <motion.div
                            animate={{ color: current.color }}
                            transition={{ duration: 0.5 }}
                        >
                            <Quote size={48} style={{ color: current.color, opacity: 0.3, marginBottom: 24 }} />
                        </motion.div>

                        {/* Quote text */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.blockquote
                                key={active}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="text-xl lg:text-2xl text-slate-800 font-semibold leading-relaxed mb-10"
                                style={{ fontStyle: "italic" }}
                            >
                                &ldquo;{current.quote}&rdquo;
                            </motion.blockquote>
                        </AnimatePresence>

                        {/* Author row */}
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={`author-${active}`}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                                className="flex items-center justify-between gap-6 flex-wrap"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold font-heading flex-shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${current.color}20, ${current.color}10)`,
                                            border: `1.5px solid ${current.color}40`,
                                            color: current.color,
                                        }}
                                    >
                                        {current.initials}
                                    </div>
                                    <div>
                                        <div className="text-slate-900 font-extrabold font-heading text-lg">{current.name}</div>
                                        <div className="text-slate-500 text-sm">{current.role} · {current.company}</div>
                                        <StarRating rating={current.rating} color={current.color} />
                                    </div>
                                </div>

                                <div
                                    className="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                                    style={{ background: `${current.color}15`, color: current.color, border: `1px solid ${current.color}30` }}
                                >
                                    {current.industry}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                                className="transition-all duration-300 rounded-full cursor-pointer"
                                style={{
                                    width: i === active ? 24 : 8,
                                    height: 8,
                                    background: i === active ? current.color : "rgba(255,255,255,0.2)",
                                }}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => go(-1)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${current.color}40`; e.currentTarget.style.background = `${current.color}12`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={18} color="rgba(255,255,255,0.7)" />
                        </button>
                        <button
                            onClick={() => go(1)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer"
                            style={{
                                background: `${current.color}20`,
                                border: `1px solid ${current.color}40`,
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${current.color}35`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = `${current.color}20`; }}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={18} color={current.color} />
                        </button>
                    </div>
                </div>


            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,168,255,0.3), transparent)" }} />
        </section>
    );
};

export default Testimonials;
