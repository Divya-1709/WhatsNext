import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import { Zap, Shield, Award, Layers } from "lucide-react";
import CharReveal from "../../ui/CharReveal";

const reasons = [
    {
        icon: Zap,
        title: "High Performance",
        description:
            "We build lightning-fast, optimized applications that provide seamless experiences across all devices and platforms.",
        color: "#f97316",
        bg: "from-orange-500/10 to-amber-400/5",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description:
            "Security is built into our core process. We implement robust protocols to protect your data and infrastructure.",
        color: "#2563eb",
        bg: "from-blue-500/10 to-cyan-400/5",
    },
    {
        icon: Award,
        title: "Engineering Excellence",
        description:
            "Our team writes clean, maintainable code backed by automated testing and continuous integration pipelines.",
        color: "#8b5cf6",
        bg: "from-violet-500/10 to-purple-400/5",
    },
    {
        icon: Layers,
        title: "Scalable Architecture",
        description:
            "From MVP to enterprise scale, we design systems that grow effortlessly alongside your business demands.",
        color: "#10b981",
        bg: "from-emerald-500/10 to-teal-400/5",
    },
];

/* ─── Single reason card with 3D tilt ─── */
const ReasonCard = ({ reason, scrollProgress, index, total }) => {
    // Each card animates in sequence based on scroll within the pinned section
    const start = 0.15 + (index / total) * 0.35;
    const end = start + 0.2;
    const rawY = useTransform(scrollProgress, [start, end], [60, 0]);
    const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
    const scale = useTransform(scrollProgress, [start, end], [0.9, 1]);
    const y = useSpring(rawY, { stiffness: 80, damping: 20 });

    return (
        <motion.div
            style={{ y, opacity, scale }}
            className="group bg-white rounded-2xl p-8 border border-slate-200/80 overflow-hidden relative will-change-transform shadow-md hover:shadow-xl"
            data-cursor="pointer"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
        >
            {/* Gradient tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${reason.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

            {/* Icon — floats */}
            <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                style={{ backgroundColor: `${reason.color}22`, border: `1.5px solid ${reason.color}40` }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
            >
                {/* Pulse glow behind icon */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: reason.color }}
                    animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <reason.icon size={24} style={{ color: reason.color }} className="relative z-10" />
            </motion.div>

            <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-3 relative z-10 group-hover:text-sky-600 transition-colors">
                {reason.title}
            </h3>
            <p className="text-[15px] text-slate-600 leading-relaxed relative z-10">
                {reason.description}
            </p>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
                style={{ backgroundColor: reason.color }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
        </motion.div>
    );
};

/* ─── Main Section ─── */
const WhyChooseUs = () => {
    // Tall container — user scrolls 280vh while the sticky panel stays pinned
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Left text slides in as scroll starts
    const textX = useTransform(scrollYProgress, [0, 0.2], [-40, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const springTextX = useSpring(textX, { stiffness: 60, damping: 18 });

    // Background orbs drift
    const orbY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={containerRef} style={{ height: "280vh" }} className="relative">
            <div
                className="sticky top-0 h-screen overflow-hidden flex items-center border-b border-slate-200/80"
                style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}
            >
                {/* Floating background orbs */}
                <motion.div
                    style={{ y: orbY }}
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                            filter: "blur(50px)",
                        }}
                    />
                </motion.div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Left: sticky heading */}
                        <motion.div
                            style={{ x: springTextX, opacity: textOpacity }}
                            className="lg:sticky lg:top-32 will-change-transform"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 mb-6 shadow-sm">
                                <motion.span
                                    animate={{ scale: [1, 1.4, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-sky-600"
                                />
                                <span className="text-xs font-bold text-sky-700 tracking-wide uppercase">
                                    The Advantage
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading leading-[1.2] tracking-tight mb-6">
                                <CharReveal
                                    text="Why modern teams"
                                    delay={0}
                                    stagger={0.022}
                                    className="block"
                                />
                                <CharReveal
                                    text="choose to work"
                                    delay={0.28}
                                    stagger={0.022}
                                    className="block"
                                />
                                <CharReveal
                                    text="with us."
                                    delay={0.52}
                                    stagger={0.028}
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"
                                />
                            </h2>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-lg text-slate-600 leading-relaxed max-w-md"
                            >
                                We don&apos;t just write code. We partner with you to understand your
                                business objectives and deliver technical solutions that drive real
                                outcomes.
                            </motion.p>

                            {/* Animated divider */}
                            <motion.div
                                initial={{ scaleX: 0, transformOrigin: "left" }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-8 h-[2px] bg-gradient-to-r from-brand-blue to-transparent max-w-[240px] rounded-full"
                            />
                        </motion.div>

                        {/* Right: Feature Cards — animated in by scroll */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            {reasons.map((reason, i) => (
                                <ReasonCard
                                    key={reason.title}
                                    reason={reason}
                                    index={i}
                                    total={reasons.length}
                                    scrollProgress={scrollYProgress}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
