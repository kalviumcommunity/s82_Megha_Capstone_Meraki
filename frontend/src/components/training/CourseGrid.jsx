import { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, ListFilter, SlidersHorizontal } from "lucide-react";
import CourseCard from "./CourseCard";

const categories = ["All", "Leadership", "Environment", "Fundamentals", "Education", "Fundraising", "Emergency"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CourseGrid({ courses, onPreview }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");
    const [sort, setSort] = useState("Popular");

    const filteredCourses = useMemo(() => {
        let result = courses.filter((c) => {
            const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                c.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === "All" || c.category === category;
            const matchesLevel = level === "All" || c.level === level;
            return matchesSearch && matchesCategory && matchesLevel;
        });

        if (sort === "Top Rated") result.sort((a, b) => b.rating - a.rating);
        if (sort === "Popular") result.sort((a, b) => b.enrolled - a.enrolled);
        if (sort === "Newest") result.sort((a, b) => b.id - a.id);

        return result;
    }, [courses, search, category, level, sort]);

    return (
        <div>
            {/* Filter Bar */}
            <div className="sticky top-24 z-20 bg-gray-50/80 backdrop-blur-md border border-gray-100 rounded-[2.5rem] p-3 mb-8 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search courses, skills, or mentors..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-transparent rounded-[2rem] text-sm font-medium focus:outline-none focus:border-primary/20 shadow-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Desktop Filters */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="flex bg-gray-100 rounded-[1.5rem] p-1">
                            {levels.map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLevel(l)}
                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-[1.2rem] transition-all ${level === l ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-px bg-gray-200" />

                        <div className="relative group">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                            <select
                                className="pl-9 pr-8 py-2 bg-white border border-transparent rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/20 shadow-sm appearance-none cursor-pointer"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option>Popular</option>
                                <option>Top Rated</option>
                                <option>Newest</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Categories Scroll */}
                <div className="flex items-center gap-2 mt-3 pl-1 overflow-x-auto no-scrollbar">
                    <ListFilter className="w-4 h-4 text-gray-400 flex-shrink-0 mr-1" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-xl whitespace-nowrap transition-all border ${category === cat ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white text-gray-400 border-transparent hover:border-gray-200"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} onPreview={onPreview} />
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-400 font-medium">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
    );
}
