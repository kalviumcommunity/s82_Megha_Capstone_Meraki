import { Shield, Target, Zap, Users, Info, Star } from "lucide-react";

const reputationMetrics = [
    { label: "Impact Score", value: 95, icon: Target, color: "text-primary", bg: "bg-primary/10" },
    { label: "Reliability", value: 98, icon: Shield, color: "text-green-500", bg: "bg-green-50" },
    { label: "Engagement", value: 88, icon: Zap, color: "text-secondary", bg: "bg-secondary/10" },
];

export default function CommunityReputation() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            {/* Background Abstract */}
            <Users className="absolute -bottom-12 -right-12 w-48 h-48 text-gray-50 opacity-20 group-hover:scale-110 transition-transform duration-1000" />

            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    Reputation Score
                    <Info className="w-4 h-4 text-gray-300 cursor-help" />
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 relative z-10">
                {reputationMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.label} className="flex items-center gap-5 group/item">
                            <div className={`w-14 h-14 rounded-2xl ${metric.bg} flex items-center justify-center shrink-0 border border-white shadow-xl shadow-black/5 group-hover/item:scale-110 transition-transform`}>
                                <Icon className={`w-7 h-7 ${metric.color}`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{metric.label}</span>
                                    <span className={`text-xl font-black ${metric.color} leading-none`}>{metric.value}<span className="text-[10px] ml-0.5 opacity-50">/100</span></span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                    <div
                                        className={`h-full bg-gradient-to-r from-gray-200 to-current ${metric.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${metric.value}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-3xl text-white shadow-xl shadow-black/10">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 fill-amber-500">
                        <Star className="w-5 h-5 fill-amber-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-tight">Percentile Ranking</p>
                        <h4 className="text-sm font-black">Top 1.5% Volunteers Worldwide</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
