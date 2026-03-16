import { Target, TrendingUp, Award, ChevronRight } from "lucide-react";

export default function MonthlyGoals() {
    return (
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2.5rem] p-8 border border-primary/10 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-[4rem] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                        <Target className="w-6 h-6 text-primary" />
                        Monthly Goals
                    </h3>
                    <TrendingUp className="w-5 h-5 text-secondary animate-pulse" />
                </div>

                <div className="space-y-8">
                    {/* Goal 1: Hours */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h4 className="text-sm font-black text-gray-700">Volunteering Hours</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">March 2026 Objective</p>
                            </div>
                            <span className="text-lg font-black text-primary">18 <span className="text-[10px] text-gray-400 font-bold">/ 20 hrs</span></span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-primary/5 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                                style={{ width: "90%" }}
                            />
                        </div>
                        <p className="mt-3 text-[10px] font-bold text-gray-500 leading-relaxed italic">
                            "Almost there! Just 2 more hours to reach your monthly goal."
                        </p>
                    </div>

                    {/* Goal 2: Projects */}
                    <div>
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h4 className="text-sm font-black text-gray-700">Project Diversity</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Categories</p>
                            </div>
                            <span className="text-lg font-black text-secondary">2 <span className="text-[10px] text-gray-400 font-bold">/ 3</span></span>
                        </div>
                        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-secondary/5 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-1000"
                                style={{ width: "66%" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 p-5 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-black/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-lg border border-gray-50">
                            <Award className="w-6 h-6 fill-amber-500/10" />
                        </div>
                        <div className="flex-1">
                            <h5 className="text-sm font-black text-gray-900 leading-tight">Achievement Unlocked?</h5>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Consistency King (10 months)</p>
                        </div>
                        <button className="p-2 bg-gray-900 text-white rounded-xl hover:bg-primary transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <button className="w-full mt-8 py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all">
                    Customize Goals
                </button>
            </div>
        </div>
    );
}
