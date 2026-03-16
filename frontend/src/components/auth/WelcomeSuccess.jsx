import { Heart, Sparkles, ArrowRight, Zap, Target, Users } from "lucide-react";

export default function WelcomeSuccess({ role, onNavigate }) {
    return (
        <div className="bg-white rounded-[3rem] p-8 sm:p-16 border border-gray-100 shadow-2xl max-w-3xl mx-auto relative overflow-hidden text-center">
            {/* Confetti / Sparkle Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
            <Sparkles className="absolute top-10 right-10 w-12 h-12 text-primary opacity-20 animate-pulse" />

            <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/20 animate-in zoom-in-50 duration-700">
                    <Heart className="w-12 h-12 text-white fill-white" />
                </div>

                <h3 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                    Welcome to the core <br />
                    of <span className="text-primary italic">impact!</span>
                </h3>

                <p className="text-lg font-medium text-gray-500 max-w-sm mx-auto leading-relaxed mb-12">
                    Your {role} account is verified. Let's start building a better community, together.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Connect</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Engage</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                        <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Impact</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <button
                        onClick={() => onNavigate('/opportunities')}
                        className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
                    >
                        Explore Opportunities <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onNavigate(role === 'volunteer' ? '/volunteer/dashboard' : '/organization/dashboard')}
                        className="w-full py-5 bg-white text-gray-900 border border-gray-200 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
