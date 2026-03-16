import { useState } from "react";
import { Clock, CheckCircle, XCircle, ChevronRight, AlertCircle, Info } from "lucide-react";

const initialApplications = [
    {
        id: 1,
        title: "Community Garden Initiative",
        org: "Green Earth Foundation",
        initials: "CG",
        gradient: "from-primary to-secondary",
        status: "Under Review",
        appliedDate: "Applied 2 days ago",
        responseTimeline: "Usually responds in 3 days",
    },
    {
        id: 2,
        title: "Youth Mentorship Program",
        org: "Future Leaders Org",
        initials: "YM",
        gradient: "from-secondary to-accent",
        status: "Accepted",
        appliedDate: "Start date: Mar 20",
        responseTimeline: "Next step: Onboarding session",
    },
];

const statusStyles = {
    "Under Review": "bg-amber-100 text-amber-700 border-amber-200",
    "Accepted": "bg-green-100 text-green-700 border-green-200",
    "Pending Interview": "bg-blue-100 text-blue-700 border-blue-200",
};

export default function ApplicationsPanel() {
    const [apps, setApps] = useState(initialApplications);

    const withdrawApp = (id) => {
        setApps(apps.filter(app => app.id !== id));
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-gray-900">Active Applications</h2>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    View History <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                {apps.map((app) => (
                    <div key={app.id} className="group p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${app.gradient} rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-black/5`}>
                                {app.initials}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-gray-900">{app.title}</h3>
                                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${statusStyles[app.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                        {app.status === "Accepted" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                        {app.status}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-400 mb-3">{app.org}</p>

                                <div className="flex flex-wrap items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        {app.appliedDate}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-gray-500 font-medium bg-white px-2 py-0.5 rounded-lg border border-gray-100">
                                        <Info className="w-3.5 h-3.5 text-secondary" />
                                        {app.responseTimeline}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors" onClick={() => withdrawApp(app.id)}>
                                Withdraw
                            </button>
                            <button className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                                Details
                            </button>
                        </div>
                    </div>
                ))}

                {apps.length === 0 && (
                    <div className="py-10 text-center text-gray-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        <p className="text-sm font-medium">No active applications</p>
                    </div>
                )}
            </div>
        </div>
    );
}
