import { TreePine, Utensils, BookOpen, HeartHandshake } from "lucide-react";

const impacts = [
    { label: "Trees Planted", value: "1,200", icon: TreePine, color: "text-green-600", bg: "bg-green-100", progress: 85, gradient: "from-green-500 to-emerald-400" },
    { label: "Meals Distributed", value: "3,420", icon: Utensils, color: "text-orange-600", bg: "bg-orange-100", progress: 92, gradient: "from-orange-500 to-amber-400" },
    { label: "Students Mentored", value: "450", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100", progress: 60, gradient: "from-blue-500 to-cyan-400" },
    { label: "Communities Helped", value: "15", icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-100", progress: 75, gradient: "from-rose-500 to-pink-400" },
];

export default function ImpactMetrics() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-gray-900 text-lg">Community Impact</h3>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">YTD 2026</span>
            </div>

            <div className="space-y-5">
                {impacts.map((impact) => {
                    const Icon = impact.icon;
                    return (
                        <div key={impact.label} className="group cursor-default">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-lg ${impact.bg} flex items-center justify-center`}>
                                        <Icon className={`w-4 h-4 ${impact.color}`} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{impact.label}</span>
                                </div>
                                <span className="font-extrabold text-gray-900 tabular-nums">{impact.value}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${impact.gradient} transition-all duration-1000 ease-out`}
                                    style={{ width: `${impact.progress}%` }}
                                />
                            </div>
                            <div className="flex justify-end mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{impact.progress}% to Annual Goal</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
