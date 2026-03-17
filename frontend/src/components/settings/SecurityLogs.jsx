import React from 'react';
import { History, Monitor, MapPin, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const SecurityLogs = () => {
    const logs = [
        { id: 1, device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco, CA', time: 'Active now', isCurrent: true, status: 'success' },
        { id: 2, device: 'iPhone 13', browser: 'Safari', location: 'San Francisco, CA', time: '2 hours ago', status: 'success' },
        { id: 3, device: 'Unknown Linux Device', browser: 'Firefox', location: 'London, UK', time: 'Mar 15, 2026', isSuspicious: true, status: 'warning' },
        { id: 4, device: 'Windows 11', browser: 'Edge', location: 'Berlin, DE', time: 'Mar 12, 2026', status: 'success' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Security Logs</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Review your recent login activity and manage active sessions.
                </p>
            </header>

            <div className="space-y-10">
                <div className="group p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100/50 flex gap-6 hover:bg-amber-50 transition-all duration-300">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-amber-100 shrink-0 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-amber-900 uppercase tracking-widest">Recent Suspicious Activity</h3>
                        <p className="text-[11px] font-medium text-amber-800/80 mt-2 leading-relaxed">
                            We detected a login from an unknown device in London, UK. If this wasn't you, please secure your account immediately.
                        </p>
                        <Button size="xs" variant="outline" className="mt-5 bg-white border-amber-200 text-amber-700 hover:bg-amber-100 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] px-6 py-3 h-auto">
                            Secure My Account
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Active Sessions</h3>
                        <Button size="xs" variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-4 h-10 rounded-xl transition-all">
                            Sign out of all sessions
                        </Button>
                    </div>
                    <div className="grid gap-4">
                        {logs.map((log) => (
                            <div key={log.id} className="group p-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] flex items-center justify-between hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500">
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "p-4 rounded-2xl border bg-white shadow-sm transition-transform group-hover:scale-110",
                                        log.isSuspicious ? "border-red-100" : "border-gray-100"
                                    )}>
                                        <Monitor className={cn("h-6 w-6", log.isSuspicious ? "text-red-500" : "text-gray-400 group-hover:text-primary transition-colors")} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm font-black text-gray-900">{log.device} • {log.browser}</p>
                                            {log.isCurrent && (
                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest">Current</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-[11px] font-medium text-gray-400">
                                            <span className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {log.location}</span>
                                            <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> {log.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {log.isSuspicious ? (
                                        <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 font-black text-[9px] uppercase tracking-widest rounded-xl px-6">Report</Button>
                                    ) : !log.isCurrent && (
                                        <Button size="sm" variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl px-6">Log out</Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex gap-6">
                    <ShieldCheck className="h-6 w-6 text-green-500 shrink-0" />
                    <div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Security Tips</h3>
                        <ul className="text-[11px] font-medium text-gray-500 mt-4 space-y-3 list-disc ml-5">
                            <li className="hover:text-gray-700 transition-colors">Always use a strong, unique password for your Meraki account.</li>
                            <li className="hover:text-gray-700 transition-colors">Enable Two-Factor Authentication (2FA) for maximum protection.</li>
                            <li className="hover:text-gray-700 transition-colors">Never share your login credentials with anyone.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityLogs;
