import React, { useState } from 'react';
import { Shield, Eye, Heart, MessageSquare, Check, AlertCircle } from 'lucide-react';
import Switch from '../ui/Switch';
import Button from '../ui/Button';

const PrivacySettings = ({ settings, onUpdate }) => {
    const [localSettings, setLocalSettings] = useState({
        publicProfile: settings?.publicProfile ?? true,
        showHours: settings?.showHours ?? true,
        allowContact: settings?.allowContact ?? true,
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        const result = await onUpdate({ settings: { privacy: localSettings } });

        if (result.success) {
            setStatus({ type: 'success', message: 'Privacy settings updated!' });
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to update.' });
        }
        setIsSaving(false);
    };

    const privacyOptions = [
        {
            id: 'publicProfile',
            label: 'Public Profile',
            description: 'Make your impact profile visible to everyone in the Meraki community.',
            icon: Eye
        },
        {
            id: 'showHours',
            label: 'Display Volunteering Hours',
            description: 'Show the total hours you have contributed on your public profile.',
            icon: Heart
        },
        {
            id: 'allowContact',
            label: 'Allow Direct Contact',
            description: 'Let verified organizations contact you directly for opportunities.',
            icon: MessageSquare
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Privacy & Visibility</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Control who can see your activity and how you interact with the community.
                </p>
            </header>

            {/* Information Banner */}
            <section className="p-8 bg-gradient-to-br from-primary/10 to-transparent rounded-[2.5rem] border border-primary/10 flex items-start gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-primary/10 relative z-10">
                    <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="relative z-10 space-y-1">
                    <h3 className="text-sm font-black text-primary uppercase tracking-wider">Your data is safe</h3>
                    <p className="text-[11px] font-medium text-gray-400 leading-relaxed max-w-md">
                        Meraki uses industry-standard encryption to protect your personal information. We never sell your data to third parties.
                    </p>
                </div>
            </section>

            <div className="grid gap-6">
                {privacyOptions.map((option) => (
                    <div key={option.id} className="group p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                    <option.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none mb-2">{option.label}</h3>
                                    <p className="text-[11px] font-medium text-gray-400 max-w-md leading-relaxed">
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={localSettings[option.id]}
                                onChange={(val) => handleToggle(option.id, val)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {status.message && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {status.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <p className="text-xs font-bold uppercase tracking-wider">{status.message}</p>
                </div>
            )}

            <div className="pt-6 border-t border-gray-50 flex justify-end">
                <Button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary-dark text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl px-10 py-6 h-auto shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save Privacy Settings'}
                </Button>
            </div>
        </div>
    );
};

export default PrivacySettings;
