import { Calendar, MapPin, Clock, Users, ArrowRight, Flame, Video } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export default function FeaturedEvents({ events, onSelect }) {
    const featured = events.filter((e) => e.popularity === "Trending" || e.popularity === "Popular").slice(0, 2);
    if (!featured.length) return null;

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-2xl font-extrabold text-gray-900">Featured Events</h2>
                <span className="ml-auto text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">{featured.length} highlighted</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {featured.map((event) => {
                    const spotsLeft = event.maxAttendees - event.attendees;
                    return (
                        <div
                            key={event.id}
                            onClick={() => onSelect(event)}
                            className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-72"
                            role="button"
                            aria-label={`View featured event: ${event.title}`}
                        >
                            <ImageWithFallback
                                src={event.image}
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/90 text-white backdrop-blur-sm shadow">
                                    {event.popularity === "Trending" ? <Flame className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                                    {event.popularity}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow ${event.type === "Virtual" ? "bg-blue-500/80 text-white" : "bg-green-500/80 text-white"}`}>
                                    {event.type === "Virtual" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                                    {event.type}
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-1">{event.category}</p>
                                <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">{event.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-white/80 mb-4">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{spotsLeft} spots left</span>
                                </div>
                                <button className="bg-white text-gray-900 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg w-fit">
                                    Register Now <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
