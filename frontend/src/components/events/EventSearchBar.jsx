import { Search, MapPin, Building2, Tag } from "lucide-react";

export default function EventSearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="relative max-w-4xl mx-auto -mt-8 z-20 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 sm:p-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-grow w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm sm:text-base font-medium"
                            placeholder="Search beach cleanup, mentoring, food drive..."
                        />
                    </div>
                </div>

                {/* Search Hint Tags (Optional desktop only view) */}
                <div className="hidden md:flex items-center gap-4 mt-3 px-2 text-xs text-gray-500 font-medium">
                    <span>Popular searches:</span>
                    <button className="hover:text-primary transition-colors flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Tech Workshop
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Partner NGO
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Remote
                    </button>
                </div>
            </div>
        </div>
    );
}
