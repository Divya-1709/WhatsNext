import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import founderImg from "../../../assets/images/team/founder.png";
import keerthyImg from "../../../assets/images/team/keerthy.png";
import abiramiImg from "../../../assets/images/team/abirami.png";
import deekshaImg from "../../../assets/images/team/deeksha.png";
import divyaImg from "../../../assets/images/team/divya.png";
import anusuyadeviImg from "../../../assets/images/team/anusuyadevi.png";
import padmapriyaImg from "../../../assets/images/team/padmapriya.png";
import immanuelImg from "../../../assets/images/team/immanuel.png";

// Default team members array
export const defaultTeamMembers = [
    {
        id: 1,
        name: "Jawahar Bala",
        role: "FOUNDER & CEO • LEADERSHIP",
        tags: ["LEADERSHIP", "STRATEGY", "INNOVATION"],
        bio: "Jawahar Bala is the Founder & CEO of Whatsnext Infotech, leading digital transformation initiatives and empowering modern enterprises with cutting-edge software solutions.",
        image: founderImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 2,
        name: "Keerthy",
        role: "MANAGER • OPERATIONS & MANAGEMENT",
        tags: ["MANAGEMENT", "OPERATIONS", "STRATEGY"],
        bio: "Keerthy oversees operations and client management at Whatsnext Infotech, ensuring seamless project execution and strong team collaboration.",
        image: keerthyImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 3,
        name: "Abirami",
        role: "BUSINESS DEVELOPMENT • GROWTH TEAM",
        tags: ["BUSINESS DEV", "CLIENT RELATIONS", "GROWTH"],
        bio: "Abirami leads business development at Whatsnext Infotech, driving strategic partnerships, client acquisitions, and revenue growth.",
        image: abiramiImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 4,
        name: "Deeksha",
        role: "SOFTWARE DEVELOPER • ENGINEERING TEAM",
        tags: ["REACT", "NODE.JS", "FULL-STACK"],
        bio: "Deeksha is a skilled Software Developer at Whatsnext Infotech, building scalable web applications and robust digital solutions.",
        image: deekshaImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 5,
        name: "Divya",
        role: "SOFTWARE DEVELOPER • ENGINEERING TEAM",
        tags: ["FULL-STACK", "FRONTEND", "UI/UX"],
        bio: "Divya is a talented Software Developer at Whatsnext Infotech, crafting interactive user interfaces and high-performance frontend solutions.",
        image: divyaImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 6,
        name: "Anusuyadevi",
        role: "SOFTWARE DEVELOPER • ENGINEERING TEAM",
        tags: ["FULL-STACK", "SOFTWARE DEV", "ENGINEERING"],
        bio: "Anusuyadevi is a Software Developer at Whatsnext Infotech, dedicated to developing robust web solutions and driving technical innovation.",
        image: anusuyadeviImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 7,
        name: "PadmaPriya",
        role: "SOFTWARE DEVELOPER • ENGINEERING TEAM",
        tags: ["FULL-STACK", "SOFTWARE DEV", "ENGINEERING"],
        bio: "PadmaPriya is a skilled Software Developer at Whatsnext Infotech, building scalable web applications and innovative software solutions.",
        image: padmapriyaImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 8,
        name: "Immanuel",
        role: "SOFTWARE DEVELOPER • ENGINEERING TEAM",
        tags: ["FULL-STACK", "SOFTWARE DEV", "ENGINEERING"],
        bio: "Immanuel is a Software Developer at Whatsnext Infotech, building high-quality web applications and robust backend & frontend systems.",
        image: immanuelImg,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    }
];

const TeamShowcase = ({ members = defaultTeamMembers }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const thumbnailRefs = useRef([]);
    const thumbnailsContainerRef = useRef(null);

    useEffect(() => {
        if (!members || members.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % members.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [members]);

    useEffect(() => {
        const container = thumbnailsContainerRef.current;
        const activeEl = thumbnailRefs.current[activeIndex];
        if (container && activeEl) {
            const containerWidth = container.offsetWidth;
            const itemOffsetLeft = activeEl.offsetLeft;
            const itemWidth = activeEl.offsetWidth;

            const targetScrollLeft = itemOffsetLeft - containerWidth / 2 + itemWidth / 2;
            container.scrollTo({
                left: targetScrollLeft,
                behavior: "smooth",
            });
        }
    }, [activeIndex]);

    const activeMember = members[activeIndex] || members[0];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % members.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
    };

    return (
        <section className="relative overflow-hidden bg-[#0a0e17] py-24 min-h-[750px] flex items-center">
            {/* Split Diagonal Background Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Light left side panel with sharp angled cut */}
                <div
                    className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-white z-0"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 84% 100%, 0 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">

                    {/* ── LEFT COLUMN: Text Header & Thumbnail Carousel ── */}
                    <div className="lg:col-span-5 flex flex-col justify-between py-6 z-10">
                        <div>
                            {/* Brand / Subtitle */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-[2px] bg-slate-900" />
                                <span className="text-[11px] font-extrabold tracking-[0.22em] text-slate-800 uppercase">
                                    WHATSNEXT INFOTECH
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-900 font-heading tracking-tight leading-[1.05] mb-6">
                                Our<br />Team
                            </h2>

                            {/* Description */}
                            <p className="text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-md mb-12">
                                We&#39;re a global consultancy helping the world&#39;s most ambitious change makers define the future.
                            </p>
                        </div>

                        {/* Thumbnails Row & Navigation */}
                        <div className="mt-4">
                            <div
                                ref={thumbnailsContainerRef}
                                className="flex items-center gap-4 mb-8 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                            >
                                {members.map((m, idx) => {
                                    const isActive = idx === activeIndex;
                                    return (
                                        <button
                                            key={m.id || idx}
                                            ref={(el) => (thumbnailRefs.current[idx] = el)}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 transform bg-gradient-to-b from-slate-100 to-slate-200 ${
                                                isActive
                                                    ? "ring-4 ring-slate-900 scale-105 shadow-xl z-20"
                                                    : "opacity-40 hover:opacity-80 scale-95"
                                            }`}
                                            style={{ width: "88px", height: "110px" }}
                                        >
                                            <img
                                                src={m.image}
                                                alt={m.name}
                                                className="w-full h-full object-contain object-bottom pt-2"
                                            />
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Nav Buttons & Progress Line */}
                            <div className="flex items-center gap-4 max-w-xs">
                                <button
                                    onClick={handlePrev}
                                    className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all"
                                    aria-label="Previous member"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-md"
                                    aria-label="Next member"
                                >
                                    <ChevronRight size={18} />
                                </button>

                                {/* Progress bar */}
                                <div className="flex-1 h-[2px] bg-slate-200 rounded-full overflow-hidden ml-2">
                                    <motion.div
                                        className="h-full bg-slate-900"
                                        initial={false}
                                        animate={{
                                            width: `${((activeIndex + 1) / members.length) * 100}%`,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── CENTER COLUMN: Standing Portrait ── */}
                    <div className="lg:col-span-3 flex justify-center items-end relative min-h-[460px] lg:min-h-[580px] z-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeMember.id || activeIndex}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full h-full flex items-end justify-center"
                            >
                                <img
                                    src={activeMember.image}
                                    alt={activeMember.name}
                                    className="max-h-[540px] lg:max-h-[620px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── RIGHT COLUMN: Dark Member Info Card ── */}
                    <div className="lg:col-span-4 flex items-center justify-center lg:justify-end z-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeMember.id || activeIndex}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full bg-[#161d2a]/95 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl backdrop-blur-md"
                            >
                                {/* Top Tech Tag Pills */}
                                <div className="flex flex-wrap items-center gap-2 justify-start lg:justify-end mb-8">
                                    {activeMember.tags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-md bg-white/10 text-[11px] font-bold text-gray-200 tracking-wider uppercase border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Member Name */}
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight mb-2 text-left lg:text-right">
                                    {activeMember.name}
                                </h3>

                                {/* Member Role */}
                                <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-6 text-left lg:text-right">
                                    {activeMember.role}
                                </p>

                                {/* Bio Description */}
                                <p className="text-sm lg:text-[15px] text-gray-300 leading-relaxed mb-8 text-left lg:text-right">
                                    {activeMember.bio}
                                </p>

                                {/* Divider line */}
                                <div className="w-full h-px bg-white/10 mb-6" />

                                {/* Social Links */}
                                <div className="flex items-center justify-start lg:justify-end gap-4 text-gray-400">
                                    {activeMember.socials?.linkedin && (
                                        <a
                                            href={activeMember.socials.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-white transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                        </a>
                                    )}
                                    {activeMember.socials?.twitter && (
                                        <a
                                            href={activeMember.socials.twitter}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-white transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                        </a>
                                    )}
                                    {activeMember.socials?.website && (
                                        <a
                                            href={activeMember.socials.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="hover:text-white transition-colors"
                                        >
                                            <Globe size={18} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TeamShowcase;
