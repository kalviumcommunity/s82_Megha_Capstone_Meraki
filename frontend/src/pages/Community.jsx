import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import {
    Heart, MessageCircle, Share2, Send, Image as ImageIcon, Smile,
    MapPin, Hash, Bookmark, MoreHorizontal, TrendingUp, Award,
    CheckCircle, Users, Zap, Globe, ThumbsUp, Leaf, Trophy,
    ChevronDown, ChevronUp, X,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_POSTS = [
    {
        id: 1,
        author: "Sarah Anderson",
        role: "Volunteer",
        avatar: "SA",
        avatarGradient: "from-violet-400 to-purple-600",
        verified: false,
        badge: "🌱 Community Starter",
        time: "2 hours ago",
        location: "San Francisco, CA",
        content: "Just completed my first week at the Community Garden! 🌱 The team is amazing, and it's so rewarding to see the impact we're making. Can't wait to see everything we planted grow!",
        hashtags: ["#VolunteerLife", "#CommunityGarden"],
        image: "https://images.unsplash.com/photo-1628243989859-db92e2de1340?w=800&q=80",
        likes: 47,
        comments: [
            { id: 1, author: "Maya R.", avatar: "MR", avatarGradient: "from-pink-400 to-rose-500", text: "So inspiring! I just signed up for the same program 🙌", time: "1h ago" },
            { id: 2, author: "Tom K.", avatar: "TK", avatarGradient: "from-blue-400 to-indigo-500", text: "Love seeing this kind of impact. Keep it up!", time: "45m ago" },
        ],
        shares: 3,
        saved: false,
        impact: null,
    },
    {
        id: 2,
        author: "Green Earth Foundation",
        role: "Organization",
        avatar: "GE",
        avatarGradient: "from-green-400 to-emerald-600",
        verified: true,
        badge: "✅ Verified NGO",
        time: "5 hours ago",
        location: "Miami Beach, FL",
        content: "Thank you to all our incredible volunteers who joined us for yesterday's beach cleanup! Together, we collected over 500 pounds of trash and made a real difference for our ocean. 🌊💙 Special shoutout to our top collectors!",
        hashtags: ["#BeachCleanup", "#OceanConservation"],
        image: "https://images.unsplash.com/photo-1758599668125-e154250f24bd?w=800&q=80",
        likes: 124,
        comments: [
            { id: 1, author: "Ana V.", avatar: "AV", avatarGradient: "from-teal-400 to-cyan-500", text: "What an amazing event! Proud to be part of it 🌊", time: "4h ago" },
            { id: 2, author: "James O.", avatar: "JO", avatarGradient: "from-orange-400 to-amber-500", text: "500 pounds! That's incredible teamwork.", time: "3h ago" },
        ],
        shares: 22,
        saved: false,
        impact: "500 lbs of trash removed",
    },
    {
        id: 3,
        author: "Michael Chen",
        role: "Volunteer",
        avatar: "MC",
        avatarGradient: "from-blue-400 to-indigo-600",
        verified: false,
        badge: "🏅 Impact Maker",
        time: "1 day ago",
        location: null,
        content: "Mentoring students through the Youth Leadership Program has been one of the most fulfilling experiences. Seeing them grow in confidence and discover their potential is truly inspiring. If you're considering volunteering, I highly recommend it! 📚✨",
        hashtags: ["#YouthMentorship", "#VolunteerLife"],
        image: null,
        likes: 89,
        comments: [
            { id: 1, author: "Priya S.", avatar: "PS", avatarGradient: "from-pink-400 to-purple-500", text: "This moved me. Applied to the program right after reading! ❤️", time: "20h ago" },
        ],
        shares: 6,
        saved: false,
        impact: "45 students mentored",
    },
    {
        id: 4,
        author: "Emma Parker",
        role: "Volunteer",
        avatar: "EP",
        avatarGradient: "from-pink-400 to-rose-600",
        verified: false,
        badge: "🔥 Top Contributor",
        time: "2 days ago",
        location: "Los Angeles, CA",
        content: "Food bank volunteering today! We packed 300 meal kits for families in need. Every small action counts, and together we're making our community stronger. 💪❤️",
        hashtags: ["#CommunityService", "#MakingADifference"],
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80",
        likes: 156,
        comments: [
            { id: 1, author: "Leo N.", avatar: "LN", avatarGradient: "from-yellow-400 to-amber-500", text: "300 meal kits in one day?! You're all heroes 🙏", time: "1d ago" },
            { id: 2, author: "Sara M.", avatar: "SM", avatarGradient: "from-green-400 to-teal-500", text: "Tagged my friends — we're joining next weekend!", time: "1d ago" },
        ],
        shares: 18,
        saved: false,
        impact: "300 meal kits packed",
    },
];

const TRENDING = [
    { tag: "#VolunteerLife", count: "2.4k posts" },
    { tag: "#BeachCleanup", count: "1.8k posts" },
    { tag: "#CommunityGarden", count: "1.2k posts" },
    { tag: "#FoodBank", count: "980 posts" },
    { tag: "#YouthMentorship", count: "740 posts" },
    { tag: "#OceanConservation", count: "610 posts" },
];

const TOP_CONTRIBUTORS = [
    { name: "Emma Parker", avatar: "EP", gradient: "from-pink-400 to-rose-600", role: "Volunteer", hours: 248, badge: "🔥 Top Contributor" },
    { name: "Michael Chen", avatar: "MC", gradient: "from-blue-400 to-indigo-600", role: "Volunteer", hours: 210, badge: "🏅 Impact Maker" },
    { name: "Sarah A.", avatar: "SA", gradient: "from-violet-400 to-purple-600", role: "Volunteer", hours: 185, badge: "🌱 Community Starter" },
    { name: "Green Earth", avatar: "GE", gradient: "from-green-400 to-emerald-600", role: "Organization", hours: null, badge: "✅ Verified NGO" },
];

const IMPACT_HIGHLIGHTS = [
    { emoji: "🍽️", metric: "300 meal kits", desc: "packed today", color: "from-orange-50 to-amber-50 border-orange-200" },
    { emoji: "🌊", metric: "500 lbs", desc: "of ocean trash removed", color: "from-blue-50 to-cyan-50 border-blue-200" },
    { emoji: "🌱", metric: "120 gardens", desc: "planted this week", color: "from-green-50 to-emerald-50 border-green-200" },
];

const REACTIONS = [
    { emoji: "❤️", label: "Love" },
    { emoji: "👍", label: "Like" },
    { emoji: "🌱", label: "Inspire" },
    { emoji: "🙌", label: "Celebrate" },
];

// ─── Sub-components ─────────────────────────────────────────────────────────────

function AvatarCircle({ initials, gradient, size = "md" }) {
    const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-11 h-11 text-sm";
    return (
        <div className={`${sz} bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
            {initials}
        </div>
    );
}

function HashtagText({ content, hashtags }) {
    let text = content;
    return (
        <p className="leading-relaxed text-sm mb-3">
            {text}{" "}
            {hashtags.map(tag => (
                <span key={tag} className="text-primary font-medium hover:underline cursor-pointer">{tag}</span>
            )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, " ", el], [])}
        </p>
    );
}

function CommentSection({ comments, postId }) {
    const [commentText, setCommentText] = useState("");

    return (
        <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-3 mb-3">
                {comments.map(c => (
                    <div key={c.id} className="flex gap-2.5">
                        <AvatarCircle initials={c.avatar} gradient={c.avatarGradient} size="sm" />
                        <div className="flex-1 bg-muted/50 rounded-xl px-3 py-2">
                            <div className="flex items-baseline justify-between gap-2">
                                <span className="text-xs font-semibold">{c.author}</span>
                                <span className="text-xs text-muted-foreground">{c.time}</span>
                            </div>
                            <p className="text-xs text-foreground mt-0.5">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                        aria-label={`Comment on post ${postId}`}
                    />
                    <button
                        onClick={() => setCommentText("")}
                        disabled={!commentText}
                        className={`flex-shrink-0 transition-opacity ${commentText ? "opacity-100" : "opacity-40"}`}
                        aria-label="Send comment"
                    >
                        <Send className="w-3.5 h-3.5 text-primary" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showReactions, setShowReactions] = useState(false);
    const [reaction, setReaction] = useState(null);
    const likeCount = post.likes + (liked ? 1 : 0);

    return (
        <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
            {/* Post header */}
            <div className="p-5 pb-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                        <AvatarCircle initials={post.avatar} gradient={post.avatarGradient} />
                        <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-sm">{post.author}</span>
                                {post.verified && <CheckCircle className="w-4 h-4 text-primary fill-primary/20" aria-label="Verified organization" />}
                                <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{post.badge}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                                <span className="font-medium">{post.role}</span>
                                <span>•</span>
                                <span>{post.time}</span>
                                {post.location && (
                                    <>
                                        <span>•</span>
                                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{post.location}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                            onClick={() => setSaved(s => !s)}
                            className={`p-1.5 rounded-lg hover:bg-muted transition-colors ${saved ? "text-primary" : "text-muted-foreground"}`}
                            aria-label={saved ? "Unsave post" : "Save post"}
                        >
                            <Bookmark className={`w-4 h-4 ${saved ? "fill-primary" : ""}`} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground" aria-label="More options">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Impact highlight */}
                {post.impact && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-xl mb-3">
                        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-semibold text-primary">Impact: {post.impact}</span>
                    </div>
                )}

                {/* Content */}
                <HashtagText content={post.content} hashtags={post.hashtags} />
            </div>

            {/* Image */}
            {post.image && (
                <div className="px-5 mb-0">
                    <ImageWithFallback
                        src={post.image}
                        alt={`Post by ${post.author}`}
                        className="w-full rounded-xl max-h-80 object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Stats row */}
            <div className="px-5 py-2.5 flex items-center justify-between text-xs text-muted-foreground border-b border-border mt-3">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <span className="text-sm">❤️</span> {likeCount} likes
                    </span>
                    <button onClick={() => setShowComments(c => !c)} className="hover:text-foreground transition-colors">
                        {post.comments.length} comments
                    </button>
                </div>
                <span>{post.shares} shares</span>
            </div>

            {/* Actions */}
            <div className="px-5 py-2 flex items-center gap-1">
                {/* Like with reaction picker */}
                <div className="relative flex-1">
                    <button
                        onMouseEnter={() => setShowReactions(true)}
                        onMouseLeave={() => setShowReactions(false)}
                        onClick={() => { setLiked(l => !l); setReaction(liked ? null : "❤️"); }}
                        className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-all text-sm font-medium ${liked ? "text-accent" : "text-muted-foreground"}`}
                        aria-label={liked ? "Unlike post" : "Like post"}
                    >
                        <Heart className={`w-4 h-4 transition-transform ${liked ? "fill-accent scale-110" : ""}`} />
                        {reaction || "Like"}
                    </button>
                    {showReactions && (
                        <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex gap-1 bg-white border border-border rounded-2xl px-3 py-2 shadow-xl z-10"
                            onMouseEnter={() => setShowReactions(true)}
                            onMouseLeave={() => setShowReactions(false)}
                        >
                            {REACTIONS.map(r => (
                                <button
                                    key={r.emoji}
                                    onClick={() => { setLiked(true); setReaction(r.emoji); setShowReactions(false); }}
                                    className="text-xl hover:scale-125 transition-transform"
                                    title={r.label}
                                    aria-label={`React with ${r.label}`}
                                >
                                    {r.emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowComments(c => !c)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground text-sm font-medium"
                    aria-label={showComments ? "Hide comments" : "Show comments"}
                >
                    <MessageCircle className="w-4 h-4" />
                    Comment
                    {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                <button
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground text-sm font-medium"
                    aria-label="Share post"
                >
                    <Share2 className="w-4 h-4" />
                    Share
                </button>
            </div>

            {/* Comments section */}
            {showComments && (
                <div className="px-5 pb-5">
                    <CommentSection comments={post.comments} postId={post.id} />
                </div>
            )}
        </article>
    );
}

function CreatePostBox({ onPost }) {
    const [content, setContent] = useState("");
    const [showTips, setShowTips] = useState(false);

    const handlePost = () => {
        if (!content.trim()) return;
        onPost(content);
        setContent("");
    };

    return (
        <div className="bg-white rounded-2xl border border-border p-5 mb-5">
            <div className="flex gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        onFocus={() => setShowTips(true)}
                        placeholder="Share your volunteering experience or milestone..."
                        className="w-full p-3 bg-muted/40 rounded-xl border border-transparent focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm transition-all"
                        rows={showTips ? 4 : 2}
                        aria-label="Create a new community post"
                    />

                    {showTips && (
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                            {["💪 Milestone", "🌱 Impact story", "📢 Event update", "🙏 Thank you"].map(tip => (
                                <button
                                    key={tip}
                                    onClick={() => setContent(c => c + (c ? " " : "") + tip)}
                                    className="px-2.5 py-1 bg-muted text-xs rounded-full hover:bg-primary hover:text-white transition-all"
                                >
                                    {tip}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                            {[
                                { icon: ImageIcon, label: "Add photo" },
                                { icon: Smile, label: "Add emoji" },
                                { icon: MapPin, label: "Add location" },
                                { icon: Hash, label: "Add hashtag" },
                            ].map(({ icon: Icon, label }) => (
                                <button
                                    key={label}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                                    aria-label={label}
                                    title={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handlePost}
                            disabled={!content.trim()}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${content.trim()
                                ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                }`}
                            aria-label="Publish post"
                        >
                            <Send className="w-3.5 h-3.5" /> Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CommunityFeed() {
    const { user } = useAuth();
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [activeTag, setActiveTag] = useState(null);

    const handleNewPost = useCallback((content) => {
        const newPost = {
            id: Date.now(),
            author: user?.name || "You",
            role: user?.role || "Volunteer",
            avatar: user?.name?.charAt(0) || "U",
            avatarGradient: "from-primary to-secondary",
            verified: false,
            badge: "🌟 Community Member",
            time: "Just now",
            location: null,
            content,
            hashtags: [],
            image: null,
            likes: 0,
            comments: [],
            shares: 0,
            saved: false,
            impact: null,
        };
        setPosts(prev => [newPost, ...prev]);
    }, []);

    const filteredPosts = activeTag
        ? posts.filter(p => p.hashtags.includes(activeTag) || p.content.includes(activeTag))
        : posts;

    return (
        <div className="min-h-screen bg-background">

            {/* ── HEADER ─────────────────────────────────────────────────────────── */}
            <header className="bg-gradient-to-br from-primary/8 via-background to-secondary/8 border-b border-border py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border shadow-sm mb-5 text-sm font-medium">
                        <Globe className="w-4 h-4 text-primary" /> 50,000+ Volunteers Worldwide
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        Community <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Feed</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Join conversations from volunteers and organizations creating impact around the world
                    </p>

                    {/* Stat strip */}
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        {[
                            { icon: Users, value: "1,240", label: "Active today" },
                            { icon: Zap, value: "4,800+", label: "Posts this week" },
                            { icon: Trophy, value: "2,500+", label: "NGOs sharing updates" },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="font-bold">{value}</span>
                                <span className="text-sm text-muted-foreground">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ── IMPACT HIGHLIGHTS BAR ──────────────────────────────────────────── */}
            <section className="bg-white border-b border-border" aria-label="Today's impact highlights">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex-shrink-0">Today's Impact:</span>
                        {IMPACT_HIGHLIGHTS.map(({ emoji, metric, desc, color }) => (
                            <div key={metric} className={`flex items-center gap-2 px-4 py-2 rounded-xl border bg-gradient-to-r ${color} flex-shrink-0`}>
                                <span className="text-base">{emoji}</span>
                                <span className="text-xs font-bold">{metric}</span>
                                <span className="text-xs text-muted-foreground">{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN LAYOUT ────────────────────────────────────────────────────── */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-[1fr_320px] gap-8">

                    {/* ── FEED COLUMN ──────────────────────────────────────────────── */}
                    <div>
                        {/* Active tag filter banner */}
                        {activeTag && (
                            <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
                                <Hash className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">Showing posts for <strong>{activeTag}</strong></span>
                                <button onClick={() => setActiveTag(null)} className="ml-auto text-muted-foreground hover:text-foreground" aria-label="Clear tag filter">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <CreatePostBox onPost={handleNewPost} />

                        <div className="space-y-5" aria-label="Community posts">
                            {filteredPosts.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 border border-border text-center">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="w-7 h-7 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-bold mb-2">No posts yet for {activeTag}</h3>
                                    <p className="text-muted-foreground text-sm mb-5">Be the first to share a story with this hashtag!</p>
                                    <button
                                        onClick={() => setActiveTag(null)}
                                        className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                                    >
                                        Browse all posts
                                    </button>
                                </div>
                            ) : (
                                filteredPosts.map(post => <PostCard key={post.id} post={post} />)
                            )}
                        </div>

                        <div className="text-center mt-8">
                            <button className="px-8 py-3 bg-white border border-border rounded-xl hover:shadow-md transition-all text-sm font-medium text-muted-foreground hover:text-foreground">
                                Load more posts
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────── */}
                    <aside className="space-y-5" aria-label="Community sidebar">

                        {/* Trending Topics */}
                        <section className="bg-white rounded-2xl border border-border p-5" aria-labelledby="trending-heading">
                            <h2 id="trending-heading" className="font-bold text-sm mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" /> Trending Topics
                            </h2>
                            <div className="space-y-2.5">
                                {TRENDING.map(({ tag, count }) => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all text-sm ${activeTag === tag
                                            ? "bg-primary text-white"
                                            : "hover:bg-muted text-foreground"
                                            }`}
                                        aria-pressed={activeTag === tag}
                                    >
                                        <span className="font-medium">{tag}</span>
                                        <span className={`text-xs ${activeTag === tag ? "text-white/80" : "text-muted-foreground"}`}>{count}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Top Contributors */}
                        <section className="bg-white rounded-2xl border border-border p-5" aria-labelledby="contributors-heading">
                            <h2 id="contributors-heading" className="font-bold text-sm mb-4 flex items-center gap-2">
                                <Award className="w-4 h-4 text-primary" /> Top Contributors
                            </h2>
                            <div className="space-y-3">
                                {TOP_CONTRIBUTORS.map((c, i) => (
                                    <div key={c.name} className="flex items-center gap-3">
                                        <span className="text-xs text-muted-foreground w-4 text-center font-bold">{i + 1}</span>
                                        <AvatarCircle initials={c.avatar} gradient={c.gradient} size="sm" />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-xs truncate">{c.name}</div>
                                            <div className="text-xs text-muted-foreground">{c.hours ? `${c.hours} hrs` : c.badge}</div>
                                        </div>
                                        <span className="text-xs">{c.badge.split(" ")[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Invite card */}
                        <section className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white text-center">
                            <Leaf className="w-8 h-8 mx-auto mb-3 opacity-80" />
                            <h3 className="font-bold mb-2 text-sm">Invite Friends to Volunteer</h3>
                            <p className="text-white/80 text-xs mb-4">
                                Every volunteer you invite amplifies your community's impact.
                            </p>
                            <Link
                                to="/signup"
                                className="inline-block px-5 py-2 bg-white text-primary rounded-xl text-xs font-semibold hover:shadow-lg transition-all"
                            >
                                Invite Now
                            </Link>
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
}
