import { X, LayoutGrid, Video, MapPin } from "lucide-react";

export const categories = ["All", "Environment", "Training", "Education", "Hunger Relief", "Fundraising"];

export default function EventFilters({ filters, setFilters }) {
    const { category, type } = filters;

    const hasActiveFilters = category !== "All" || type !== "All";

    const handleClear = () => {
        setFilters({ category: "All", type: "All" });
    };

    return (
        <div className="flex flex-col gap-4 mb-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                        aria-pressed={category === cat}
                        className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${category === cat
                                ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-md shadow-primary/20"
                                : "bg-white border-gray-200 text-gray-600 hover:border-primary/50 hover:text-primary"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Type & Clear Row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex bg-white border-2 border-gray-100 rounded-xl overflow-hidden p-1 shadow-sm gap-1">
                    <button
                        onClick={() => setFilters((prev) => ({ ...prev, type: "All" }))}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${type === "All"
                                ? "bg-primary/10 text-primary"
                                : "text-gray-500 hover:text-primary hover:bg-gray-50"
                            }`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        All Events
                    </button>
                    <button
                        onClick={() => setFilters((prev) => ({ ...prev, type: "In-Person" }))}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${type === "In-Person"
                                ? "bg-primary/10 text-primary"
                                : "text-gray-500 hover:text-primary hover:bg-gray-50"
                            }`}
                    >
                        <MapPin className="w-4 h-4" />
                        In-Person
                    </button>
                    <button
                        onClick={() => setFilters((prev) => ({ ...prev, type: "Virtual" }))}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${type === "Virtual"
                                ? "bg-primary/10 text-primary"
                                : "text-gray-500 hover:text-primary hover:bg-gray-50"
                            }`}
                    >
                        <Video className="w-4 h-4" />
                        Virtual
                    </button>
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 border-2 border-red-100 text-sm font-semibold hover:bg-red-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
}
