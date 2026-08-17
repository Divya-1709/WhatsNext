import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { value: 100, suffix: "+", label: "Happy Clients", color: "#3b82f6" },
    { value: 3, suffix: "+", label: "Years Experience", color: "#8b5cf6" },
    { value: 100, suffix: "+", label: "Projects Delivered", color: "#10b981" },
];

/* ─── Spring-animated counter ─── */
const AnimatedNumber = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-100px" });

    const spring = useSpring(0, { stiffness: 45, damping: 18, restDelta: 0.5 });
    const display = useTransform(spring, (v) => Math.round(v));

    useEffect(() => {
        if (inView) {
            spring.set(value);
        } else {
            spring.set(0);
        }
    }, [inView, spring, value]);

    return (
        <motion.span ref={ref} className="text-slate-900">
            {display}
        </motion.span>
    );
};

/* ─── Individual stat block ─── */
const StatItem = ({ stat, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-80px" });

    // Bar width fills from 0 → target% based on value ratio
    const barMax = 120;
    const barFill = (stat.value / barMax) * 100;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center lg:px-8 group py-4 md:py-0"
        >
            {/* Large number */}
            <p className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 font-heading tracking-tight flex items-center justify-center gap-0.5 whitespace-nowrap">
                <AnimatedNumber value={stat.value} />
                <span className="text-slate-900">{stat.suffix}</span>
            </p>

            {/* Label */}
            <p className="mt-3 text-base lg:text-lg text-slate-600 font-semibold tracking-wide">
                {stat.label}
            </p>

            {/* Animated progress bar */}
            <div className="mt-4 mx-auto max-w-[120px] h-[3px] bg-navy-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: stat.color }}
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={inView ? { scaleX: barFill / 100 } : {}}
                    transition={{
                        duration: 1.2,
                        delay: index * 0.12 + 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                />
            </div>
        </motion.div>
    );
};

const Stats = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const orbY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section
            id="stats-section"
            ref={ref}
            className="py-24 lg:py-32 relative overflow-hidden bg-white border-y border-slate-200/80"
        >
            <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    {stats.map((stat, i) => (
                        <StatItem key={stat.label} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
