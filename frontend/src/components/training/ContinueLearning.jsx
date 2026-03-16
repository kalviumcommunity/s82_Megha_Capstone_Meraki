import { Play, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export default function ContinueLearning({ courses }) {
    const activeCourses = courses.filter(c => c.completed > 0 && c.completed < 100);

    if (activeCourses.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center justify-between">
                Continue Learning
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    My Learning <ArrowRight className="w-4 h-4" />
                </button>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {activeCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 transition-all duration-300 group"
                    >
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative flex-shrink-0">
                                <ImageWithFallback
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full sm:w-36 h-36 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-3xl flex items-center justify-center transition-opacity">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                                        <Play className="w-6 h-6 fill-primary" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col pt-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/10">
                                        {course.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-xs text-gray-400 font-bold flex items-center gap-1.5 mb-5 uppercase tracking-wider">
                                    <Clock className="w-4 h-4 text-secondary" />
                                    {course.duration} total • Est. 45m left
                                </p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{course.completed}% Complete</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full group-hover:scale-x-105 transition-transform origin-left duration-700"
                                            style={{ width: `${course.completed}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
