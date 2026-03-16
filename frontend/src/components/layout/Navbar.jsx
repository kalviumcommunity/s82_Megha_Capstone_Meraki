import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white fill-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Meraki
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/opportunities" className="text-foreground hover:text-primary transition-colors">
                            Opportunities
                        </Link>
                        <Link to="/events" className="text-foreground hover:text-primary transition-colors">
                            Events
                        </Link>
                        <Link to="/community" className="text-foreground hover:text-primary transition-colors">
                            Community
                        </Link>
                        <Link to="/training" className="text-foreground hover:text-primary transition-colors">
                            Training
                        </Link>
                        <Link to="/donations" className="text-foreground hover:text-primary transition-colors">
                            Donate
                        </Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/signin"
                            className="px-4 py-2 text-foreground hover:text-primary transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-white">
                    <div className="px-4 py-4 space-y-4">
                        <Link
                            to="/opportunities"
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Opportunities
                        </Link>
                        <Link
                            to="/events"
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Events
                        </Link>
                        <Link
                            to="/community"
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Community
                        </Link>
                        <Link
                            to="/training"
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Training
                        </Link>
                        <Link
                            to="/donations"
                            className="block text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Donate
                        </Link>
                        <div className="pt-4 border-t border-border space-y-3">
                            <Link
                                to="/signin"
                                className="block w-full text-center px-4 py-2 border border-primary text-primary rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
