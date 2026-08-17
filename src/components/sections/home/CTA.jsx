import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "../../ui/MagneticButton";
import CharReveal from "../../ui/CharReveal";

/* ─── Animated floating orb ─── */
const Orb = ({ className, color, delay = 0, duration = 8 }) => (
    <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        animate={{
            x: [0, 20, -10, 20, 0],
            y: [0, -20, 10, -15, 0],
            scale: [1, 1.08, 0.95, 1.05, 1],
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: "blur(32px)",
        }}
    />
);

const CTA = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Parallax: heading moves slower than subtext
    const headingY = useTransform(scrollYProgress, [0, 1], ["15%", "-10%"]);
    const subY = useTransform(scrollYProgress, [0, 1], ["20%", "-5%"]);
    const springHeadingY = useSpring(headingY, { stiffness: 60, damping: 20 });
    const springSubY = useSpring(subY, { stiffness: 80, damping: 22 });

    return (
        <section
            id="cta-section"
            ref={ref}
            className="py-24 lg:py-32 bg-transparent relative overflow-hidden"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="relative rounded-[32px] bg-[#050b1a] border border-white/10 px-8 py-20 lg:px-20 lg:py-28 overflow-hidden shadow-2xl shadow-black/50 text-white">

                    {/* ── Background grid ── */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-100" />

                    {/* ── Floating orbs — animated mesh ── */}
                    <Orb
                        className="w-96 h-96 -top-24 -left-24"
                        color="rgba(37,99,235,0.22)"
                        delay={0}
                        duration={10}
                    />
                    <Orb
                        className="w-80 h-80 -bottom-20 -right-20"
                        color="rgba(139,92,246,0.2)"
                        delay={3}
                        duration={12}
                    />
                    <Orb
                        className="w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        color="rgba(16,185,129,0.08)"
                        delay={5}
                        duration={9}
                    />

                    {/* ── Bottom glow ── */}
                    <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse, rgba(37,99,235,0.35) 0%, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                    />

                    {/* ── Noise grain ── */}
                    <div
                        className="absolute inset-0 rounded-[32px] pointer-events-none opacity-[0.025]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "180px",
                        }}
                    />

                    {/* ── Content ── */}
                    <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

                        {/* Pill badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm mb-8"
                        >
                            <motion.div
                                animate={{ rotate: [0, 20, -10, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Sparkles size={14} className="text-brand-blue" />
                            </motion.div>
                            <span className="text-sm font-semibold text-white/80 tracking-wide">
                                Let&apos;s collaborate
                            </span>
                        </motion.div>

                        {/* Heading — large type with parallax */}
                        <motion.h2
                            style={{ y: springHeadingY }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-white font-heading leading-[1.1] tracking-tight will-change-transform"
                        >
                            <CharReveal
                                text="Ready to scale your"
                                delay={0}
                                stagger={0.022}
                                className="block mb-2"
                            />
                            <span className="block">
                                <CharReveal
                                    text="digital"
                                    delay={0.32}
                                    stagger={0.03}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200"
                                />
                                {" "}
                                <CharReveal
                                    text="infrastructure?"
                                    delay={0.48}
                                    stagger={0.025}
                                />
                            </span>
                        </motion.h2>

                        {/* Subtext — moves at different speed */}
                        <motion.p
                            style={{ y: springSubY }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55, duration: 0.7 }}
                            className="mt-8 text-lg text-gray-400 leading-relaxed max-w-xl will-change-transform"
                        >
                            Join modern teams that trust Whatsnext Infotech to build, deploy,
                            and scale their most critical software products.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-10 flex flex-wrap justify-center gap-4"
                        >
                            <MagneticButton strength={32}>
                                <Link to="/contact" data-cursor="pointer">
                                    <motion.button
                                        className="group relative bg-white text-navy-950 px-8 py-4 rounded-full font-semibold text-[15px] flex items-center gap-2 overflow-hidden"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {/* Shimmer */}
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                                            whileHover={{ translateX: "200%" }}
                                            transition={{ duration: 0.55, ease: "linear" }}
                                        />
                                        <span className="relative z-10 flex items-center gap-2">
                                            Start a conversation
                                            <ArrowRight
                                                size={18}
                                                className="group-hover:translate-x-1 transition-transform text-navy-900"
                                            />
                                        </span>
                                    </motion.button>
                                </Link>
                            </MagneticButton>

                            <MagneticButton strength={24}>
                                <Link to="/projects" data-cursor="pointer">
                                    <motion.button
                                        className="bg-transparent border border-gray-700 text-white hover:border-gray-500 px-8 py-4 rounded-full font-semibold text-[15px] transition-colors duration-300"
                                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.06)" }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        View our work
                                    </motion.button>
                                </Link>
                            </MagneticButton>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mt-12 flex items-center gap-3 text-sm text-gray-500"
                        >
                            <div className="flex -space-x-2">
                                {["#3b82f6", "#8b5cf6", "#f97316", "#10b981"].map((c, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-navy-950 flex items-center justify-center text-xs font-bold text-white"
                                        style={{ backgroundColor: c }}
                                    >
                                        {["J", "A", "M", "S"][i]}
                                    </div>
                                ))}
                            </div>
                            <span>Trusted by 100+ clients worldwide</span>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="text-yellow-400 text-xs">★</span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
