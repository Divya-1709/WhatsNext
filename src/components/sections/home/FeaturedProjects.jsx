import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, Smartphone, Cpu, BarChart3 } from "lucide-react";
import CharReveal from "../../ui/CharReveal";

const projects = [
    {
        id: 1,
        category: "Code-Based Web",
        title: "WhatsNextInfotech.com",
        description: "Corporate website showcasing IT services, portfolio, software development, and lead generation features with an ultra-responsive layout.",
        tech: ["React", "HTML5", "CSS3", "Node.js"],
        accent: "#00A8FF",
        Icon: Cpu,
        metric: "Live Platform",
        metricLabel: "whatsnextinfotech.com",
        gradient: "from-[#00A8FF]/15 via-[#06D6DA]/8 to-transparent",
        gridClass: "lg:col-span-2",
        link: "https://whatsnextinfotech.com"
    },
    {
        id: 2,
        category: "WordPress Corporate",
        title: "Akkurate.in",
        description: "Corporate business solutions website developed to showcase professional services and enhance brand credibility.",
        tech: ["WordPress", "PHP", "CMS"],
        accent: "#a78bfa",
        Icon: Globe,
        metric: "Live Site",
        metricLabel: "akkurate.in",
        gradient: "from-[#a78bfa]/15 via-[#8b5cf6]/8 to-transparent",
        gridClass: "lg:col-span-1",
        link: "https://akkurate.in"
    },
    {
        id: 4,
        category: "E-Commerce Shopify",
        title: "MyUberPack",
        description: "Packaging solutions e-commerce website enabling smooth product browsing, secure checkout, and a scalable online shopping experience.",
        tech: ["Shopify", "Liquid", "E-Commerce"],
        accent: "#f97316",
        Icon: BarChart3,
        metric: "Online Store",
        metricLabel: "myuberpack.com",
        gradient: "from-[#f97316]/15 via-[#fb923c]/8 to-transparent",
        gridClass: "lg:col-span-2",
        link: "https://myuberpack.com/"
    },
    {
        id: 5,
        category: "IT Staffing & RPO",
        title: "ReTechGlobal.cc",
        description: "Technology-focused staffing, RPO, and workforce solutions platform connecting businesses with skilled IT talent in Chennai and globally.",
        tech: ["React", "HTML5", "CSS3", "JavaScript"],
        accent: "#3b82f6",
        Icon: Globe,
        metric: "Workforce Platform",
        metricLabel: "retechglobal.cc",
        gradient: "from-[#3b82f6]/15 via-[#60a5fa]/8 to-transparent",
        gridClass: "lg:col-span-1",
        link: "http://retechglobal.cc/"
    },
];

const ProjectCard = ({ project, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.gridClass}`}
            style={{
                background: "#FFFFFF",
                border: `1px solid rgba(226,232,240,0.9)`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => project.link && window.open(project.link, "_blank", "noopener,noreferrer")}
            data-cursor="pointer"
            whileHover={{ y: -4 }}
        >
            {/* Gradient tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Animated border glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ boxShadow: hovered ? `0 0 0 1px ${project.accent}40, 0 20px 50px -10px ${project.accent}25` : "0 0 0 0px transparent" }}
                transition={{ duration: 0.35 }}
            />

            <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}35` }}
                        >
                            <project.Icon size={20} color={project.accent} />
                        </div>
                        <span
                            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}25` }}
                        animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ArrowUpRight size={18} color={project.accent} />
                    </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 font-heading leading-tight mb-4 transition-all duration-300">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-[15px] leading-relaxed mb-6 flex-1">
                    {project.description}
                </p>

                {/* Bottom row */}
                <div className="flex items-end justify-between gap-4">
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Key metric */}
                    <div className="text-right flex-shrink-0">
                        <div className="text-xl font-extrabold font-heading" style={{ color: project.accent }}>{project.metric}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{project.metricLabel}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FeaturedProjects = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section
            id="projects-preview-section"
            ref={ref}
            className="relative py-28 lg:py-36 overflow-hidden bg-slate-50 border-b border-slate-200/80"
        >
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
                <div style={{
                    position: "absolute", top: "15%", left: "5%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(circle, rgba(2,132,199,0.04) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }} />
            </motion.div>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-sky-50 border border-sky-200 shadow-sm"
                        >
                            <span className="text-sky-600 text-xs">◉</span>
                            <span className="text-xs font-bold tracking-widest uppercase text-sky-700">
                                Our Work
                            </span>
                        </motion.div>

                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.2]">
                            <CharReveal text="Featured Projects" delay={0.05} stagger={0.022} className="block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600">
                                <CharReveal text="& Solutions" delay={0.38} stagger={0.03} />
                            </span>
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                            style={{ color: "#34d399" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#06D6DA"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#34d399"; }}
                        >
                            View all projects
                            <ArrowUpRight size={16} />
                        </a>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(52,211,153,0.3), transparent)" }} />
        </section>
    );
};

export default FeaturedProjects;
