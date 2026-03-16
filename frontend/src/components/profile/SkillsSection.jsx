import { Star, CheckCircle2, Zap } from "lucide-react";

const skills = [
    { name: "Leadership", level: 90, endorsements: 14, category: "Management" },
    { name: "Event Planning", level: 85, endorsements: 8, category: "Operations" },
    { name: "Outreach", level: 75, endorsements: 12, category: "Communication" },
    { name: "Conservation", level: 95, endorsements: 22, category: "Environmental" },
    { name: "Mentoring", level: 70, endorsements: 6, category: "Education" },
];

export default function SkillsSection() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    Skills & Endorsements
                </h3>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>

            <div className="space-y-6">
                {skills.map((skill) => (
                    <div key={skill.name} className="group">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h4 className="text-sm font-black text-gray-700 group-hover:text-primary transition-colors">{skill.name}</h4>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{skill.category}</span>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-[10px] font-black text-gray-900 mb-0.5">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    {skill.endorsements} Endorsements
                                </div>
                                <span className="text-[10px] font-bold text-gray-400">{skill.level}% Proficiency</span>
                            </div>
                        </div>

                        <div className="relative w-full h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                            {/* Proficiency Bar */}
                            <div
                                className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-1000 group-hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
                                style={{ width: `${skill.level}%` }}
                            />
                            {/* Grid markers */}
                            <div className="absolute inset-0 flex justify-between px-1 opacity-20">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="h-full w-px bg-white/50" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 p-5 bg-primary/5 rounded-[2rem] border border-primary/10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Recommended for you</p>
                <div className="flex items-center justify-between">
                    <h5 className="text-sm font-black text-gray-900">Advanced Project Management</h5>
                    <button className="px-4 py-2 bg-white text-[9px] font-black text-primary uppercase tracking-widest rounded-xl border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm">
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    );
}
