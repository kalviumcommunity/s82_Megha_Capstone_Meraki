import React, { useState } from 'react';
import { User, Mail, AtSign, Camera, Check, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const AccountSettings = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        username: user?.username || ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        const result = await onUpdate(formData);

        if (result.success) {
            setStatus({ type: 'success', message: 'Account updated successfully!' });
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to update account.' });
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Account Settings</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Manage your personal information and how others see you on the platform.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="flex flex-col md:flex-row items-center gap-10 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-[2rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-12 w-12 text-primary" />
                            )}
                        </div>
                        <button type="button" className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-100 text-primary hover:scale-110 transition-all duration-300">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Profile Picture</h3>
                        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest leading-loose">
                            JPG, GIF or PNG. Max size of 800K
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <User className="h-3 w-3" /> Full Name
                        </label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Alex Johnson"
                            className="rounded-2xl h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <Mail className="h-3 w-3" /> Email Address
                        </label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex.j@meraki.org"
                            className="rounded-2xl h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <AtSign className="h-3 w-3" /> Username
                        </label>
                        <Input
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="alexj"
                            className="rounded-2xl h-14 bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold"
                        />
                    </div>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {status.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        <p className="text-xs font-bold uppercase tracking-wider">{status.message}</p>
                    </div>
                )}

                <div className="pt-6 border-t border-gray-50 flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary-dark text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl px-10 py-6 h-auto shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
