import { useState } from "react";
// New modular components
import OrgDashboardHeader from "../components/org/OrgDashboardHeader";
import StatsCards from "../components/org/StatsCards";
import AnalyticsChart from "../components/org/AnalyticsChart";
import OpportunityManager from "../components/org/OpportunityManager";
import ApplicationsPanel from "../components/org/ApplicationsPanel";
import VolunteerInsights from "../components/org/VolunteerInsights";
import ImpactMetrics from "../components/org/ImpactMetrics";
import QuickActions from "../components/org/QuickActions";
import ActivityFeed from "../components/org/ActivityFeed";

const orgData = {
    name: "Green Earth Foundation",
    tagline: "Building a sustainable future through community action and environmental stewardship.",
    totalVolunteers: 240,
    ongoingProjects: 18,
    impactScore: 92,
};

export default function OrganizationDashboard() {
    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Modern Header */}
                <OrgDashboardHeader org={orgData} />

                {/* KPI Section */}
                <StatsCards />

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Interactive Engagement Chart */}
                        <AnalyticsChart />

                        {/* Opportunity Lifecycle Management */}
                        <OpportunityManager />

                        {/* Measureable Impact Progress */}
                        <ImpactMetrics />
                    </div>

                    {/* Sidebar Content (1/3) */}
                    <div className="space-y-8">

                        {/* Productivity Boosters */}
                        <QuickActions />

                        {/* Applicant Review Board */}
                        <ApplicationsPanel />

                        {/* Recent Activity & Notifications */}
                        <ActivityFeed />

                        {/* Top Performer Highlights */}
                        <VolunteerInsights />
                    </div>
                </div>
            </div>
        </div>
    );
}
