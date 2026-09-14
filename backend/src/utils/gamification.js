const BADGES = {
    ECO_WARRIOR: { title: 'Eco Warrior', icon: '🌱', description: 'Participated in 3+ environmental projects' },
    YOUTH_MENTOR: { title: 'Youth Mentor', icon: '🎓', description: 'Mentored students in educational programs' },
    COMMUNITY_CATALYST: { title: 'Community Catalyst', icon: '⚡', description: 'Reached 500+ XP in volunteer impact' },
    TOP_CONTRIBUTOR: { title: 'Top Contributor', icon: '🏆', description: 'Ranked in the top 10 community leaderboard' },
};

const calculateLevel = (xp) => {
    return Math.floor(xp / 150) + 1;
};

const getRankTitle = (level) => {
    if (level >= 10) return 'Impact Legend';
    if (level >= 7) return 'Senior Changemaker';
    if (level >= 4) return 'Community Catalyst';
    if (level >= 2) return 'Active Volunteer';
    return 'Rising Star';
};

const awardXp = async (user, amount, reason) => {
    user.xp = (user.xp || 0) + amount;
    user.level = calculateLevel(user.xp);
    user.rankTitle = getRankTitle(user.level);

    // Auto-check badges
    if (!user.badges) user.badges = [];
    const hasBadge = (title) => user.badges.some(b => b.title === title);

    if (user.xp >= 500 && !hasBadge(BADGES.COMMUNITY_CATALYST.title)) {
        user.badges.push(BADGES.COMMUNITY_CATALYST);
    }

    await user.save();
    return { xp: user.xp, level: user.level, rankTitle: user.rankTitle, badges: user.badges };
};

module.exports = { BADGES, calculateLevel, getRankTitle, awardXp };
