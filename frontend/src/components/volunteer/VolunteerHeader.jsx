import { TrendingUp, Award, Zap } from "lucide-react";

export default function VolunteerHeader({ user }) {
    return (
        <div className="bg-white border-b border-gray-100 rounded-3xl p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left: Avatar + Greeting */}
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-primary/30">
                            {user.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, {user.name}! 👋</h1>
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider rounded-full border border-primary/20">
                                Gold Volunteer
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            You've contributed <span className="text-primary font-bold">{user.totalHours} hours</span> of impact — keep making a difference.
                        </p>
                    </div>
                </div>

                {/* Right: Weekly Summary Pill */}
                <div className="w-full md:w-auto flex items-center gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weekly Momentum</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-extrabold text-gray-900">+{user.weeklyHours}h</span>
                            <span className="flex items-center text-xs font-bold text-green-500">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                12%
                            </span>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-gray-200" />
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Next Milestone</p>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-bold text-gray-900">35h left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
