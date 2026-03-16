import { Award, Share2, Download, ExternalLink, ShieldCheck } from "lucide-react";

const certifications = [
    {
        id: 1,
        title: "Advanced Volunteer Leadership",
        date: "March 2026",
        issuer: "Meraki Global Academy",
        id_code: "MRA-LD-9921",
        gradient: "from-primary/20 to-secondary/20",
        icon_color: "text-primary",
    },
    {
        id: 2,
        title: "Crisis Intervention Specialist",
        date: "February 2026",
        issuer: "Red Cross Partner Pro",
        id_code: "MRA-CR-4412",
        gradient: "from-rose-500/10 to-orange-500/10",
        icon_color: "text-rose-500",
    },
];

export default function CertificationShowcase() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        <Award className="w-7 h-7 text-primary" />
                        Certifications
                    </h3>
                    <p className="text-xs font-bold text-gray-400">Your verified social impact credentials</p>
                </div>
                <button className="px-5 py-2.5 bg-gray-100 text-gray-900 text-[9px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2 hover:bg-gray-200 transition-all border border-gray-200">
                    <Download className="w-3.5 h-3.5" /> Export All
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {certifications.map((cert) => (
                    <div key={cert.id} className={`relative group p-6 rounded-3xl border border-gray-100 bg-gradient-to-br ${cert.gradient} hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500`}>
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                                <ShieldCheck className={`w-8 h-8 ${cert.icon_color}`} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white rounded-xl shadow-sm hover:text-primary transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white rounded-xl shadow-sm hover:text-primary transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h4 className="text-lg font-black text-gray-900 mb-1 leading-tight">{cert.title}</h4>
                        <p className="text-xs font-bold text-gray-500 mb-6">{cert.issuer} • {cert.date}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/50">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">ID: {cert.id_code}</span>
                            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                                View PDF
                            </button>
                        </div>
                    </div>
                ))}

                {/* Placeholder for next unlock */}
                <div className="p-6 rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-3 group-hover:bg-primary/5 group-hover:text-primary/30 transition-colors">
                        <Award className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 leading-snug">Complete <span className="text-gray-600 font-extrabold">Community Engagement Path</span> to unlock next</p>
                </div>
            </div>
        </div>
    );
}
