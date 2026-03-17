import { Heart, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Modular Footer Components
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import FooterNewsletter from "./FooterNewsletter";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-24 pt-20 pb-12 overflow-hidden relative">


            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Top Section: Brand + Links + Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
                    {/* Left: Brand & Social */}
                    <div className="lg:col-span-4 flex flex-col gap-10">
                        <FooterBrand />
                        <div className="flex flex-col gap-4">
                            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Connect with us</h4>
                            <FooterSocial />
                        </div>
                    </div>

                    {/* Middle: Categorized Links */}
                    <div className="lg:col-span-5">
                        <FooterLinks />
                    </div>

                    {/* Right: Newsletter */}
                    <div className="lg:col-span-3">
                        <FooterNewsletter />

                        {/* Partner Badge Placeholder */}
                        <div className="mt-12 p-5 bg-gray-50/50 border border-gray-100 rounded-3xl group cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-blue-500 rounded-sm italic text-[8px] font-black text-white flex items-center justify-center">UN</div>
                                </div>
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none">Global Compact</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider leading-relaxed">
                                Supporting Sustainable Development Goals for modern community resilience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal Utilities */}
                <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                            © 2026 Meraki. Designed with <Heart className="inline w-3 h-3 text-rose-500 fill-rose-500 mx-1" /> for communities.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link to="/privacy" className="text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-widest">Privacy Policy</Link>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <Link to="/terms" className="text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-widest">Terms of Service</Link>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <Link to="/cookies" className="text-[10px] font-black text-gray-500 hover:text-primary transition-colors uppercase tracking-widest">Cookies</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[9px] font-black text-[#6b7280] uppercase tracking-[0.2em]">Contact Support</span>
                            <div className="flex items-center gap-2 text-sm font-black text-gray-900 group">
                                <Mail className="w-4 h-4 text-[#5B3DF5] group-hover:scale-110 transition-transform" />
                                <span className="text-[#1a1a1a]">hello@meraki.org</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-gray-100 hidden md:block" />
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-[#5B3DF5] uppercase tracking-widest">Platform Operational</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Text */}
                <div className="absolute bottom-[-2.5rem] right-[-2.5rem] text-[10rem] font-black text-gray-50/50 pointer-events-none select-none tracking-tighter italic">
                    meraki
                </div>
            </div>
        </footer>
    );
}
