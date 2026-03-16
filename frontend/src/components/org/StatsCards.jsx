import { Users, Briefcase, Clock, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useMemo } from "react";

const cards = [
    {
        label: "Active Volunteers",
        value: 240,
        change: 12,
        icon: Users,
        gradient: "from-primary to-secondary",
        bg: "bg-primary/5",
        note: "vs last month",
    },
    {
        label: "Projects in Progress",
        value: 18,
        change: 2,
        icon: Briefcase,
        gradient: "from-secondary to-accent",
        bg: "bg-secondary/5",
        note: "5 ending this month",
    },
    {
        label: "Volunteer Hours (June)",
        value: 960,
        change: 23,
        icon: Clock,
        gradient: "from-accent to-primary",
        bg: "bg-accent/5",
        note: "vs prior month",
    },
    {
        label: "Pending Applications",
        value: 47,
        change: -5,
        icon: FileText,
        gradient: "from-orange-400 to-rose-500",
        bg: "bg-orange-50",
        note: "Needs review",
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
            {cards.map((card) => {
                const Icon = card.icon;
                const isPositive = card.change > 0;
                const isNegative = card.change < 0;
                return (
                    <div
                        key={card.label}
                        className={`${card.bg} rounded-2xl p-6 border border-white shadow-sm hover:shadow-md transition-all duration-200 group`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <TrendIcon change={card.change} />
                        </div>
                        <div className="text-3xl font-extrabold text-gray-900 mb-0.5 tabular-nums">
                            {card.value.toLocaleString()}
                        </div>
                        <div className="text-sm font-semibold text-gray-600 mb-2">{card.label}</div>
                        <div className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? "text-green-600" : isNegative ? "text-red-500" : "text-gray-500"}`}>
                            {card.change !== 0 && (
                                <span>{isPositive ? "+" : ""}{card.change}%</span>
                            )}
                            <span className="text-gray-400 font-normal">{card.note}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
