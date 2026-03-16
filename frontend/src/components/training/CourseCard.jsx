import { Clock, Video, Star, Users, CheckCircle, Info, Award } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export default function CourseCard({ course, onPreview }) {
    const isCompleted = course.completed === 100;
    const isStarted = course.completed > 0;

    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group">
            {/* Header Image */}
            <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={() => onPreview(course)}>
                <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm text-gray-700">
                        {course.level}
                    </span>
                    {course.hasCertificate && (
                        <div className="p-1 px-2.5 bg-primary text-white rounded-full flex items-center gap-1 shadow-lg">
                            <Award className="w-3 h-3 fill-white" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Cert</span>
                        </div>
                    )}
                </div>
                {isCompleted && (
                    <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-xl scale-110">
                            <CheckCircle className="w-7 h-7 fill-green-50" />
                        </div>
                    </div>
                )}
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-wider text-gray-500 rounded-lg group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        {course.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {course.rating}
                    </div>
                </div>

                <h3 className="text-lg font-extrabold text-gray-900 mb-2 h-14 line-clamp-2 leading-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => onPreview(course)}>
                    {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-400">
                        {course.instructor?.charAt(0) || "I"}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400">by <span className="text-gray-600">{course.instructor || "Expert Mentor"}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-1 mb-6 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <Clock className="w-3.5 h-3.5 text-primary/50 flex-shrink-0" />
                        <span className="truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <Video className="w-3.5 h-3.5 text-secondary/50 flex-shrink-0" />
                        <span className="truncate">{course.lessons} steps</span>
                    </div>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <Users className="w-3.5 h-3.5 text-accent/50 flex-shrink-0" />
                        <span className="truncate">{course.enrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform cursor-pointer" onClick={() => onPreview(course)}>
                        <Info className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Details</span>
                    </div>
                </div>

                {isCompleted ? (
                    <button className="w-full py-3.5 bg-green-50 text-green-600 border border-green-100 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-green-100 transition-all">
                        <Award className="w-4 h-4 fill-green-600/20" />
                        Certificate Ready
                    </button>
                ) : isStarted ? (
                    <button className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                        Continue Learning {course.completed}%
                    </button>
                ) : (
                    <button className="w-full py-3.5 border-2 border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white transition-all flex items-center justify-center gap-2">
                        Enroll Now
                    </button>
                )}
            </div>
        </div>
    );
}
