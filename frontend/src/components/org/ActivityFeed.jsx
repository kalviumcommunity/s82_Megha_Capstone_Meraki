import { UserPlus, Briefcase, Calendar, Bell, Circle } from "lucide-react";

const activities = [
    {
        id: 1,
        type: "application",
        content: "New application from John Doe for Community Garden Initiative",
        time: "10 minutes ago",
        icon: UserPlus,
        color: "text-primary",
        bg: "bg-primary/10",
        unread: true,
    },
    {
        id: 2,
        type: "update",
        content: "Project 'Food Bank Distribution' reached 80% capacity",
        time: "2 hours ago",
        icon: Briefcase,
        color: "text-secondary",
        bg: "bg-secondary/10",
        unread: true,
    },
    {
        id: 3,
        type: "event",
        content: "Upcoming Event: Volunteer Training Workshop tomorrow at 6:00 PM",
        time: "5 hours ago",
        icon: Calendar,
        color: "text-accent",
        bg: "bg-accent/10",
        unread: false,
    },
];

export default function ActivityFeed() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Activity Feed
                </h3>
                <button className="text-xs font-bold text-primary hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-6">
                {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="relative flex gap-4 transition-all group">
                            <div className={`${activity.bg} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-5 h-5 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <p className={`text-sm leading-snug ${activity.unread ? "font-bold text-gray-900" : "text-gray-600 font-medium"}`}>
                                        {activity.content}
                                    </p>
                                    {activity.unread && (
                                        <Circle className="w-2 h-2 fill-primary text-primary flex-shrink-0 mt-1.5" />
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 font-medium mt-1">{activity.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                View All Activity
            </button>
        </div>
    );
}
