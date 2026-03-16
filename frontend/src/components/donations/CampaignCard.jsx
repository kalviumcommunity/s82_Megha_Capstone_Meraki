import { Users, Calendar, ArrowRight, Check, Clock, Heart, Share2 } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { Badge } from "../ui/Badge";
import CampaignStory from "./CampaignStory";
import { useState } from "react";

export default function CampaignCard({ campaign, isSelected, onSelect }) {
    const [showStory, setShowStory] = useState(false);
    const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: campaign.title,
                text: campaign.description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert('Link copied to clipboard!'))
                .catch(console.error);
        }
    };

    return (
        <div
            className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 transition-all duration-300 ${isSelected
                ? "border-primary shadow-2xl ring-4 ring-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:shadow-lg"
                }`}
        >
            <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto group overflow-hidden">
                    <ImageWithFallback
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 font-semibold border-white shadow-sm">
                            {campaign.category || "Community"}
                        </Badge>
                        {campaign.urgency && (
                            <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm text-white font-semibold border-red-500 flex items-center gap-1 shadow-sm">
                                <Clock className="w-3 h-3" />
                                {campaign.urgency}
                            </Badge>
                        )}
                    </div>

                    {/* Share Button Floating */}
                    <button
                        onClick={handleShare}
                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-primary rounded-full shadow-sm transition-colors z-10"
                        title="Share Campaign"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex flex-col justify-between w-full md:w-3/5">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                {campaign.organization}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                            {campaign.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                            {campaign.description}
                        </p>

                        {/* Progress Section */}
                        <div className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                            <div className="flex items-end justify-between mb-2">
                                <div>
                                    <span className="text-3xl font-extrabold text-gray-900">
                                        \${campaign.raised.toLocaleString()}
                                    </span>
                                    <span className="text-sm font-medium text-gray-500 ml-2">
                                        raised of \${campaign.goal.toLocaleString()}
                                    </span>
                                </div>
                                <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full relative"
                                    style={{
                                        width: `${progress}%`,
                                        transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Users className="w-4 h-4 text-secondary" />
                                <span>{campaign.donors} supporters</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                <span>{campaign.beneficiaries || "100+"} impacted</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <Calendar className="w-4 h-4 text-accent" />
                                <span>{campaign.daysLeft} days left</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <button
                            onClick={() => onSelect(campaign.id)}
                            className={`flex-1 py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold ${isSelected
                                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                                : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                }`}
                        >
                            {isSelected ? (
                                <>
                                    <Check className="w-5 h-5 flex-shrink-0" />
                                    <span>Selected for Donation</span>
                                </>
                            ) : (
                                <>
                                    <span>Support this project</span>
                                    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowStory(!showStory);
                            }}
                            className="py-3.5 px-6 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-primary/50 hover:bg-gray-50 transition-colors"
                        >
                            {showStory ? "Hide Story" : "Read Story"}
                        </button>
                    </div>

                    {/* Expandable Story Section */}
                    {showStory && (
                        <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-4 fade-in duration-300">
                            <CampaignStory campaign={campaign} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
