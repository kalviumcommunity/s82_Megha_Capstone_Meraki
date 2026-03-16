import { Clock, Heart, Award, Star, TrendingUp, Users } from "lucide-react";

const stats = [
    {
        label: "Total Vol. Hours",
        value: "156",
        trend: "+12h",
        icon: Clock,
        gradient: "from-primary to-secondary",
        bg: "bg-primary/5",
    },
    {
        label: "Projects Done",
        value: "12",
        trend: "+2",
        icon: Heart,
        gradient: "from-secondary to-accent",
        bg: "bg-secondary/5",
    },
    {
        label: "Badges Earned",
        value: "8",
        trend: "New!",
        icon: Award,
        gradient: "from-accent to-primary",
        bg: "bg-accent/5",
    },
    {
        label: "Avg. Reliability",
        value: "5.0",
        trend: "Top 1%",
        icon: Star,
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-amber-50",
    },
];

export default function VolunteerStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className={`${stat.bg} rounded-3xl p-6 border border-white shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group overflow-hidden relative`}
                    >
                        {/* Background Ornament */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-[0.03] group-hover:scale-150 transition-transform duration-700 rounded-full`} />

                        <div className="relative z-10">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-3xl font-black text-gray-900 mb-0.5 tabular-nums">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                        <TrendingUp className="w-3 h-3" />
                                        {stat.trend}
                                    </div>
                                    <p className="text-[8px] font-bold text-gray-300 uppercase tracking-wider mt-1">vs Average</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
