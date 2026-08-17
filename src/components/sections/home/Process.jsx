import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Palette, Code2, Rocket, TrendingUp } from "lucide-react";
import CharReveal from "../../ui/CharReveal";

const steps = [
    {
        icon: Search,
        number: "01",
        title: "Discover",
        description: "Deep-dive into your business goals, market landscape, and user needs to define the right problem to solve.",
        color: "#00A8FF",
        glow: "rgba(0,168,255,0.25)",
    },
    {
        icon: Palette,
        number: "02",
        title: "Design",
        description: "Architect the solution — from UI/UX wireframes to system architecture — before a single line of code is written.",
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.25)",
    },
    {
        icon: Code2,
        number: "03",
        title: "Build",
        description: "Agile sprints, clean code, CI/CD pipelines, and test-driven development bring your product to life at speed.",
        color: "#06D6DA",
        glow: "rgba(6,214,218,0.25)",
    },
    {
        icon: Rocket,
        number: "04",
        title: "Deploy",
        description: "Zero-downtime releases, cloud-native infrastructure, and full monitoring ensure your product launches flawlessly.",
        color: "#34d399",
        glow: "rgba(52,211,153,0.25)",
    },
    {
        icon: TrendingUp,
        number: "05",
        title: "Scale",
        description: "Continuous iteration, performance tuning, and data insights help your platform grow as your business does.",
        color: "#f97316",
        glow: "rgba(249,115,22,0.25)",
    },
];

/* Connector line between steps */
const Connector = ({ color }) => (
    <div className="hidden lg:flex items-center justify-center flex-1 px-2">
        <div className="relative w-full h-px">
            <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.08)" }} />
            <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Arrow head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                    <path d="M1 1L7 5L1 9" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    </div>
);

const StepCard = ({ step, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="group flex flex-col items-center text-center relative"
        style={{ flex: "0 0 auto", width: "clamp(130px, 16%, 170px)" }}
    >
        {/* Icon circle */}
        <motion.div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
            style={{
                background: `${step.color}14`,
                border: `1.5px solid ${step.color}35`,
                boxShadow: `0 0 0 0 ${step.glow}`,
            }}
            whileHover={{
                boxShadow: `0 0 0 8px ${step.glow}, 0 0 30px ${step.glow}`,
                scale: 1.08,
            }}
            transition={{ duration: 0.3 }}
        >
            {/* Pulse ring on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1px solid ${step.color}` }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
            />
            <step.icon size={28} color={step.color} />
            {/* Step number badge */}
            <div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: step.color, fontSize: 9, fontWeight: 800, color: "#020617", fontFamily: "var(--font-heading)" }}
            >
                {step.number}
            </div>
        </motion.div>

        <h3 className="font-extrabold font-heading text-lg mb-2 text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
            {step.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-[150px]">
            {step.description}
        </p>

        {/* Mobile step connector */}
        <div className="lg:hidden mt-6 mb-2 w-px h-8" style={{ background: `linear-gradient(to bottom, ${step.color}60, transparent)` }} />
    </motion.div>
);

const Process = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section
            id="process-section"
            ref={ref}
            className="relative py-28 lg:py-36 overflow-hidden border-b border-slate-200/80"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)" }}
        >
            {/* Animated background gradient */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
                <div style={{
                    position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
                    width: "80%", height: "60%",
                    background: "radial-gradient(ellipse, rgba(2,132,199,0.06) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }} />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-sky-50 border border-sky-200 shadow-sm"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="w-2 h-2 rounded-full bg-sky-500"
                        />
                        <span className="text-xs font-bold tracking-widest uppercase text-sky-700">
                            How We Work
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.2] mb-4">
                        <CharReveal text="Our Development" delay={0.05} stagger={0.022} className="block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                            <CharReveal text="Process" delay={0.35} stagger={0.04} />
                        </span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
                    >
                        A battle-tested 5-stage methodology ensuring every project ships on time, on budget, and above expectations.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full">
                    {steps.map((step, i) => (
                        <div key={step.number} className={`flex flex-col lg:flex-row items-center ${i < steps.length - 1 ? "flex-1" : "flex-none"}`}>
                            <StepCard step={step} index={i} />
                            {i < steps.length - 1 && <Connector color={step.color} />}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA nudge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 text-sm">
                        Average project lifecycle: <span style={{ color: "#00A8FF" }}>4 – 16 weeks</span> · Dedicated team assigned from Day 1
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,168,255,0.3), transparent)" }} />
        </section>
    );
};

export default Process;
