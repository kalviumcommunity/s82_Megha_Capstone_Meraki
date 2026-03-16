import { Clock, Heart, Award, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

const stats = [
    {
        label: "Total Hours",
        value: "156",
        change: 12,
        icon: Clock,
        gradient: "from-primary to-secondary",
        bg: "bg-primary/5",
        note: "+3h this week",
    },
    {
        label: "Projects Done",
        value: "12",
        change: 8,
        icon: Heart,
        gradient: "from-secondary to-accent",
        bg: "bg-secondary/5",
        note: "Target: 15",
    },
    {
        label: "Badges Earned",
        value: "8",
        change: 0,
        icon: Award,
        gradient: "from-accent to-primary",
        bg: "bg-accent/5",
        note: "2 in progress",
    },
    {
        label: "Lives Impacted",
        value: "1,247",
        change: 15,
        icon: Users,
        gradient: "from-orange-400 to-rose-500",
        bg: "bg-orange-50",
        note: "In 4 communities",
    },
];

function TrendIcon({ change }) {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
}

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;
                const isPositive = stat.change > 0;
                const isNegative = stat.change < 0;
                return (
                    <div
                        key={stat.label}
                        className={`${stat.bg} rounded-3xl p-6 border border-white shadow-sm hover:shadow-md transition-all duration-300 group`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <TrendIcon change={stat.change} />
                        </div>
                        <div className="text-3xl font-extrabold text-gray-900 mb-0.5 tabular-nums">
                            {stat.value}
                        </div>
                        <div className="text-sm font-bold text-gray-500 mb-2">{stat.label}</div>
                        <div className={`text-xs font-bold flex items-center gap-1 ${isPositive ? "text-green-600" : isNegative ? "text-red-500" : "text-gray-400"}`}>
                            {stat.change !== 0 && (
                                <span>{isPositive ? "+" : ""}{stat.change}%</span>
                            )}
                            <span className="text-gray-400 font-medium">{stat.note}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
