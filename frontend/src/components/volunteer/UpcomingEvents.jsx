import { useState } from "react";
import { Calendar, Users, MapPin, ChevronRight, Check } from "lucide-react";

const initialEvents = [
    {
        id: 1,
        title: "Beach Cleanup Drive",
        date: "18",
        month: "MAR",
        time: "Saturday, 9:00 AM",
        location: "Santa Monica",
        attendees: 52,
        rsvped: true,
        gradient: "from-primary to-secondary",
    },
    {
        id: 2,
        title: "Volunteer Training",
        date: "22",
        month: "MAR",
        time: "Wednesday, 6:00 PM",
        location: "Virtual",
        attendees: 134,
        rsvped: false,
        gradient: "from-accent to-primary",
    },
];

export default function UpcomingEvents() {
    const [events, setEvents] = useState(initialEvents);

    const toggleRSVP = (id) => {
        setEvents(events.map(ev =>
            ev.id === id ? { ...ev, rsvped: !ev.rsvped, attendees: ev.rsvped ? ev.attendees - 1 : ev.attendees + 1 } : ev
        ));
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                </h3>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    Full Calendar <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                {events.map((ev) => (
                    <div key={ev.id} className="group flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-primary/20 hover:bg-gray-50/50 transition-all">
                        <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${ev.gradient} rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-black/5`}>
                            <div className="text-xl font-extrabold leading-none">{ev.date}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest">{ev.month}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">{ev.title}</h4>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <span>{ev.time}</span>
                                    <span className="text-gray-200">|</span>
                                    <MapPin className="w-3 h-3 text-secondary" />
                                    <span>{ev.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                    <Users className="w-3.5 h-3.5 text-primary/60" />
                                    {ev.attendees} attending
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <button
                                onClick={() => toggleRSVP(ev.id)}
                                className={`p-2 rounded-xl border transition-all ${ev.rsvped ? "bg-green-50 border-green-200 text-green-600" : "bg-white border-gray-100 text-gray-400 hover:border-primary hover:text-primary"}`}
                            >
                                {ev.rsvped ? <Check className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 border border-gray-100 text-gray-400 text-[10px] font-bold rounded-2xl hover:bg-gray-50 hover:text-primary transition-all uppercase tracking-widest">
                Explore More Events
            </button>
        </div>
    );
}
