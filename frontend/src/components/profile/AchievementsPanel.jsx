import { Award, Lock, Info, ChevronRight } from "lucide-react";

const badges = [
    { name: "100 Hours Club", icon: "⏰", color: "from-primary to-secondary", unlocked: true },
    { name: "Community Hero", icon: "💫", color: "from-secondary to-accent", unlocked: true },
    { name: "Eco Champion", icon: "🌱", color: "from-accent to-primary", unlocked: true },
    { name: "Team Leader", icon: "👥", color: "from-primary to-accent", unlocked: true },
    { name: "5-Star Vol.", icon: "⭐", color: "from-secondary to-primary", unlocked: true },
    { name: "Impact Maker", icon: "💪", color: "from-primary to-secondary", unlocked: true },
];

const lockedAchievements = [
    { name: "Master Mentor", icon: "🎓", progress: 65, goal: "Mentor 5 peers" },
    { name: "Crisis Lead", icon: "🚨", progress: 20, goal: "3 Emergency ops" },
];

export default function AchievementsPanel() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Achievements
                </h3>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">8 / 24 Unlocked</span>
            </div>

            {/* Unlocked Badges */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className={`group relative p-4 rounded-3xl bg-gradient-to-br ${badge.color} text-center hover:scale-105 transition-all duration-500 shadow-lg shadow-black/5 cursor-help`}
                        title={`Awarded for ${badge.name}`}
                    >
                        <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">{badge.icon}</div>
                        <div className="text-[8px] text-white font-black uppercase tracking-wider opacity-90">{badge.name}</div>
                        {/* Sparkle effect */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                    </div>
                ))}
            </div>

            {/* In Progress */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Next Milestones</h4>
                    <Info className="w-3.5 h-3.5 text-gray-300" />
                </div>

                {lockedAchievements.map((item, index) => (
                    <div key={index} className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-primary/10 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-300 shadow-sm border border-gray-100">
                                <Lock className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <h5 className="text-sm font-black text-gray-700">{item.name}</h5>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.goal}</p>
                            </div>
                            <span className="text-xs font-black text-gray-400">{item.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-gray-100">
                            <div
                                className="h-full bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-primary group-hover:to-secondary transition-all duration-500 rounded-full"
                                style={{ width: `${item.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 hover:text-gray-600 transition-all">
                Full Achievement Wall <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
