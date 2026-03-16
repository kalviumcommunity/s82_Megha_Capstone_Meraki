import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, Users, Calendar, BookOpen, Award, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Explore', icon: Compass, href: '/explore' },
        { label: 'Community', icon: Users, href: '/community' },
        { label: 'Events', icon: Calendar, href: '/events' },
        { label: 'Training', icon: BookOpen, href: '/training' },
        { label: 'Profile', icon: Award, href: '/profile' },
    ];

    return (
        <aside className="w-64 border-r bg-surface hidden lg:flex flex-col h-[calc(100vh-4rem)] py-6 sticky top-16">
            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-highlight/50 text-primary"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="px-4 mt-auto">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                >
                    <Settings className="h-5 w-5" />
                    Settings
                </Link>
            </div>
        </aside>
    );
}
