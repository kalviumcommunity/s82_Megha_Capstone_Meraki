import { useState } from 'react';
import { X, CreditCard, CheckCircle2, ShieldCheck, Heart, Lock, ArrowRight } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, campaignTitle, onSuccess }) {
    const [amount, setAmount] = useState('50');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handlePay = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            if (onSuccess) onSuccess(Number(amount));
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden relative">

                {/* Header */}
                <div className="px-6 py-5 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
                        <h3 className="font-extrabold text-sm uppercase tracking-wider">Make a Contribution</h3>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {isSuccess ? (
                    <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Thank You for Your Support!</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                            Your donation of <span className="font-bold text-primary">${amount}</span> to <span className="font-bold text-gray-900 dark:text-white">{campaignTitle || "Community Relief Fund"}</span> has been processed securely.
                        </p>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Tax-Deductible Receipt Sent to Email
                        </div>
                        <button
                            onClick={() => { setIsSuccess(false); onClose(); }}
                            className="w-full py-3 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary/90 transition-all"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handlePay} className="p-6 space-y-5">
                        {/* Amount presets */}
                        <div>
                            <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Select Donation Amount ($)</label>
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {['10', '25', '50', '100'].map((val) => (
                                    <button
                                        type="button"
                                        key={val}
                                        onClick={() => setAmount(val)}
                                        className={`py-2 rounded-xl text-xs font-black transition-all ${
                                            amount === val
                                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                        }`}
                                    >
                                        ${val}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs font-bold border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white"
                                placeholder="Custom Amount"
                                required
                            />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label className="block text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Payment Method</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                                    { id: 'upi', label: 'UPI / NetBanking', icon: Lock },
                                    { id: 'paypal', label: 'PayPal', icon: Heart },
                                ].map(({ id, label, icon: Icon }) => (
                                    <button
                                        type="button"
                                        key={id}
                                        onClick={() => setPaymentMethod(id)}
                                        className={`p-3 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                                            paymentMethod === id
                                                ? 'border-primary bg-primary/5 text-primary shadow-xs'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold justify-center">
                            <Lock className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit SSL Encrypted & PCI-DSS Compliant Checkout
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-xs rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                        >
                            {isProcessing ? "Processing Contribution..." : `Donate $${amount} Now`} <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
