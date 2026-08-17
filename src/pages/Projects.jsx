import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { ArrowUpRight, ArrowRight, Rocket, Users, Trophy, ChevronRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import CTA from "../components/sections/home/CTA";
import projectsData from "../data/projects";

const categories = ["All", ...Array.from(new Set(projectsData.map(p => p.category)))];
const projects = projectsData;

/* ══════════════════════════════════════════════════════════════
   SMOOTH RE-COUNTING NUMBER ANIMATOR (0 -> TARGET VALUE)
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

/* ── Sparkles Background Effect ── */
const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[2px] bg-white rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0.1, 0.8, 0.1],
          scale: [0.8, 1.5, 0.8],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <Layout>
      <div ref={containerRef} className="bg-white min-h-screen relative font-sans overflow-x-hidden">

        {/* ══════════════════════════════════════════════════
            REDESIGNED HERO SECTION (DARK BANNER)
        ══════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden text-white"
          style={{ background: "radial-gradient(ellipse at top right, #091538 0%, #020617 65%, #050212 100%)" }}
        >
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

          {/* Sparkles Background */}
          <Sparkles />

          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* LEFT COLUMN: Main Heading & Sub-Stats */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6 lg:pr-6"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 mb-6 backdrop-blur-md hover:border-blue-400/60 transition-all cursor-default">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-cyan-300 font-mono">
                    OUR PROJECTS
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-white leading-[1.1] font-heading tracking-tight mb-6">
                  Turning Ideas into <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    Digital Excellence.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xl mb-9">
                  Discover a collection of innovative projects that combine technology, creativity, and strategy to deliver real results.
                </p>

                {/* Explore Button */}
                <div className="mb-12">
                  <button
                    onClick={() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_45px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Our Work</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={15} />
                    </div>
                  </button>
                </div>

                {/* Sub-stats Row */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl pt-4 border-t border-white/10">
                  {/* Stat 1 */}
                  <div className="flex items-center gap-3 group p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Rocket size={18} />
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-white font-heading">
                        <AnimatedNumber value={120} />+
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight">
                        Projects Completed
                      </div>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="flex items-center gap-3 group p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Users size={18} />
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-white font-heading">
                        <AnimatedNumber value={80} />+
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight">
                        Happy Clients
                      </div>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="flex items-center gap-3 group p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Trophy size={18} />
                    </div>
                    <div>
                      <div className="text-xl font-extrabold text-white font-heading">
                        <AnimatedNumber value={15} />+
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight">
                        Awards Won
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: 3D Stacked Cards Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-6 relative flex items-center justify-center min-h-[420px]"
              >
                <div className="relative w-full max-w-[540px] h-[400px] flex items-center justify-center">

                  {/* 3D Stacked Floating Cards Container */}
                  <div className="relative w-full h-full flex items-center justify-center perspective-1000">

                    {/* CARD 1 (Left - Enterprise Solutions) */}
                    <motion.div
                      whileHover={{ y: -16, scale: 1.04, rotateY: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 w-[190px] sm:w-[220px] h-[320px] sm:h-[370px] rounded-3xl border border-blue-400/30 bg-slate-950/90 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(2,6,23,0.8)] overflow-hidden group cursor-pointer z-1"
                      style={{
                        transform: "rotateY(-18deg) rotateX(6deg) translateZ(30px)",
                      }}
                    >
                      <div className="relative w-full h-[64%] rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-400/50 transition-colors">
                        <img
                          src="/card_enterprise.png"
                          alt="Enterprise Solutions"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10 pt-2 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-cyan-400 block mb-0.5 font-mono">CLOUD PLATFORM</span>
                          <h3 className="text-base font-bold text-white font-heading leading-tight group-hover:text-cyan-300 transition-colors">
                            Enterprise <br />Solutions
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.div>

                    {/* CARD 2 (Middle - Web Applications) */}
                    <motion.div
                      whileHover={{ y: -16, scale: 1.04, rotateY: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[30%] sm:left-[32%] w-[190px] sm:w-[220px] h-[320px] sm:h-[370px] rounded-3xl border border-indigo-400/40 bg-slate-950/90 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(2,6,23,0.9)] overflow-hidden group cursor-pointer z-10"
                      style={{
                        transform: "rotateY(-18deg) rotateX(6deg) translateY(-25px) translateZ(10px)",
                      }}
                    >
                      <div className="relative w-full h-[64%] rounded-2xl overflow-hidden border border-white/10 group-hover:border-indigo-400/50 transition-colors">
                        <img
                          src="/card_webapp.png"
                          alt="Web Applications"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-pulse" />
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10 pt-2 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-indigo-400 block mb-0.5 font-mono">SAAS PRODUCTS</span>
                          <h3 className="text-base font-bold text-white font-heading leading-tight group-hover:text-indigo-300 transition-colors">
                            Web <br />Applications
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.div>

                    {/* CARD 3 (Right - Mobile Apps) */}
                    <motion.div
                      whileHover={{ y: -16, scale: 1.04, rotateY: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[60%] sm:left-[64%] w-[190px] sm:w-[220px] h-[320px] sm:h-[370px] rounded-3xl border border-purple-400/30 bg-slate-950/90 backdrop-blur-2xl p-4 flex flex-col justify-between shadow-[0_20px_50px_rgba(2,6,23,0.8)] overflow-hidden group cursor-pointer z-20"
                      style={{
                        transform: "rotateY(-18deg) rotateX(6deg) translateY(15px) translateZ(-10px)",
                      }}
                    >
                      <div className="relative w-full h-[64%] rounded-2xl overflow-hidden border border-white/10 group-hover:border-purple-400/50 transition-colors">
                        <img
                          src="/card_mobileapp.png"
                          alt="Mobile Experiences"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-pulse" />
                      </div>

                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10 pt-2 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-purple-400 block mb-0.5 font-mono">IOS & ANDROID</span>
                          <h3 className="text-base font-bold text-white font-heading leading-tight group-hover:text-purple-300 transition-colors">
                            Mobile <br />Experiences
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.div>

                  </div>

                  {/* Vertical Dots Slider Pagination */}
                  <div className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 cursor-pointer transition-colors" />
                    <span className="w-2 h-2 rounded-full bg-white/20 hover:bg-white/50 cursor-pointer transition-colors" />
                  </div>

                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ══ MAIN PROJECTS SECTION (WHITE THEMED) ══ */}
        <section id="projects-section" className="bg-white py-16 sm:py-24 relative">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

            {/* ── Filter Pills ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center gap-2.5 mb-12 sm:mb-16 pt-2 pb-2 px-1"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* ── Main Projects Bento Grid ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group rounded-3xl border border-slate-200 hover:border-sky-400 bg-white transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden relative"
                  >
                    <div>
                      {/* Card Image Banner */}
                      <div className="relative h-52 overflow-hidden bg-slate-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/card_webapp.png";
                          }}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                        {/* Top Badges (Category & Featured) */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/80 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                            {project.category}
                          </span>
                          {project.featured && (
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md shadow-blue-500/30 flex items-center gap-1">
                              <span>★</span> Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6">
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">
                          Client: <span className="text-slate-800 font-semibold">{project.client}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 font-heading mb-2.5 group-hover:text-sky-600 transition-colors leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-5">
                          {project.overview}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {(project.technologies || []).slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 border border-slate-200 text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer CTA Button */}
                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">
                        {project.link?.includes("http") ? "Live Web App" : "Case Study"}
                      </span>

                      {project.link?.startsWith("http") ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-white bg-sky-50 hover:bg-sky-600 px-3.5 py-1.5 rounded-xl border border-sky-200 transition-all duration-300 group/btn"
                        >
                          <span>Visit Site</span>
                          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      ) : (
                        <Link
                          to={project.link || "#"}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-white bg-sky-50 hover:bg-sky-600 px-3.5 py-1.5 rounded-xl border border-sky-200 transition-all duration-300 group/btn"
                        >
                          <span>View Details</span>
                          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-600">We couldn't find any projects in this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        <CTA />
      </div>
    </Layout>
  );
};

export default Projects;
