import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const socialLinks = [
    { label: "Facebook", icon: Facebook, color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10", path: "#" },
    { label: "Twitter", icon: Twitter, color: "hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10", path: "#" },
    { label: "Instagram", icon: Instagram, color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10", path: "#" },
    { label: "LinkedIn", icon: Linkedin, color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10", path: "#" },
    { label: "GitHub", icon: Github, color: "hover:text-gray-900 hover:bg-gray-900/10", path: "#" }
];

export default function FooterSocial() {
    return (
        <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                    <a
                        key={social.label}
                        href={social.path}
                        aria-label={social.label}
                        className={`w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:border-transparent ${social.color}`}
                    >
                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>
                );
            })}
        </div>
    );
}
