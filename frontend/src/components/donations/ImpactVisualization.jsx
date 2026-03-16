import { Coffee, GraduationCap, Droplets, Home } from "lucide-react";

export default function ImpactVisualization() {
    const impacts = [
        {
            icon: <Coffee className="w-6 h-6 text-white" />,
            value: "250K+",
            label: "Meals Provided",
            gradient: "from-orange-500 to-amber-500",
            delay: "0",
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-white" />,
            value: "15,000",
            label: "Children Educated",
            gradient: "from-blue-500 to-indigo-500",
            delay: "100",
        },
        {
            icon: <Droplets className="w-6 h-6 text-white" />,
            value: "450",
            label: "Water Wells Built",
            gradient: "from-teal-400 to-emerald-500",
            delay: "200",
        },
        {
            icon: <Home className="w-6 h-6 text-white" />,
            value: "85",
            label: "Communities Supported",
            gradient: "from-purple-500 to-pink-500",
            delay: "300",
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impacts.map((impact, index) => (
                <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 border border-border text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${impact.delay}ms` }}
                >
                    <div className={`w-14 h-14 bg-gradient-to-br ${impact.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}>
                        {impact.icon}
                    </div>
                    <div className="text-3xl font-bold mb-1 text-gray-900">{impact.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">{impact.label}</div>
                </div >
            ))
            }
        </div >
    );
}
