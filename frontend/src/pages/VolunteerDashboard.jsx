import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../lib/api";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import StatsCards from "../components/volunteer/StatsCards";
import ImpactVisualizer from "../components/volunteer/ImpactVisualizer";
import ActivityTimeline from "../components/volunteer/ActivityTimeline";
import ApplicationsPanel from "../components/volunteer/ApplicationsPanel";
import OpportunityRecommendations from "../components/volunteer/OpportunityRecommendations";
import AchievementsPanel from "../components/volunteer/AchievementsPanel";
import UpcomingEvents from "../components/volunteer/UpcomingEvents";

import CertificateModal from "../components/volunteer/CertificateModal";
import LeaderboardModal from "../components/volunteer/LeaderboardModal";
import ChatDrawer from "../components/chat/ChatDrawer";
import { Award, Trophy, MessageSquare } from "lucide-react";

export default function VolunteerDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [isCertOpen, setIsCertOpen] = useState(false);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await userApi.getDashboardStats();
                setStats(res.data);
            } catch (err) {
                console.warn("Could not fetch user dashboard stats:", err);
            }
        };
        fetchStats();
    }, []);

    // Merge global user data with dashboard stats
    const displayUser = {
        name: user?.name || "Volunteer",
        email: user?.email || "volunteer@meraki.org",
        totalHours: stats?.totalHours ?? 156,
        weeklyHours: 15,
        projectsCompleted: stats?.projectsCompleted ?? 12,
        badges: 8,
        livesImpacted: "1,247",
    };

    // Check if user is a new user
    const isNew = Boolean(user?.isNewUser);

    return (
        <div className="bg-gray-50/50 dark:bg-gray-900/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Feature Quick Actions Banner */}
                <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary font-black text-xs rounded-full uppercase">Volunteer Tools</span>
                        <span className="text-xs font-extrabold text-gray-700 dark:text-gray-200">Accelerate your social impact portfolio</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setIsCertOpen(true)}
                            className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                            <Award className="w-4 h-4" /> Download Certificate
                        </button>
                        <button
                            onClick={() => setIsLeaderboardOpen(true)}
                            className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                            <Trophy className="w-4 h-4" /> XP Leaderboard
                        </button>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-600 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                            <MessageSquare className="w-4 h-4" /> NGO Direct Chat
                        </button>
                    </div>
                </div>

                {/* Motivational Header */}
                <VolunteerHeader user={displayUser} isNew={isNew} />


                {/* KPI Section */}
                <StatsCards isNew={isNew} />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Personalized Recommendations */}
                        <OpportunityRecommendations isNew={isNew} />

                        {/* Application Tracking */}
                        <ApplicationsPanel isNew={isNew} />

                        {/* Recent Activity Timeline */}
                        <ActivityTimeline isNew={isNew} />
                    </div>

                    {/* Sidebar Content (1/3) */}
                    <div className="space-y-8">

                        {/* Visual Impact Summary */}
                        <ImpactVisualizer isNew={isNew} />

                        {/* Registered & Suggested Events */}
                        <UpcomingEvents isNew={isNew} />

                        {/* Achievement Showcase */}
                        <AchievementsPanel isNew={isNew} />

                        {/* Motivation Tip / Community Quote */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Daily Inspiration</p>
                            <p className="text-gray-900 font-extrabold italic leading-relaxed">
                                "The best way to find yourself is to lose yourself in the service of others."
                            </p>
                            <p className="mt-4 text-xs font-bold text-primary">— Mahatma Gandhi</p>
                        </div>
                    </div>
                </div>

                {/* Modals & Slide-overs */}
                <CertificateModal isOpen={isCertOpen} onClose={() => setIsCertOpen(false)} />
                <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} />
                <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
        </div>
    );
}
