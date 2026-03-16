import { Heart, Globe, Users, Target } from "lucide-react";

export default function DonationHero() {
    return (
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 lg:py-28 overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)] border border-white/40 hover:scale-105 transition-transform duration-300">
                        <Heart className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-semibold text-gray-800">Together We Can Make a Difference</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
                        Empower Communities. <br className="hidden sm:block" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">Transform Lives.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                        Join millions of compassionate individuals worldwide in our mission to bring hope, resources, and sustainable impact to those who need it most.
                    </p>

                    {/* Quick Global Stats */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 pt-8 border-t border-gray-200/50">
                        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white/50">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-900">$2.4M+</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Raised Globally</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white/50">
                            <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-900">12.5k+</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Donors</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white/50">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                <Target className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-lg font-bold text-gray-900">87</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects Funded</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
