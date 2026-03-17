import { X, Heart, Zap, Calendar, Users, GraduationCap, Target, Mail, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MobileNavigationDrawer({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <Link to="/" onClick={onClose} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">Meraki</span>
                    </Link>
                    <button onClick={onClose} className="p-2 bg-gray-50 rounded-xl">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-6">
                    <div className="space-y-8">
                        {/* Explore Section */}
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Explore Platform</h4>
                            <div className="flex flex-col gap-4">
                                <Link to="/opportunities" onClick={onClose} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span className="font-black text-gray-900 text-sm">Opportunities</span>
                                </Link>
                                <Link to="/events" onClick={onClose} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="font-black text-gray-900 text-sm">Events</span>
                                </Link>
                                <Link to="/community" onClick={onClose} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="font-black text-gray-900 text-sm">Community feed</span>
                                </Link>
                            </div>
                        </div>

                        {/* Learning Section */}
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Build Skills</h4>
                            <div className="flex flex-col gap-4">
                                <Link to="/training" onClick={onClose} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <span className="font-black text-gray-900 text-sm">Training Hub</span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-50 space-y-4 bg-gray-50/50">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-gray-900">{user.name}</span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{user.role || "Volunteer"}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { logout(); onClose(); }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-black text-rose-500 bg-white border border-rose-100 rounded-2xl"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/signin" onClick={onClose} className="px-4 py-3 text-center text-xs font-black text-gray-900 bg-white border border-gray-100 rounded-2xl uppercase tracking-widest">
                                Sign In
                            </Link>
                            <Link to="/signup" onClick={onClose} className="px-4 py-3 text-center text-xs font-black text-white bg-primary rounded-2xl uppercase tracking-widest shadow-lg shadow-primary/20">
                                Join
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
