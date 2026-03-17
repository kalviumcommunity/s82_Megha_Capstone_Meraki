import { ChevronDown, Zap, Calendar, Users, GraduationCap, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const platformLinks = [
    { label: "Find Opportunities", path: "/opportunities", icon: Zap, desc: "Connect with projects", color: "text-amber-500 bg-amber-50" },
    { label: "Events Calendar", path: "/events", icon: Calendar, desc: "Join community workshops", color: "text-primary bg-primary/5" },
    { label: "Community Feed", path: "/community", icon: Users, desc: "See the latest impact", color: "text-secondary bg-secondary/5" }
];

const learningLinks = [
    { label: "Training Hub", path: "/training", icon: GraduationCap, desc: "Build impact skills", color: "text-blue-500 bg-blue-50" }
];

export default function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <div className="hidden md:flex items-center gap-1 transition-all">
            {/* Explore Mega Menu */}
            <div
                className="relative group"
                onMouseEnter={() => setActiveMenu('explore')}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all rounded-xl
                    ${activeMenu === 'explore' ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-900'}
                `}>
                    Explore <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'explore' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'explore' && (
                    <div className="absolute left-0 mt-2 w-[480px] bg-white border border-gray-100 rounded-[2.5rem] shadow-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-300 z-[100]">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 mb-2">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-3">Platform Core</h4>
                            </div>
                            {platformLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className="group flex items-start gap-4 p-4 rounded-[2rem] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-gray-900">{item.label}</span>
                                        <span className="text-[11px] font-medium text-gray-400 mt-1">{item.desc}</span>
                                    </div>
                                </Link>
                            ))}
                            <div className="col-span-2 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2rem] mt-2 flex items-center justify-between group cursor-pointer border border-primary/10">
                                <div>
                                    <h5 className="text-xs font-black text-primary uppercase tracking-widest">Featured Story</h5>
                                    <p className="text-sm font-bold text-gray-900 mt-1 italic">"How Meraki changed our town's park design"</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                                    <Heart className="w-4 h-4 fill-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Learning Mega Menu */}
            <div
                className="relative group"
                onMouseEnter={() => setActiveMenu('learning')}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all rounded-xl
                    ${activeMenu === 'learning' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-900'}
                `}>
                    Learning <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'learning' ? 'rotate-180' : ''}`} />
                </button>

                {activeMenu === 'learning' && (
                    <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-100 rounded-[2rem] shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 z-[100]">
                        <div className="flex flex-col gap-1">
                            {learningLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-gray-900">{item.label}</span>
                                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tight mt-0.5">{item.desc}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Regular Links */}
            <Link to="/donations" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-all rounded-xl hover:bg-gray-50">
                Impact
            </Link>
        </div>
    );
}
