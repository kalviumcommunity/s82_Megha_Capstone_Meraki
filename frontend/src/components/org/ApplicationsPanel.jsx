import { useState } from "react";
import { Check, X, Eye, Filter } from "lucide-react";

const applicants = [
    { id: 1, name: "John Doe", initials: "JD", role: "Community Garden Initiative", time: "2 hours ago", skills: ["Gardening", "Leadership"], level: "Experienced", gradient: "from-primary to-secondary" },
    { id: 2, name: "Sarah Miller", initials: "SM", role: "Food Bank Distribution", time: "5 hours ago", skills: ["Logistics", "Teamwork"], level: "Intermediate", gradient: "from-secondary to-accent" },
    { id: 3, name: "Alex Lee", initials: "AL", role: "Educational Workshop", time: "1 day ago", skills: ["Teaching", "Communication"], level: "New Volunteer", gradient: "from-accent to-primary" },
];

const levelStyle = {
    Experienced: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    "New Volunteer": "bg-orange-100 text-orange-700",
};

const tabs = ["Pending", "Accepted", "Rejected"];

export default function ApplicationsPanel() {
    const [activeTab, setActiveTab] = useState("Pending");
    const [actions, setActions] = useState({});

    const handleAction = (id, action) => setActions((prev) => ({ ...prev, [id]: action }));

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-lg">
                    Recent Applications
                </h3>
                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors" aria-label="Filter applications">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-4 gap-0.5">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {applicants.map((app) => {
                    const acted = actions[app.id];
                    return (
                        <div key={app.id} className={`p-4 rounded-xl border transition-all ${acted === "accept" ? "border-green-200 bg-green-50" : acted === "reject" ? "border-red-100 bg-red-50 opacity-60" : "border-gray-100 hover:border-primary/20"}`}>
                            <div className="flex items-start gap-3 mb-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${app.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {app.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-bold text-sm text-gray-900">{app.name}</span>
                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${levelStyle[app.level]}`}>{app.level}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">{app.role}</p>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {app.skills.map((s) => (
                                            <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">{s}</span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-300 mt-1">{app.time}</p>
                                </div>
                            </div>
                            {!acted ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(app.id, "accept")}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <Check className="w-3.5 h-3.5" /> Accept
                                    </button>
                                    <button
                                        onClick={() => handleAction(app.id, "review")}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Eye className="w-3.5 h-3.5" /> Review
                                    </button>
                                    <button
                                        onClick={() => handleAction(app.id, "reject")}
                                        className="p-1.5 border border-gray-200 text-red-400 rounded-lg hover:bg-red-50 transition-colors"
                                        aria-label="Reject applicant"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <p className={`text-xs font-bold text-center py-1 rounded-lg ${acted === "accept" ? "text-green-600 bg-green-100" : "text-red-500 bg-red-100"}`}>
                                    {acted === "accept" ? "✓ Accepted" : acted === "review" ? "Under Review" : "✗ Rejected"}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
