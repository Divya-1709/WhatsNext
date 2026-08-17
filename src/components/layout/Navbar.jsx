import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    {
        label: "Services",
        children: [
            { label: "Web Development", path: "/services#web" },
            { label: "Mobile App Development", path: "/services#mobile" },
            { label: "Digital Marketing", path: "/services#marketing" },
            { label: "SEO Services", path: "/services#seo" },
            { label: "HR Consulting", path: "/services#hr" },
            { label: "Logo & Branding", path: "/services#branding" },
        ],
    },
    { label: "Projects", path: "/projects" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    const isContactPage = pathname === "/contact";

    // Pages with dark hero backgrounds show white nav text when transparent.
    // All other pages use dark text at all times.
    const useWhiteText = (isHome || isContactPage) && !scrolled;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <header
            id="main-navbar"
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled
                ? "bg-white/90 backdrop-blur-lg border-gray-100 shadow-sm"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">

                {/* Logo */}
                <Link to="/" className="flex-shrink-0 flex items-center">
                    <img
                        src="/logo.png"
                        alt="What's Next Infotech"
                        className="w-auto object-contain transition-transform hover:opacity-90"
                        style={{ height: '56px', maxHeight: '56px' }}
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.label} className="relative group">
                                <Link
                                    to="/services"
                                    className={`px-3 py-2 text-[15px] font-medium transition-colors flex items-center gap-1 rounded-md ${useWhiteText ? "text-white hover:text-white/80 hover:bg-white/10" : "text-navy-700 hover:text-navy-950 hover:bg-gray-50/50"}`}
                                >
                                    {link.label}
                                    <ChevronDown
                                        size={14}
                                        className={`group-hover:rotate-180 transition-transform duration-300 ${useWhiteText ? "text-white/60 group-hover:text-white" : "text-gray-400 group-hover:text-navy-950"}`}
                                    />
                                </Link>

                                {/* Dropdown */}
                                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                                    <div className="bg-white rounded-xl shadow-xl shadow-navy-900/5 border border-gray-100 p-2 min-w-[260px]">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                to={child.path}
                                                className="block px-4 py-2.5 text-[14px] text-navy-700 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                to={link.path}
                                className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors ${useWhiteText ? "text-white hover:text-white/80 hover:bg-white/10" : "text-navy-700 hover:text-navy-950 hover:bg-gray-50/50"}`}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* CTA Button */}
                <Link
                    to="/contact"
                    className={`hidden lg:inline-flex items-center justify-center text-[14px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 ${useWhiteText
                        ? "bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-navy-950"
                        : "bg-navy-950 hover:bg-brand-blue text-white shadow-md shadow-navy-900/10 hover:shadow-brand-blue/20"
                        }`}
                >
                    Get in touch
                </Link>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden relative z-50 p-2 rounded-md transition-colors cursor-pointer ${useWhiteText ? "text-white hover:bg-white/10" : "text-navy-900 hover:bg-gray-100"}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-300 lg:hidden ${isOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <div className="flex flex-col pt-24 px-6 h-full overflow-y-auto pb-10">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div key={link.label} className="border-b border-gray-100">
                                <div className="flex items-center justify-between py-4">
                                    <Link
                                        to="/services"
                                        className="text-lg font-medium text-navy-900 hover:text-brand-blue transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    <button
                                        className="p-1 cursor-pointer"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-300 text-gray-400 ${dropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${dropdownOpen ? "max-h-[400px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}
                                >
                                    <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-100">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                to={child.path}
                                                className="block py-2 text-[15px] text-navy-700 hover:text-brand-blue transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                to={link.path}
                                className="py-4 text-lg font-medium text-navy-900 border-b border-gray-100 hover:text-brand-blue transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                    <Link
                        to="/contact"
                        className="mt-8 bg-brand-blue text-white text-center py-4 rounded-xl font-medium shadow-lg shadow-brand-blue/20 hover:bg-brand-blue-dark transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Get in touch
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;