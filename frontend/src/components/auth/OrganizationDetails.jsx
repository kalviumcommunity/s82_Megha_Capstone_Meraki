import { useState } from "react";
import { Globe, MapPin, Layout, MessageSquare, ShieldCheck } from "lucide-react";

export default function OrganizationDetails({ onNext, onBack, initialData }) {
    const [formData, setFormData] = useState(initialData || { type: "NGO", location: "", web: "", mission: "" });

    const types = ["NGO", "Non-Profit", "Community Group", "Social Enterprise"];

    return (
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Tell us about your mission</h3>
            <p className="text-sm font-medium text-gray-500 mb-10 leading-relaxed">
                Help volunteers understand your organization's core values.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); onNext(formData); }} className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 block">Organization Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        {types.map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: t })}
                                className={`px-4 py-3 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all
                                    ${formData.type === t ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/20' : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-secondary/20 hover:bg-white'}
                                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Location (City, Country)"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-secondary/20 transition-all font-medium text-sm"
                            required
                        />
                    </div>
                    <div className="relative group">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="url"
                            value={formData.web}
                            onChange={(e) => setFormData({ ...formData, web: e.target.value })}
                            placeholder="Website (Optional)"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-secondary/20 transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-gray-400" />
                    <textarea
                        value={formData.mission}
                        onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        placeholder="Organization Mission Statement"
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-secondary/20 transition-all font-medium text-sm resize-none"
                        required
                    />
                </div>

                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified data protected with encryption</span>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button type="button" onClick={onBack} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100">
                        Back
                    </button>
                    <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-secondary shadow-xl shadow-secondary/20 transition-all">
                        Complete Profile
                    </button>
                </div>
            </form>
        </div>
    );
}
