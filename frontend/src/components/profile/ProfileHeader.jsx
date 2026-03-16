import { MapPin, Calendar, Mail, Edit, Share2, Award, Zap, CheckCircle2 } from "lucide-react";

export default function ProfileHeader({ user }) {
    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 mb-8 group">
            {/* Cover Image */}
            <div className="h-48 sm:h-64 relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000"
                    alt="Cover"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white border border-white/20 hover:bg-white hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100">
                    <Edit className="w-4 h-4" />
                </button>
            </div>

            <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 -mt-16 sm:-mt-24 relative z-10">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary to-secondary rounded-[2rem] border-8 border-white flex items-center justify-center text-white font-black text-4xl sm:text-5xl shadow-2xl overflow-hidden">
                                {user.name.split(' ').map(n => n[0]).join('')}
                                {/* Rank Glow */}
                                <div className="absolute inset-0 bg-primary/20 animate-pulse mix-blend-overlay" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 mt-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900">{user.name}</h1>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20 flex items-center gap-1.5 self-center">
                                        <Award className="w-3.5 h-3.5" />
                                        Impact Leader
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        {user.location}
                                    </div>
                                    <div className="flex items-center gap-1.5 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                                        Joined {user.joinDate}
                                    </div>
                                    <div className="flex items-center gap-1.5 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <Mail className="w-3.5 h-3.5 text-accent" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 h-fit">
                                <button className="p-3 border border-gray-100 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center gap-3">
                                    <Edit className="w-4 h-4" /> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Bio & Highlights */}
                        <div className="mt-8 flex flex-col xl:flex-row gap-8 items-start xl:items-center">
                            <p className="flex-1 text-sm font-medium text-gray-500 leading-relaxed max-w-2xl">
                                {user.bio}
                            </p>

                            {/* Profile Completion */}
                            <div className="w-full xl:w-64 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Completion</span>
                                    <span className="text-[10px] font-black text-primary">85%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                                </div>
                                <p className="mt-2 text-[9px] font-bold text-gray-400">Add organization reviews to reach 100%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
