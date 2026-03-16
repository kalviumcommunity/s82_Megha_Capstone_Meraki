import { Star, MessageSquareQuote, Quote, ThumbsUp } from "lucide-react";

const reviews = [
    {
        id: 1,
        author: "Dr. Elena Vance",
        role: "Director, Green Earth Foundation",
        content: "Sarah was an exceptional volunteer! Her dedication and leadership skills helped us exceed our reforestation goals by 20%.",
        rating: 5,
        date: "Feb 2026",
        avatar: "EV",
        tags: ["Leadership", "Punctual", "Compassionate"]
    },
    {
        id: 2,
        author: "Marcus Aurelius",
        role: "Program Manager, City Food Bank",
        content: "Incredibly reliable and passionate about community welfare. Sarah has an innate ability to organize teams under pressure.",
        rating: 5,
        date: "Dec 2025",
        avatar: "MA",
        tags: ["Organized", "Team Player"]
    },
];

export default function VolunteerReviews() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-primary shadow-2xl opacity-5">
                <Quote className="w-32 h-32 rotate-12" />
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-3">
                        Organization Feedback
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified endorsements from NGOs</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-amber-600">5.0</span>
                    <span className="text-[10px] font-bold text-amber-400 ml-1">Perfect Score</span>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:border-primary/10 transition-all group">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-black shrink-0 shadow-lg">
                                {review.avatar}
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-gray-900">{review.author}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.role}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <MessageSquareQuote className="w-8 h-8 text-primary/10 absolute -top-2 -left-2" />
                            <p className="text-sm font-medium text-gray-600 leading-relaxed pl-6 relative z-10 italic">
                                "{review.content}"
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-1.5">
                                {review.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-white text-[9px] font-black text-gray-400 uppercase tracking-widest rounded-md border border-gray-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                                <ThumbsUp className="w-3 h-3" /> Endorse
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary transition-all">
                Request a Review
            </button>
        </div>
    );
}
