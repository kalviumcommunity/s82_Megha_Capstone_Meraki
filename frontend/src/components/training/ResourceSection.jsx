import { FileText, Video, Book, Lightbulb, ArrowRight, Download } from "lucide-react";

const resources = [
    {
        title: "Volunteer Handbook 2026",
        desc: "Essential guidelines and safety protocols.",
        category: "Guides",
        type: "PDF",
        icon: FileText,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        title: "Digital Advocacy Webinar",
        desc: "How to use social media for social good.",
        category: "Webinars",
        type: "Video",
        icon: Video,
        color: "text-rose-500",
        bg: "bg-rose-50",
    },
    {
        title: "Leadership Case Studies",
        desc: "Learnings from successful community projects.",
        category: "Insights",
        type: "Case Study",
        icon: Lightbulb,
        color: "text-amber-500",
        bg: "bg-amber-50",
    },
];

export default function ResourceSection() {
    return (
        <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900">Additional Resources</h2>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                    Resource Library <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {resources.map((res) => {
                    const Icon = res.icon;
                    return (
                        <div key={res.title} className="group bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/10 transition-all duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 ${res.bg} rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-7 h-7 ${res.color}`} />
                                </div>
                                <span className="px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-lg">
                                    {res.type}
                                </span>
                            </div>

                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{res.category}</p>
                            <h3 className="text-xl font-black text-gray-900 mb-2 truncate">{res.title}</h3>
                            <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">{res.desc}</p>

                            <button className="w-full py-3.5 bg-gray-50 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Download Resource
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
