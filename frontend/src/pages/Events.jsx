import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import EventHero from "../components/events/EventHero";
import EventSearchBar from "../components/events/EventSearchBar";
import EventFilters from "../components/events/EventFilters";
import FeaturedEvents from "../components/events/FeaturedEvents";
import EventCard from "../components/events/EventCard";
import EventDetailsModal from "../components/events/EventDetailsModal";
import EmptyState from "../components/events/EmptyState";

const events = [
    {
        id: 1,
        title: "Beach Cleanup Drive",
        date: "March 24, 2026",
        time: "10:00 AM - 2:00 PM",
        location: "Santa Monica Beach",
        type: "In-Person",
        category: "Environment",
        popularity: "Trending",
        duration: "4 hrs",
        attendees: 52,
        maxAttendees: 60,
        image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwY2xlYW51cCUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczMzk2MTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Join us for a coastal cleanup and marine conservation awareness session. Make a difference for our oceans!",
        organizer: "Ocean Guardians",
        agenda: [
            { time: "10:00 AM", title: "Welcome & Safety Briefing" },
            { time: "10:30 AM", title: "Cleanup Begins" },
            { time: "12:30 PM", title: "Lunch Break & Data Collection" },
            { time: "1:30 PM", title: "Final Cleanup & Wrap Up" },
        ],
        preparation: ["Bring reusable gloves", "Wear closed-toe shoes", "Sunscreen recommended", "Water bottle required"],
    },
    {
        id: 2,
        title: "Volunteer Training Workshop",
        date: "March 28, 2026",
        time: "6:00 PM - 8:00 PM",
        location: "Online Event",
        type: "Virtual",
        category: "Training",
        popularity: "Popular",
        duration: "2 hrs",
        attendees: 134,
        maxAttendees: 200,
        image: "https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWFjaGluZyUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczNDk3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Learn essential skills for effective volunteering and community leadership in this interactive virtual workshop.",
        organizer: "Meraki Academy",
        agenda: [
            { time: "6:00 PM", title: "Intro & Icebreaker" },
            { time: "6:30 PM", title: "Core Volunteering Skills" },
            { time: "7:15 PM", title: "Q&A & Community Discussion" },
            { time: "7:45 PM", title: "Closing Remarks & Next Steps" },
        ],
        preparation: ["Stable internet connection", "Camera on preferred", "Note-taking materials"],
    },
    {
        id: 3,
        title: "Community Food Drive",
        date: "April 5, 2026",
        time: "9:00 AM - 5:00 PM",
        location: "City Community Center",
        type: "In-Person",
        category: "Hunger Relief",
        duration: "8 hrs",
        attendees: 28,
        maxAttendees: 40,
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczNDUzNTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Help us collect and distribute food to families in need. Every contribution makes a difference!",
        organizer: "City Food Bank",
        preparation: ["Comfortable clothing", "Closed-toe shoes required", "Arrive 15 mins early"],
    },
    {
        id: 4,
        title: "Youth Mentorship Kickoff",
        date: "April 12, 2026",
        time: "5:00 PM - 7:00 PM",
        location: "Central Library",
        type: "In-Person",
        category: "Education",
        duration: "2 hrs",
        attendees: 56,
        maxAttendees: 80,
        image: "https://images.unsplash.com/photo-1713977331626-722cd8400b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRpdmVyc2UlMjB2b2x1bnRlZXJzJTIwaGVscGluZ3xlbnwxfHx8fDE3NzM0OTc3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Meet your mentees and fellow mentors at our program kickoff event. Building futures together!",
        organizer: "Future Leaders Org",
        preparation: ["Bring a valid ID", "Review mentee profiles sent by email"],
    },
    {
        id: 5,
        title: "Tree Planting Initiative",
        date: "April 20, 2026",
        time: "8:00 AM - 12:00 PM",
        location: "Green Valley Park",
        type: "In-Person",
        category: "Environment",
        popularity: "Popular",
        duration: "4 hrs",
        attendees: 92,
        maxAttendees: 100,
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc3MzQ5Nzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Plant 1,000 trees with us to combat climate change and beautify our community spaces.",
        organizer: "Green Earth Foundation",
        preparation: ["Wear old clothes", "Gardening gloves provided", "Water and snacks included"],
    },
    {
        id: 6,
        title: "Fundraising Gala",
        date: "May 3, 2026",
        time: "7:00 PM - 11:00 PM",
        location: "Grand Hotel Ballroom",
        type: "In-Person",
        category: "Fundraising",
        duration: "4 hrs",
        attendees: 215,
        maxAttendees: 300,
        image: "https://images.unsplash.com/photo-1769837230054-7f3a7356dde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY29tbXVuaXR5JTIwc2VydmljZSUyMHRlYW13b3JrfGVufDF8fHx8MTc3MzQ5Nzc4MXww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "Join us for an evening of celebration and fundraising to support our community programs.",
        organizer: "Meraki Foundation",
        preparation: ["Formal attire required", "RSVP confirmation email needed at entry"],
    },
];

export default function Events() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ category: "All", type: "All" });
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filteredEvents = useMemo(() => {
        return events.filter((e) => {
            const matchSearch = !searchQuery ||
                e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = filters.category === "All" || e.category === filters.category;
            const matchType = filters.type === "All" || e.type === filters.type;
            return matchSearch && matchCategory && matchType;
        });
    }, [searchQuery, filters]);

    const handleReset = () => {
        setSearchQuery("");
        setFilters({ category: "All", type: "All" });
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            {/* Hero */}
            <EventHero />

            {/* Floating Search Bar */}
            <EventSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

                {/* Filters */}
                <EventFilters filters={filters} setFilters={setFilters} />

                {/* Featured Events (only when no active filters) */}
                {filters.category === "All" && filters.type === "All" && !searchQuery && (
                    <FeaturedEvents events={events} onSelect={setSelectedEvent} />
                )}

                {/* All / Filtered Events Grid */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold text-gray-900">
                        {filters.category === "All" && filters.type === "All" && !searchQuery
                            ? "All Events"
                            : `Results (${filteredEvents.length})`}
                    </h2>
                    <span className="text-sm font-semibold text-gray-400">{filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}</span>
                </div>

                {filteredEvents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onSelect={setSelectedEvent}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1">
                        <EmptyState onReset={handleReset} />
                    </div>
                )}
            </div>

            <Footer />

            {/* Event Details Modal */}
            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}
