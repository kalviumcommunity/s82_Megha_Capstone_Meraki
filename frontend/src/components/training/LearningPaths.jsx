import { Shield, Target, Book, Zap, ArrowRight } from "lucide-react";

const paths = [
    {
        id: "leadership",
        title: "Volunteer Leadership",
        count: 5,
        hours: 12,
        progress: 70,
        icon: Target,
        gradient: "from-primary to-secondary",
        color: "text-primary",
        bg: "bg-primary/5",
    },
    {
        id: "environment",
        title: "Environmental Action",
        count: 4,
        hours: 10,
        progress: 25,
        icon: Shield,
        gradient: "from-secondary to-accent",
        color: "text-secondary",
        bg: "bg-secondary/5",
    },
    {
        id: "education",
        title: "Community Education",
        count: 6,
        hours: 15,
        progress: 0,
        icon: Book,
        gradient: "from-accent to-primary",
        color: "text-accent",
        bg: "bg-accent/5",
    },
];

export default function LearningPaths() {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Learning Paths</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {paths.map((path) => {
                    const Icon = path.icon;
                    return (
                        <div key={path.id} className="group relative bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${path.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${path.progress > 0 ? "text-primary" : "text-gray-300"}`}>
                                        {path.progress > 0 ? (path.progress === 100 ? "Completed" : "In Progress") : "Not Started"}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-xl font-extrabold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">{path.title}</h3>

                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                                <span className="flex items-center gap-1.5"><Book className="w-3.5 h-3.5" /> {path.count} Courses</span>
                                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> {path.hours}h Total</span>
                            </div>

                            <div className="mb-6 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-extrabold text-gray-700">{path.progress}%</span>
                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Progress</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${path.gradient} rounded-full transition-all duration-700`} style={{ width: `${path.progress}%` }} />
                                </div>
                            </div>

                            <button className="w-full py-3 border-2 border-gray-50 text-gray-400 text-[10px] font-extrabold uppercase tracking-widest rounded-2xl group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all flex items-center justify-center gap-2">
                                {path.progress > 0 ? "Continue Path" : "Get Started"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
