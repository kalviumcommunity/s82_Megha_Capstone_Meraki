import { BookOpen, Activity, Globe, Lightbulb } from "lucide-react";

export default function CampaignStory({ campaign }) {
    if (!campaign.story) {
        return (
            <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-500">
                Story details coming soon for this campaign.
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Background */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold">
                    <BookOpen className="w-5 h-5" />
                    <h4>The Background</h4>
                </div>
                <p className="text-gray-600 leading-relaxed pl-7 border-l-2 border-primary/20 bg-gray-50/50 p-4 rounded-r-xl">
                    {campaign.story.background}
                </p>
            </div>

            {/* Expected Impact */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-secondary font-semibold">
                    <Activity className="w-5 h-5" />
                    <h4>Expected Impact</h4>
                </div>
                <ul className="pl-7 space-y-3">
                    {campaign.story.impacts.map((impact, idx) => (
                        <li key={idx} className="flex flex-col gap-1 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <span className="font-semibold text-gray-800">{impact.title}</span>
                            <span className="text-sm text-gray-600">{impact.description}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent font-semibold">
                    <Lightbulb className="w-5 h-5" />
                    <h4>Project Timeline</h4>
                </div>
                <div className="pl-7 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                    {campaign.story.timeline.map((event, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-6">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            {/* Content */}
                            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm group-hover:bg-accent/5 transition-colors">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-accent">{event.date}</span>
                                    <span className="font-semibold text-gray-800">{event.phase}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Photos/Media Grid (Placeholder for real images) */}
            {campaign.story.photos && campaign.story.photos.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Globe className="w-5 h-5" />
                        <h4>Gallery</h4>
                    </div>
                    <div className="pl-7 grid grid-cols-2 gap-3">
                        {campaign.story.photos.map((photo, idx) => (
                            <img
                                key={idx}
                                src={photo}
                                alt={`Campaign visual ${idx + 1}`}
                                className="w-full h-32 object-cover rounded-xl border border-gray-100 shadow-sm hover:scale-[1.03] transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
