import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";


// Modular Auth Components
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import AuthTrustPanel from "../components/auth/AuthTrustPanel";
import LoginForm from "../components/auth/LoginForm";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";
import { authApi } from "../lib/api";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [authType, setAuthType] = useState("volunteer"); // "volunteer" or "organization"

    const { login } = useAuth();

    const handleLogin = async (credentials) => {
        setIsLoading(true);
        setError("");
        console.log("Logging in with:", credentials, "as", authType);

        try {
            const response = await authApi.login(credentials);
            const { token, ...userData } = response.data;
            
            // Ensure role matches what backend expects or just use what backend returns
            login(userData, token);
            
            navigate(userData.role === "volunteer" ? "/volunteer/dashboard" : "/organization/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout hero={<AuthTrustPanel />}>
            {/* Header / Back Navigation */}
            <div className="mb-8 flex items-center justify-between">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Explorer
                </Link>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setAuthType("volunteer")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${authType === 'volunteer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Volunteer
                    </button>
                    <button
                        onClick={() => setAuthType("organization")}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${authType === 'organization' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Org
                    </button>
                </div>
            </div>

            <AuthHeader
                title="Welcome Back"
                subtitle="Sign in to continue making an impact"
                type={authType}
            />

            <div className="space-y-8">
                {/* Error Pulse */}
                {error && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest text-center">
                            {error}
                        </p>
                    </div>
                )}

                {/* Core Login Form */}
                <LoginForm
                    isLoading={isLoading}
                    onSubmit={handleLogin}
                    onOpenForgot={() => setIsForgotModalOpen(true)}
                />

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                        <span className="px-4 bg-gray-50/30 text-gray-300">Auth Partner</span>
                    </div>
                </div>

                {/* Social Auth Options */}
                <SocialLoginButtons />

                {/* Footer Links */}
                <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    New to the journey?{" "}
                    <Link to="/signup" className="text-primary hover:underline decoration-2 underline-offset-4 font-black">
                        Create Account
                    </Link>
                </p>
            </div>

            {/* Password Recovery System */}
            <ForgotPasswordModal
                isOpen={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />
        </AuthLayout>
    );
}
