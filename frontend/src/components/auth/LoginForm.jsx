import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm({ onSubmit, isLoading, onOpenForgot }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    const isEmailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === 'email' ? 'text-primary' : 'text-gray-400'}`}>
                    <Mail className="w-5 h-5" />
                </div>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className={`w-full pl-12 pr-4 pt-6 pb-2 bg-white border rounded-2xl transition-all duration-200 outline-none peer
                        ${!isEmailValid ? 'border-rose-300 focus:border-rose-500 ring-rose-50' : 'border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5'}
                    `}
                    required
                />
                <label
                    htmlFor="email"
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all duration-200 pointer-events-none peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0"
                >
                    Email Address
                </label>
                {!isEmailValid && (
                    <p className="mt-1 ml-2 text-[10px] font-bold text-rose-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                        Please enter a valid email
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focused === 'password' ? 'text-primary' : 'text-gray-400'}`}>
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="w-full pl-12 pr-12 pt-6 pb-2 bg-white border border-gray-100 rounded-2xl transition-all duration-200 outline-none peer focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                    required
                />
                <label
                    htmlFor="password"
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all duration-200 pointer-events-none peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0"
                >
                    Password
                </label>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-primary transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all duration-200" />
                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 transition-colors uppercase tracking-widest">Remember me</span>
                </label>
                <button
                    type="button"
                    onClick={onOpenForgot}
                    className="text-xs font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                >
                    Forgot Password?
                </button>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative overflow-hidden group
                    ${isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0'}
                `}
            >
                <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                    Sign Into Account
                </span>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                )}
            </button>
        </form>
    );
}
