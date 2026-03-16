import { X, Clock, Video, Star, Users, Award, CheckCircle, ChevronRight, Play } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export default function CoursePreviewModal({ course, isOpen, onClose }) {
    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header/Banner */}
                <div className="relative h-64 sm:h-80 flex-shrink-0">
                    <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border border-white/20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-6 left-8 right-8">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                {course.category}
                            </span>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                                {course.level}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">{course.title}</h2>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-black text-gray-900 mb-4">Course Description</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    {course.description} This comprehensive training program is designed to equip you with the strategic mindset and practical skills needed for successful volunteering. Over the course of the modules, we cover collaborative problem-solving, stakeholder management, and measurable impact tracking.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-black text-gray-900 mb-4">Learning Objectives</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Strategic planning for community impact",
                                        "Team leadership & communication",
                                        "Crisis management protocols",
                                        "Measurable impact visualization"
                                    ].map((obj) => (
                                        <div key={obj} className="flex gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-bold text-gray-700">{obj}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-black text-gray-900 mb-4">Course Syllabus</h3>
                                <div className="space-y-3">
                                    {[
                                        { title: "Foundations & Principles", duration: "15m" },
                                        { title: "Building Collaborative Teams", duration: "45m" },
                                        { title: "Measuring Success & Impact", duration: "30m" },
                                        { title: "Certification Assessment", duration: "20m" }
                                    ].map((module, i) => (
                                        <div key={module.title} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-primary/20 transition-all cursor-default">
                                            <div className="flex items-center gap-4">
                                                <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    0{i + 1}
                                                </span>
                                                <span className="text-sm font-bold text-gray-700">{module.title}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{module.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Course Snapshot</h4>
                                <div className="space-y-5">
                                    {[
                                        { label: "Duration", val: course.duration, icon: Clock },
                                        { label: "Lessons", val: `${course.lessons} modules`, icon: Video },
                                        { label: "Enrolled", val: course.enrolled.toLocaleString(), icon: Users },
                                        { label: "Rating", val: `${course.rating} / 5.0`, icon: Star },
                                        { label: "Certificate", val: "Yes", icon: Award }
                                    ].map((stat) => (
                                        <div key={stat.label} className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                                <p className="text-sm font-black text-gray-900">{stat.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-primary to-secondary rounded-[2rem] p-6 text-white shadow-xl shadow-primary/20">
                                <h4 className="text-xs font-black opacity-60 uppercase tracking-widest mb-4">Lead Instructor</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-xl border border-white/20">
                                        E
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-sm">{course.instructor || "Expert Mentor"}</p>
                                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Global Outreach Lead</p>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all">
                                    Follow Mentor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer Actions */}
                <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-6">
                    <button
                        onClick={onClose}
                        className="px-8 py-3.5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
                    >
                        Back to Hub
                    </button>
                    <button className="flex-1 max-w-xs py-3.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-black/10 hover:bg-primary transition-all flex items-center justify-center gap-3 group">
                        <Play className="w-4 h-4 fill-white group-hover:fill-white" />
                        Enroll Now — Free for Volunteers
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
