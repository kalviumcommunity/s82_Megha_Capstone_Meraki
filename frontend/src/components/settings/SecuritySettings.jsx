import React, { useState } from 'react';
import { Lock, Smartphone, Monitor, LogOut, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { userApi } from '../../lib/api';

const SecuritySettings = ({ onNavigate }) => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setIsSaving(true);
        setStatus({ type: '', message: '' });

        try {
            await userApi.changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setIsChangingPassword(false);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to update password' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Security & Access</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Protect your account and monitor active sessions.
                </p>
            </header>

            <div className="grid gap-8">
                {/* Change Password */}
                <section className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 overflow-hidden transition-all duration-500">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Lock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Master Password</p>
                                <p className="text-[11px] font-medium text-gray-400 mt-2">Security last updated 3 months ago.</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                            variant="outline"
                            className="font-black text-[10px] uppercase tracking-[0.2em] rounded-xl px-8 h-12 border-gray-200 text-gray-500 hover:text-primary hover:border-primary/30 transition-all flex items-center gap-2"
                        >
                            {isChangingPassword ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            {isChangingPassword ? 'Cancel' : 'Change Password'}
                        </Button>
                    </div>

                    {isChangingPassword && (
                        <form onSubmit={handlePasswordChange} className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                                    <Input
                                        type="password"
                                        value={passwords.currentPassword}
                                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                        className="rounded-2xl h-12 bg-white border-gray-100 focus:ring-4 focus:ring-primary/5 font-bold"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                                    <Input
                                        type="password"
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        className="rounded-2xl h-12 bg-white border-gray-100 focus:ring-4 focus:ring-primary/5 font-bold"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                    <Input
                                        type="password"
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                        className="rounded-2xl h-12 bg-white border-gray-100 focus:ring-4 focus:ring-primary/5 font-bold"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                    {status.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                    <p className="text-xs font-bold uppercase tracking-wider">{status.message}</p>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-primary hover:bg-primary-dark text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl px-10 py-4 h-auto shadow-lg shadow-primary/20 disabled:opacity-50"
                                >
                                    {isSaving ? 'Updating...' : 'Update Password'}
                                </Button>
                            </div>
                        </form>
                    )}
                </section>

                {/* 2FA */}
                <section className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <Smartphone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Two-Factor Auth</p>
                                <p className="text-[11px] font-medium text-gray-400 mt-2">Add an extra layer of protection to your account.</p>
                            </div>
                        </div>
                        <Button className="bg-primary hover:bg-primary-dark text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl px-8 h-12 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            Enable 2FA
                        </Button>
                    </div>
                </section>

                {/* Security Logs Preview */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-4">
                        <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                            <Monitor className="h-3 w-3" /> Recent Login Activity
                        </h3>
                        <Button size="xs" variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-4" onClick={() => onNavigate('logs')}>
                            View all logs
                        </Button>
                    </div>
                    <div className="p-6 bg-gray-50/30 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-transform group-hover:scale-110">
                                <Monitor className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900">MacBook Pro • Chrome</p>
                                <p className="text-[11px] font-medium text-gray-400 mt-1">San Francisco, CA • Active now</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">Current</span>
                    </div>
                </section>

                <section className="pt-6 border-t border-gray-100">
                    <Button variant="ghost" className="text-red-600 hover:bg-red-50 w-full justify-center flex items-center gap-2 font-black text-[10px] uppercase tracking-widest rounded-2xl py-6 h-auto transition-all">
                        <LogOut className="h-4 w-4" /> Logout from all devices
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default SecuritySettings;
