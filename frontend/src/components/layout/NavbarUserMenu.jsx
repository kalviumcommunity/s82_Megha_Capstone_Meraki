import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Bell, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";


export default function NavbarUserMenu({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);

    // Mock user if none provided
    const userData = user || {
        name: "Guest User",
        role: "Guest",
        avatar: null
    };

    return (
        <div className="flex items-center gap-5">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:animate-ping" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20 overflow-hidden">
                        {userData.avatar ? <img src={userData.avatar} alt="" /> : userData.name.charAt(0)}
                    </div>
                    <div className="hidden lg:flex flex-col items-start px-2">
                        <span className="text-xs font-black text-gray-900 leading-none">{userData.name}</span>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1 opacity-80">{userData.role}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 z-[100]">
                        <div className="p-3 mb-3 bg-gray-50 rounded-2xl">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-black text-gray-900">Signed in as</span>
                                <span className="text-sm font-medium text-gray-500 truncate">{userData.email || "guest@meraki.org"}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
                                <User className="w-4 h-4 group-hover:scale-110 transition-transform" /> Profile
                            </Link>
                            <Link to={userData.role === 'Volunteer' ? '/volunteer/dashboard' : '/organization/dashboard'} onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
                                <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform" /> Dashboard
                            </Link>
                            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group">
                                <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" /> Settings
                            </Link>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-50">
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
                            >
                                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
