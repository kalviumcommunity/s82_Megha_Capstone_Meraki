import { Users, Briefcase, Star, TrendingUp, Settings, Bell } from "lucide-react";

export default function OrgDashboardHeader({ org }) {
    return (
        <div className="bg-white border-b border-gray-100 px-6 py-6 mb-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left: Logo + Org Info */}
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-primary/30 flex-shrink-0">
                        {org.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-extrabold text-gray-900">{org.name}</h1>
                            <span className="px-2.5 py-0.5 text-xs font-bold bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                                Verified NGO
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{org.tagline}</p>
                    </div>
                </div>

                {/* Right: Quick KPI Pills */}
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-primary/5 border border-primary/10 px-4 py-2.5 rounded-xl">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-gray-900">{org.totalVolunteers}</span>
                        <span className="text-xs text-gray-500 font-medium">Volunteers</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/5 border border-secondary/10 px-4 py-2.5 rounded-xl">
                        <Briefcase className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-bold text-gray-900">{org.ongoingProjects}</span>
                        <span className="text-xs text-gray-500 font-medium">Projects</span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-4 py-2.5 rounded-xl">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-bold text-gray-900">{org.impactScore}</span>
                        <span className="text-xs text-gray-500 font-medium">Impact Score</span>
                    </div>
                    <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors" aria-label="Notifications">
                        <Bell className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors" aria-label="Organization Settings">
                        <Settings className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Sub tagline */}
            <p className="mt-5 text-sm text-gray-400 font-medium border-t border-gray-50 pt-4">
                Manage your volunteer community and track your impact — <span className="text-primary font-semibold">Organization Dashboard</span>
            </p>
        </div>
    );
}
