import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronRight, Code2, Globe, Smartphone, Cpu, Database, Cloud } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { Link } from "react-router-dom";
import ReactCountUp from "react-countup";
import MagneticButton from "../../ui/MagneticButton";

const CountUp = ReactCountUp.default || ReactCountUp;

/* ══════════════════════════════════════════════════════════════
   CANVAS — Neural network particle system
══════════════════════════════════════════════════════════════ */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            init();
        };

        const init = () => {
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            const count = Math.min(Math.floor((W * H) / 9000), 90);
            particlesRef.current = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.8 + 0.8,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.018 + Math.random() * 0.02,
                hue: 190 + Math.random() * 60, // cyan→electric-blue range
            }));
        };

        const draw = () => {
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            ctx.clearRect(0, 0, W, H);

            const mx = mouseRef.current.x * W;
            const my = mouseRef.current.y * H;
            const particles = particlesRef.current;
            const CONNECTION_DIST = 140;
            const MOUSE_INFLUENCE = 80;

            // Move particles
            particles.forEach((p) => {
                p.pulse += p.pulseSpeed;
                p.x += p.vx;
                p.y += p.vy;
                // Mouse repulsion
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_INFLUENCE) {
                    const force = (MOUSE_INFLUENCE - dist) / MOUSE_INFLUENCE;
                    p.x += (dx / dist) * force * 1.2;
                    p.y += (dy / dist) * force * 1.2;
                }
                // Bounce
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                p.x = Math.max(0, Math.min(W, p.x));
                p.y = Math.max(0, Math.min(H, p.y));
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
                        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                        gradient.addColorStop(0, `hsla(${a.hue},90%,70%,${alpha})`);
                        gradient.addColorStop(1, `hsla(${b.hue},90%,70%,${alpha})`);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach((p) => {
                const glow = 0.55 + 0.45 * Math.sin(p.pulse);
                const radius = p.r * (0.85 + 0.25 * Math.sin(p.pulse));

                // Outer glow
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 6);
                grad.addColorStop(0, `hsla(${p.hue},90%,70%,${glow * 0.25})`);
                grad.addColorStop(1, `hsla(${p.hue},90%,70%,0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius * 6, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.fillStyle = `hsla(${p.hue},95%,80%,${0.7 + glow * 0.3})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animRef.current = requestAnimationFrame(draw);
        };

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            };
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.75 }}
        />
    );
};

/* ══════════════════════════════════════════════════════════════
   PERSPECTIVE GRID — Technology horizon grid
══════════════════════════════════════════════════════════════ */
const TechGrid = () => (
    <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ perspective: "600px", perspectiveOrigin: "50% 60%" }}
    >
        <div
            className="absolute bottom-0 left-0 right-0"
            style={{
                height: "65%",
                transform: "rotateX(68deg)",
                transformOrigin: "bottom center",
                backgroundImage:
                    "linear-gradient(to right, rgba(0,168,255,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,168,255,0.13) 1px, transparent 1px)",
                backgroundSize: "80px 60px",
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }}
        />
        {/* Horizon glow */}
        <div
            className="absolute"
            style={{
                bottom: "35%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: "2px",
                background: "linear-gradient(to right, transparent, rgba(0,168,255,0.6), rgba(6,214,218,0.6), transparent)",
                filter: "blur(3px)",
            }}
        />
    </div>
);

/* ══════════════════════════════════════════════════════════════
   FLOATING UI PANELS — glassmorphism depth layers
══════════════════════════════════════════════════════════════ */
const glassStyle = {
    background: "rgba(10, 20, 50, 0.55)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
    border: "1px solid rgba(0,168,255,0.2)",
    borderRadius: 16,
};

const CodePanel = ({ style }) => (
    <motion.div
        style={{ ...glassStyle, ...style }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute pointer-events-none shadow-2xl"
    >
        <div className="px-4 py-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            {/* Code lines */}
            <div className="space-y-1.5" style={{ fontFamily: "monospace", fontSize: 11 }}>
                <div><span style={{ color: "#60a5fa" }}>const</span> <span style={{ color: "#a78bfa" }}>api</span> <span style={{ color: "#fff" }}>=</span> <span style={{ color: "#34d399" }}>await</span> <span style={{ color: "#fff" }}>fetch(</span></div>
                <div style={{ paddingLeft: 12 }}><span style={{ color: "#fbbf24" }}>&quot;/api/v2/data&quot;</span></div>
                <div><span style={{ color: "#fff" }}>);</span></div>
                <div className="flex items-center gap-1">
                    <span style={{ color: "#60a5fa" }}>return</span>
                    <span style={{ color: "#fff" }}>api.</span>
                    <span style={{ color: "#34d399" }}>json</span>
                    <span style={{ color: "#fff" }}>();</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        style={{ display: "inline-block", width: 2, height: 12, background: "#60a5fa", marginLeft: 2 }}
                    />
                </div>
            </div>
        </div>
    </motion.div>
);

const ApiPanel = ({ style }) => (
    <motion.div
        style={{ ...glassStyle, ...style }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute pointer-events-none shadow-2xl"
    >
        <div className="px-4 py-3 min-w-[160px]">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live API</span>
            </div>
            {[
                { method: "GET", path: "/users", color: "#34d399" },
                { method: "POST", path: "/deploy", color: "#60a5fa" },
                { method: "PUT", path: "/config", color: "#fbbf24" },
            ].map((r) => (
                <div key={r.path} className="flex items-center gap-2 mb-1.5">
                    <span style={{ fontSize: 9, fontFamily: "monospace", color: r.color, fontWeight: 700, minWidth: 32 }}>{r.method}</span>
                    <span style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(255,255,255,0.55)" }}>{r.path}</span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: r.color, opacity: 0.7 }} />
                </div>
            ))}
        </div>
    </motion.div>
);

const BrowserPanel = ({ style }) => (
    <motion.div
        style={{ ...glassStyle, ...style, borderRadius: 14 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute pointer-events-none shadow-2xl overflow-hidden"
    >
        {/* Browser chrome */}
        <div style={{ background: "rgba(0,10,30,0.8)", padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <div style={{ marginLeft: 6, flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 4, padding: "2px 8px" }}>
                    <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>whatsnextinfotech.com</span>
                </div>
            </div>
        </div>
        {/* Simulated web content */}
        <div style={{ padding: "10px 12px", width: 160 }}>
            <div style={{ height: 6, borderRadius: 4, background: "rgba(0,168,255,0.4)", width: "70%", marginBottom: 6 }} />
            <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.12)", width: "90%", marginBottom: 4 }} />
            <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)", width: "75%", marginBottom: 8 }} />
            <div style={{ height: 28, borderRadius: 6, background: "linear-gradient(90deg,rgba(0,168,255,0.35),rgba(6,214,218,0.25))", marginBottom: 6 }} />
            <div className="flex gap-2">
                <div style={{ height: 18, borderRadius: 4, background: "rgba(255,255,255,0.06)", flex: 1 }} />
                <div style={{ height: 18, borderRadius: 4, background: "rgba(255,255,255,0.06)", flex: 1 }} />
            </div>
        </div>
    </motion.div>
);

const MetricPanel = ({ style }) => (
    <motion.div
        style={{ ...glassStyle, ...style }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute pointer-events-none shadow-2xl"
    >
        <div className="px-4 py-3">
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Performance</div>
            {[
                { label: "Uptime", val: "99.9%", color: "#34d399" },
                { label: "Speed", val: "< 80ms", color: "#60a5fa" },
            ].map((m) => (
                <div key={m.label} className="flex items-center justify-between gap-6 mb-2">
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>{m.label}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: m.color, fontFamily: "monospace" }}>{m.val}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

/* ══════════════════════════════════════════════════════════════
   LIGHT BEAMS
══════════════════════════════════════════════════════════════ */
const LightBeams = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
            { left: "15%", delay: 0, duration: 8, rotate: -35 },
            { left: "55%", delay: 3, duration: 10, rotate: -20 },
            { left: "80%", delay: 6, duration: 9, rotate: -42 },
        ].map((b, i) => (
            <motion.div
                key={i}
                className="absolute top-0"
                style={{ left: b.left, transform: `rotate(${b.rotate}deg)`, transformOrigin: "top center" }}
                animate={{ opacity: [0, 0.06, 0.12, 0.06, 0] }}
                transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
            >
                <div style={{
                    width: 2,
                    height: "130vh",
                    background: "linear-gradient(to bottom, rgba(0,168,255,0.9), rgba(6,214,218,0.5), transparent)",
                    filter: "blur(18px)",
                }} />
            </motion.div>
        ))}
    </div>
);

/* ══════════════════════════════════════════════════════════════
   CHARACTER REVEAL
══════════════════════════════════════════════════════════════ */
const CharLine = ({ text, delay = 0, className = "", gradient = false, gradientClass = "" }) => {
    const chars = text.split("");
    return (
        <span className={`inline-block overflow-hidden leading-none ${className}`} aria-label={text}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className={`inline-block ${gradient ? `text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}` : ""}`}
                    initial={{ y: "115%", opacity: 0, rotateX: -30 }}
                    animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                    transition={{
                        duration: 0.65,
                        delay: delay + i * 0.026,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
};

/* ══════════════════════════════════════════════════════════════
   STAT BADGE
══════════════════════════════════════════════════════════════ */
const StatBadge = ({ end, suffix, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className="text-center flex-shrink-0"
    >
        <h3
            className="text-2xl sm:text-3xl font-extrabold text-white font-heading whitespace-nowrap tracking-tight"
            style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
            }}
        >
            <CountUp end={end} duration={2.5} enableScrollSpy scrollSpyOnce />
            {suffix}
        </h3>
        <p
            className="text-xs sm:text-sm text-gray-300 mt-1 font-semibold tracking-wider uppercase whitespace-nowrap"
            style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
            }}
        >
            {label}
        </p>
    </motion.div>
);

/* ══════════════════════════════════════════════════════════════
   FLOATING SERVICE ICONS (foreground depth layer)
══════════════════════════════════════════════════════════════ */
const FloatingIcon = ({ Icon, x, y, delay, size = 36, color = "#00A8FF" }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0, 1, 1, 0],
            y: [0, -18, -36, -54],
        }}
        transition={{ duration: 5, delay, repeat: Infinity, ease: "easeOut", repeatDelay: 3 + delay }}
    >
        <div style={{
            width: size,
            height: size,
            borderRadius: 10,
            background: `${color}18`,
            border: `1px solid ${color}40`,
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Icon size={size * 0.5} color={color} />
        </div>
    </motion.div>
);

const FLOATING_ICONS = [
    { Icon: Code2, x: 5, y: 55, delay: 0, color: "#00A8FF" },
    { Icon: Globe, x: 92, y: 60, delay: 1.5, color: "#06D6DA" },
    { Icon: Smartphone, x: 3, y: 30, delay: 3, color: "#a78bfa" },
    { Icon: Cpu, x: 93, y: 35, delay: 4.5, color: "#34d399" },
    { Icon: Database, x: 8, y: 75, delay: 6, color: "#fbbf24" },
    { Icon: Cloud, x: 88, y: 78, delay: 7.5, color: "#f472b6" },
];

/* ══════════════════════════════════════════════════════════════
   MOUSE PARALLAX CONTROLLER
══════════════════════════════════════════════════════════════ */
const useMouseParallax = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

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

/* ══════════════════════════════════════════════════════════════
   HERO — MAIN EXPORT
══════════════════════════════════════════════════════════════ */
const Hero = () => {
    const ref = useRef(null);
    const { springX, springY } = useMouseParallax();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Parallax layers
    const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const farY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.55], ["0%", "12%"]);
    const springContentY = useSpring(contentY, { stiffness: 55, damping: 18 });

    // Floating panel parallax (mouse)
    const panelFarX = useTransform(springX, [-1, 1], [-10, 10]);
    const panelFarY = useTransform(springY, [-1, 1], [-6, 6]);
    const panelNearX = useTransform(springX, [-1, 1], [-20, 20]);
    const panelNearY = useTransform(springY, [-1, 1], [-12, 12]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: "linear-gradient(160deg, #020617 0%, #060d26 35%, #0a0f2e 60%, #020617 100%)",
            }}
        >
            {/* ── FAR LAYER: Canvas particle network + grid ── */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ y: farY }}
            >
                <ParticleCanvas />
                <TechGrid />
            </motion.div>

            {/* ── AMBIENT radial glows ── */}
            <div className="absolute inset-0 z-1 pointer-events-none">
                {/* Top-center cyan bloom */}
                <div style={{
                    position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
                    width: "70%", height: "55%",
                    background: "radial-gradient(ellipse, rgba(0,168,255,0.12) 0%, rgba(6,214,218,0.06) 45%, transparent 75%)",
                    filter: "blur(30px)",
                }} />
                {/* Bottom-left blue bloom */}
                <div style={{
                    position: "absolute", bottom: "-5%", left: "-10%",
                    width: "50%", height: "50%",
                    background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }} />
                {/* Bottom-right purple bloom */}
                <div style={{
                    position: "absolute", bottom: "10%", right: "-10%",
                    width: "45%", height: "45%",
                    background: "radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }} />
            </div>

            {/* ── Light beams ── */}
            <div className="absolute inset-0 z-2 pointer-events-none">
                <LightBeams />
            </div>

            {/* ── MID LAYER: floating service icons ── */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ y: midY }}
            >
                {FLOATING_ICONS.map((fi, i) => (
                    <FloatingIcon key={i} {...fi} />
                ))}
            </motion.div>

            {/* ── NEAR LAYER: Floating glassmorphism UI panels (mouse parallax) ── */}
            {/* Code panel — left */}
            <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                    left: "2%",
                    top: "20%",
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
                    x: panelNearX,
                }}
            >
                <motion.div style={{ y: panelNearY }}>
                    <CodePanel style={{ position: "relative" }} />
                </motion.div>
            </motion.div>

            {/* API panel — right */}
            <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                    right: "3%",
                    top: "22%",
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
                    x: useTransform(panelFarX, (v) => -v),
                }}
            >
                <motion.div style={{ y: panelFarY }}>
                    <ApiPanel style={{ position: "relative" }} />
                </motion.div>
            </motion.div>

            {/* Browser panel — left-lower */}
            <motion.div
                className="absolute z-20 pointer-events-none hidden xl:block"
                style={{
                    left: "1%",
                    bottom: "18%",
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
                    x: panelNearX,
                }}
            >
                <motion.div style={{ y: panelNearY }}>
                    <BrowserPanel style={{ position: "relative" }} />
                </motion.div>
            </motion.div>

            {/* Metrics panel — right-lower */}
            <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                    right: "2%",
                    bottom: "22%",
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "35%"]),
                    x: useTransform(panelFarX, (v) => -v),
                }}
            >
                <motion.div style={{ y: panelFarY }}>
                    <MetricPanel style={{ position: "relative" }} />
                </motion.div>
            </motion.div>

            {/* ── FOREGROUND CONTENT — Hero text ── */}
            <motion.div
                className="relative z-30 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 pt-28 pb-8 will-change-transform"
                style={{ y: springContentY, opacity: contentOpacity }}
            >
                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 shadow-lg"
                    style={{
                        borderColor: "rgba(0,168,255,0.35)",
                        background: "rgba(0,168,255,0.08)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#00A8FF" }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#00A8FF" }} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase" style={{ color: "rgba(0,200,255,0.9)" }}>
                        Think Next. Deliver Next.
                    </span>
                </motion.div>

                {/* Main headline */}
                <div
                    className="flex flex-col items-center justify-center gap-1 mb-8"
                    style={{ perspective: "900px" }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px] font-extrabold text-white font-heading leading-[1.1] tracking-tight text-center">
                        <CharLine
                            text="We Build Software"
                            delay={0.3}
                            className="block mb-2"
                        />
                        <CharLine
                            text="That Defines"
                            delay={0.46}
                            className="block mb-2"
                        />
                        <CharLine
                            text="Tomorrow"
                            delay={0.64}
                            gradient
                            gradientClass="from-[#00A8FF] via-[#06D6DA] to-[#a78bfa]"
                            className="block"
                        />
                    </h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-medium"
                    style={{ color: "rgba(200,220,255,0.75)" }}
                >
                    Software development, website &amp; mobile apps, IT consulting, HR consulting, and digital transformation — engineered to help modern enterprises scale faster.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto mb-16"
                >
                    <MagneticButton strength={28}>
                        <Link
                            to="/contact"
                            data-cursor="pointer"
                            className="group relative inline-flex items-center justify-center gap-2 text-white px-9 py-4 rounded-xl font-semibold text-[16px] transition-all duration-300 overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #0062cc 0%, #00A8FF 50%, #06D6DA 100%)",
                                boxShadow: "0 0 30px rgba(0,168,255,0.35), 0 4px 20px rgba(0,0,0,0.3)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 50px rgba(0,168,255,0.55), 0 4px 20px rgba(0,0,0,0.3)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,168,255,0.35), 0 4px 20px rgba(0,0,0,0.3)"; }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Your Project
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    </MagneticButton>

                    <MagneticButton strength={22}>
                        <Link
                            to="/services"
                            data-cursor="pointer"
                            className="group inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-semibold text-[16px] transition-all duration-300 hover:-translate-y-0.5"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(0,168,255,0.25)",
                                color: "rgba(200,230,255,0.9)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,168,255,0.55)"; e.currentTarget.style.background = "rgba(0,168,255,0.12)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,168,255,0.25)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                        >
                            Explore Services
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-all opacity-70" />
                        </Link>
                    </MagneticButton>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-row items-center justify-between sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-6 sm:px-10 py-5 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto overflow-x-auto border border-cyan-500/20"
                    style={{
                        background: "rgba(6, 13, 38, 0.88)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <StatBadge end={100} suffix="+" label="Projects Delivered" delay={1.25} />
                    <div className="w-px h-10 hidden sm:block flex-shrink-0 bg-cyan-500/30" />
                    <StatBadge end={98} suffix="%" label="Client Satisfaction" delay={1.3} />
                    <div className="w-px h-10 hidden sm:block flex-shrink-0 bg-cyan-500/30" />
                    <StatBadge end={24} suffix="/7" label="Expert Support" delay={1.35} />
                    <div className="w-px h-10 hidden sm:block flex-shrink-0 bg-cyan-500/30" />
                    <StatBadge end={3} suffix="+" label="Years Experience" delay={1.4} />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 right-8 z-40 hidden lg:flex flex-col items-center gap-2"
                style={{ opacity: contentOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
            >
                <span
                    className="font-medium tracking-[0.2em] uppercase"
                    style={{ fontSize: 9, color: "rgba(0,168,255,0.5)", writingMode: "vertical-rl" }}
                >
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 rounded-full"
                    style={{ background: "linear-gradient(to bottom, rgba(0,168,255,0.7), transparent)" }}
                />
            </motion.div>

            {/* Bottom fade to next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-50"
                style={{ background: "linear-gradient(to bottom, transparent, #020617)" }}
            />
        </section>
    );
};

export default Hero;