import { Zap, Target, Star, Shield } from "lucide-react";

const skills = [
    { name: "Volunteer Leadership", level: 85, icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { name: "Environmental Conservation", level: 60, icon: Shield, color: "text-green-600", bg: "bg-green-100" },
    { name: "Community Education", level: 45, icon: Zap, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "Crisis Response", level: 30, icon: Star, color: "text-rose-600", bg: "bg-rose-100" },
];

export default function SkillDevelopmentInsights() {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-gray-900 text-lg">Skill Development</h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Based on completions</span>
            </div>

            <div className="space-y-6">
                {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                        <div key={skill.name} className="group">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl ${skill.bg} flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${skill.color}`} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{skill.name}</span>
                                </div>
                                <span className="font-black text-gray-900 tabular-nums">{skill.level}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all uppercase tracking-widest">
                View Full Skill Map
            </button>
        </div>
    );
}
