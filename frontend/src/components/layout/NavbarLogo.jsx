import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function NavbarLogo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 group transition-all duration-300"
            aria-label="Meraki Home"
        >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900 leading-none tracking-tight">
                    Meraki
                </span>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-0.5 opacity-80">
                    Community
                </span>
            </div>
        </Link>
    );
}
