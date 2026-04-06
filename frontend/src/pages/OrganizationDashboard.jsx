import { useAuth } from "../context/AuthContext";
import OrgDashboardHeader from "../components/org/OrgDashboardHeader";
import StatsCards from "../components/org/StatsCards";
import AnalyticsChart from "../components/org/AnalyticsChart";
import OpportunityManager from "../components/org/OpportunityManager";
import ApplicationsPanel from "../components/org/ApplicationsPanel";
import VolunteerInsights from "../components/org/VolunteerInsights";
import ImpactMetrics from "../components/org/ImpactMetrics";
import QuickActions from "../components/org/QuickActions";
import ActivityFeed from "../components/org/ActivityFeed";

export default function OrganizationDashboard() {
    const { user } = useAuth();

    // Merge global user data with org stats
    const isNew = Boolean(user?.isNewUser);
    const orgData = {
        name: user?.name || "Green Earth Foundation",
        tagline: "Building a sustainable future through community action and environmental stewardship.",
        totalVolunteers: isNew ? 0 : 240,
        ongoingProjects: isNew ? 0 : 18,
        impactScore: isNew ? 0 : 92,
    };
    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Modern Header */}
                <OrgDashboardHeader org={orgData} isNew={isNew} />

                {/* KPI Section */}
                <StatsCards isNew={isNew} />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Interactive Engagement Chart */}
                        <AnalyticsChart isNew={isNew} />

                        {/* Opportunity Lifecycle Management */}
                        <OpportunityManager isNew={isNew} />

                        {/* Measureable Impact Progress */}
                        <ImpactMetrics isNew={isNew} />
                    </div>

                    {/* Sidebar Content (1/3) */}
                    <div className="space-y-8">

                        {/* Productivity Boosters */}
                        <QuickActions isNew={isNew} />

                        {/* Applicant Review Board */}
                        <ApplicationsPanel isNew={isNew} />

                        {/* Recent Activity & Notifications */}
                        <ActivityFeed isNew={isNew} />

                        {/* Top Performer Highlights */}
                        <VolunteerInsights isNew={isNew} />
                    </div>
                </div>
            </div>
        </div>
    );
}
