import { ImageWithFallback } from "../ui/ImageWithFallback";
import { ExternalLink, Camera, FolderHeart } from "lucide-react";

const portfolioItems = [
    {
        id: 1,
        title: "Reforestation Drive 2026",
        category: "Environment",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
        description: "Led a team of 30 volunteers in planting over 500 saplings in the urban area.",
    },
    {
        id: 2,
        title: "Community Kitchen",
        category: "Food Relief",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
        description: "Coordinated weekly meal prep and distribution for local shelters.",
    },
    {
        id: 3,
        title: "Youth Tech Workshop",
        category: "Education",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
        description: "Mentored high school students in basic web development and coding.",
    },
];

export default function PortfolioSection() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-3">
                        <FolderHeart className="w-6 h-6 text-primary" />
                        Impact Gallery
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visual highlights of your journey</p>
                </div>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 hover:text-primary hover:border-primary/20 transition-all">
                    <Camera className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                    <div key={item.id} className="group relative rounded-[2rem] overflow-hidden border border-gray-50 bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                        <div className="aspect-square relative overflow-hidden">
                            <ImageWithFallback
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{item.category}</span>
                                <h4 className="text-white font-black text-lg leading-tight mb-2">{item.title}</h4>
                                <p className="text-white/70 text-xs font-medium line-clamp-2 leading-relaxed mb-4">
                                    {item.description}
                                </p>
                                <button className="w-fit flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest hover:text-primary transition-colors">
                                    View Details <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Case Study */}
                <div className="border-2 border-dashed border-gray-100 rounded-[2rem] aspect-square flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-primary/20 hover:bg-primary/5 transition-all">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-3 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
                        <Camera className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 leading-snug">Add a featured <br /><span className="text-gray-900 font-extrabold">Impact Story</span></p>
                </div>
            </div>
        </div>
    );
}
