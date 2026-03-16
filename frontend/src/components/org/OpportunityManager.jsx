import { useState } from "react";
import { Eye, Edit2, XCircle, Users, ChevronRight } from "lucide-react";

const opportunities = [
    { id: 1, title: "Community Garden Initiative", status: "Active", category: "Environment", views: 156, applications: 23, capacity: 40 },
    { id: 2, title: "Food Bank Distribution", status: "Active", category: "Hunger Relief", views: 89, applications: 12, capacity: 20 },
    { id: 3, title: "Educational Workshop Series", status: "Urgent", category: "Education", views: 203, applications: 34, capacity: 50 },
];

const statusStyle = {
    Active: "bg-green-100 text-green-700",
    Urgent: "bg-orange-100 text-orange-700",
    Paused: "bg-gray-100 text-gray-500",
};

export default function OpportunityManager() {
    const [items, setItems] = useState(opportunities);

    const togglePause = (id) => {
        setItems((prev) => prev.map((o) =>
            o.id === id ? { ...o, status: o.status === "Paused" ? "Active" : "Paused" } : o
        ));
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-extrabold text-gray-900">Active Opportunities</h2>
                <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="space-y-4">
                {items.map((opp) => {
                    const fillPct = Math.round((opp.applications / opp.capacity) * 100);
                    return (
                        <div key={opp.id} className="border border-gray-100 rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all">
                            <div className="flex justify-between items-start mb-3 gap-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-1 truncate">{opp.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {opp.views} views</span>
                                        <span>·</span>
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {opp.applications} / {opp.capacity} joined</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${statusStyle[opp.status]}`}>{opp.status}</span>
                                </div>
                            </div>

                            {/* Capacity Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-400 font-medium mb-1">
                                    <span>Capacity</span>
                                    <span className="font-bold text-gray-600">{fillPct}% filled</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${fillPct >= 90 ? "bg-red-400" : fillPct >= 60 ? "bg-orange-400" : "bg-gradient-to-r from-primary to-secondary"}`}
                                        style={{ width: `${fillPct}%` }}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-semibold rounded-lg border border-gray-100">{opp.category}</span>
                                <div className="ml-auto flex items-center gap-1.5">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" aria-label="Edit opportunity">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => togglePause(opp.id)}
                                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                                    >
                                        {opp.status === "Paused" ? "Resume" : "Pause"}
                                    </button>
                                    <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                        Applicants
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
