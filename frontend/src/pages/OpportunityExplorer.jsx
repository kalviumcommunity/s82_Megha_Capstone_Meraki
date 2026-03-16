import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import {
    Search, MapPin, Clock, Filter, Heart, Users, ArrowRight, X,
    Briefcase, Star, CheckCircle, Globe, Zap, BarChart2, Trophy,
    SlidersHorizontal, ChevronDown, Leaf, GraduationCap, Wifi,
    AlertCircle, TrendingUp, Award,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const OPPORTUNITIES = [
    {
        id: 1,
        title: "Community Garden Initiative",
        organization: "Green Earth Foundation",
        orgInitials: "GE",
        orgColor: "from-green-400 to-emerald-600",
        category: "Environment",
        location: "San Francisco, CA",
        hours: "10 hrs/week",
        commitment: "Part-time",
        mode: "On-site",
        skillLevel: "Beginner",
        urgent: true,
        featured: true,
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?w=800&q=80",
        description: "Help us build sustainable community gardens and teach urban farming techniques to local residents.",
        skills: ["Gardening", "Community Outreach", "Teaching"],
        impact: "Feeds 200+ families annually",
        capacity: { filled: 14, total: 20 },
        volunteers: 23,
        postedDays: 2,
    },
    {
        id: 2,
        title: "Youth Mentorship Program",
        organization: "Future Leaders Org",
        orgInitials: "FL",
        orgColor: "from-blue-400 to-indigo-600",
        category: "Education",
        location: "New York, NY",
        hours: "5 hrs/week",
        commitment: "Part-time",
        mode: "Hybrid",
        skillLevel: "Intermediate",
        urgent: false,
        featured: true,
        image: "https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?w=800&q=80",
        description: "Mentor underprivileged students and help them discover their academic and personal potential.",
        skills: ["Mentoring", "Communication", "Career Guidance"],
        impact: "45 students mentored last year",
        capacity: { filled: 8, total: 15 },
        volunteers: 15,
        postedDays: 5,
    },
    {
        id: 3,
        title: "Food Bank Distribution",
        organization: "City Food Bank",
        orgInitials: "CF",
        orgColor: "from-orange-400 to-red-500",
        category: "Hunger Relief",
        location: "Los Angeles, CA",
        hours: "4 hrs/week",
        commitment: "Weekends",
        mode: "On-site",
        skillLevel: "Beginner",
        urgent: false,
        featured: false,
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
        description: "Support food distribution efforts to families in need across the city every weekend.",
        skills: ["Food Handling", "Logistics", "Customer Service"],
        impact: "Serves 300+ families per week",
        capacity: { filled: 38, total: 50 },
        volunteers: 42,
        postedDays: 10,
    },
    {
        id: 4,
        title: "Beach Cleanup Initiative",
        organization: "Ocean Guardians",
        orgInitials: "OG",
        orgColor: "from-cyan-400 to-blue-600",
        category: "Environment",
        location: "Miami, FL",
        hours: "6 hrs/week",
        commitment: "Part-time",
        mode: "On-site",
        skillLevel: "Beginner",
        urgent: true,
        featured: false,
        image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?w=800&q=80",
        description: "Join our coastal cleanup and marine conservation awareness sessions along Miami beach.",
        skills: ["Environmental Awareness", "Physical Fitness", "Teamwork"],
        impact: "2 tons of waste removed last season",
        capacity: { filled: 28, total: 40 },
        volunteers: 34,
        postedDays: 1,
    },
    {
        id: 5,
        title: "After-School Tutoring",
        organization: "Learning Together",
        orgInitials: "LT",
        orgColor: "from-violet-400 to-purple-600",
        category: "Education",
        location: "Remote",
        hours: "3 hrs/week",
        commitment: "Flexible",
        mode: "Remote",
        skillLevel: "Beginner",
        urgent: false,
        featured: false,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        description: "Help students with homework and reading skills through engaging virtual sessions.",
        skills: ["Teaching", "Patience", "Subject Expertise"],
        impact: "120+ students helped last semester",
        capacity: { filled: 20, total: 30 },
        volunteers: 28,
        postedDays: 7,
    },
    {
        id: 6,
        title: "Animal Shelter Care",
        organization: "Paws & Hearts",
        orgInitials: "PH",
        orgColor: "from-pink-400 to-rose-600",
        category: "Animal Welfare",
        location: "Seattle, WA",
        hours: "8 hrs/week",
        commitment: "Part-time",
        mode: "On-site",
        skillLevel: "Beginner",
        urgent: false,
        featured: false,
        image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
        description: "Care for rescued animals and help them find forever homes through adoption events.",
        skills: ["Animal Care", "Compassion", "Event Support"],
        impact: "500+ animals rehomed last year",
        capacity: { filled: 12, total: 25 },
        volunteers: 19,
        postedDays: 14,
    },
    {
        id: 7,
        title: "Senior Tech Literacy",
        organization: "Digital Bridge",
        orgInitials: "DB",
        orgColor: "from-teal-400 to-cyan-600",
        category: "Healthcare",
        location: "Remote",
        hours: "2 hrs/week",
        commitment: "Flexible",
        mode: "Remote",
        skillLevel: "Intermediate",
        urgent: false,
        featured: false,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        description: "Teach seniors how to use smartphones and video calls to stay connected with loved ones.",
        skills: ["Tech Skills", "Teaching", "Patience"],
        impact: "Improves quality of life for 80+ seniors",
        capacity: { filled: 5, total: 20 },
        volunteers: 11,
        postedDays: 3,
    },
    {
        id: 8,
        title: "Community Health Screening",
        organization: "HealthFirst NGO",
        orgInitials: "HF",
        orgColor: "from-red-400 to-pink-600",
        category: "Healthcare",
        location: "Chicago, IL",
        hours: "6 hrs/week",
        commitment: "Weekends",
        mode: "On-site",
        skillLevel: "Advanced",
        urgent: true,
        featured: false,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        description: "Assist medical professionals in providing free health screenings to underserved communities.",
        skills: ["Medical Knowledge", "Organization", "Empathy"],
        impact: "Screens 500+ community members monthly",
        capacity: { filled: 9, total: 12 },
        volunteers: 21,
        postedDays: 0,
    },
];

const CATEGORIES = ["All", "Environment", "Education", "Hunger Relief", "Animal Welfare", "Healthcare"];
const LOCATIONS = ["All", "Remote", "San Francisco, CA", "New York, NY", "Los Angeles, CA", "Miami, FL", "Seattle, WA", "Chicago, IL"];
const COMMITMENTS = ["All", "Flexible", "Part-time", "Weekends"];
const MODES = ["All", "Remote", "On-site", "Hybrid"];
const SKILL_LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const SORT_OPTIONS = ["Most Recent", "Most Volunteers", "Urgent First", "Least Filled"];

const WHY_MERAKI = [
    { icon: CheckCircle, title: "Verified NGOs Only", desc: "Every organization is thoroughly vetted before listing on Meraki." },
    { icon: BarChart2, title: "Track Your Impact", desc: "Auto-log hours and see your real-world contribution with visual dashboards." },
    { icon: Globe, title: "Global Opportunities", desc: "Volunteer locally or join remote projects helping communities worldwide." },
    { icon: Trophy, title: "Earn Recognition", desc: "Collect badges, rise the leaderboard, and build your social impact portfolio." },
];

// ─── Sub-components ─────────────────────────────────────────────────────────────

function FilterChip({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {label}
            <button onClick={onRemove} aria-label={`Remove ${label} filter`} className="hover:text-accent transition-colors">
                <X className="w-3 h-3" />
            </button>
        </span>
    );
}

function CapacityBar({ filled, total }) {
    const pct = Math.round((filled / total) * 100);
    return (
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span><Users className="w-3 h-3 inline mr-1" />{filled}/{total} volunteers</span>
                <span>{pct}% filled</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

function ModeIcon({ mode }) {
    if (mode === "Remote") return <Wifi className="w-3 h-3" />;
    if (mode === "On-site") return <MapPin className="w-3 h-3" />;
    return <Globe className="w-3 h-3" />;
}

function OpportunityCard({ opp, isPreview, onPreview }) {
    return (
        <article
            className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer
        ${opp.featured ? "border-primary/30 shadow-md shadow-primary/10" : "border-border shadow-sm"}
        hover:shadow-xl hover:-translate-y-0.5`}
            onClick={() => onPreview(opp)}
            aria-label={`View details for ${opp.title}`}
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <ImageWithFallback
                    src={opp.image}
                    alt={`${opp.title} volunteering opportunity`}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {opp.featured && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold rounded-full">
                            <Star className="w-3 h-3 fill-white" /> Featured
                        </span>
                    )}
                    {opp.urgent && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                            <Zap className="w-3 h-3" /> Urgent
                        </span>
                    )}
                </div>
                <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-full">{opp.category}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-5">
                {/* Org avatar + name */}
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-7 h-7 bg-gradient-to-br ${opp.orgColor} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {opp.orgInitials}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium truncate">{opp.organization}</span>
                    <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">
                        {opp.postedDays === 0 ? "Today" : `${opp.postedDays}d ago`}
                    </span>
                </div>

                <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors line-clamp-1">{opp.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{opp.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.hours}</span>
                    <span className="flex items-center gap-1"><ModeIcon mode={opp.mode} />{opp.mode}</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {opp.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-muted text-xs rounded-full text-muted-foreground">{s}</span>
                    ))}
                </div>

                {/* Impact */}
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
                    <TrendingUp className="w-3.5 h-3.5" /> {opp.impact}
                </div>

                {/* Capacity bar */}
                <CapacityBar filled={opp.capacity.filled} total={opp.capacity.total} />

                {/* CTA */}
                <Link
                    to="/signup"
                    onClick={e => e.stopPropagation()}
                    className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all group-hover:gap-3"
                    aria-label={`Apply to ${opp.title}`}
                >
                    Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </article>
    );
}

function PreviewPanel({ opp, onClose }) {
    if (!opp) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={opp.title}>
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Image */}
                <div className="relative">
                    <ImageWithFallback src={opp.image} alt={opp.title} className="w-full h-52 object-cover rounded-t-2xl" />
                    <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-muted transition-colors" aria-label="Close preview">
                        <X className="w-4 h-4" />
                    </button>
                    <div className="absolute top-3 left-3 flex gap-2">
                        {opp.featured && <span className="px-2.5 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold rounded-full flex items-center gap-1"><Star className="w-3 h-3 fill-white" /> Featured</span>}
                        {opp.urgent && <span className="px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full flex items-center gap-1"><Zap className="w-3 h-3" /> Urgent</span>}
                    </div>
                </div>

                <div className="p-6">
                    {/* Org */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className={`w-9 h-9 bg-gradient-to-br ${opp.orgColor} rounded-xl flex items-center justify-center text-white text-sm font-bold`}>{opp.orgInitials}</div>
                        <div>
                            <div className="font-semibold text-sm">{opp.organization}</div>
                            <div className="text-xs text-muted-foreground">{opp.category}</div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-2">{opp.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{opp.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                            { icon: MapPin, label: "Location", value: opp.location },
                            { icon: Clock, label: "Time commitment", value: opp.hours },
                            { icon: Globe, label: "Mode", value: opp.mode },
                            { icon: Award, label: "Skill level", value: opp.skillLevel },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-muted/40 rounded-xl p-3">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5"><Icon className="w-3.5 h-3.5" />{label}</div>
                                <div className="text-sm font-semibold">{value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-2">Required Skills</div>
                        <div className="flex flex-wrap gap-2">
                            {opp.skills.map(s => <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{s}</span>)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-xl">
                        <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-green-700 font-medium">{opp.impact}</span>
                    </div>

                    <CapacityBar filled={opp.capacity.filled} total={opp.capacity.total} />

                    <Link
                        to="/signup"
                        className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                        Apply Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ onClear }) {
    return (
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
                <Search className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No opportunities found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Try adjusting your filters or broadening your search to discover more opportunities.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {["Environment", "Education", "Healthcare"].map(cat => (
                    <span key={cat} className="px-3 py-1.5 bg-muted rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors">
                        Try "{cat}"
                    </span>
                ))}
            </div>
            <button
                onClick={onClear}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
                Explore All Opportunities
            </button>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function OpportunityExplorer() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [selectedMode, setSelectedMode] = useState("All");
    const [selectedCommitment, setSelectedCommitment] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [sortBy, setSortBy] = useState("Most Recent");
    const [previewOpp, setPreviewOpp] = useState(null);

    const clearAll = useCallback(() => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedLocation("All");
        setSelectedMode("All");
        setSelectedCommitment("All");
        setSelectedSkill("All");
        setSortBy("Most Recent");
    }, []);

    const filtered = useMemo(() => {
        let list = OPPORTUNITIES.filter(o => {
            const q = searchQuery.toLowerCase();
            return (
                (!q || o.title.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q) || o.skills.some(s => s.toLowerCase().includes(q))) &&
                (selectedCategory === "All" || o.category === selectedCategory) &&
                (selectedLocation === "All" || o.location === selectedLocation) &&
                (selectedMode === "All" || o.mode === selectedMode) &&
                (selectedCommitment === "All" || o.commitment === selectedCommitment) &&
                (selectedSkill === "All" || o.skillLevel === selectedSkill)
            );
        });

        if (sortBy === "Most Volunteers") list = [...list].sort((a, b) => b.volunteers - a.volunteers);
        else if (sortBy === "Urgent First") list = [...list].sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
        else if (sortBy === "Least Filled") list = [...list].sort((a, b) => (a.capacity.filled / a.capacity.total) - (b.capacity.filled / b.capacity.total));
        else list = [...list].sort((a, b) => a.postedDays - b.postedDays);

        return list;
    }, [searchQuery, selectedCategory, selectedLocation, selectedMode, selectedCommitment, selectedSkill, sortBy]);

    const featuredOpps = useMemo(() => OPPORTUNITIES.filter(o => o.featured), []);

    const activeFilters = [
        selectedCategory !== "All" && { label: selectedCategory, clear: () => setSelectedCategory("All") },
        selectedLocation !== "All" && { label: selectedLocation, clear: () => setSelectedLocation("All") },
        selectedMode !== "All" && { label: selectedMode, clear: () => setSelectedMode("All") },
        selectedCommitment !== "All" && { label: selectedCommitment, clear: () => setSelectedCommitment("All") },
        selectedSkill !== "All" && { label: selectedSkill, clear: () => setSelectedSkill("All") },
    ].filter(Boolean);

    const hasActiveFilters = activeFilters.length > 0 || searchQuery;

    return (
        <div className="min-h-screen bg-background">
            {previewOpp && <PreviewPanel opp={previewOpp} onClose={() => setPreviewOpp(null)} />}

            {/* ── HEADER ─────────────────────────────────────────────────────────── */}
            <header className="bg-gradient-to-br from-primary/8 via-background to-secondary/8 py-16 border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-6 text-sm font-medium">
                        <Briefcase className="w-4 h-4 text-primary" /> {OPPORTUNITIES.length} Opportunities Available
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Find Your Perfect
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Volunteer Role</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Discover meaningful volunteering opportunities from verified NGOs. Filter by cause, location, time commitment, and more.
                    </p>

                    {/* Stats strip */}
                    <div className="flex flex-wrap justify-center gap-8 mb-10">
                        {[
                            { value: "200+", label: "Open Opportunities" },
                            { value: "50+", label: "Partner Organizations" },
                            { value: "2,500+", label: "Verified NGOs" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{value}</div>
                                <div className="text-sm text-muted-foreground">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search teaching, environment, healthcare..."
                                className="w-full pl-12 pr-10 py-4 bg-white rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-primary shadow-lg text-sm"
                                aria-label="Search opportunities"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── FEATURED OPPORTUNITIES ─────────────────────────────────────────── */}
            {!searchQuery && selectedCategory === "All" && (
                <section className="border-b border-border bg-white py-10" aria-label="Featured opportunities">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                                <Star className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">Featured Opportunities</span>
                            </div>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {featuredOpps.map(opp => (
                                <div
                                    key={opp.id}
                                    onClick={() => setPreviewOpp(opp)}
                                    className="flex gap-4 p-4 bg-gradient-to-br from-primary/3 to-secondary/3 border border-primary/15 rounded-2xl hover:shadow-lg cursor-pointer transition-all group"
                                >
                                    <ImageWithFallback src={opp.image} alt={opp.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" loading="lazy" />
                                    <div className="flex-1 min-w-0">
                                        <div className={`w-6 h-6 bg-gradient-to-br ${opp.orgColor} rounded-lg flex items-center justify-center text-white text-xs font-bold mb-1.5`}>{opp.orgInitials}</div>
                                        <h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">{opp.title}</h3>
                                        <p className="text-xs text-muted-foreground mb-2">{opp.organization}</p>
                                        <div className="flex gap-2 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opp.location}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opp.hours}</span>
                                        </div>
                                    </div>
                                    {opp.urgent && <span className="self-start px-2 py-0.5 bg-accent text-white text-xs rounded-full flex-shrink-0">Urgent</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── MAIN CONTENT ───────────────────────────────────────────────────── */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ── SIDEBAR FILTERS ─────────────────────────────────────────── */}
                    <aside className="lg:w-64 flex-shrink-0" aria-label="Opportunity filters">
                        <div className="bg-white rounded-2xl p-5 border border-border sticky top-24">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4 text-primary" />
                                    <h2 className="font-bold text-sm">Filters</h2>
                                </div>
                                {hasActiveFilters && (
                                    <button onClick={clearAll} className="text-xs text-accent hover:text-accent/80 font-medium transition-colors">
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {[
                                { label: "Category", options: CATEGORIES, value: selectedCategory, setter: setSelectedCategory },
                                { label: "Location", options: LOCATIONS, value: selectedLocation, setter: setSelectedLocation },
                                { label: "Mode", options: MODES, value: selectedMode, setter: setSelectedMode },
                                { label: "Commitment", options: COMMITMENTS, value: selectedCommitment, setter: setSelectedCommitment },
                                { label: "Skill Level", options: SKILL_LEVELS, value: selectedSkill, setter: setSelectedSkill },
                            ].map(({ label, options, value, setter }) => (
                                <div key={label} className="mb-5">
                                    <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</h3>
                                    <div className="space-y-1.5">
                                        {options.map(opt => (
                                            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={label}
                                                    checked={value === opt}
                                                    onChange={() => setter(opt)}
                                                    className="w-3.5 h-3.5 accent-primary"
                                                    aria-label={`Filter by ${label}: ${opt}`}
                                                />
                                                <span className={`text-sm transition-colors ${value === opt ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* ── OPPORTUNITIES GRID ─────────────────────────────────────── */}
                    <div className="flex-1 min-w-0">
                        {/* Active filter chips */}
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {activeFilters.map(({ label, clear }) => (
                                    <FilterChip key={label} label={label} onRemove={clear} />
                                ))}
                            </div>
                        )}

                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">{filtered.length}</span> {filtered.length === 1 ? "opportunity" : "opportunities"} found
                            </p>
                            <div className="flex items-center gap-2">
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="text-sm bg-white border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                                    aria-label="Sort opportunities"
                                >
                                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        </div>

                        {filtered.length === 0
                            ? <EmptyState onClear={clearAll} />
                            : (
                                <div className="grid md:grid-cols-2 gap-5">
                                    {filtered.map(opp => (
                                        <OpportunityCard key={opp.id} opp={opp} onPreview={setPreviewOpp} />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </main>

            {/* ── WHY VOLUNTEER WITH MERAKI ────────────────────────────────────────── */}
            <section className="bg-white border-t border-border py-20" aria-label="Why volunteer with Meraki">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">
                            Why Volunteer with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Meraki?</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">Everything you need to create real, lasting impact</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {WHY_MERAKI.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group text-center p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg bg-white transition-all cursor-default">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-secondary transition-all">
                                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold mb-2 text-sm">{title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
            <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-3">Ready to Make a Difference?</h2>
                    <p className="text-white/80 mb-8">Join thousands of volunteers already creating impact through Meraki.</p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
                    >
                        Get Started Free <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
