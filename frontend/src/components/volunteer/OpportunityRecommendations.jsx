import { MapPin, Clock, Zap, Star, Sparkles, ArrowRight } from "lucide-react";

const recommendations = [
    {
        id: 1,
        title: "After-School Tutoring",
        category: "Education",
        description: "Help students with homework and reading skills in our virtual classroom.",
        location: "Remote",
        commitment: "3 hrs/week",
        match: 92,
        skill: "Mentorship",
        impact: "Empower 5 students",
        popularity: "Trending",
    },
    {
        id: 2,
        title: "Tree Planting Drive",
        category: "Environment",
        description: "Join our massive weekend reforestation event in the city wetlands.",
        location: "Seattle",
        commitment: "Weekend",
        match: 85,
        skill: "Manual Labor",
        impact: "Plant 20 trees",
        popularity: "Limited Spots",
    },
];

export default function OpportunityRecommendations() {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl font-extrabold text-gray-900">Recommended for You</h2>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">See More</button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {recommendations.map((opp) => (
                    <div key={opp.id} className="group relative flex flex-col border border-gray-100 rounded-2xl p-5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-2.5 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-500 rounded-lg">
                                {opp.category}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                                <Star className="w-3 h-3 fill-amber-500" />
                                {opp.match}% Match
                            </div>
                        </div>

                        <h3 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:text-primary transition-colors">{opp.title}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-4 line-clamp-2">{opp.description}</p>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                                <MapPin className="w-3.5 h-3.5 text-primary" />
                                {opp.location}
                                <span className="mx-1 text-gray-200">|</span>
                                <Clock className="w-3.5 h-3.5 text-secondary" />
                                {opp.commitment}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-extrabold rounded-md border border-primary/10 italic">
                                    Matches interest in {opp.skill}
                                </span>
                            </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                                <Zap className="w-3.5 h-3.5 fill-green-500 text-green-500" />
                                {opp.impact}
                            </div>
                            <button className="p-2 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-all group/btn">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {opp.popularity && (
                            <div className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-rose-500 text-white text-[8px] font-bold uppercase px-2 py-1 rounded-md shadow-lg">
                                    {opp.popularity}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
