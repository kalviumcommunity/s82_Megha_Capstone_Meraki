import { User, Building, CheckCircle2, ChevronRight } from "lucide-react";

export default function RoleSelection({ onSelect }) {
    const roles = [
        {
            id: "volunteer",
            title: "I'm a Volunteer",
            description: "Find meaningful work, track impact, and earn recognized certifications.",
            icon: User,
            color: "primary",
            gradient: "from-primary/10 via-primary/5 to-white",
            benefits: [
                "Find 1000+ opportunities",
                "Track impact & hours",
                "Earn badges & skills",
                "Join discussions"
            ]
        },
        {
            id: "organization",
            title: "I'm an Organization",
            description: "Post opportunities, manage applications, and amplify your social mission.",
            icon: Building,
            color: "secondary",
            gradient: "from-secondary/10 via-secondary/5 to-white",
            benefits: [
                "Post unlimited roles",
                "Manage applications",
                "Impact analytics",
                "Volunteer retention"
            ]
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role) => {
                const Icon = role.icon;
                return (
                    <button
                        key={role.id}
                        onClick={() => onSelect(role.id)}
                        className={`group relative text-left bg-white rounded-[2.5rem] p-10 border border-gray-100 hover:border-${role.color}/20 hover:shadow-2xl hover:shadow-${role.color}/10 transition-all duration-500 overflow-hidden`}
                    >
                        {/* Background Decor */}
                        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${role.gradient} rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700`} />

                        <div className="relative z-10">
                            <div className={`w-16 h-16 bg-${role.color}/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-8 h-8 text-${role.color}`} />
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors">{role.title}</h3>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8">
                                {role.description}
                            </p>

                            <div className="space-y-4 mb-10">
                                {role.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full bg-${role.color}/10 flex items-center justify-center`}>
                                            <CheckCircle2 className={`w-3 h-3 text-${role.color}`} />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={`flex items-center gap-2 text-[10px] font-black text-${role.color} uppercase tracking-[0.2em]`}>
                                Choose Path <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
