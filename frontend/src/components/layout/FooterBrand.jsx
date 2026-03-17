import { Link } from "react-router-dom";
import { Heart, ShieldCheck } from "lucide-react";

export default function FooterBrand() {
    return (
        <div className="flex flex-col gap-6 lg:max-w-sm">
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                    <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 italic tracking-tight">Meraki</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mt-[-0.25rem]">Impact Platform</p>
                </div>
            </Link>

            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Empowering volunteers and organizations to build stronger, more resilient communities through purpose-driven action.
            </p>

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl w-fit">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Trusted by 12k+ Volunteers
                    </span>
                </div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-1">
                    Secure & Verified Platform
                </p>
            </div>
        </div>
    );
}
