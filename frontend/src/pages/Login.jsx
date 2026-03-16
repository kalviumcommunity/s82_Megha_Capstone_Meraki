import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Modular Auth Components
import AuthLayout from "../components/auth/AuthLayout";
import AuthHeader from "../components/auth/AuthHeader";
import AuthTrustPanel from "../components/auth/AuthTrustPanel";
import LoginForm from "../components/auth/LoginForm";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [authType, setAuthType] = useState("volunteer"); // "volunteer" or "organization"

    const handleLogin = (credentials) => {
        setIsLoading(true);
        console.log("Logging in with:", credentials, "as", authType);

        // Simulate Auth Delay
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, redirect based on role or success
            navigate(authType === "volunteer" ? "/volunteer/dashboard" : "/organization/dashboard");
        }, 2000);
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
                title="Sign into Meraki"
                subtitle="Join thousands of volunteers creating real community impact. Welcome back!"
                type={authType}
            />

            <div className="space-y-8">
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
                    <Link to="/register" className="text-primary hover:underline decoration-2 underline-offset-4 font-black">
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
