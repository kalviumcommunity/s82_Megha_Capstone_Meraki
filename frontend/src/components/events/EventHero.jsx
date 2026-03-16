import { CalendarDays, Users, Building2, MapPin } from "lucide-react";

export default function EventHero() {
    return (
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 lg:py-24 overflow-hidden">
            {/* Background dynamic elements */}
            <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
                <div className="absolute top-10 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-white/50">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping mr-1"></span>
                        <span className="text-sm font-semibold text-gray-800 tracking-wide">
                            Discover upcoming volunteer events and community activities
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900">
                        Find Your Next <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Impactful Experience
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                        Join hands with local organizations and passionate individuals. Whether it's a neighborhood cleanup or a virtual skills workshop, your time matters.
                    </p>

                    {/* Key Stats Row */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8">
                        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white">
                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                <CalendarDays className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-xl font-bold text-gray-900">24+</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Upcoming Events</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white hidden sm:flex">
                            <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-xl font-bold text-gray-900">5.2k</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Volunteers</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-white">
                            <div className="p-2.5 bg-accent/10 rounded-xl text-accent">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <div className="text-xl font-bold text-gray-900">45</div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Partner NGOs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
