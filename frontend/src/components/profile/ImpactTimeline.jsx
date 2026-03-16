import { TrendingUp, Award, CheckCircle2, Star, Calendar } from "lucide-react";

const milestones = [
    {
        id: 1,
        type: "milestone",
        title: "Reached 150 Hour Milestone",
        description: "Congratulations on contributing 150+ hours to community service!",
        date: "2 days ago",
        icon: TrendingUp,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        id: 2,
        type: "badge",
        title: "Earned Community Hero Badge",
        description: "Recognized for outstanding commitment to community development",
        date: "1 week ago",
        icon: Award,
        color: "text-secondary",
        bg: "bg-secondary/10",
    },
    {
        id: 3,
        type: "project",
        title: "Completed Garden Initiative",
        description: "Successfully completed 45 hours with Green Earth Foundation",
        date: "2 weeks ago",
        icon: CheckCircle2,
        color: "text-green-500",
        bg: "bg-green-50",
    },
    {
        id: 4,
        type: "rating",
        title: "Received 5-Star Feedback",
        description: "Ocean Guardians commended your reliability and passion",
        date: "1 month ago",
        icon: Star,
        color: "text-amber-500",
        bg: "bg-amber-50",
    },
];

export default function ImpactTimeline() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Timeline background line */}
            <div className="absolute left-[3.25rem] top-24 bottom-24 w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 rounded-full" />

            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-3">
                        Impact Timeline
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your volunteering journey legacy</p>
                </div>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 hover:text-primary hover:border-primary/20 transition-all">
                    <Calendar className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-12">
                {milestones.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="relative flex gap-6 group">
                            <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center relative z-10 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-7 h-7 ${item.color}`} />
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-lg font-black text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest shrink-0 ml-4">
                                        {item.date}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-500 max-w-lg leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-12 py-4 border-2 border-dashed border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:border-primary/20 hover:text-primary hover:bg-primary/5 transition-all">
                View Full Timeline
            </button>
        </div>
    );
}
