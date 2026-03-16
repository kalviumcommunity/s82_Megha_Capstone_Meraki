import { X, Calendar, MapPin, Clock, Users, Video, ChevronRight, Share2, Bookmark, Heart, AlertCircle, Check } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useState } from "react";

export default function EventDetailsModal({ event, onClose }) {
    const [registered, setRegistered] = useState(false);
    const [saved, setSaved] = useState(false);
    const spotsLeft = event.maxAttendees - event.attendees;

    if (!event) return null;

    const handleRegister = (e) => {
        e.stopPropagation();
        setRegistered(true);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
        >
            <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl flex-shrink-0">
                    <ImageWithFallback src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-5 right-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-1">{event.category}</p>
                        <h2 className="text-2xl font-extrabold text-white">{event.title}</h2>
                        <p className="text-sm text-white/70 font-medium mt-1">Organized by {event.organizer}</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Quick Info */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                            <p className="text-xs font-semibold text-gray-500">Date</p>
                            <p className="text-xs font-bold text-gray-800">{event.date}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <Clock className="w-5 h-5 text-secondary mx-auto mb-1" />
                            <p className="text-xs font-semibold text-gray-500">Time</p>
                            <p className="text-xs font-bold text-gray-800">{event.time}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            {event.type === "Virtual" ? <Video className="w-5 h-5 text-blue-500 mx-auto mb-1" /> : <MapPin className="w-5 h-5 text-accent mx-auto mb-1" />}
                            <p className="text-xs font-semibold text-gray-500">Location</p>
                            <p className="text-xs font-bold text-gray-800 truncate">{event.location}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <Users className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <p className="text-xs font-semibold text-gray-500">Spots Left</p>
                            <p className={`text-xs font-bold ${spotsLeft <= 8 ? "text-orange-500" : "text-green-600"}`}>{spotsLeft}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">About This Event</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                    </div>

                    {/* Agenda */}
                    {event.agenda && (
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Agenda</h3>
                            <div className="space-y-2">
                                {event.agenda.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-primary text-xs font-bold">{i + 1}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-primary">{item.time}</p>
                                            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preparation */}
                    {event.preparation && (
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">What to Bring / Prepare</h3>
                            <ul className="space-y-2">
                                {event.preparation.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Attendee Preview */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex -space-x-2">
                            {["A", "B", "C", "D"].map((char, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                    {char}
                                </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-500 text-xs font-bold">
                                +{event.attendees - 4}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{event.attendees} people attending</p>
                    </div>

                    {/* Registration CTAs */}
                    {registered ? (
                        <div className="p-5 bg-green-50 rounded-2xl border border-green-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-bold text-green-800">You're registered!</p>
                                <p className="text-sm text-green-600">A confirmation has been sent. See you there!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSaved(!saved)}
                                className={`p-3.5 rounded-xl border-2 transition-all ${saved ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"}`}
                                aria-label="Save event"
                            >
                                <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); if (navigator.share) { navigator.share({ title: event.title, url: window.location.href }); } }} className="p-3.5 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-secondary hover:text-secondary transition-all" aria-label="Share event">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleRegister}
                                disabled={spotsLeft <= 0}
                                className="flex-1 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {spotsLeft <= 0 ? "Event Full" : "Register Now →"}
                            </button>
                        </div>
                    )}

                    {spotsLeft <= 8 && !registered && (
                        <p className="flex items-center gap-2 text-xs text-orange-600 font-semibold">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            Hurry! Only {spotsLeft} spots remaining.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
