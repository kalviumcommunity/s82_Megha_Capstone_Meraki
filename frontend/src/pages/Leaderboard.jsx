import { useState, useEffect } from "react";
import { Trophy, Award, Zap, Star, ShieldCheck, Flame, Users, ArrowUpRight } from "lucide-react";
import { userApi } from "../lib/api";

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState("volunteers");
    const [volunteers, setVolunteers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await userApi.getMe ? await fetch("http://localhost:5000/api/users/leaderboard").then(r => r.json()) : null;
                if (res && res.volunteers) {
                    setVolunteers(res.volunteers);
                    setOrganizations(res.organizations || []);
                } else {
                    setFallbackData();
                }
            } catch (err) {
                setFallbackData();
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const setFallbackData = () => {
        setVolunteers([
            { id: 1, name: "Sarah Anderson", xp: 1250, level: 8, rankTitle: "Senior Changemaker", badges: [{ title: "Eco Warrior", icon: "🌱" }, { title: "Community Catalyst", icon: "⚡" }], skills: ["Environment", "Youth Mentor"] },
            { id: 2, name: "Marcus Chen", xp: 980, level: 6, rankTitle: "Community Catalyst", badges: [{ title: "Youth Mentor", icon: "🎓" }], skills: ["Coding", "Teaching"] },
            { id: 3, name: "Elena Rostova", xp: 840, level: 5, rankTitle: "Active Volunteer", badges: [{ title: "Eco Warrior", icon: "🌱" }], skills: ["Animal Care"] },
            { id: 4, name: "David Kim", xp: 620, level: 4, rankTitle: "Active Volunteer", badges: [{ title: "Top Contributor", icon: "🏆" }], skills: ["Disaster Relief"] },
            { id: 5, name: "Aisha Patel", xp: 510, level: 3, rankTitle: "Rising Star", badges: [{ title: "Community Catalyst", icon: "⚡" }], skills: ["Healthcare"] },
        ]);
        setOrganizations([
            { id: 1, name: "Green Earth Foundation", description: "Urban agriculture and reforestation drives.", totalVolunteers: 240 },
            { id: 2, name: "Future Leaders Org", description: "Empowering underprivileged youth through mentorship.", totalVolunteers: 180 },
        ]);
    };

    const topThree = volunteers.slice(0, 3);
    const restVolunteers = volunteers.slice(3);

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Hero Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-black uppercase tracking-widest">
                        <Trophy className="w-4 h-4 text-amber-500" /> Community Hall of Fame
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                        Impact <span className="bg-gradient-to-r from-amber-500 via-primary to-emerald-500 bg-clip-text text-transparent">Leaderboard</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-base max-w-xl mx-auto">
                        Celebrating extraordinary volunteers & organizations creating real-world change every single day.
                    </p>

                    {/* Tab Switcher */}
                    <div className="flex justify-center mt-6">
                        <div className="bg-gray-200/80 p-1 rounded-2xl inline-flex">
                            <button
                                onClick={() => setActiveTab("volunteers")}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "volunteers" ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"}`}
                            >
                                Top Volunteers 🏆
                            </button>
                            <button
                                onClick={() => setActiveTab("organizations")}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "organizations" ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-900"}`}
                            >
                                Top NGOs 🏢
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === "volunteers" ? (
                    <>
                        {/* Top 3 Podium */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-6">
                            {/* 2nd Place */}
                            {topThree[1] && (
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative order-2 md:order-1 transform hover:-translate-y-1 transition-all">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center text-white font-black shadow-md">
                                        2nd
                                    </div>
                                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 p-1 mt-3">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-slate-700">
                                            {topThree[1].name.charAt(0)}
                                        </div>
                                    </div>
                                    <h3 className="mt-4 font-black text-gray-900 text-lg">{topThree[1].name}</h3>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{topThree[1].rankTitle}</p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full font-black text-xs">
                                        <Zap className="w-3.5 h-3.5 fill-amber-500" /> {topThree[1].xp} XP
                                    </div>
                                </div>
                            )}

                            {/* 1st Place (Crown) */}
                            {topThree[0] && (
                                <div className="bg-gradient-to-b from-amber-500/10 to-white p-8 rounded-3xl border-2 border-amber-400 shadow-xl text-center relative order-1 md:order-2 transform hover:-translate-y-2 transition-all">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                                        👑 1st
                                    </div>
                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1.5 mt-2 shadow-inner">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-amber-600">
                                            {topThree[0].name.charAt(0)}
                                        </div>
                                    </div>
                                    <h3 className="mt-4 font-black text-gray-900 text-xl">{topThree[0].name}</h3>
                                    <p className="text-xs font-black text-amber-600 uppercase tracking-widest mt-1">{topThree[0].rankTitle}</p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 text-white rounded-full font-black text-sm shadow-md">
                                        <Flame className="w-4 h-4 fill-white" /> {topThree[0].xp} XP (Lvl {topThree[0].level})
                                    </div>
                                </div>
                            )}

                            {/* 3rd Place */}
                            {topThree[2] && (
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative order-3 transform hover:-translate-y-1 transition-all">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-700/60 rounded-full flex items-center justify-center text-white font-black shadow-md">
                                        3rd
                                    </div>
                                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 p-1 mt-3">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-amber-800">
                                            {topThree[2].name.charAt(0)}
                                        </div>
                                    </div>
                                    <h3 className="mt-4 font-black text-gray-900 text-lg">{topThree[2].name}</h3>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{topThree[2].rankTitle}</p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-black text-xs">
                                        <Zap className="w-3.5 h-3.5 fill-amber-600" /> {topThree[2].xp} XP
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Full Rankings Table */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-black text-gray-900 text-base uppercase tracking-wider">Overall Rankings</h3>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Updated Live</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {volunteers.map((vol, index) => (
                                    <div key={vol.id || index} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="w-6 text-center font-black text-gray-400 text-sm">#{index + 1}</span>
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-sm">
                                                {vol.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
                                                    {vol.name}
                                                    {vol.badges?.map((b, i) => (
                                                        <span key={i} title={b.title} className="text-sm">{b.icon || "🏅"}</span>
                                                    ))}
                                                </h4>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{vol.rankTitle || "Volunteer"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-black text-gray-900 text-sm">{vol.xp} XP</div>
                                                <div className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Level {vol.level || 1}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* Organization Leaderboard */
                    <div className="grid sm:grid-cols-2 gap-6">
                        {organizations.map((org, index) => (
                            <div key={org.id || index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center font-black text-emerald-600 text-lg">
                                            🏢
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-gray-900">{org.name}</h3>
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Verified NGO</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Rank #{index + 1}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-500">{org.description}</p>
                                <div className="pt-2 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span>Volunteers Engaged: {org.totalVolunteers || 150}</span>
                                    <button className="text-primary hover:underline font-black flex items-center gap-1">View NGO <ArrowUpRight className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
