import { Award, Clock, UserPlus } from "lucide-react";

const topVolunteers = [
    { name: "Priya S.", initials: "PS", hours: 84, badge: "⭐ Top Volunteer", gradient: "from-primary to-secondary" },
    { name: "Rahul M.", initials: "RM", hours: 72, badge: "🔥 Rising Star", gradient: "from-secondary to-accent" },
    { name: "Aisha T.", initials: "AT", hours: 61, badge: "💎 Consistent", gradient: "from-accent to-primary" },
];

export default function VolunteerInsights() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">Volunteer Insights</h3>
            <p className="text-xs text-gray-400 font-medium mb-5">Top performers this month</p>

            <div className="space-y-3 mb-5">
                {topVolunteers.map((v, i) => (
                    <div key={v.name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10">
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${v.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                {v.initials}
                            </div>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs border border-gray-100 shadow-sm font-bold text-gray-600">
                                {i + 1}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900">{v.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{v.badge}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {v.hours}h
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
                <UserPlus className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                    <p className="text-xs font-bold text-green-800">+12 new volunteers</p>
                    <p className="text-xs text-green-600 font-medium">joined this week</p>
                </div>
            </div>
        </div>
    );
}
