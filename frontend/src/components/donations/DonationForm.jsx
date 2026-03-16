import { useState } from "react";
import { Heart, Check, HelpCircle } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

const donationAmounts = [25, 50, 100, 250, 500];

export default function DonationForm({ selectedCampaign }) {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [isMonthly, setIsMonthly] = useState(false);

    if (!selectedCampaign) {
        return (
            <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-200 text-center sticky top-24 transition-all duration-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-gray-300 mx-auto" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Make an Impact</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                    Select a campaign from the list to start your donation and see the difference you can make.
                </p>
            </div>
        );
    }

    // Impact Calculation logic (simplified for demonstration)
    const getImpact = (amount) => {
        if (!amount) return null;
        const val = parseInt(amount, 10);
        if (isNaN(val) || val <= 0) return null;

        if (val < 50) return { icon: "🎒", text: `Provides essential supplies for ${Math.max(1, Math.floor(val / 25))} person(s)` };
        if (val < 150) return { icon: "💧", text: `Ensures clean water for ${Math.floor(val / 50)} famil(ies)` };
        if (val < 300) return { icon: "🍲", text: `Supports food & shelter for ${Math.floor(val / 100)} week(s)` };
        return { icon: "🌟", text: `Creates transformative community impact` };
    };

    const currentImpact = getImpact(selectedAmount || customAmount);
    const progress = Math.min((selectedCampaign.raised / selectedCampaign.goal) * 100, 100);

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Complete Donation</h3>

            <div className="space-y-8">
                {/* Selected Campaign Summary */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <ImageWithFallback
                        src={selectedCampaign.image}
                        alt={selectedCampaign.title}
                        className="w-16 h-16 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                            Supporting
                        </div>
                        <h4 className="font-semibold text-gray-900 line-clamp-1">{selectedCampaign.title}</h4>
                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <span className="font-medium text-gray-700">{Math.round(progress)}%</span> funded
                        </div>
                    </div>
                </div>

                {/* Donation Type */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-semibold text-gray-900">Donation Frequency</label>
                        <div className="group relative cursor-pointer">
                            <HelpCircle className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            <div className="absolute right-0 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-20 pointer-events-none">
                                Monthly donations help us plan long-term impact projects securely.
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 bg-gray-50 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setIsMonthly(false)}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!isMonthly
                                ? "bg-white text-gray-900 shadow-md transform scale-[1.02]"
                                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                                }`}
                        >
                            One-Time
                        </button>
                        <button
                            onClick={() => setIsMonthly(true)}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isMonthly
                                ? "bg-primary text-white shadow-md shadow-primary/30 transform scale-[1.02]"
                                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                                }`}
                        >
                            Monthly ✨
                        </button>
                    </div>
                </div>

                {/* Amount Selection */}
                <div>
                    <label className="block mb-3 font-semibold text-gray-900">Select Amount</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {donationAmounts.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount("");
                                }}
                                className={`py-3 rounded-2xl border-2 font-bold transition-all duration-200 ${selectedAmount === amount
                                    ? "border-primary bg-primary/10 text-primary scale-105 shadow-sm"
                                    : "border-gray-100 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50"
                                    }`}
                            >
                                \${amount}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setSelectedAmount(null);
                            }}
                            placeholder="Other amount"
                            className="w-full pl-8 pr-4 py-3.5 bg-gray-50 rounded-2xl border-2 border-gray-100 focus:bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-medium transition-all"
                        />
                    </div>
                </div>

                {/* Dynamic Impact Message */}
                <div className={`p-5 rounded-2xl border transition-all duration-500 ${currentImpact ? 'bg-primary/5 border-primary/20 scale-100 opacity-100' : 'bg-gray-50 border-gray-100 h-24 flex items-center justify-center opacity-70'}`}>
                    {currentImpact ? (
                        <div className="flex gap-4 items-start animate-in fade-in zoom-in-95 duration-300">
                            <div className="text-3xl bg-white p-2 rounded-xl shadow-sm border border-primary/10">{currentImpact.icon}</div>
                            <div>
                                <h5 className="font-bold text-gray-900 text-sm mb-1">Your Impact</h5>
                                <p className="text-sm font-medium text-primary">
                                    {currentImpact.text}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center font-medium">
                            Select an amount to see your potential impact
                        </p>
                    )}
                </div>

                {/* Donate Button */}
                <button
                    disabled={!selectedAmount && !customAmount}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    <Heart className={`w-5 h-5 ${(selectedAmount || customAmount) ? 'fill-white animate-pulse' : ''}`} />
                    Donate {isMonthly ? "Monthly" : "Now"} {(selectedAmount || customAmount) ? `$${selectedAmount || customAmount}` : ''}
                </button>

                {/* Trust Indicators */}
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center font-medium mb-3">
                        Secure payment processing. Guaranteed impact.
                    </p>
                    <div className="flex justify-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded">
                            <Check className="w-3 h-3 text-green-500" /> SSL Secured
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded">
                            <Check className="w-3 h-3 text-green-500" /> Tax Deductible
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
