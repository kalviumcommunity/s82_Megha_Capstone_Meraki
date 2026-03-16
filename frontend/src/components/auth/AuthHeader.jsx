import { Heart } from "lucide-react";

export default function AuthHeader({ title, subtitle, type = "volunteer" }) {
    return (
        <div className="text-center lg:text-left mb-10">
            {/* Mobile Logo */}
            <div className="flex lg:hidden justify-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Heart className="w-6 h-6 text-white fill-white" />
                </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    Auth Mode: {type === "volunteer" ? "Volunteer" : "Organization"}
                </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
                {title}
            </h1>
            <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto lg:mx-0 leading-relaxed">
                {subtitle}
            </p>
        </div>
    );
}
