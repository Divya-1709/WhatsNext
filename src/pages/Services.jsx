import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ReactCountUp from "react-countup";
import {
  Globe, Smartphone, TrendingUp, Search, Users, Palette,
  CheckCircle2, ArrowRight, ChevronDown, Code2, Database,
  Shield, Zap, Target, Award, Clock, Layers,
  Cpu, Network, Star, BarChart3, Rocket,
  Lightbulb, HeartHandshake, Factory, ShoppingBag,
  Building2, Stethoscope, GraduationCap, Plane, Box, GitBranch
} from "lucide-react";
import Layout from "../components/layout/Layout";

const CountUp = ReactCountUp.default || ReactCountUp;

/* ─────────────────────────────────────────────
   ANIMATED STAT COUNTER
───────────────────────────────────────────── */
const AnimatedStat = ({ value, className = "" }) => {
  const match = value.match(/([\d.]+)/);
  if (!match) return <span className={className}>{value}</span>;
  const num = parseFloat(match[1]);
  const prefix = value.substring(0, match.index);
  const suffix = value.substring(match.index + match[0].length);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;

  return (
    <span className={className}>
      {prefix}
      <CountUp start={0} end={num} duration={2.2} decimals={decimals} enableScrollSpy scrollSpyOnce />
      {suffix}
    </span>
  );
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const servicesData = [
  {
    id: "web", icon: Globe,
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    glow: "rgba(37,99,235,0.4)",
    accentColor: "#2563eb",
    tag: "Web Engineering", title: "Web Development",
    subtitle: "Enterprise-scale web applications that perform.",
    description: "We architect production-grade web applications using modern frameworks, cloud infrastructure, and performance-first engineering. Whether you need a complex SaaS product, a high-traffic corporate platform, or a custom internal tool, we deliver bulletproof quality.",
    problem: "Most businesses lose revenue to slow, unreliable, or outdated web infrastructure. We fix that.",
    approach: "We start with a technical discovery session, define your architecture, then build in iterative sprints with daily deployments and continuous monitoring.",
    deliverables: ["Production-ready codebase", "CI/CD pipeline setup", "Performance audit report", "API documentation", "Security assessment", "Post-launch monitoring"],
    benefits: ["50-80% faster load times", "Improved SEO rankings", "Lower maintenance costs", "Enterprise-level security", "Infinite scalability"],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    industries: ["SaaS", "E-Commerce", "Finance", "Healthcare"],
    features: ["Custom React / Next.js Apps", "REST & GraphQL APIs", "Cloud Architecture", "Progressive Web Apps", "Micro-frontend Systems", "Core Web Vitals"],
    stat: { value: "99.9%", label: "Uptime SLA" },
    color: "blue",
  },
  {
    id: "mobile", icon: Smartphone,
    gradient: "from-violet-600 via-purple-500 to-pink-400",
    glow: "rgba(139,92,246,0.4)",
    accentColor: "#7c3aed",
    tag: "Mobile Engineering", title: "Mobile App Development",
    subtitle: "Apps that users download, use, and love.",
    description: "From concept to the App Store, we engineer cross-platform and native mobile experiences that are smooth, reliable, and optimized for engagement. We combine great UX with robust backend architecture to build mobile products that scale.",
    problem: "Generic apps get uninstalled. We build products that earn daily active users.",
    approach: "We prototype fast, validate with users, then build in native or cross-platform depending on your needs — always prioritizing performance and UX.",
    deliverables: ["iOS & Android app", "Backend API", "App Store submission", "Performance benchmarks", "Push notification setup", "Analytics integration"],
    benefits: ["4.9+ App Store rating", "Native-quality performance", "Offline functionality", "Rapid feature delivery", "Reduced cross-team friction"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "GraphQL", "Expo"],
    industries: ["Consumer", "FinTech", "HealthTech", "EdTech"],
    features: ["Native iOS & Android", "React Native & Flutter", "App Store Optimization", "Offline-first Architecture", "Push Notifications", "Legacy Modernization"],
    stat: { value: "4.9★", label: "Average App Rating" },
    color: "violet",
  },
  {
    id: "marketing", icon: TrendingUp,
    gradient: "from-orange-500 via-rose-500 to-pink-500",
    glow: "rgba(249,115,22,0.4)",
    accentColor: "#f97316",
    tag: "Growth Marketing", title: "Digital Marketing",
    subtitle: "Data-driven growth that compounds over time.",
    description: "We build performance marketing systems that go beyond vanity metrics. From paid acquisition to retention funnels, we engineer measurable revenue growth with transparent reporting and continuous optimization.",
    problem: "Most agencies optimize for clicks. We optimize for revenue — there is a big difference.",
    approach: "We audit your current funnel, identify the highest-leverage opportunities, then run structured experiments to maximize return on every marketing dollar.",
    deliverables: ["Campaign strategy document", "Weekly performance reports", "A/B test results", "Attribution model setup", "Custom dashboard", "Funnel audit"],
    benefits: ["3.8x average ROAS", "Reduced customer acquisition cost", "Higher LTV customers", "Clear ROI attribution", "Scalable growth systems"],
    techStack: ["Google Ads", "Meta Ads", "HubSpot", "Segment", "Mixpanel", "Looker", "Klaviyo"],
    industries: ["E-Commerce", "SaaS", "Consumer", "B2B"],
    features: ["Performance Marketing", "Social Media Management", "Conversion Rate Optimization", "Email Automation", "Data Analytics", "Content Strategy"],
    stat: { value: "3.8x", label: "Average ROAS" },
    color: "orange",
  },
  {
    id: "seo", icon: Search,
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    glow: "rgba(16,185,129,0.4)",
    accentColor: "#10b981",
    tag: "Search Dominance", title: "SEO Services",
    subtitle: "Rank first. Stay first. Grow consistently.",
    description: "Our technical and content SEO strategies build compounding organic growth. We combine deep technical audits, strategic link building, and content engineering to move your brand to the top of the results that matter.",
    problem: "Being on page 2 is the same as being invisible. We get you to page 1 and keep you there.",
    approach: "We audit your site technically, fix foundations first, then layer content authority and link acquisition for compounding long-term growth.",
    deliverables: ["Full technical SEO audit", "Keyword strategy map", "On-page optimization", "Monthly link report", "Competitor gap analysis", "Ranking dashboard"],
    benefits: ["210% average organic growth", "Reduced paid ad spend", "Long-term traffic moat", "Brand authority building", "Qualified lead generation"],
    techStack: ["Ahrefs", "Semrush", "Screaming Frog", "Google Search Console", "Surfer SEO", "Schema Pro"],
    industries: ["E-Commerce", "Healthcare", "Legal", "SaaS"],
    features: ["Technical SEO Audits", "Keyword Research", "Link Building", "Local & International SEO", "Core Web Vitals", "Schema & Rich Results"],
    stat: { value: "210%", label: "Avg. Organic Growth" },
    color: "emerald",
  },
  {
    id: "hr", icon: Users,
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    glow: "rgba(14,165,233,0.4)",
    accentColor: "#0ea5e9",
    tag: "Talent & Culture", title: "HR Consulting",
    subtitle: "Build the team that builds your product.",
    description: "Your engineering team is your competitive moat. We help fast-growing companies design hiring pipelines, define culture, and attract top-tier technical talent faster than traditional recruiting — with better retention.",
    problem: "A bad hire costs 6-9 months of salary. A slow hire costs you market position. We solve both.",
    approach: "We design role scorecards, build interview frameworks, source and screen candidates, and help you make the right offer — then support the first 90 days.",
    deliverables: ["Role definition documents", "Interview question library", "Hiring pipeline setup", "Offer letter templates", "90-day onboarding plan", "Culture deck review"],
    benefits: ["30-day average time to hire", "Higher offer acceptance rates", "Reduced early turnover", "Structured culture fit scoring", "Employer brand improvement"],
    techStack: ["Greenhouse", "Ashby", "LinkedIn Recruiter", "Notion", "Lever", "Workday"],
    industries: ["Tech Startups", "Scale-ups", "Enterprise", "Agencies"],
    features: ["Technical Recruiting", "Employer Branding", "Interview Frameworks", "Onboarding Design", "Org Structure Planning", "Retention Strategy"],
    stat: { value: "30d", label: "Avg. Time to Hire" },
    color: "sky",
  },
  {
    id: "branding", icon: Palette,
    gradient: "from-pink-600 via-rose-500 to-orange-400",
    glow: "rgba(236,72,153,0.4)",
    accentColor: "#ec4899",
    tag: "Visual Identity", title: "Logo & Branding",
    subtitle: "Your brand is your first and most lasting impression.",
    description: "We craft cohesive visual identities that communicate authority, build trust, and resonate deeply with your target audience. From logo to full brand system, we create the visual foundation your business deserves.",
    problem: "Inconsistent or generic branding erodes trust and makes you look like everyone else. We fix that.",
    approach: "We start with brand discovery workshops, define your positioning, then build a complete visual identity system that scales across every touchpoint.",
    deliverables: ["Logo suite (all formats)", "Brand guidelines document", "Color & typography system", "Icon set", "Social media templates", "Business card & stationery"],
    benefits: ["Instant brand recognition", "Higher perceived value", "Consistent cross-channel look", "Strong emotional connection", "Scalable design system"],
    techStack: ["Figma", "Illustrator", "Photoshop", "After Effects", "Framer", "Webflow"],
    industries: ["Startups", "Consumer Brands", "Professional Services", "Tech"],
    features: ["Logo Design", "UI/UX Systems", "Brand Guidelines", "Marketing Collateral", "Brand Voice", "Motion Design"],
    stat: { value: "100%", label: "Brand Satisfaction" },
    color: "pink",
  },
];

const processSteps = [
  { icon: Lightbulb, title: "Discovery", desc: "Deep-dive workshops to understand your goals, users, and technical constraints.", step: "01" },
  { icon: Target, title: "Strategy", desc: "Roadmap definition, tech stack selection, and sprint planning aligned to your timeline.", step: "02" },
  { icon: Layers, title: "Design", desc: "High-fidelity wireframes, interactive prototypes, and user testing before a single line of code.", step: "03" },
  { icon: Code2, title: "Build", desc: "Agile two-week sprints with daily deployments, PR reviews, and continuous integration.", step: "04" },
  { icon: Shield, title: "QA", desc: "Automated and manual testing, security audits, and performance benchmarks before launch.", step: "05" },
  { icon: Rocket, title: "Launch", desc: "Zero-downtime deployments with rollback capability, monitoring, and launch support.", step: "06" },
  { icon: HeartHandshake, title: "Support", desc: "24/7 monitoring, bug fixes, iterative improvements, and dedicated account management.", step: "07" },
];

const industries = [
  { icon: ShoppingBag, title: "E-Commerce", desc: "Storefronts & marketplaces" },
  { icon: Building2, title: "FinTech", desc: "Banking & payment systems" },
  { icon: Stethoscope, title: "Healthcare", desc: "HIPAA-compliant platforms" },
  { icon: GraduationCap, title: "EdTech", desc: "Learning platforms" },
  { icon: Factory, title: "Manufacturing", desc: "ERP & IoT solutions" },
  { icon: Plane, title: "Travel", desc: "Booking & hospitality" },
];

/* ─────────────────────────────────────────────
   CANVAS HERO INTERACTIVE BACKGROUND
───────────────────────────────────────────── */
const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const pts = useRef([]);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = (canvas.parentElement?.offsetHeight || 800) * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const W = canvas.width / window.devicePixelRatio;
      const H = canvas.height / window.devicePixelRatio;
      const count = Math.min(Math.floor((W * H) / 10000), 85);
      pts.current = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.8 + 0.6, pulse: Math.random() * Math.PI * 2,
        hue: 195 + Math.random() * 55,
      }));
    };

    const draw = () => {
      const W = canvas.width / window.devicePixelRatio;
      const H = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x * W;
      const my = mouse.current.y * H;
      const p = pts.current;

      p.forEach((pt) => {
        pt.x += pt.vx; pt.y += pt.vy; pt.pulse += 0.018;
        if (pt.x < 0 || pt.x > W) pt.vx *= -1;
        if (pt.y < 0 || pt.y > H) pt.vy *= -1;
        const a = 0.45 + 0.45 * Math.sin(pt.pulse);
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pt.hue},95%,68%,${a * 0.8})`; ctx.fill();
      });

      for (let i = 0; i < p.length; i++) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x, dy = p[i].y - p[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath(); ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(p[j].x, p[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / 140) * 0.18})`; ctx.lineWidth = 0.85; ctx.stroke();
          }
        }
        const ddx = p[i].x - mx, ddy = p[i].y - my;
        if (Math.sqrt(ddx * ddx + ddy * ddy) < 100) {
          ctx.beginPath(); ctx.moveTo(p[i].x, p[i].y); ctx.lineTo(mx, my);
          ctx.strokeStyle = "rgba(147,197,253,0.35)"; ctx.lineWidth = 1; ctx.stroke();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMM = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: (e.clientX - r.left) / (canvas.width / window.devicePixelRatio), y: (e.clientY - r.top) / (canvas.height / window.devicePixelRatio) };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMM);
    resize(); draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMM); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0, pointerEvents: "none" }} />;
};

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >{children}</motion.div>
);

const SectionLabel = ({ text, dark = false }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-4 ${dark ? "border-blue-400/25 bg-blue-400/10 text-blue-300" : "border-brand-blue/20 bg-brand-blue/5 text-brand-blue"}`}
  >
    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dark ? "bg-blue-400" : "bg-brand-blue"}`} />{text}
  </motion.span>
);


/* ─────────────────────────────────────────────
   ANIMATED SERVICE BLOCK COMPONENT
───────────────────────────────────────────── */
const ServiceBlock = ({ svc, idx }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isEven = idx % 2 === 0;
  const Icon = svc.icon;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "approach", label: "Our Approach" },
    { id: "deliverables", label: "Deliverables" },
    { id: "tech", label: "Tech Stack" },
  ];

  const tabContent = {
    overview: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8 backdrop-blur-sm">
          <p className="text-xs text-blue-300/80 font-semibold uppercase tracking-widest mb-2">The Problem We Solve</p>
          <p className="text-sm text-gray-300 leading-relaxed">{svc.problem}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {svc.benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-2.5 text-sm text-gray-300"
            >
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    approach: (
      <div className="space-y-3">
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{svc.approach}</p>
        <div className="flex flex-wrap gap-2">
          {svc.industries.map((ind, i) => (
            <motion.span
              key={ind}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="px-3.5 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs text-gray-300 font-medium"
            >
              {ind}
            </motion.span>
          ))}
        </div>
      </div>
    ),
    deliverables: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {svc.deliverables.map((d, i) => (
          <motion.div
            key={d}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/8 hover:border-blue-400/30 transition-colors"
          >
            <span className="text-[10px] font-bold text-blue-400 w-5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-xs text-gray-300">{d}</span>
          </motion.div>
        ))}
      </div>
    ),
    tech: (
      <div className="flex flex-wrap gap-2">
        {svc.techStack.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-4 py-2 rounded-xl bg-white/8 border border-white/15 text-xs text-gray-200 font-semibold hover:bg-white/15 hover:border-blue-400/40 transition-all cursor-default shadow-sm"
          >
            {t}
          </motion.span>
        ))}
      </div>
    ),
  };

  return (
    <div id={svc.id} className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-start scroll-mt-32`}>

      {/* VISUAL PANEL WITH DYNAMIC HOVER TILT & SHIMMER */}
      <FadeUp delay={0.05} className="w-full lg:w-[45%]">
        <motion.div
          whileHover={{ y: -8, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative rounded-3xl overflow-hidden min-h-[440px] group border border-slate-800 shadow-2xl"
          style={{ boxShadow: `0 30px 90px -20px ${svc.glow}` }}
        >
          {/* Dark background */}
          <div className="absolute inset-0 bg-slate-950" />
          {/* Gradient blob */}
          <div className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br ${svc.gradient} opacity-25 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
          <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr ${svc.gradient} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10 p-8 flex flex-col h-full min-h-[440px] justify-between">
            {/* Top row: icon + tag */}
            <div className="flex items-start justify-between mb-6">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-xl shadow-blue-500/20`}
              >
                <Icon size={30} color="white" strokeWidth={1.5} />
              </motion.div>
              <span className="px-3.5 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase bg-white/5 border-white/15 text-gray-300 backdrop-blur-md">{svc.tag}</span>
            </div>

            {/* Big stat with CountUp animation */}
            <div className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl font-black text-white font-heading tracking-tight"
              >
                <AnimatedStat value={svc.stat.value} />
              </motion.div>
              <div className="text-sm text-gray-400 mt-1 font-medium">{svc.stat.label}</div>
            </div>

            {/* Features mini list */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {svc.features.slice(0, 4).map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>

            {/* Floating card with smooth levitation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-xl rounded-xl p-3.5 border border-white/15 max-w-[170px] shadow-2xl"
            >
              <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-mono">Latest win</div>
              <div className="text-xs text-white font-bold leading-tight">{svc.features[0]}</div>
            </motion.div>
          </div>
        </motion.div>
      </FadeUp>

      {/* CONTENT PANEL */}
      <FadeUp delay={0.15} className="w-full lg:w-[55%]">
        <SectionLabel text={svc.tag} />
        <h3 className="text-3xl lg:text-[40px] font-extrabold text-slate-900 font-heading tracking-tight leading-tight mb-3">
          {svc.title}
        </h3>
        <p className="text-brand-blue font-semibold text-[15px] mb-4">{svc.subtitle}</p>
        <p className="text-[16px] text-slate-600 leading-relaxed mb-7">{svc.description}</p>

        {/* Feature pills with interactive hover scale */}
        <div className="flex flex-wrap gap-2 mb-7">
          {svc.features.map((f, i) => (
            <motion.span
              key={f}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ scale: 1.04, y: -1 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[13px] font-medium text-slate-800 hover:border-brand-blue/40 hover:bg-blue-50/60 transition-all cursor-default"
            >
              <CheckCircle2 size={13} className="text-brand-blue" />{f}
            </motion.span>
          ))}
        </div>

        {/* Interactive Tab system with animated slider */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden mb-7">
          {/* Tab headers */}
          <div className="flex border-b border-slate-100 relative bg-slate-50/50">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all cursor-pointer relative z-10 ${
                    isActive ? "text-brand-blue" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId={`activeTabPill_${svc.id}`}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {/* Tab content */}
          <div className="p-5 min-h-[170px] bg-slate-950 text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Link
          to="/contact"
          className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-slate-950 text-white font-bold text-[15px] hover:bg-brand-blue transition-all duration-300 shadow-lg hover:shadow-brand-blue/30 hover:scale-[1.03]"
        >
          Get a Free Quote
          <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </FadeUp>
    </div>
  );
};


/* ─────────────────────────────────────────────
   MAIN SERVICES PAGE
───────────────────────────────────────────── */
const Services = () => {
  const [activeNavId, setActiveNavId] = useState(servicesData[0].id);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const blobY = useSpring(heroY, { stiffness: 60, damping: 18 });

  // ScrollSpy to highlight active Quick Nav item dynamically
  useEffect(() => {
    const handleScroll = () => {
      const navHeaderHeight = 160;
      for (const svc of servicesData) {
        const el = document.getElementById(svc.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navHeaderHeight + 120 && rect.bottom > navHeaderHeight) {
            setActiveNavId(svc.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout footerBgColor="bg-navy-950">

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#020617]">
        <HeroCanvas />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.055]"
          style={{ backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Parallax blobs */}
        <motion.div style={{ y: blobY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[140px]" />
          <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[400px] rounded-full bg-violet-500/12 blur-[120px]" />
          <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full bg-cyan-400/10 blur-[100px]" />
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] right-[8%] hidden xl:block z-10"
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Globe size={28} className="text-blue-400" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[28%] left-[6%] hidden xl:block z-10"
        >
          <div className="w-16 h-16 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Code2 size={22} className="text-violet-400" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[60%] right-[18%] hidden xl:block z-10"
        >
          <div className="w-12 h-12 rounded-lg bg-slate-900/80 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Database size={18} className="text-emerald-400" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <SectionLabel text="Our Capabilities" dark />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[48px] md:text-[64px] lg:text-[80px] font-black text-white font-heading tracking-[-2px] leading-[1.02] mb-6"
            >
              Technology Services<br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Built to Scale
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium"
            >
              From enterprise web platforms to performance marketing — we deliver complete digital capabilities
              that help ambitious businesses move faster and grow bigger.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 justify-center mb-16"
            >
              <Link
                to="/contact"
                className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-blue text-white font-bold text-[15px] hover:bg-brand-blue-dark shadow-xl shadow-brand-blue/30 transition-all duration-300 hover:scale-[1.04] hover:shadow-brand-blue/50"
              >
                Start a Project
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Services <ChevronDown size={17} />
              </a>
            </motion.div>

            {/* Stats bar with CountUp */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md bg-slate-950/60 shadow-2xl"
            >
              {[
                { v: "120+", l: "Projects Delivered" },
                { v: "50+", l: "Enterprise Clients" },
                { v: "10+", l: "Years Experience" },
                { v: "99%", l: "Client Retention" },
              ].map((s) => (
                <div key={s.l} className="py-6 px-6 text-center bg-white/[0.02] hover:bg-white/[0.06] transition-colors">
                  <div className="text-2xl lg:text-3xl font-black text-white font-heading">
                    <AnimatedStat value={s.v} />
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 tracking-wide font-medium">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-9 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════ SERVICE QUICK NAV WITH ANIMATED ACTIVE PILL ══════════════ */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-2">
            {servicesData.map((svc) => {
              const Icon = svc.icon;
              const isActive = activeNavId === svc.id;
              return (
                <a
                  key={svc.id}
                  href={`#${svc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNavId(svc.id);
                    const el = document.getElementById(svc.id);
                    if (el) {
                      const navHeaderHeight = 140;
                      const targetY = el.getBoundingClientRect().top + window.scrollY - navHeaderHeight;
                      window.scrollTo({ top: targetY, behavior: "smooth" });
                    }
                  }}
                  className={`group relative flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive ? "text-white" : "text-slate-600 hover:text-brand-blue"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeQuickNavPill"
                      className="absolute inset-0 bg-brand-blue rounded-full shadow-md shadow-brand-blue/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={15} className={isActive ? "text-white" : "text-slate-500 group-hover:text-brand-blue"} />
                    {svc.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════ SERVICES ALTERNATING ══════════════ */}
      <section id="services" className="py-24 lg:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <FadeUp>
              <SectionLabel text="What We Do" />
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
                Every Service. Fully Engineered.
              </h2>
              <p className="text-lg text-slate-600 max-w-xl mx-auto mt-4 font-medium">
                Explore our capabilities in depth — each service comes with a defined approach, clear deliverables, and measurable outcomes.
              </p>
            </FadeUp>
          </div>
          <div className="space-y-28 lg:space-y-36">
            {servicesData.map((svc, idx) => (
              <ServiceBlock key={svc.id} svc={svc} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESS SECTION WITH ANIMATIONS ══════════════ */}
      <section className="py-24 lg:py-36 bg-slate-950 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,1) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-blue-600/15 blur-[130px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="How We Work" dark />
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mt-2">Our Delivery Process</h2>
              <p className="text-gray-300 max-w-lg mx-auto mt-4 text-[17px] font-medium">
                A transparent, collaborative methodology that turns ideas into production products.
              </p>
            </FadeUp>
          </div>

          <div className="relative">
            {/* Animated process connecting line */}
            <div className="hidden lg:block absolute top-12 left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-blue-500/20 via-sky-400/50 to-blue-500/20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-5">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <FadeUp key={step.title} delay={i * 0.07}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 250, damping: 18 }}
                      className="group flex flex-col items-center text-center p-4 relative bg-slate-900/50 rounded-2xl border border-white/10 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <div className="text-[9px] font-black text-blue-400 tracking-[3px] mb-3 font-mono">{step.step}</div>
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:border-brand-blue text-blue-400 group-hover:text-white transition-all duration-300 shadow-md">
                        <Icon size={26} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2 font-heading">{step.title}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ INDUSTRIES SECTION ══════════════ */}
      <section className="py-24 lg:py-32 bg-slate-50 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <FadeUp>
              <SectionLabel text="Sectors" />
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight mt-2">Industries We Serve</h2>
              <p className="text-slate-600 max-w-lg mx-auto mt-4 text-[17px] font-medium">Deep domain knowledge across the industries that move fast.</p>
            </FadeUp>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <FadeUp key={ind.title} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 hover:border-brand-blue/30 transition-all duration-300 cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 mx-auto group-hover:bg-brand-blue group-hover:border-brand-blue text-slate-500 group-hover:text-white transition-all duration-300">
                      <Icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-[14px] font-bold text-slate-900 mb-1 font-heading">{ind.title}</h4>
                    <p className="text-[11px] text-slate-500">{ind.desc}</p>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA SECTION ══════════════ */}
      <section className="py-24 lg:py-36 bg-slate-950 relative overflow-hidden text-white">
        {/* bg */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-blue/20 blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-blue via-sky-500 to-cyan-400 items-center justify-center mb-8 shadow-2xl shadow-brand-blue/50 mx-auto"
            >
              <Rocket size={34} color="white" strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-4xl lg:text-[52px] font-black text-white font-heading tracking-tight leading-tight mb-5">
              Ready to Build Something<br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">Exceptional?</span>
            </h2>
            <p className="text-[17px] text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              Talk to us today. We will respond within 24 hours with a tailored proposal — no strings attached.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="group flex items-center gap-2.5 px-10 py-4 rounded-full bg-brand-blue text-white font-bold text-[16px] hover:bg-brand-blue-dark shadow-2xl shadow-brand-blue/40 transition-all duration-300 hover:scale-[1.04] hover:shadow-brand-blue/60"
              >
                Get a Free Consultation
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white font-bold text-[16px] hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
              >
                See Our Work
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </Layout>
  );
};

export default Services;
