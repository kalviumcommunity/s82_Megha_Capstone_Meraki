import { Heart, ShieldCheck, Star, Users } from "lucide-react";

export default function AuthTrustPanel() {
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                    <Heart className="w-8 h-8 text-primary fill-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tight">Meraki</h2>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Impact Platform</p>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-4xl font-black text-white leading-tight">
                    Join the movement <br />
                    of <span className="text-primary underline decoration-primary/30 underline-offset-8">purpose-driven</span> action.
                </h3>
                <p className="text-lg text-gray-400 font-medium leading-relaxed">
                    Connecting passionate volunteers with community-led organizations to create measurable social impact worldwide.
                </p>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                        ))}
                    </div>
                    <p className="text-sm text-gray-300 font-bold">"Restored my faith in community action."</p>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">— Alex, Volunteer Lead</span>
                    </div>
                </div>

                <div className="flex flex-col justify-end gap-4">
                    <div className="flex items-center gap-3 text-white/40">
                        <Users className="w-8 h-8" />
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <p className="text-2xl font-black text-white">12,400+</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-[-1rem]">Active Volunteers</p>
                </div>
            </div>

            <div className="pt-12 flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure
                </div>
                <div className="h-px flex-1 bg-white/5" />
            </div>
        </div>
    );
}
