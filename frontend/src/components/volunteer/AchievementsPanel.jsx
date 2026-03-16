import { Award, Star, Heart, Shield, TrendingUp } from "lucide-react";

const badges = [
    { title: "100 Hours Club", earned: "Earned 3 days ago", icon: Star, color: "text-amber-500", bg: "bg-amber-100", gradient: "from-amber-400 to-orange-500" },
    { title: "Community Hero", earned: "Earned 1 week ago", icon: Heart, color: "text-rose-500", bg: "bg-rose-100", gradient: "from-rose-400 to-pink-500" },
    { title: "Eco Guardian", earned: "Earned 2 weeks ago", icon: Shield, color: "text-green-500", bg: "bg-green-100", gradient: "from-green-400 to-emerald-500" },
];

export default function AchievementsPanel() {
    return (
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-6 border border-primary/10">
            <h3 className="font-extrabold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Recent Achievements
            </h3>

            <div className="space-y-5">
                {badges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                        <div key={badge.title} className="flex items-center gap-4 group">
                            <div className={`w-14 h-14 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-7 h-7 text-white fill-white/20" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{badge.title}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{badge.earned}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Next badge progress */}
            <div className="mt-8 pt-6 border-t border-primary/10">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Next: Master Mentor</span>
                    <span className="text-[10px] font-bold text-gray-500">80%</span>
                </div>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-gray-500">
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    <span>2 more hours to go!</span>
                </div>
            </div>
        </div>
    );
}
