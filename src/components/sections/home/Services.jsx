import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowUpRight,
    Globe,
    Smartphone,
    TrendingUp,
    Palette,
    ShoppingBag,
    Video,
    BarChart3,
    Server,
    HelpCircle,
    Sparkles,
    CheckCircle2,
    Zap,
    Search,
} from "lucide-react";

/* ─── Services Data organized into Rows ─── */
const serviceRows = [
    // ── Row 1 ──
    [
        {
            id: "web-dev",
            title: "WEB DEVELOPMENT",
            category: "ENGINEERING",
            count: "12 SERVICES",
            variant: "azure",
            icon: Globe,
            description: "Enterprise-grade web applications, SaaS platforms, and cloud architecture built with React, Node, and Next.js.",
            subServices: ["Custom Web Apps", "SaaS Platforms", "REST & GraphQL", "Performance"],
            features: ["99.9% Uptime SLA", "Core Web Vitals 95+"],
        },
        {
            id: "branding",
            title: "BRANDING",
            category: "CREATIVE",
            count: "8 SERVICES",
            variant: "dark",
            icon: Palette,
            description: "Complete visual identities, brand guidelines, typography systems, and emotional brand storytelling.",
            subServices: ["Logo Design", "Brand Systems", "Visual Guidelines", "Typography"],
            features: ["Vector Logo Package", "Design Tokens"],
        },
        {
            id: "marketing",
            title: "DIGITAL MARKETING",
            category: "MARKETING",
            count: "8 SERVICES",
            variant: "azure",
            icon: TrendingUp,
            description: "Data-driven performance campaigns, paid advertising, and conversion rate optimization that drives real revenue.",
            subServices: ["PPC Ads", "Social Growth", "Funnel CRO", "Retargeting"],
            features: ["3.8x Avg ROAS", "Real-Time Attribution"],
        },
        {
            id: "design",
            title: "DESIGN",
            category: "CREATIVE",
            count: "8 SERVICES",
            variant: "dark",
            icon: Sparkles,
            description: "User-centered UI/UX design, interactive prototyping, and scalable Figma design systems.",
            subServices: ["UI/UX Systems", "Figma Design", "Prototypes", "User Testing"],
            features: ["WCAG AAA Compliant", "300+ UI Components"],
        },
    ],

    // ── Row 2 ──
    [
        {
            id: "ecommerce",
            title: "E-COMMERCE",
            category: "SALES",
            count: "8 SERVICES",
            variant: "light",
            icon: ShoppingBag,
            description: "High-converting online storefronts, headless Shopify builds, and custom checkout integrations.",
            subServices: ["Shopify Plus", "Headless Store", "Payment Gateways", "Inventory Sync"],
            features: ["Sub-second Load", "Multi-Currency"],
        },
        {
            id: "mobile-apps",
            title: "MOBILE APPS",
            category: "ENGINEERING",
            count: "8 SERVICES",
            variant: "azure",
            icon: Smartphone,
            description: "Native iOS & Android apps built with React Native and Flutter for seamless mobile user engagement.",
            subServices: ["iOS Native", "Android Native", "React Native", "Flutter Apps"],
            features: ["4.9 App Rating", "60 FPS Animations"],
        },
        {
            id: "content-video",
            title: "CONTENT & VIDEO",
            category: "PRODUCTION",
            count: "6 SERVICES",
            variant: "dark",
            icon: Video,
            description: "High-impact video production, 3D motion graphics, commercial ads, and brand storytelling visual assets.",
            subServices: ["Video Editing", "3D Motion", "Commercial Ads", "Social Reels"],
            features: ["4K HDR Quality", "Custom Sound"],
        },
        {
            id: "analytics",
            title: "ANALYTICS",
            category: "STRATEGY",
            count: "8 SERVICES",
            variant: "light",
            icon: BarChart3,
            description: "Comprehensive data tracking, user behavior heatmaps, and executive custom growth dashboards.",
            subServices: ["GA4 Setup", "Heatmaps", "User Behavior", "A/B Testing"],
            features: ["Cookieless Tracking", "Weekly Reports"],
        },
    ],

    // ── Row 3 ──
    [
        {
            id: "seo-opt",
            title: "SEO OPTIMIZATION",
            category: "GROWTH",
            count: "7 SERVICES",
            variant: "light",
            icon: Search,
            description: "Technical SEO audits, organic search dominance, schema engineering, and keyword cluster optimization.",
            subServices: ["Technical Audits", "Keyword Clusters", "Schema Eng.", "Link Building"],
            features: ["+210% Organic", "#1 Rank Targets"],
        },
        {
            id: "hosting",
            title: "HOSTING & CLOUD",
            category: "SYSTEMS",
            count: "5 SERVICES",
            variant: "dark",
            icon: Server,
            description: "Managed cloud hosting, Kubernetes clustering, edge CDNs, and zero-downtime server architecture.",
            subServices: ["AWS Cloud", "Docker & K8s", "CDN Edge", "DDoS Defense"],
            features: ["99.99% Uptime", "24/7 Shield"],
        },
        {
            id: "consulting",
            title: "CONSULTING",
            category: "ADVISORY",
            count: "5 SERVICES",
            variant: "light",
            icon: HelpCircle,
            description: "Strategic tech consulting, CTO-as-a-Service, architecture reviews, and digital transformation roadmaps.",
            subServices: ["Tech Audit", "CTO Advisory", "Architecture", "Security Audit"],
            features: ["Senior Tech Leads", "Growth Specs"],
        },
        {
            id: "specialized",
            title: "SPECIALIZED & AI",
            category: "INNOVATION",
            count: "6 SERVICES",
            variant: "azure",
            icon: Zap,
            description: "AI model integration, automated workflow pipelines, Web3 applications, and custom R&D tech solutions.",
            subServices: ["AI & LLMs", "Automation", "API Middleware", "Custom R&D"],
            features: ["Custom AI Training", "Real-Time Pipeline"],
        },
    ],
];

/* ─── Sharp Accordion Bento Card Component ─── */
const AccordionBentoCard = ({ service, isExpanded, isShrunk, onSelect, onHover, onLeave }) => {
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
        light: {
            bg: "bg-[#F8FAFC]",
            text: "text-slate-900",
            subText: "text-slate-600",
            pillBg: "bg-slate-200/80 text-slate-900 border-slate-300",
            iconBg: "bg-slate-200 text-slate-900 border border-slate-300",
            arrowBg: "bg-[#0284C7] text-white",
            badgeBorder: "border-slate-300",
            hoverGlow: "shadow-[0_14px_36px_-8px_rgba(255,255,255,0.18)]",
            featureCheck: "text-[#0284C7]",
        },
    };

    const currentTheme = themeStyles[service.variant] || themeStyles.dark;

    // Expanded = 2.4 (expands size), Shrunk = 0.75 (reduces size), Default/Mouse Leave = 1 (equal original size)
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
            className={`relative rounded-2xl p-4 sm:p-5 ${currentTheme.bg} ${currentTheme.hoverGlow} flex flex-col justify-between overflow-hidden cursor-pointer min-h-[140px] select-none border border-white/5`}
        >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10 mb-2">
                <div className="relative">
                    <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shadow-sm transition-transform duration-300 ${
                            isExpanded ? "rotate-45" : ""
                        } ${currentTheme.iconBg}`}
                    >
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                    </div>
                </div>

                {!isShrunk && (
                    <span
                        className={`text-[9px] font-black tracking-[0.2em] uppercase font-mono px-2 py-0.5 rounded-full border ${currentTheme.badgeBorder} ${currentTheme.subText} truncate max-w-[110px]`}
                    >
                        {service.category}
                    </span>
                )}
            </div>

            {/* Title + Count */}
            <div className="z-10 my-auto">
                <h3
                    className={`font-black font-heading tracking-tight leading-tight uppercase transition-all duration-300 ${currentTheme.text} ${
                        isExpanded ? "text-lg sm:text-xl" : isShrunk ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                    }`}
                    style={{
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                        textRendering: "optimizeLegibility",
                        transform: "translateZ(0)",
                    }}
                >
                    {service.title}
                </h3>

                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 font-mono ${currentTheme.subText}`}>
                    {service.count}
                </p>
            </div>

            {/* Expanded details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden z-10 pt-3 border-t border-current/10"
                    >
                        <p className={`text-xs leading-relaxed font-medium mb-3 ${currentTheme.text}`}>
                            {service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-1.5 mb-3">
                            {service.subServices.map((sub) => (
                                <div
                                    key={sub}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${currentTheme.pillBg}`}
                                >
                                    <div className="w-1 h-2.5 rounded-full bg-current opacity-60" />
                                    <span className="truncate">{sub}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 mb-4">
                            {service.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-1 text-[11px] font-semibold">
                                    <CheckCircle2 size={12} className={currentTheme.featureCheck} />
                                    <span className={currentTheme.text}>{feat}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <Link
                                to="/contact"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md transition-transform hover:scale-105 ${currentTheme.arrowBg}`}
                            >
                                <span>Get Started</span>
                                <ArrowUpRight size={13} />
                            </Link>

                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${currentTheme.subText}`}>
                                Active Widget
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Main Services Section Component ─── */
const Services = () => {
    const [activeId, setActiveId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    const toggleSelect = (id) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    // Active service is ONLY the card currently being hovered or clicked by the user
    const activeServiceId = hoveredId || activeId;

    const handleMouseLeaveSection = () => {
        setHoveredId(null);
        setActiveId(null);
    };

    return (
        <section
            id="services-section"
            onMouseLeave={handleMouseLeaveSection}
            className="relative z-20 py-12 lg:py-16 bg-slate-50 text-slate-900 border-b border-slate-200/80 overflow-hidden"
            style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
            }}
        >
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0284C7]/8 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#06D6DA]/5 blur-[140px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-2 mb-1.5"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] font-mono text-[#0284C7]">
                                WHAT WE DO
                            </span>
                            <div className="w-6 h-0.5 bg-gradient-to-r from-[#0284C7] to-[#06D6DA]" />
                        </motion.div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading tracking-tight uppercase text-slate-900">
                            OUR SERVICES
                        </h2>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm max-w-md font-medium">
                        Hover or click any box to expand details. Moving your cursor away restores all cards to their equal original size.
                    </p>
                </div>

                {/* Rows */}
                <div className="space-y-3.5">
                    {serviceRows.map((row, rowIndex) => {
                        const activeItemInRow = row.find(
                            (item) => item.id === activeServiceId
                        );

                        return (
                            <div
                                key={rowIndex}
                                className="flex flex-col sm:flex-row gap-3.5 items-stretch w-full"
                            >
                                {row.map((service) => {
                                    const isExpanded = activeServiceId === service.id;
                                    const isShrunk =
                                        Boolean(activeItemInRow) && !isExpanded;

                                    return (
                                        <AccordionBentoCard
                                            key={service.id}
                                            service={service}
                                            isExpanded={isExpanded}
                                            isShrunk={isShrunk}
                                            onSelect={() => toggleSelect(service.id)}
                                            onHover={() => setHoveredId(service.id)}
                                            onLeave={() => setHoveredId(null)}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
