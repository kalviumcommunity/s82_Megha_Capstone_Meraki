import React from 'react';
import { AlertTriangle, UserX, LogOut, ShieldAlert } from 'lucide-react';
import Button from '../ui/Button';

const DangerZone = ({ userRole = 'volunteer' }) => {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-rose-500">Danger Zone</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Irreversible actions that affect your account and data.
                </p>
            </header>

            <div className="grid gap-6">
                <div className="p-8 bg-rose-50/30 rounded-[2.5rem] border border-rose-100/50 space-y-8">
                    {userRole === 'organization' && (
                        <>
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="text-center sm:text-left">
                                    <h3 className="text-sm font-black text-rose-900 uppercase tracking-widest">Transfer Ownership</h3>
                                    <p className="text-[11px] font-medium text-rose-700/60 mt-2">Transfer this organization to another team member.</p>
                                </div>
                                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-100 font-black text-[10px] uppercase tracking-widest rounded-xl px-8 h-12 transition-all">
                                    Transfer
                                </Button>
                            </div>
                            <div className="h-px bg-rose-100/50" />
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h3 className="text-sm font-black text-rose-900 uppercase tracking-widest">Deactivate Account</h3>
                            <p className="text-[11px] font-medium text-rose-700/60 mt-2">Temporarily hide your profile and activity.</p>
                        </div>
                        <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-100 font-black text-[10px] uppercase tracking-widest rounded-xl px-8 h-12 transition-all">
                            Deactivate
                        </Button>
                    </div>

                    <div className="h-px bg-rose-100/50" />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <h3 className="text-sm font-black text-rose-900 uppercase tracking-widest">Delete Account</h3>
                            <p className="text-[11px] font-medium text-rose-700/60 mt-2">Permanently remove your account and all data.</p>
                        </div>
                        <Button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl px-8 h-12 shadow-xl shadow-rose-200">
                            Delete Account
                        </Button>
                    </div>
                </div>

                <div className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex gap-5">
                    <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0" />
                    <div className="space-y-2">
                        <p className="text-xs font-black text-gray-900 uppercase tracking-widest">A Note on Deletion</p>
                        <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
                            Deleting your account is permanent and cannot be undone. All your impact history, achievements, and social connections will be lost forever.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DangerZone;
