import { useState } from "react";
import { Zap, Heart, Check } from "lucide-react";

const categories = [
    { name: "Environment", icon: "🌱" },
    { name: "Education", icon: "📚" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Disaster Relief", icon: "🆘" },
    { name: "Community", icon: "🤝" },
    { name: "Animal Welfare", icon: "🐾" },
    { name: "Arts & Culture", icon: "🎨" },
    { name: "Crisis Response", icon: "🚨" }
];

export default function VolunteerInterests({ onNext, onBack, initialInterests = [] }) {
    const [selected, setSelected] = useState(initialInterests);

    const toggle = (name) => {
        setSelected(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">What drives you?</h3>
                <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto">
                    Select the categories you're passionate about so we can personalize your impact feed.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {categories.map((cat) => {
                    const isSelected = selected.includes(cat.name);
                    return (
                        <button
                            key={cat.name}
                            onClick={() => toggle(cat.name)}
                            className={`group p-4 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-3
                                ${isSelected ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10 scale-105' : 'bg-gray-50/50 border-gray-100 hover:border-primary/20 hover:bg-white'}
                            `}
                        >
                            <span className="text-3xl mb-1">{cat.icon}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest text-center ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
                                {cat.name}
                            </span>
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-12 pt-10 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                <button onClick={onBack} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">
                    Back
                </button>
                <button
                    onClick={() => onNext(selected)}
                    disabled={selected.length === 0}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all
                        ${selected.length > 0 ? 'bg-gray-900 text-white hover:bg-primary shadow-xl shadow-primary/20' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}
                    `}
                >
                    Finalize Profile
                </button>
            </div>

            <p className="mt-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                You can change these categories anytime from your profile settings.
            </p>
        </div>
    );
}
