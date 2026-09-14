import { useState } from 'react';
import { X, Trophy, Medal, Star, Flame, Award } from 'lucide-react';

const LEADERBOARD_DATA = [
    { rank: 1, name: "Elena Rostova", points: "4,920 XP", hours: 210, badge: "🥇 Diamond Hero", avatar: "ER", gradient: "from-amber-400 to-yellow-600" },
    { rank: 2, name: "Marcus Chen", points: "4,450 XP", hours: 185, badge: "🥈 Platinum Leader", avatar: "MC", gradient: "from-slate-300 to-slate-500" },
    { rank: 3, name: "Sarah Volunteer (You)", points: "3,890 XP", hours: 156, badge: "🥉 Gold Champion", avatar: "SV", gradient: "from-amber-600 to-amber-800", isYou: true },
    { rank: 4, name: "Aisha Patel", points: "3,400 XP", hours: 142, badge: "⭐ Silver Pioneer", avatar: "AP", gradient: "from-blue-400 to-indigo-600" },
    { rank: 5, name: "David Miller", points: "3,120 XP", hours: 130, badge: "🌱 Green Ambassador", avatar: "DM", gradient: "from-emerald-400 to-teal-600" },
];

export default function LeaderboardModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center relative overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                            <Trophy className="w-6 h-6 text-yellow-300" />
                        </div>
                        <div>
                            <h3 className="font-black text-lg">Global Impact Leaderboard</h3>
                            <p className="text-xs text-white/80 font-medium">Top Volunteer Changemakers This Month</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* List */}
                <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
                    {LEADERBOARD_DATA.map((item) => (
                        <div
                            key={item.rank}
                            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                                item.isYou
                                    ? "bg-primary/10 border-primary/40 shadow-sm dark:bg-primary/20"
                                    : "bg-gray-50/50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800"
                            }`}
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="font-black text-sm w-6 text-center text-gray-500 dark:text-gray-400">
                                    {item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : item.rank === 3 ? "🥉" : `#${item.rank}`}
                                </div>
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.gradient} text-white font-black text-xs flex items-center justify-center shadow-sm`}>
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="font-extrabold text-xs text-gray-900 dark:text-white flex items-center gap-2">
                                        {item.name}
                                        {item.isYou && <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black rounded-full uppercase">You</span>}
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-400">{item.badge}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-xs text-primary">{item.points}</div>
                                <div className="text-[10px] font-bold text-gray-400">{item.hours} hrs</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Motivation */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-orange-500 animate-bounce" /> Complete 1 more project to reach Rank #2!
                    </span>
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold text-xs rounded-xl hover:bg-gray-300 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
