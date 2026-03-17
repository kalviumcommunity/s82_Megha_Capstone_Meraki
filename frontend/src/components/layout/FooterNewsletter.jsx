import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function FooterNewsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
                Stay Impactful
            </h4>
            <p className="text-sm font-medium text-gray-500 max-w-xs leading-relaxed">
                Join our newsletter for the latest opportunities, community events, and impact stories.
            </p>

            {status === "success" ? (
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                    Welcome to the community!
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="relative group max-w-sm">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-4 pr-12 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-medium text-sm"
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-xl hover:bg-primary transition-all disabled:bg-gray-200"
                        aria-label="Subscribe"
                    >
                        {status === "loading" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
