import { TreePine, Utensils, BookOpen, HeartPulse } from "lucide-react";

const impacts = [
    { label: "Trees Planted", value: "45", icon: TreePine, color: "text-green-600", bg: "bg-green-50", progress: 65 },
    { label: "Meals Served", value: "280", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50", progress: 82 },
    { label: "Hours Mentored", value: "112", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", progress: 45 },
    { label: "Lives touched", value: "1,2k", icon: HeartPulse, color: "text-rose-600", bg: "bg-rose-50", progress: 90 },
];

export default function ImpactVisualizer() {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-gray-900 text-lg">Your Real Impact</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase tracking-wider">Lifetime</span>
            </div>

            <div className="space-y-6">
                {impacts.map((impact) => {
                    const Icon = impact.icon;
                    return (
                        <div key={impact.label} className="group cursor-default">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl ${impact.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-5 h-5 ${impact.color}`} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{impact.label}</span>
                                </div>
                                <span className="font-extrabold text-gray-900 tabular-nums">{impact.value}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out`}
                                    style={{ width: `${impact.progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1 text-[10px] font-bold uppercase tracking-wider">
                                <span className="text-gray-400">{impact.progress}% of next goal</span>
                                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">Keep going!</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
