import { useState } from 'react';
import { MapPin, Navigation, Zap, Globe, Users, ArrowRight } from 'lucide-react';

const MAP_MARKERS = [
    { id: 1, title: "Community Garden", lat: 37.7749, lng: -122.4194, category: "Environment", volunteers: 14, x: "30%", y: "40%" },
    { id: 2, title: "Youth Mentorship", lat: 37.7833, lng: -122.4167, category: "Education", volunteers: 8, x: "65%", y: "25%" },
    { id: 3, title: "Food Bank Drive", lat: 37.7690, lng: -122.4480, category: "Human Services", volunteers: 28, x: "45%", y: "70%" },
    { id: 4, title: "Reforestation Drive", lat: 37.7500, lng: -122.4100, category: "Environment", volunteers: 42, x: "80%", y: "60%" },
];

export default function OpportunityMap({ onSelectOpportunity }) {
    const [activeMarker, setActiveMarker] = useState(MAP_MARKERS[0]);

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" /> Interactive Volunteer Map
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Discover active volunteering initiatives near your location</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold">
                    <Navigation className="w-3.5 h-3.5" /> San Francisco, CA
                </div>
            </div>

            {/* Simulated Interactive Map Canvas */}
            <div className="relative w-full h-80 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">

                {/* Map Grid Decorative Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="w-full h-1/2 border-b border-gray-400 dark:border-gray-500 border-dashed" />
                    <div className="h-full w-1/2 border-r border-gray-400 dark:border-gray-500 border-dashed" />
                </div>

                {/* Markers */}
                {MAP_MARKERS.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setActiveMarker(m)}
                        style={{ left: m.x, top: m.y }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                            activeMarker.id === m.id ? 'scale-125 z-20' : 'scale-100 hover:scale-110 z-10'
                        }`}
                    >
                        <div className="relative">
                            <span className="absolute -inset-1 rounded-full bg-primary/40 animate-ping" />
                            <div className={`p-2.5 rounded-full shadow-lg ${activeMarker.id === m.id ? 'bg-primary text-white' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'}`}>
                                <MapPin className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                ))}

                {/* Info Card Tooltip */}
                {activeMarker && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-2">
                        <div>
                            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full">
                                {activeMarker.category}
                            </span>
                            <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mt-1">{activeMarker.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                                <Users className="w-3 h-3 text-primary" /> {activeMarker.volunteers} active volunteers
                            </p>
                        </div>
                        <button
                            onClick={() => onSelectOpportunity && onSelectOpportunity(activeMarker)}
                            className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-1.5"
                        >
                            View Initiative <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
