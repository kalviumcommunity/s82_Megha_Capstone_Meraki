import { Heart } from "lucide-react";

export default function SignupLayout({ children, currentStep, totalSteps }) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="mb-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/20 mb-4 transition-transform hover:scale-110">
                    <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight italic">Meraki Onboarding</h2>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-lg mb-12">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-gray-100">
                        {Math.round(progress)}% Complete
                    </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/50">
                    <div
                        className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                {children}
            </div>

            {/* Footer Trust Indicator */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-center gap-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/NGO_Logo.svg" alt="Partner" className="h-6 opacity-20 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                    <div className="w-px h-4 bg-gray-200" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/United_Nations_Logo.svg" alt="Partner" className="h-6 opacity-20 grayscale hover:grayscale-0 transition-all cursor-pointer" />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Connecting purpose with action since 2024
                </p>
            </div>
        </div>
    );
}
