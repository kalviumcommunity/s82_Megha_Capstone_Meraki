import React, { useState } from 'react';
import { Mail, Smartphone, Calendar, Check, AlertCircle } from 'lucide-react';
import Switch from '../ui/Switch';
import Button from '../ui/Button';

const NotificationSettings = ({ settings, onUpdate }) => {
    const [localSettings, setLocalSettings] = useState({
        email: settings?.email ?? true,
        push: settings?.push ?? true,
        weeklyDigest: settings?.weeklyDigest ?? true
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        const result = await onUpdate({ settings: { notifications: localSettings } });

        if (result.success) {
            setStatus({ type: 'success', message: 'Preferences saved!' });
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to save.' });
        }
        setIsSaving(false);
    };

    const notificationTypes = [
        {
            id: 'email',
            label: 'Email Notifications',
            description: 'Receive updates about your opportunities and impact via email.',
            icon: Mail
        },
        {
            id: 'push',
            label: 'Push Notifications',
            description: 'Get real-time alerts on your mobile device or browser.',
            icon: Smartphone
        },
        {
            id: 'weeklyDigest',
            label: 'Weekly Impact Digest',
            description: 'A summary of your weekly contributions and community news.',
            icon: Calendar
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Notification Preferences</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Choose how you want to stay connected with the Meraki community.
                </p>
            </header>

            <div className="grid gap-6">
                {notificationTypes.map((type) => (
                    <div key={type.id} className="group p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                    <type.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none mb-2">{type.label}</h3>
                                    <p className="text-[11px] font-medium text-gray-400 max-w-md leading-relaxed">
                                        {type.description}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={localSettings[type.id]}
                                onChange={(val) => handleToggle(type.id, val)}
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
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
            </div>
        </div>
    );
};

export default NotificationSettings;
