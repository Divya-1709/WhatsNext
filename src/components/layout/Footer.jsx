import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

// The footer now has a strictly unique premium dark background color (#0A0F1C) used nowhere else.
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0A0F1C] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="inline-block mb-6 bg-white p-3 rounded-xl shadow-lg">
                            <img
                                src="/logo.png"
                                alt="What's Next Infotech"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mb-8">
                            Empowering modern businesses with enterprise-grade software solutions, scalable architecture, and data-driven growth strategies.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-lg hover:shadow-brand-blue/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-lg hover:shadow-brand-blue/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </a>
                            <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-lg hover:shadow-brand-blue/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-3 lg:col-start-6">
                        <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Services</h4>
                        <ul className="space-y-4">
                            <li><Link to="/services#web" className="text-gray-400 hover:text-white text-[15px] transition-colors">Web Development</Link></li>
                            <li><Link to="/services#mobile" className="text-gray-400 hover:text-white text-[15px] transition-colors">Mobile Applications</Link></li>
                            <li><Link to="/services#marketing" className="text-gray-400 hover:text-white text-[15px] transition-colors">Digital Marketing</Link></li>
                            <li><Link to="/services#seo" className="text-gray-400 hover:text-white text-[15px] transition-colors">SEO Services</Link></li>
                            <li><Link to="/services#branding" className="text-gray-400 hover:text-white text-[15px] transition-colors">Logo & Branding</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-white text-[15px] transition-colors">About Us</Link></li>
                            <li><Link to="/projects" className="text-gray-400 hover:text-white text-[15px] transition-colors">Our Work</Link></li>
                            <li><Link to="/careers" className="text-gray-400 hover:text-white text-[15px] transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white text-[15px] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold font-heading mb-6 tracking-wide">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-[15px]">
                                <MapPin size={18} className="text-brand-blue flex-shrink-0 mt-0.5" />
                                <span>No 53 Anna Street, Valasaravakkam, Chennai - 600087</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-[15px]">
                                <Phone size={18} className="text-brand-blue flex-shrink-0" />
                                <span>+91 9629568371</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-[15px]">
                                <Mail size={18} className="text-brand-blue flex-shrink-0" />
                                <span>whatsnextdest@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} Whatsnext Infotech. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;