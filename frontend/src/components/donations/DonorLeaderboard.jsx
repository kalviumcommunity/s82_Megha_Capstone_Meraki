import { Trophy, Star, Medal } from "lucide-react";

export default function DonorLeaderboard() {
    const topDonors = [
        { name: "John Doe", amount: 5000, type: "bronze" },
        { name: "Green Corp", amount: 12500, type: "gold" },
        { name: "Emily Chen", amount: 8000, type: "silver" },
    ].sort((a, b) => b.amount - a.amount);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 md:p-8 border border-indigo-100 shadow-sm mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <Trophy className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Top Supporters</h3>
            </div>

            <div className="flex flex-col gap-4">
                {topDonors.map((donor, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-white/50 relative overflow-hidden group hover:shadow-md transition-shadow"
                    >
                        {/* Rank Badge */}
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${donor.type === 'gold' ? 'bg-amber-400' :
                                donor.type === 'silver' ? 'bg-gray-400' : 'bg-orange-400'
                            }`} />

                        <div className="flex items-center gap-4 pl-2">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${donor.type === 'gold' ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400/50' :
                                    donor.type === 'silver' ? 'bg-gray-100 text-gray-700 ring-2 ring-gray-400/50' :
                                        'bg-orange-100 text-orange-700 ring-2 ring-orange-400/50'
                                }`}>
                                {idx === 0 ? <Star className="w-6 h-6 fill-amber-500 text-amber-500" /> :
                                    idx === 1 ? <Medal className="w-6 h-6 text-gray-500" /> :
                                        <Medal className="w-6 h-6 text-orange-500" />}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{donor.name}</p>
                                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">{donor.type} Tier</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-xl font-extrabold text-gray-900">\${donor.amount.toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-center text-xs text-gray-500 mt-6 font-medium">
                Join our community of heroes making a lasting difference.
            </p>
        </div >
    );
}
