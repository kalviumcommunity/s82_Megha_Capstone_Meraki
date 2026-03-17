import { Search } from "lucide-react";

export default function NavbarSearch() {
    return (
        <div className="relative group hidden lg:block">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <Search className="w-4 h-4" />
            </div>
            <input
                type="text"
                placeholder="Search opportunities..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                K ⌘
            </div>
        </div>
    );
}
