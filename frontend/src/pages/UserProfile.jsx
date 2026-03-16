import { useState } from "react";
// Modular components
import ProfileHeader from "../components/profile/ProfileHeader";
import VolunteerStats from "../components/profile/VolunteerStats";
import ContributionGraph from "../components/profile/ContributionGraph";
import ProjectHistory from "../components/profile/ProjectHistory";
import ImpactTimeline from "../components/profile/ImpactTimeline";
import AchievementsPanel from "../components/profile/AchievementsPanel";
import SkillsSection from "../components/profile/SkillsSection";
import VolunteerReviews from "../components/profile/VolunteerReviews";
import PortfolioSection from "../components/profile/PortfolioSection";
import CommunityReputation from "../components/profile/CommunityReputation";
import MonthlyGoals from "../components/profile/MonthlyGoals";

const userData = {
    name: "Sarah Anderson",
    location: "San Francisco, CA",
    email: "sarah.anderson@email.com",
    joinDate: "January 2024",
    bio: "Passionate volunteer dedicated to environmental conservation and community development. Love connecting with like-minded people and making a real difference!",
};

const completedProjectsData = [
    {
        id: 1,
        title: "Community Garden Initiative",
        organization: "Green Earth Foundation",
        hours: 45,
        date: "Jan - Feb 2026",
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 5,
        review: "Sarah was an exceptional volunteer! Her dedication and leadership skills helped us exceed our goals.",
    },
    {
        id: 2,
        title: "Beach Cleanup Drive",
        organization: "Ocean Guardians",
        hours: 24,
        date: "December 2025",
        image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 5,
        review: "Incredibly reliable and passionate about environmental conservation!",
    },
    {
        id: 3,
        title: "Food Bank Distribution",
        organization: "City Food Bank",
        hours: 32,
        date: "November 2025",
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        rating: 5,
        review: "Sarah's compassion and efficiency made a huge difference in our operations.",
    },
];

export default function UserProfile() {
    return (
        <div className="bg-gray-50/30 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 1. Impactful Hero Header */}
                <ProfileHeader user={userData} />

                {/* 2. Real-time Impact Metrics */}
                <VolunteerStats />

                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    {/* Main Content Column (Left - 2/3) */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* 3. Contribution Heatmap */}
                        <ContributionGraph />

                        {/* 4. Visual Case Studies */}
                        <PortfolioSection />

                        {/* 5. Verifiable Project History */}
                        <ProjectHistory projects={completedProjectsData} />

                        {/* 6. Chronological Impact Journey */}
                        <ImpactTimeline />
                    </div>

                    {/* Sidebar Column (Right - 1/3) */}
                    <div className="space-y-8">
                        {/* 7. Community Trust & Reliability */}
                        <CommunityReputation />

                        {/* 8. Monthly Objectives & Goals */}
                        <MonthlyGoals />

                        {/* 9. Social Credibility feedback */}
                        <VolunteerReviews />

                        {/* 10. Gamification & Badges */}
                        <AchievementsPanel />

                        {/* 11. Verified Competencies */}
                        <SkillsSection />

                        {/* Download Impact Report CTA */}
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Official Verification</p>
                            <h4 className="text-xl font-black mb-6 leading-tight">Ready to showcase your impact to the world?</h4>
                            <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Download Impact Report (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
