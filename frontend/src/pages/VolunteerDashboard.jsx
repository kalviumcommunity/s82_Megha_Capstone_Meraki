import { useAuth } from "../context/AuthContext";
import VolunteerHeader from "../components/volunteer/VolunteerHeader";
import StatsCards from "../components/volunteer/StatsCards";
import ImpactVisualizer from "../components/volunteer/ImpactVisualizer";
import ActivityTimeline from "../components/volunteer/ActivityTimeline";
import ApplicationsPanel from "../components/volunteer/ApplicationsPanel";
import OpportunityRecommendations from "../components/volunteer/OpportunityRecommendations";
import AchievementsPanel from "../components/volunteer/AchievementsPanel";
import UpcomingEvents from "../components/volunteer/UpcomingEvents";

export default function VolunteerDashboard() {
    const { user } = useAuth();

    // Merge global user data with dashboard stats
    const displayUser = {
        name: user?.name || "Guest Volunteer",
        email: user?.email || "guest@meraki.org",
        totalHours: 156,
        weeklyHours: 15,
        projectsCompleted: 12,
        badges: 8,
        livesImpacted: "1,247",
    };

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Motivational Header */}
                <VolunteerHeader user={displayUser} />


                {/* KPI Section */}
                <StatsCards />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Personalized Recommendations */}
                        <OpportunityRecommendations />

                        {/* Application Tracking */}
                        <ApplicationsPanel />

                        {/* Recent Activity Timeline */}
                        <ActivityTimeline />
                    </div>

                    {/* Sidebar Content (1/3) */}
                    <div className="space-y-8">

                        {/* Visual Impact Summary */}
                        <ImpactVisualizer />

                        {/* Registered & Suggested Events */}
                        <UpcomingEvents />

                        {/* Achievement Showcase */}
                        <AchievementsPanel />

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
            </div>
        </div>
    );
}
