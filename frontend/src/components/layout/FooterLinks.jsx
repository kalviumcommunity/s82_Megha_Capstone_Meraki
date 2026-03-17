import { Link } from "react-router-dom";

const sections = [
    {
        title: "Platform",
        links: [
            { label: "Opportunities", path: "/opportunities" },
            { label: "Events", path: "/events" },
            { label: "Community", path: "/community" },
            { label: "Training Hub", path: "/training" },
            { label: "Volunteer Dashboard", path: "/volunteer/dashboard" }
        ]
    },
    {
        title: "Community",
        links: [
            { label: "Success Stories", path: "#" },
            { label: "Impact Reports", path: "#" },
            { label: "Volunteer Spotlight", path: "#" },
            { label: "Guidelines", path: "#" }
        ]
    },
    {
        title: "Company",
        links: [
            { label: "About Meraki", path: "#" },
            { label: "Our Mission", path: "/mission" },
            { label: "Careers", path: "#" },
            { label: "Partnerships", path: "#" }
        ]
    }
];

export default function FooterLinks() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-4">
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">
                        {section.title}
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                        {section.links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.path}
                                    className="text-sm font-medium text-gray-500 hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
