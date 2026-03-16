import { BookOpen, Clock, Award, Users } from "lucide-react";

const stats = [
    {
        label: "Courses In Progress",
        value: "2",
        icon: BookOpen,
        gradient: "from-primary to-secondary",
        bg: "bg-primary/5",
    },
    {
        label: "Learning Hours",
        value: "42.5",
        icon: Clock,
        gradient: "from-secondary to-accent",
        bg: "bg-secondary/5",
    },
    {
        label: "Certificates Earned",
        value: "3",
        icon: Award,
        gradient: "from-accent to-primary",
        bg: "bg-accent/5",
    },
    {
        label: "Skills Developed",
        value: "8",
        icon: Users,
        gradient: "from-green-400 to-emerald-500",
        bg: "bg-green-50",
    },
];

export default function LearningStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.label}
                        className={`${stat.bg} rounded-3xl p-6 border border-white shadow-sm hover:shadow-md transition-all duration-300 group text-center sm:text-left`}
                    >
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 mx-auto sm:mx-0 mb-4 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-black text-gray-900 mb-0.5 tabular-nums">
                            {stat.value}
                        </div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
}
