import { CheckCircle2, Award, Clock, Star, Zap } from "lucide-react";

const activities = [
    {
        id: 1,
        type: "log",
        content: "Logged 4 hours for 'Community Garden'",
        time: "2 hours ago",
        icon: Clock,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        id: 2,
        type: "achievement",
        content: "Earned 'Nature Lover' badge",
        time: "Yesterday",
        icon: Award,
        color: "text-amber-500",
        bg: "bg-amber-50",
    },
    {
        id: 3,
        type: "join",
        content: "Joined 'Beach Cleanup Drive' project",
        time: "3 days ago",
        icon: Zap,
        color: "text-primary",
        bg: "bg-primary/5",
    },
    {
        id: 4,
        type: "milestone",
        content: "Reached 150 hours milestone!",
        time: "1 week ago",
        icon: Star,
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
];

export default function ActivityTimeline() {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full">
            <h3 className="font-extrabold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Recent Activity
            </h3>

            <div className="relative space-y-8 before:absolute before:inset-0 before:left-[19px] before:w-0.5 before:bg-gray-100 before:h-full">
                {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="relative flex items-start gap-4">
                            <div className={`relative z-10 w-10 h-10 rounded-xl ${activity.bg} flex items-center justify-center border-4 border-white shadow-sm flex-shrink-0`}>
                                <Icon className={`w-4 h-4 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-sm font-bold text-gray-800 leading-snug">
                                    {activity.content}
                                </p>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-2xl hover:bg-gray-100 hover:text-gray-600 transition-all uppercase tracking-widest">
                View Full History
            </button>
        </div>
    );
}
