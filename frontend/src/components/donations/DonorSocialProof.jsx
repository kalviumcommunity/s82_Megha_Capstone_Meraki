import { Heart, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const initialDonors = [
    { id: 1, name: "Sarah M.", amount: 50, campaign: "Clean Water Initiative", time: "2 mins ago" },
    { id: 2, name: "David K.", amount: 100, campaign: "Education for All", time: "15 mins ago" },
    { id: 3, name: "Anonymous", amount: 25, campaign: "Emergency Relief", time: "1 hour ago" },
    { id: 4, name: "Elena R.", amount: 250, campaign: "Community Builders", time: "3 hours ago" },
];

export default function DonorSocialProof() {
    const [donors, setDonors] = useState(initialDonors);

    // Simulate real-time updates (optional)
    useEffect(() => {
        const interval = setInterval(() => {
            const newDonor = {
                id: Date.now(),
                name: ["Alex B.", "Jane D.", "Anonymous", "Chris P."][Math.floor(Math.random() * 4)],
                amount: [10, 25, 50, 100][Math.floor(Math.random() * 4)],
                campaign: ["Education", "Water", "Food Relief", "Health"][Math.floor(Math.random() * 4)],
                time: "Just now"
            };
            setDonors(prev => [newDonor, ...prev].slice(0, 4));
        }, 30000); // Add a new donor every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-50 rounded-lg">
                    <Activity className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Recent Supporters</h3>
            </div>

            <div className="space-y-4">
                {donors.map((donor, idx) => (
                    <div
                        key={donor.id}
                        className={`flex items-center justify-between p-3 rounded-xl ${idx === 0 ? 'bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-2 duration-500' : 'bg-gray-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold shadow-inner">
                                {donor.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {donor.name} <span className="text-gray-400 font-normal">donated</span> <span className="text-secondary font-bold">\${donor.amount}</span>
                                </p>
                                <p className="text-xs text-gray-500">to {donor.campaign}</p>
                            </div>
                        </div>
                        <div className="text-xs font-medium text-gray-400 whitespace-nowrap">
                            {donor.time}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
