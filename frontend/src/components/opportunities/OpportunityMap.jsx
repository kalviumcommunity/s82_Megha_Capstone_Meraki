import { useState } from "react";
import { MapPin, Navigation, Compass, Layers, ExternalLink, ArrowRight } from "lucide-react";

export default function OpportunityMap({ opportunities, onSelectOpportunity }) {
    const [selectedId, setSelectedId] = useState(opportunities[0]?.id || 1);
    const [activeRadius, setActiveRadius] = useState("10 km");

    const sampleLocations = [
        { id: 1, lat: "37.7749", lng: "-122.4194", city: "San Francisco, CA", top: "35%", left: "45%" },
        { id: 2, lat: "40.7128", lng: "-74.0060", city: "New York, NY", top: "28%", left: "78%" },
        { id: 3, lat: "25.7617", lng: "-80.1918", city: "Miami, FL", top: "72%", left: "72%" },
        { id: 4, lat: "34.0522", lng: "-118.2437", city: "Los Angeles, CA", top: "52%", left: "22%" },
    ];

    const activeOpp = opportunities.find(o => o.id === selectedId) || opportunities[0];

    return (
        <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Map Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/20 text-primary rounded-xl">
                        <Compass className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-sm text-white">Interactive Map Explorer</h3>
                        <p className="text-xs text-slate-400 font-medium">Explore nearby volunteering opportunities visually</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {["5 km", "10 km", "25 km", "50 km"].map(rad => (
                        <button
                            key={rad}
                            onClick={() => setActiveRadius(rad)}
                            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeRadius === rad ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-800 text-slate-400 hover:text-white"}`}
                        >
                            {rad}
                        </button>
                    ))}
                </div>
            </div>

            {/* Simulated Interactive Map Display Canvas */}
            <div className="relative w-full h-[360px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 group">
                {/* SVG Grid Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Map Route Lines */}
                <svg className="absolute inset-0 w-full h-full stroke-primary/30 stroke-[2] fill-none">
                    <path d="M 200 120 Q 350 200 600 150 T 800 280" strokeDasharray="6 6" />
                </svg>

                {/* Pin Markers */}
                {opportunities.slice(0, 4).map((opp, idx) => {
                    const loc = sampleLocations[idx % sampleLocations.length];
                    const isSelected = opp.id === selectedId;

                    return (
                        <div
                            key={opp.id}
                            style={{ top: loc.top, left: loc.left }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group/pin"
                            onClick={() => setSelectedId(opp.id)}
                        >
                            <div className="relative flex items-center justify-center">
                                <span className={`absolute w-8 h-8 rounded-full ${isSelected ? "bg-primary/40 animate-ping" : "bg-emerald-500/20"}`} />
                                <div className={`p-2.5 rounded-full shadow-xl transition-all duration-300 ${isSelected ? "bg-primary text-white scale-125 ring-4 ring-primary/30" : "bg-slate-800 text-emerald-400 hover:scale-110"}`}>
                                    <MapPin className="w-4 h-4 fill-current" />
                                </div>
                            </div>

                            {/* Label popup on hover or selected */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-xl ${isSelected ? "bg-white text-slate-900 scale-100 opacity-100" : "bg-slate-800 text-slate-300 opacity-0 group-hover/pin:opacity-100 scale-95"}`}>
                                {opp.title}
                            </div>
                        </div>
                    );
                })}

                {/* Bottom Card Preview */}
                {activeOpp && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-black text-xs flex-shrink-0">
                                {activeOpp.orgInitials || "OG"}
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-extrabold text-sm text-white truncate">{activeOpp.title}</h4>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Navigation className="w-3 h-3 text-primary" /> {activeOpp.location} • <span className="text-emerald-400 font-bold">{activeOpp.mode}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => onSelectOpportunity(activeOpp)}
                            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0 shadow-lg shadow-primary/20"
                        >
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
