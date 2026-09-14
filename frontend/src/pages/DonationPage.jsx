import { useState } from "react";
// Adjusting paths for the current repository structure
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

// New modular components
import DonationHero from "../components/donations/DonationHero";
import ImpactVisualization from "../components/donations/ImpactVisualization";
import CampaignCard from "../components/donations/CampaignCard";
import DonationForm from "../components/donations/DonationForm";
import DonorSocialProof from "../components/donations/DonorSocialProof";
import DonorLeaderboard from "../components/donations/DonorLeaderboard";
import TransparencySection from "../components/donations/TransparencySection";

// Enhanced Campaign Data
const campaigns = [
    {
        id: 1,
        title: "Education for Underprivileged Children",
        organization: "Future Leaders Org",
        category: "Education",
        urgency: "Ending Soon",
        description:
            "Help us provide quality education, tech devices, and learning materials to children who lack access to educational resources.",
        image:
            "https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWFjaGluZyUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczNDk3NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        raised: 45680,
        goal: 75000,
        donors: 342,
        beneficiaries: "1,200",
        daysLeft: 5,
        story: {
            background: "Since 2020, educational gaps have widened. This campaign aims to close the digital divide by providing 500 tablets to rural schools in Sub-Saharan Africa.",
            impacts: [
                { title: "Direct Classroom Access", description: "500 students get 1:1 devices" },
                { title: "Teacher Training", description: "50 educators certified in digital learning" }
            ],
            timeline: [
                { date: "Oct 2025", phase: "Fundraising Complete" },
                { date: "Dec 2025", phase: "Devices Purchased & Delivered" },
                { date: "Feb 2026", phase: "First Semester Commences" }
            ]
        }
    },
    {
        id: 2,
        title: "Clean Water Initiative",
        organization: "Green Earth Foundation",
        category: "Health & Wellness",
        description:
            "Support our mission to provide clean drinking water to remote communities through the installation of sustainable solar-powered wells.",
        image:
            "https://images.unsplash.com/photo-1628243989859-db92e2de1340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc3MzQ5Nzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        raised: 82340,
        goal: 100000,
        donors: 567,
        beneficiaries: "5,000+",
        daysLeft: 15,
        story: {
            background: "In the targeted region, women walk an average of 4 miles daily for water. This project installs 3 solar-powered deep wells.",
            impacts: [
                { title: "Disease Prevention", description: "Reduces waterborne illnesses by 85%" },
                { title: "Economic Growth", description: "Frees up 6 hours/day for women & children" }
            ],
            timeline: [
                { date: "Nov 2025", phase: "Drilling Operations Begin" },
                { date: "Dec 2025", phase: "Pump Installation" },
                { date: "Jan 2026", phase: "Community Handover" }
            ]
        }
    },
    {
        id: 3,
        title: "Emergency Food Relief",
        organization: "City Food Bank",
        category: "Disaster Relief",
        urgency: "Immediate Action",
        description:
            "Help us continue providing nutritious emergency meals to displaced families facing severe food insecurity following recent floods.",
        image:
            "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMHZvbHVudGVlcnN8ZW58MXx8fHwxNzczNDUzNTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        raised: 34200,
        goal: 50000,
        donors: 423,
        beneficiaries: "800 Families",
        daysLeft: 30,
        story: {
            background: "Recent unprecedented flooding displaced over 800 families. They urgently need stable food supplies while temporary housing is secured.",
            impacts: [
                { title: "Immediate Sustenance", description: "10,000 hot meals served weekly" },
                { title: "Nutrition Kits", description: "Monthly supply boxes for families" }
            ],
            timeline: [
                { date: "Immediate", phase: "Daily Hot Meal Distribution" },
                { date: "Month 2", phase: "Dry Goods Distribution" },
                { date: "Month 4", phase: "Transition to Local Vouchers" }
            ]
        }
    },
];

export default function DonationPage() {
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);
    const [volunteerHours, setVolunteerHours] = useState(10);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState(50);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);
    const matchedDollarValue = volunteerHours * 25; // $25 corporate match per volunteer hour

    const handleProcessPayment = (e) => {
        e.preventDefault();
        setPaymentSuccess(true);
        setTimeout(() => {
            setPaymentSuccess(false);
            setIsPaymentModalOpen(false);
        }, 2500);
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Nav */}
            <Navbar />

            {/* Enhanced Hero */}
            <DonationHero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">

                {/* Visual Impact Stats */}
                <ImpactVisualization />

                {/* Corporate Hour Match Calculator */}
                <div className="mb-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white">
                            ✨ Micro-Donation Match Engine
                        </div>
                        <h3 className="text-2xl font-black text-white">Turn Your Volunteer Hours Into Corporate Dollars!</h3>
                        <p className="text-sm text-emerald-100 font-medium max-w-xl">
                            Corporate partners automatically match <strong>$25 in direct funding</strong> for every 1 hour you volunteer on Meraki.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center flex-shrink-0 space-y-3 w-full md:w-auto">
                        <div className="text-xs font-black uppercase tracking-widest text-emerald-200">Set Logged Hours</div>
                        <div className="flex items-center justify-center gap-3">
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={volunteerHours}
                                onChange={(e) => setVolunteerHours(Number(e.target.value))}
                                className="w-20 px-3 py-1.5 bg-white text-gray-900 rounded-xl text-lg font-black text-center"
                            />
                            <span className="text-sm font-black text-white">Hours</span>
                        </div>
                        <div className="pt-2 text-2xl font-black text-amber-300">
                            = ${matchedDollarValue} Matched!
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">

                    {/* Left Column: Campaigns & Trust */}
                    <div className="w-full lg:w-[65%] order-2 lg:order-1 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Active Campaigns</h2>
                                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                    {campaigns.length} Projects
                                </span>
                            </div>

                            <div className="space-y-8">
                                {campaigns.map((campaign) => (
                                    <CampaignCard
                                        key={campaign.id}
                                        campaign={campaign}
                                        isSelected={selectedCampaignId === campaign.id}
                                        onSelect={(id) => {
                                            setSelectedCampaignId(id);
                                            setIsPaymentModalOpen(true);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Transparency section shown beneath campaigns */}
                        <TransparencySection />
                    </div>

                    {/* Right Column: Sticky form & Social Proof */}
                    <div className="w-full lg:w-[35%] order-1 lg:order-2 space-y-6">
                        {/* The interactive form */}
                        <DonationForm
                            selectedCampaign={selectedCampaign}
                            onDonateClick={() => setIsPaymentModalOpen(true)}
                        />

                        {/* Live Updates & Social Proof */}
                        <DonorSocialProof />

                        {/* Leaderboard */}
                        <DonorLeaderboard />
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 space-y-6 relative">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h3 className="font-black text-xl text-gray-900">Secure Payment Checkout</h3>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                        </div>

                        {paymentSuccess ? (
                            <div className="py-8 text-center space-y-3">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                                    🎉
                                </div>
                                <h4 className="font-black text-2xl text-gray-900">Payment Successful!</h4>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Thank you for funding real-world impact.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleProcessPayment} className="space-y-4">
                                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs font-bold text-gray-500">
                                    Campaign: <span className="text-gray-900 font-extrabold">{selectedCampaign?.title || "General Impact Fund"}</span>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-500 tracking-wider">Select Donation Amount</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[25, 50, 100, 250].map(amt => (
                                            <button
                                                key={amt}
                                                type="button"
                                                onClick={() => setDonationAmount(amt)}
                                                className={`py-2 rounded-xl text-xs font-black border transition-all ${donationAmount === amt ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-700 border-gray-200'}`}
                                            >
                                                ${amt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs font-bold text-emerald-700 flex items-center justify-between">
                                    <span>Razorpay / Stripe Gateway:</span>
                                    <span className="font-black text-sm text-emerald-800">${donationAmount}.00 USD</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-lg transition-all"
                                >
                                    Confirm & Pay ${donationAmount} 💳
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}
