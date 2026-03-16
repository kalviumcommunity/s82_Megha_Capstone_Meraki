import { Calendar, MapPin, Users, Clock, Video, Flame, TrendingUp, ArrowRight, Share2, Bookmark, Heart } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useState } from "react";

export default function EventCard({ event, onSelect }) {
    const [saved, setSaved] = useState(false);
    const [interested, setInterested] = useState(false);
    const spotsLeft = event.maxAttendees - event.attendees;
    const progress = (event.attendees / event.maxAttendees) * 100;
    const isNearlyFull = spotsLeft <= 8;
    const isFull = spotsLeft <= 0;

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({ title: event.title, text: event.description, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div
            onClick={() => onSelect(event)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/30 transition-all duration-300 cursor-pointer group flex flex-col"
            role="button"
            aria-label={`View details for ${event.title}`}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-52">
                <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Top-left Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border shadow-sm ${event.type === "Virtual" ? "bg-blue-500/80 text-white border-blue-400" : "bg-green-500/80 text-white border-green-400"}`}>
                        {event.type === "Virtual" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {event.type}
                    </span>
                    {event.popularity === "Trending" && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/90 text-white border-orange-400 backdrop-blur-sm shadow-sm">
                            <Flame className="w-3 h-3" /> Trending
                        </span>
                    )}
                    {event.popularity === "Popular" && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/90 text-white border-purple-400 backdrop-blur-sm shadow-sm">
                            <TrendingUp className="w-3 h-3" /> Popular
                        </span>
                    )}
                </div>

                {/* Top-right actions */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                        aria-label="Save event"
                        className={`p-2 rounded-full backdrop-blur-sm border shadow-sm transition-all ${saved ? "bg-primary text-white border-primary" : "bg-white/80 text-gray-600 border-white hover:bg-white"}`}
                    >
                        <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={handleShare}
                        aria-label="Share event"
                        className="p-2 rounded-full bg-white/80 text-gray-600 backdrop-blur-sm border border-white hover:bg-white shadow-sm transition-all"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Bottom: Organizer */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-primary text-xs shadow border border-white/70 flex-shrink-0">
                            {event.organizer.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-white drop-shadow">{event.organizer}</span>
                    </div>
                    {event.duration && (
                        <span className="text-xs font-semibold text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                            {event.duration}
                        </span>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{event.category}</span>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                </h3>

                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-primary/60" />
                        <span>{event.date}</span>
                        <span className="text-gray-300">·</span>
                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-primary/60" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-primary/60" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-4 mt-auto">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                        <span className="flex items-center gap-1 text-gray-500">
                            <Users className="w-3.5 h-3.5" />
                            {event.attendees} attending
                        </span>
                        <span className={`font-bold ${isFull ? "text-red-500" : isNearlyFull ? "text-orange-500" : "text-green-600"}`}>
                            {isFull ? "Full" : `${spotsLeft} spots left`}
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${isFull ? "bg-red-400" : isNearlyFull ? "bg-orange-400" : "bg-gradient-to-r from-primary to-secondary"}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center gap-3 mt-auto">
                    <button
                        onClick={(e) => { e.stopPropagation(); setInterested(!interested); }}
                        aria-label="Mark as interested"
                        className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-all ${interested ? "bg-red-50 border-red-200 text-red-500" : "bg-gray-50 border-gray-100 text-gray-500 hover:border-red-200 hover:text-red-500"}`}
                    >
                        <Heart className="w-3.5 h-3.5" fill={interested ? "currentColor" : "none"} />
                        {interested ? "Interested" : "Interest"}
                    </button>
                    <button
                        disabled={isFull}
                        className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 ${isFull ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"}`}
                    >
                        {isFull ? "Event Full" : "Register Now"}
                        {!isFull && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
