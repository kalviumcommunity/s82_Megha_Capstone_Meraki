import React from 'react';
import {
    User,
    Settings as SettingsIcon,
    Bell,
    Shield,
    Lock,
    Smartphone,
    Link as LinkIcon,
    Heart,
    History,
    Trash2,
    Globe
} from 'lucide-react';
import { cn } from '../../lib/utils'; // Assuming this exists or I'll create it if needed, usually simple utility

const SettingsSidebar = ({ activeSection, setActiveSection, userRole = 'volunteer' }) => {
    const menuItems = [
        { id: 'account', label: 'Account', icon: User, section: 'General' },
        { id: 'profile', label: 'Profile', icon: SettingsIcon, section: 'General' },
        { id: 'notifications', label: 'Notifications', icon: Bell, section: 'Preferences' },
        { id: 'privacy', label: 'Privacy', icon: Shield, section: 'Preferences' },
        { id: 'security', label: 'Security', icon: Lock, section: 'Preferences' },
        { id: 'preferences', label: 'Preferences', icon: Globe, section: 'Preferences' },
        { id: 'connected', label: 'Connected Accounts', icon: LinkIcon, section: 'Integration' },
        ...(userRole === 'volunteer'
            ? [{ id: 'impact', label: 'Volunteer Impact', icon: Heart, section: 'Activity' }]
            : [{ id: 'team', label: 'Team Management', icon: Smartphone, section: 'Activity' }]
        ),
        { id: 'logs', label: 'Security Logs', icon: History, section: 'Activity' },
        { id: 'danger', label: 'Danger Zone', icon: Trash2, section: 'Critical', isDanger: true }
    ];

    const sections = ['General', 'Preferences', 'Integration', 'Activity', 'Critical'];

    return (
        <nav className="w-full md:w-64 space-y-6">
            {sections.map((sectionName) => {
                const sectionItems = menuItems.filter(item => item.section === sectionName);
                if (sectionItems.length === 0) return null;

                return (
                    <div key={sectionName} className="space-y-3">
                        <h3 className="px-5 text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">
                            {sectionName}
                        </h3>
                        <div className="space-y-1">
                            {sectionItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={cn(
                                        "w-full flex items-center px-5 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all duration-300 group",
                                        activeSection === item.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                            : item.isDanger
                                                ? "text-red-500 hover:bg-red-50"
                                                : "text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40"
                                    )}
                                    aria-current={activeSection === item.id ? 'page' : undefined}
                                >
                                    <item.icon className={cn(
                                        "mr-4 h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                                        activeSection === item.id ? "text-white" : "text-gray-400 group-hover:text-primary"
                                    )} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
};

export default SettingsSidebar;
