import React from 'react';
import { Users, UserPlus, Shield, Settings, Mail, MoreVertical } from 'lucide-react';
import Button from '../ui/Button';

const TeamSettings = () => {
    const members = [
        { id: 1, name: 'Sarah Wilson', email: 'sarah@meraki.org', role: 'Owner', status: 'Active' },
        { id: 2, name: 'Mike Johnson', email: 'mike@meraki.org', role: 'Admin', status: 'Active' },
        { id: 3, name: 'Jessie Lee', email: 'jessie@meraki.org', role: 'Member', status: 'Pending' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Team Management</h2>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                        Manage your organization's team members and their permissions.
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary-dark text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl px-8 h-12 shadow-xl shadow-primary/20 flex items-center gap-3">
                    <UserPlus className="h-4 w-4" /> Invite Member
                </Button>
            </header>

            <div className="space-y-10">
                {/* Members List */}
                <div className="p-2 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100/50">
                            <thead>
                                <tr>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Member</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Role</th>
                                    <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/50">
                                {members.map((member) => (
                                    <tr key={member.id} className="group hover:bg-white transition-all duration-300">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary font-black text-sm group-hover:scale-110 transition-transform">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-gray-900">{member.name}</div>
                                                    <div className="text-[11px] font-medium text-gray-400 mt-0.5">{member.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white border border-gray-100 text-gray-600 shadow-sm">
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={cn(
                                                "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                                member.status === 'Active' ? "text-green-600" : "text-amber-600"
                                            )}>
                                                <span className={cn("h-1.5 w-1.5 rounded-full ring-4", member.status === 'Active' ? "bg-green-600 ring-green-100" : "bg-amber-600 ring-amber-100")} />
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Roles & Permissions */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                        <Shield className="h-3 w-3" /> Role Permissions
                    </h3>
                    <div className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="text-[11px] font-medium text-gray-500 leading-relaxed max-w-xl">
                            Default role for new invitations: <strong className="text-gray-900">Member</strong>. Members can view projects and community feed, but cannot manage organization details or team members.
                        </p>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-6 h-10 rounded-xl transition-all shrink-0">
                            Edit Default Permissions
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeamSettings;
