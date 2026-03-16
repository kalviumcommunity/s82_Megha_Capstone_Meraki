import { useState } from "react";
import { Clock, Calendar, Star, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export default function ProjectHistory({ projects }) {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                Completed Projects
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 uppercase tracking-widest">{projects.length} Total</span>
            </h2>

            <div className="space-y-6">
                {projects.map((project) => {
                    const isExpanded = expandedId === project.id;
                    return (
                        <div
                            key={project.id}
                            className={`group border border-gray-50 rounded-3xl transition-all duration-300 ${isExpanded ? 'bg-gray-50/50 border-primary/10 shadow-lg shadow-primary/5' : 'hover:border-primary/10 hover:bg-gray-50/30'}`}
                        >
                            <div
                                className="p-6 cursor-pointer flex flex-col sm:flex-row gap-6 items-start"
                                onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            >
                                <div className="relative flex-shrink-0">
                                    <ImageWithFallback
                                        src={project.image}
                                        alt={project.title}
                                        className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
                                                {project.organization}
                                            </p>
                                        </div>
                                        <div className="text-primary group-hover:bg-primary/10 p-2 rounded-xl transition-colors">
                                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5 text-primary/50" />
                                            {project.hours} hrs contributed
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5 text-secondary/50" />
                                            {project.date}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                                            Verified Impact
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                                <div className="px-6 pb-6 pt-2 border-t border-white sm:ml-30 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-inner">
                                        <p className="text-sm font-medium text-gray-600 italic leading-relaxed mb-4">
                                            "{project.review}"
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Environment", "Leadership", "Community"].map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest rounded-lg border border-gray-200">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="mt-4 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform">
                                            View Project Case Study <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-8 py-4 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-gray-100 hover:bg-gray-100 hover:text-gray-600 transition-all">
                Load More History
            </button>
        </div>
    );
}
