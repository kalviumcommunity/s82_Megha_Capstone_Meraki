import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import {
    Heart, Users, TrendingUp, Award, MapPin, Clock, ArrowRight,
    Star, Calendar, BookOpen, Sparkles, Search, Filter, CheckCircle,
    Globe, Zap, Shield, Target, Trophy, BarChart2, Bell, MessageSquare,
    Briefcase, GraduationCap, Leaf, ChevronRight, Play, Medal, Flame,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
    { icon: Users, value: "50,000+", label: "Active Volunteers", gradient: "from-primary to-secondary" },
    { icon: Heart, value: "2,500+", label: "Partner NGOs", gradient: "from-secondary to-accent" },
    { icon: TrendingUp, value: "15,000+", label: "Projects Completed", gradient: "from-accent to-primary" },
    { icon: Clock, value: "1.2M+", label: "Volunteer Hours Logged", gradient: "from-primary to-accent" },
];

const OPPORTUNITIES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?w=800&q=80",
        category: "Environment", urgent: true,
        title: "Community Garden Initiative",
        description: "Help build sustainable urban gardens and teach farming techniques to local communities.",
        location: "San Francisco, CA", hours: "10 hrs/week", duration: "3 months",
        tags: ["Outdoor", "Agriculture"],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?w=800&q=80",
        category: "Education", urgent: false,
        title: "Youth Mentorship Program",
        description: "Mentor underprivileged students, helping them realize their academic and personal potential.",
        location: "New York, NY", hours: "5 hrs/week", duration: "6 months",
        tags: ["Teaching", "Youth"],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
        category: "Hunger Relief", urgent: false,
        title: "Food Bank Distribution",
        description: "Support food distribution efforts to families in need across the city every weekend.",
        location: "Los Angeles, CA", hours: "4 hrs/week", duration: "Ongoing",
        tags: ["Food", "Community"],
    },
];

const HOW_IT_WORKS_VOLUNTEER = [
    { step: 1, icon: Users, title: "Create Your Profile", desc: "Sign up and build a profile highlighting your skills, availability, and causes you care about." },
    { step: 2, icon: Search, title: "Discover Opportunities", desc: "Browse thousands of verified volunteering opportunities filtered by location, category, and time." },
    { step: 3, icon: Calendar, title: "Join Events & Projects", desc: "Apply to opportunities, attend events, and collaborate with like-minded volunteers." },
    { step: 4, icon: BarChart2, title: "Track Your Impact", desc: "Monitor your volunteer hours, earned badges, and the real-world impact you have made." },
];

const HOW_IT_WORKS_ORG = [
    { step: 1, icon: Briefcase, title: "Register Your Organization", desc: "Create a verified NGO profile and showcase your mission, projects, and impact." },
    { step: 2, icon: Target, title: "Post Opportunities", desc: "List volunteering roles with clear descriptions, schedules, and skill requirements." },
    { step: 3, icon: MessageSquare, title: "Connect with Volunteers", desc: "Review applications, communicate with volunteers, and build your project team." },
    { step: 4, icon: TrendingUp, title: "Track Project Impact", desc: "Access dashboards with volunteer engagement data and project completion metrics." },
];

const FEATURES = [
    { icon: Search, title: "Smart Discovery", desc: "AI-powered matching connects volunteers with the most relevant opportunities." },
    { icon: Calendar, title: "Event Management", desc: "Create, manage, and join community events with built-in RSVP and reminders." },
    { icon: BarChart2, title: "Impact Tracking", desc: "Real-time dashboards track volunteer hours, milestones, and project outcomes." },
    { icon: MessageSquare, title: "Community Hub", desc: "Forums, posts, and direct messaging keep volunteers and NGOs connected." },
    { icon: Shield, title: "Verified NGOs", desc: "All organizations go through a verification process to ensure trust and safety." },
    { icon: Trophy, title: "Badges & Recognition", desc: "Volunteers earn badges, rank on leaderboards, and celebrate their impact." },
];

const IMPACT_STORIES = [
    {
        name: "Priya Sharma", avatar: "PS", project: "Clean India Drive",
        location: "Mumbai, India", hours: "120 hrs",
        story: "Organizing 3 beach cleanup events, Priya and her team removed over 2 tons of plastic waste, inspiring an entire neighborhood to adopt sustainable habits.",
        gradient: "from-primary to-secondary",
    },
    {
        name: "James Okafor", avatar: "JO", project: "Youth Code Camp",
        location: "Lagos, Nigeria", hours: "80 hrs",
        story: "James taught coding to 45 underprivileged children, with 12 of them going on to participate in national tech competitions.",
        gradient: "from-secondary to-accent",
    },
    {
        name: "Elena Kovacs", avatar: "EK", project: "Food for All",
        location: "Budapest, Hungary", hours: "200 hrs",
        story: "Elena coordinated weekly food drives, personally delivering meals to over 300 families during the winter months.",
        gradient: "from-accent to-primary",
    },
];

const TESTIMONIALS = [
    {
        name: "Sarah Anderson", role: "Volunteer since 2024", initials: "SA", gradient: "from-primary to-secondary", rating: 5,
        quote: "Meraki connected me with amazing opportunities to give back. I've grown so much as a person and made lifelong friends through volunteering.",
    },
    {
        name: "Michael Chen", role: "NGO Director — GreenEarth", initials: "MC", gradient: "from-secondary to-accent", rating: 5,
        quote: "The platform made it incredibly easy to find skilled volunteers. The impact dashboards give us real data to report to donors.",
    },
    {
        name: "Emma Parker", role: "Active Volunteer", initials: "EP", gradient: "from-accent to-primary", rating: 5,
        quote: "I love the gamification features — earning badges and seeing my impact score grow keeps me motivated to volunteer more every week!",
    },
];

const BADGES = [
    { icon: Flame, label: "First Step", color: "text-orange-500 bg-orange-50", desc: "Complete your first volunteer shift" },
    { icon: Globe, label: "Global Citizen", color: "text-blue-500 bg-blue-50", desc: "Volunteer in 3 different causes" },
    { icon: Medal, label: "Impact Maker", color: "text-purple-500 bg-purple-50", desc: "Log 100+ volunteer hours" },
    { icon: Trophy, label: "Community Hero", color: "text-yellow-500 bg-yellow-50", desc: "Ranked top 10 in your region" },
];

const CATEGORIES = ["All", "Environment", "Education", "Healthcare", "Hunger Relief", "Animals", "Arts & Culture"];

const POPULAR_LOCATIONS = [
    "Bangalore, India",
    "Mumbai, India",
    "Delhi, India",
    "Hyderabad, India",
    "Chennai, India",
    "New York, NY",
    "San Francisco, CA",
    "London, UK",
    "Berlin, Germany",
    "Tokyo, Japan",
    "Sydney, Australia",
    "Lagos, Nigeria",
    "Nairobi, Kenya",
    "Budapest, Hungary",
];


// ─── Sub-components ────────────────────────────────────────────────────────────

function OpportunityCard({ opp }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group">
            <div className="relative overflow-hidden">
                <ImageWithFallback
                    src={opp.image} alt={opp.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-full">{opp.category}</span>
                    {opp.urgent && <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">Urgent</span>}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{opp.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{opp.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {opp.tags.map(t => (
                        <span key={t} className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground">{t}</span>
                    ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.hours}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{opp.duration}</span>
                </div>
                <Link to="/opportunities" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function TestimonialCard({ t }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-all">
            <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed italic">"{t.quote}"</p>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${t.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {t.initials}
                </div>
                <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("volunteer");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);

    const filteredLocations = POPULAR_LOCATIONS.filter(loc =>
        loc.toLowerCase().includes(selectedLocation.toLowerCase()) &&
        selectedLocation.length > 0 &&
        loc.toLowerCase() !== selectedLocation.toLowerCase()
    );


    const journey = activeTab === "volunteer" ? HOW_IT_WORKS_VOLUNTEER : HOW_IT_WORKS_ORG;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm border border-border">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Join 50,000+ volunteers worldwide</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Volunteer for
                                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    Meaningful Change
                                </span>
                                in Your Community
                            </h1>

                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                Meraki connects passionate volunteers with verified NGOs and community projects worldwide.
                                Discover your purpose, build skills, and track your real impact.
                            </p>

                            <ul className="space-y-3 mb-10">
                                {[
                                    "Discover verified volunteering opportunities near you",
                                    "Connect with impactful NGOs and communities worldwide",
                                    "Track your volunteer hours and measure your social impact",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {user ? (
                                    <Link
                                        to={user.role === 'Volunteer' ? "/volunteer/dashboard" : "/organization/dashboard"}
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/signup"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                        >
                                            Become a Volunteer
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                                        >
                                            Register Your Organization
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-3xl opacity-20" />
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1080&q=80"
                                alt="Volunteers working together in community"
                                className="relative rounded-3xl shadow-2xl w-full h-[520px] object-cover"
                            />
                            {/* Floating stats card */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">This month</div>
                                        <div className="font-bold text-sm">+1,240 new volunteers</div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating badge card */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    <div>
                                        <div className="text-xs text-muted-foreground">Top Volunteer</div>
                                        <div className="font-bold text-sm">Impact Hero Badge</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. OPPORTUNITY SEARCH ───────────────────────────────────────────── */}
            <section className="bg-white border-b border-border">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
                        Find your next volunteering opportunity
                    </p>
                    <div className="flex flex-col md:flex-row gap-3 bg-white border-2 border-primary/20 rounded-2xl p-3 shadow-lg shadow-primary/5">
                        <div className="flex-1 flex items-center gap-2 px-4 py-2">
                            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search opportunities, skills, causes..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                                aria-label="Search opportunities"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-2 px-4 py-2 border-l border-border relative">
                            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={selectedLocation}
                                onChange={e => {
                                    setSelectedLocation(e.target.value);
                                    setShowLocationSuggestions(true);
                                }}
                                onFocus={() => setShowLocationSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                                className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                                aria-label="Filter by location"
                            />

                            {/* Location Suggestions Dropdown */}
                            {showLocationSuggestions && filteredLocations.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-2">
                                        <p className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Suggestions</p>
                                        {filteredLocations.slice(0, 5).map(loc => (
                                            <button
                                                key={loc}
                                                onClick={() => {
                                                    setSelectedLocation(loc);
                                                    setShowLocationSuggestions(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2 group"
                                            >
                                                <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                <span className="font-medium text-gray-700">{loc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 border-l border-border">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className="text-sm bg-transparent outline-none text-muted-foreground"
                                aria-label="Filter by category"
                            >
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <Link
                            to="/opportunities"
                            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                        >
                            <Search className="w-4 h-4" /> Search
                        </Link>
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                        {[
                            { icon: Leaf, label: "Environment" },
                            { icon: GraduationCap, label: "Education" },
                            { icon: Heart, label: "Healthcare" },
                            { icon: Users, label: "Community" },
                            { icon: Globe, label: "Global Aid" },
                        ].map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                className="flex items-center gap-1.5 px-4 py-1.5 bg-muted hover:bg-primary hover:text-white text-muted-foreground rounded-full text-sm transition-all"
                            >
                                <Icon className="w-3.5 h-3.5" /> {label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. TRUST STRIP ──────────────────────────────────────────────────── */}
            <section className="bg-muted/40 py-10 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-muted-foreground mb-8">
                        Trusted by <span className="font-semibold text-foreground">2,500+ verified NGOs</span> and volunteer organizations worldwide
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {["UNICEF", "WWF", "Red Cross", "Habitat for Humanity", "GreenPeace", "CARE"].map(org => (
                            <div key={org} className="text-muted-foreground/60 font-bold text-lg tracking-tight hover:text-foreground transition-colors">
                                {org}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. IMPACT STATISTICS ────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                            Making a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Real Difference</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">Numbers that reflect our growing community's impact</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {STATS.map(({ icon: Icon, value, label, gradient }) => (
                            <div key={label} className="relative bg-gradient-to-br from-muted/30 to-white rounded-2xl p-8 text-center border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                                <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                                    {value}
                                </div>
                                <div className="text-muted-foreground text-sm font-medium">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. HOW IT WORKS ─────────────────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-primary/3 to-secondary/3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">How Meraki Works</h2>
                        <p className="text-muted-foreground text-lg">Your step-by-step guide to creating impact</p>
                    </div>

                    {/* Tab switch */}
                    <div className="flex justify-center mb-12">
                        <div className="flex bg-white border border-border rounded-xl p-1 shadow-sm">
                            {[
                                { key: "volunteer", label: "For Volunteers" },
                                { key: "org", label: "For Organizations" },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === key
                                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {journey.map(({ step, icon: Icon, title, desc }, index) => (
                            <div key={step} className="relative">
                                {index < journey.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/30 to-secondary/30 z-10" style={{ width: "calc(100% - 2rem)", left: "calc(50% + 2rem)" }} />
                                )}
                                <div className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all text-center group">
                                    <div className="relative mx-auto mb-5 w-16 h-16">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {step}
                                        </div>
                                    </div>
                                    <h3 className="font-bold mb-2">{title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. PLATFORM FEATURES ────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                            Everything You Need to
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Create Impact</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">A complete platform built for volunteers and organizations</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg bg-white transition-all cursor-default">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-secondary transition-all">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold mb-2">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. FEATURED OPPORTUNITIES ───────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Featured Opportunities</h2>
                            <p className="text-muted-foreground text-lg">Verified opportunities ready for passionate volunteers</p>
                        </div>
                        <Link to="/opportunities" className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all flex-shrink-0">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {OPPORTUNITIES.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
                    </div>
                </div>
            </section>

            {/* ── 8. IMPACT STORIES ───────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Real People, Real Impact</h2>
                        <p className="text-muted-foreground text-lg">Stories from volunteers who changed lives — including their own</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {IMPACT_STORIES.map(s => (
                            <div key={s.name} className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all">
                                <div className={`bg-gradient-to-br ${s.gradient} p-6 text-white`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-sm">
                                            {s.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold">{s.name}</div>
                                            <div className="text-white/80 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{s.location}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/80">
                                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{s.project}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.hours}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-muted-foreground text-sm leading-relaxed">{s.story}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 9. DASHBOARD PREVIEW ────────────────────────────────────────────── */}
            <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 text-sm">
                                <BarChart2 className="w-4 h-4" /> Volunteer Dashboard
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Track Your Volunteering Journey
                            </h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                Your personal dashboard gives you a clear view of your impact — hours logged, badges earned, projects completed, and your community rank.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    { icon: Clock, text: "Automatic volunteer hour logging" },
                                    { icon: Trophy, text: "Earn badges and unlock achievements" },
                                    { icon: BarChart2, text: "Visual impact reports and milestones" },
                                    { icon: Bell, text: "Smart notifications for new opportunities" },
                                ].map(({ icon: Icon, text }) => (
                                    <li key={text} className="flex items-center gap-3 text-white/90">
                                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:shadow-xl transition-all"
                            >
                                Start Your Journey <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Mock dashboard UI */}
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="font-bold">My Impact Dashboard</div>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {[
                                        { label: "Hours Logged", value: "248" },
                                        { label: "Projects", value: "12" },
                                        { label: "Badges", value: "7" },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
                                            <div className="text-xl font-bold">{value}</div>
                                            <div className="text-white/60 text-xs mt-1">{label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/10 rounded-xl p-4 mb-4">
                                    <div className="text-xs text-white/60 mb-2">Impact Progress</div>
                                    <div className="space-y-2">
                                        {["Community", "Environment", "Education"].map((cat, i) => (
                                            <div key={cat}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>{cat}</span><span>{[78, 54, 45][i]}%</span>
                                                </div>
                                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-white rounded-full"
                                                        style={{ width: `${[78, 54, 45][i]}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {["🔥", "🌍", "🏅"].map((emoji, i) => (
                                        <div key={i} className="flex-1 bg-white/10 rounded-xl p-3 text-center text-lg">{emoji}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 10. GAMIFICATION ────────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                            Earn Recognition for Your
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Impact</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">Stay motivated with badges, milestones, and community rankings</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="grid grid-cols-2 gap-4">
                            {BADGES.map(({ icon: Icon, label, color, desc }) => (
                                <div key={label} className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-all group cursor-default">
                                    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="font-bold mb-1 text-sm">{label}</div>
                                    <div className="text-xs text-muted-foreground">{desc}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Community Leaderboard</h3>
                            <p className="text-muted-foreground mb-6">
                                See how you rank among volunteers in your city, country, and globally.
                                Rise through the ranks, inspire others, and get featured as a Community Hero.
                            </p>
                            <div className="space-y-3 mb-6">
                                {[
                                    { rank: 1, name: "Aisha K.", hours: "312 hrs", badge: "🏆" },
                                    { rank: 2, name: "Marco P.", hours: "287 hrs", badge: "🥈" },
                                    { rank: 3, name: "Yuna S.", hours: "241 hrs", badge: "🥉" },
                                    { rank: 4, name: "You →", hours: "248 hrs", badge: "✨", highlight: true },
                                ].map(({ rank, name, hours, badge, highlight }) => (
                                    <div
                                        key={rank}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${highlight
                                            ? "border-primary bg-primary/5 font-semibold"
                                            : "border-border bg-muted/30"
                                            }`}
                                    >
                                        <span className="text-lg w-8 text-center">{badge}</span>
                                        <span className="flex-1 text-sm">{name}</span>
                                        <span className="text-xs text-muted-foreground">{hours}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                            >
                                Join the Community <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 11. TESTIMONIALS ────────────────────────────────────────────────── */}
            <section className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Loved by the Community</h2>
                        <p className="text-muted-foreground text-lg">What volunteers and organizations say about Meraki</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map(t => <TestimonialCard key={t.name} t={t} />)}
                    </div>
                </div>
            </section>

            {/* ── 12. FINAL CTA ───────────────────────────────────────────────────── */}
            <section className="py-24 bg-gradient-to-br from-primary via-secondary to-accent text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                </div>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 text-sm font-medium">
                        <Zap className="w-4 h-4" /> Ready to make an impact?
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        Start Your Volunteering Journey Today
                    </h2>
                    <p className="text-xl text-white/80 mb-10 leading-relaxed">
                        Join thousands of volunteers and organizations already using Meraki to create
                        meaningful change in communities around the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-black/20 transition-all"
                        >
                            Get Started Free <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/opportunities"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                        >
                            <Play className="w-5 h-5" /> Browse Opportunities
                        </Link>
                    </div>
                    <p className="mt-8 text-sm text-white/60">
                        Free for volunteers · Trusted by 2,500+ NGOs · No credit card required
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
