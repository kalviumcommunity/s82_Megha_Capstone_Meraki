import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

// Modular Navbar Components
import NavbarLogo from "./NavbarLogo";
import NavbarSearch from "./NavbarSearch";
import NavbarUserMenu from "./NavbarUserMenu";
import MegaMenu from "./MegaMenu";
import MobileNavigationDrawer from "./MobileNavigationDrawer";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Mock user state (In production, replace with real Auth logic)
    const [user, setUser] = useState({ name: "Sarah Anderson", role: "Volunteer" });

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] border-b transition-all duration-500 
            ${scrolled
                ? 'bg-white/80 backdrop-blur-xl border-gray-100 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-white border-transparent py-4'}
        `}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center bg-white/0">
                    {/* Left: Logo & Core Links */}
                    <div className="flex items-center gap-12">
                        <NavbarLogo />
                        <MegaMenu />
                    </div>

                    {/* Right: Search, User, Actions */}
                    <div className="flex items-center gap-6">
                        <NavbarSearch />

                        <div className="h-6 w-px bg-gray-100 mx-2 hidden lg:block" />

                        {user ? (
                            <NavbarUserMenu user={user} />
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    to="/signin"
                                    className="px-6 py-2 content-[''] font-black text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-8 py-2.5 bg-gray-900 text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary shadow-xl shadow-black/5 hover:shadow-primary/20 transition-all active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="md:hidden p-3 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white transition-all active:scale-90"
                            aria-label="Open Navigation"
                        >
                            <Menu className="w-5 h-5 text-gray-900" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Overlay */}
            <MobileNavigationDrawer
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                user={user}
            />
        </nav>
    );
}

export default Navbar;
