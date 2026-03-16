import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2, Loader2, X } from "lucide-react";

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1: Email, 2: Loading, 3: Success
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        // Simulate API call
        setTimeout(() => setStep(3), 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {step === 1 && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                            <Mail className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Forgot Password?</h3>
                        <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                            No worries, we'll send you reset instructions.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="py-12 flex flex-col items-center justify-center animate-pulse">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processing Request...</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Check your email</h3>
                        <p className="text-sm font-medium text-gray-500 mb-8 leading-relaxed">
                            We've sent a password reset link to <br />
                            <span className="text-gray-900 font-bold">{email}</span>
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all"
                        >
                            Back to Login
                        </button>

                        <button
                            onClick={() => setStep(1)}
                            className="mt-6 text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
                        >
                            Didn't receive email? <span className="text-primary">Resend</span>
                        </button>
                    </div>
                )}

                {step === 1 && (
                    <button
                        onClick={onClose}
                        className="mt-8 flex items-center justify-center gap-2 w-full text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </button>
                )}
            </div>
        </div>
    );
}
