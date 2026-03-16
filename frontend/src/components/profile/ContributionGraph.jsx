import { TrendingUp, Info } from "lucide-react";

// Mock data generator for 52 weeks (1 year)
const generateHeatmap = () => {
    const data = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 52; i++) {
        data.push(Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)));
    }
    return { weeks: data, months };
};

export default function ContributionGraph() {
    const { weeks, months } = generateHeatmap();

    const getColor = (val) => {
        if (val === 0) return "bg-gray-50 border-gray-100";
        if (val === 1) return "bg-primary/20 border-primary/5";
        if (val === 2) return "bg-primary/40 border-primary/10";
        if (val === 3) return "bg-primary/70 border-primary/20";
        return "bg-primary border-primary/30 shadow-lg shadow-primary/20";
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                        Volunteer Contributions
                        <Info className="w-4 h-4 text-gray-300 cursor-help" />
                    </h3>
                    <p className="text-sm font-bold text-gray-400">156 hours contributed in the last year</p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-1">Less</span>
                    <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map(v => (
                            <div key={v} className={`w-3.5 h-3.5 rounded-sm ${getColor(v)}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">More</span>
                </div>
            </div>

            <div className="relative">
                {/* Months labels */}
                <div className="flex justify-between mb-4 px-2">
                    {months.map(m => (
                        <span key={m} className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">{m}</span>
                    ))}
                </div>

                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
                    {weeks.map((week, wIndex) => (
                        <div key={wIndex} className="flex flex-col gap-1.5 flex-shrink-0">
                            {week.map((day, dIndex) => (
                                <div
                                    key={dIndex}
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border transition-all hover:scale-125 hover:z-10 cursor-pointer ${getColor(day)}`}
                                    title={`${day} hours contributed`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Longest Streak: <span className="text-gray-900">14 Days</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4 text-secondary" />
                    Current Streak: <span className="text-gray-900">5 Days</span>
                </div>
            </div>
        </div>
    );
}
