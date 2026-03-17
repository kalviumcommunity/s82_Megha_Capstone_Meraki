import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Modular components
import LearningHeader from "../components/training/LearningHeader";
import LearningStats from "../components/training/LearningStats";
import LearningPaths from "../components/training/LearningPaths";
import ContinueLearning from "../components/training/ContinueLearning";
import CourseGrid from "../components/training/CourseGrid";
import CertificationShowcase from "../components/training/CertificationShowcase";
import SkillDevelopmentInsights from "../components/training/SkillDevelopmentInsights";
import ResourceSection from "../components/training/ResourceSection";
import CoursePreviewModal from "../components/training/CoursePreviewModal";

const coursesData = [
    {
        id: 1,
        title: "Effective Volunteer Leadership",
        description: "Learn essential leadership skills to guide volunteer teams and maximize impact.",
        image: "https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "3 hours",
        lessons: 12,
        enrolled: 1247,
        rating: 4.8,
        level: "Intermediate",
        category: "Leadership",
        completed: 70,
        instructor: "Dr. Elena Vance",
        hasCertificate: true,
    },
    {
        id: 2,
        title: "Introduction to Community Service",
        description: "Perfect for beginners! Understand the fundamentals of volunteering and community impact.",
        image: "https://images.unsplash.com/photo-1769837230054-7f3a7356dde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "2 hours",
        lessons: 8,
        enrolled: 2341,
        rating: 4.9,
        level: "Beginner",
        category: "Fundamentals",
        completed: 100,
        instructor: "Marcus Aurelius",
        hasCertificate: true,
    },
    {
        id: 3,
        title: "Environmental Conservation Practices",
        description: "Learn sustainable practices and conservation techniques for environmental projects.",
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "4 hours",
        lessons: 15,
        enrolled: 892,
        rating: 4.7,
        level: "Advanced",
        category: "Environment",
        completed: 0,
        instructor: "Sarah Green",
        hasCertificate: true,
    },
    {
        id: 4,
        title: "Youth Mentorship Skills",
        description: "Develop effective mentoring techniques to inspire and guide young people.",
        image: "https://images.unsplash.com/photo-1713977331626-722cd8400b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "2.5 hours",
        lessons: 10,
        enrolled: 1534,
        rating: 4.9,
        level: "Intermediate",
        category: "Education",
        completed: 0,
        instructor: "David Wu",
        hasCertificate: true,
    },
    {
        id: 5,
        title: "Fundraising & Grant Writing",
        description: "Master the art of fundraising and writing compelling grant proposals.",
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "3.5 hours",
        lessons: 14,
        enrolled: 678,
        rating: 4.6,
        level: "Advanced",
        category: "Fundraising",
        completed: 0,
        instructor: "Rachel Moore",
        hasCertificate: true,
    },
    {
        id: 6,
        title: "Crisis Response & Emergency Aid",
        description: "Prepare for emergency situations and learn effective crisis response protocols.",
        image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        duration: "5 hours",
        lessons: 18,
        enrolled: 456,
        rating: 4.8,
        level: "Advanced",
        category: "Emergency",
        completed: 0,
        instructor: "Dr. James Bond",
        hasCertificate: true,
    },
];

const userData = {
    name: "Sarah",
};

export default function TrainingHub() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { hash } = useLocation();

    // Handle hash-based scrolling (e.g., /training#certifications)
    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [hash]);

    const handlePreview = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gray-50/30 min-h-screen">
            {/* Professional Learning Header */}
            <LearningHeader user={userData} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Overview */}
                <LearningStats />

                {/* Structured Path Discovery */}
                <LearningPaths />

                {/* Resume In-Progress Efforts */}
                <ContinueLearning courses={coursesData} />

                <div className="grid lg:grid-cols-3 gap-16 mt-16">
                    {/* Main Course Grid (2/3) */}
                    <div className="lg:col-span-2 space-y-16">
                        <CourseGrid courses={coursesData} onPreview={handlePreview} />

                        {/* Resource Library at bottom of main feed */}
                        <ResourceSection />
                    </div>

                    {/* Meta/Progress Sidebar (1/3) */}
                    <div className="space-y-12">
                        {/* Interactive Skill Progress */}
                        <SkillDevelopmentInsights />

                        {/* Wall of Certifications */}
                        <CertificationShowcase />

                        {/* Pro Tip Card */}
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Pro Tip</p>
                            <h4 className="text-xl font-black mb-6 leading-tight">Structured learning paths are <span className="text-primary italic">2.4x more effective</span> for skill retention.</h4>
                            <button className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                Start Leadership Path
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Details Preview */}
            <CoursePreviewModal
                course={selectedCourse}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
