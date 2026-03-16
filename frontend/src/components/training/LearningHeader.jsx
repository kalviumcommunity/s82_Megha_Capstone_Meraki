import { Award, Zap, ChevronRight } from "lucide-react";

export default function LearningHeader({ user }) {
    return (
        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 rounded-b-[3rem] mb-12 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Message */}
                    <div className="text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
                            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">Your Learning Journey</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Elevate your impact, <br />
                            <span className="text-primary">{user.name}</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium max-w-lg">
                            You’ve completed <span className="text-primary font-bold">3 certifications</span> and <span className="text-secondary font-bold">70%</span> of your current learning path.
                        </p>
                    </div>

                    {/* Right: Path Progress Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-xl shadow-primary/5 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Current Path</h3>
                                <p className="text-lg font-extrabold text-gray-900">Volunteer Leadership</p>
                            </div>
                            <Award className="w-10 h-10 text-primary opacity-20" />
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-3xl font-black text-primary">70<span className="text-sm font-bold opacity-50 ml-0.5">%</span></span>
                                <span className="text-xs font-bold text-gray-400">Next: Conflict Resolution</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "70%" }} />
                            </div>
                        </div>

                        <button className="w-full py-3 bg-gray-900 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary transition-all group">
                            Resume Path <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
