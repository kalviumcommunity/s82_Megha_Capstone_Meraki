import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import { otpApi } from "../lib/api";
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";

export default function OtpVerification() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [status, setStatus] = useState({ type: "", message: "" });

    // Handle resend countdown timer
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!phoneNumber.trim()) {
            setStatus({ type: "error", message: "Please enter a valid phone number" });
            return;
        }

        setIsLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const response = await otpApi.sendOTP(phoneNumber);
            setIsOtpSent(true);
            setResendTimer(30); // 30s resend cooldown
            setStatus({
                type: "success",
                message: response.data.mockMode
                    ? "OTP Sent! Check your server console for the 6-digit code."
                    : "OTP Sent successfully via Twilio!"
            });
        } catch (err) {
            console.error("Failed to send OTP:", err);
            setStatus({
                type: "error",
                message: err.response?.data?.error || "Failed to send OTP. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otpCode.trim() || otpCode.length !== 6) {
            setStatus({ type: "error", message: "Please enter a valid 6-digit OTP code" });
            return;
        }

        setIsLoading(true);
        setStatus({ type: "", message: "" });

        try {
            await otpApi.verifyOTP(phoneNumber, otpCode);
            setStatus({
                type: "verified",
                message: "Phone number verified successfully!"
            });
        } catch (err) {
            console.error("Verification failed:", err);
            setStatus({
                type: "error",
                message: err.response?.data?.error || "Invalid OTP code. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout hero={
            <div className="flex h-full flex-col justify-between p-12 text-white bg-gradient-to-br from-primary to-purple-800 rounded-3xl">
                <div>
                    <h3 className="text-3xl font-black uppercase tracking-wider mb-4">Secure Verification</h3>
                    <p className="text-sm font-medium text-white/80 leading-relaxed">
                        We leverage industry-standard security protocols to keep your identity and data safe. Enable OTP verification to shield your Meraki account from unauthorized login attempts.
                    </p>
                </div>
                <div className="border-t border-white/20 pt-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Powered by</p>
                    <p className="text-sm font-black uppercase tracking-widest">Twilio Verify API</p>
                </div>
            </div>
        }>
            {/* Navigation back */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            <AuthHeader
                title="Phone Verification"
                subtitle="Verify your mobile number to secure your account"
                type="otp"
            />

            <div className="mt-8 space-y-6">
                {/* Status banner */}
                {status.message && (
                    <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
                        status.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
                        status.type === "verified" ? "bg-blue-50 border-blue-100 text-blue-800" :
                        "bg-rose-50 border-rose-100 text-rose-800"
                    }`}>
                        {status.type === "success" || status.type === "verified" ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <div className="text-xs font-bold uppercase tracking-wider">
                            {status.message}
                        </div>
                    </div>
                )}

                {status.type !== "verified" && (
                    <form onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp} className="space-y-4">
                        {/* Phone Number Input */}
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Phone className="w-4 h-4" />
                                </span>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    disabled={isOtpSent || isLoading}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-60 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* OTP Code Input (Visible after OTP is sent) */}
                        {isOtpSent && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <KeyRound className="w-4 h-4" />
                                    </span>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        placeholder="Enter 6-digit OTP"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                                        disabled={isLoading}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            {isLoading ? "Processing..." : !isOtpSent ? "Request OTP" : "Verify Code"}
                        </button>
                    </form>
                )}

                {/* Verified Screen / Success Action */}
                {status.type === "verified" && (
                    <div className="text-center py-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full text-emerald-500 mb-2">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-wider text-gray-900">Verification Complete</h4>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                            Thank you! Your phone number has been successfully verified in our records via our OTP Provider Integration.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/"
                                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                )}

                {/* Resend and Actions panel */}
                {isOtpSent && status.type !== "verified" && (
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-400">
                        <button
                            onClick={() => {
                                setIsOtpSent(false);
                                setOtpCode("");
                                setStatus({ type: "", message: "" });
                            }}
                            className="hover:text-gray-900 transition-colors"
                        >
                            Change Number
                        </button>
                        <button
                            onClick={handleSendOtp}
                            disabled={resendTimer > 0 || isLoading}
                            className="hover:text-gray-900 disabled:opacity-40 transition-colors"
                        >
                            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                        </button>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}
