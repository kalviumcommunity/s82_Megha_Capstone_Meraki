import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Building } from "lucide-react";

export default function BasicInfoForm({ role, onNext, onBack, initialData }) {
    const [formData, setFormData] = useState(initialData || { name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(formData);
    };

    const isPasswordMatch = formData.password === formData.confirmPassword || formData.confirmPassword === "";

    return (
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm max-w-xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Create your account</h3>
            <p className="text-sm font-medium text-gray-500 mb-10 leading-relaxed">
                Enter your details to join the Meraki community as a <span className="text-primary font-bold">{role}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused === 'name' ? 'text-primary' : 'text-gray-400'}`}>
                        {role === "volunteer" ? <User className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                    </div>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder=" "
                        className="w-full pl-12 pr-4 pt-6 pb-2 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all peer"
                        required
                    />
                    <label htmlFor="name" className="absolute left-12 top-4 text-xs font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-primary">
                        {role === "volunteer" ? "Full Name" : "Organization Name"}
                    </label>
                </div>

                {/* Email Field */}
                <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused === 'email' ? 'text-primary' : 'text-gray-400'}`}>
                        <Mail className="w-5 h-5" />
                    </div>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder=" "
                        className="w-full pl-12 pr-4 pt-6 pb-2 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all peer"
                        required
                    />
                    <label htmlFor="email" className="absolute left-12 top-4 text-xs font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-primary">
                        Email Address
                    </label>
                </div>

                {/* Password Fields Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative group">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder=" "
                            className="w-full px-4 pt-6 pb-2 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all peer"
                            required
                        />
                        <label htmlFor="password" className="absolute left-4 top-4 text-xs font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-primary">
                            Password
                        </label>
                    </div>
                    <div className="relative group">
                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder=" "
                            className={`w-full px-4 pt-6 pb-2 bg-gray-50 border rounded-2xl outline-none focus:ring-4 transition-all peer
                                ${!isPasswordMatch ? 'border-rose-200 focus:ring-rose-50' : 'border-gray-100 focus:bg-white focus:border-primary/20 focus:ring-primary/5'}
                            `}
                            required
                        />
                        <label htmlFor="confirmPassword" className="absolute left-4 top-4 text-xs font-black uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-primary">
                            Confirm
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 hover:text-primary">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />} Show Password
                    </button>
                    {!isPasswordMatch && <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Passwords mismatch</span>}
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={onBack} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100">
                        Back
                    </button>
                    <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary shadow-xl shadow-black/5 hover:shadow-primary/20 transition-all">
                        Continue Onboarding
                    </button>
                </div>
            </form>
        </div>
    );
}
