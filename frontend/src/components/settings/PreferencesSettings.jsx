import React, { useState } from 'react';
import { Moon, Sun, Globe, Clock, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';

const PreferencesSettings = ({ settings, onUpdate }) => {
    const [localSettings, setLocalSettings] = useState({
        theme: settings?.theme || 'light',
        language: settings?.language || 'English (US)',
        timezone: settings?.timezone || '(GMT-08:00) Pacific Time (US & Canada)'
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async () => {
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        const result = await onUpdate({ settings: localSettings });

        if (result.success) {
            setStatus({ type: 'success', message: 'Preferences updated!' });
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to update.' });
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Preferences</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Customize your experience and how the platform feels to you.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Moon className="h-3 w-3" /> Appearance
                    </label>
                    <div className="flex gap-3 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                        {['light', 'dark', 'system'].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setLocalSettings({ ...localSettings, theme: mode })}
                                className={cn(
                                    "flex-1 py-3 px-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                                    localSettings.theme === mode
                                        ? "bg-white text-primary shadow-lg shadow-gray-200/50 scale-[1.05]"
                                        : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Globe className="h-3 w-3" /> Language
                    </label>
                    <div className="relative group">
                        <select
                            value={localSettings.language}
                            onChange={(e) => setLocalSettings({ ...localSettings, language: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 hover:border-primary/30 appearance-none cursor-pointer"
                        >
                            <option>English (US)</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </section>

                <section className="space-y-4 md:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> Timezone
                    </label>
                    <div className="relative group">
                        <select
                            value={localSettings.timezone}
                            onChange={(e) => setLocalSettings({ ...localSettings, timezone: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 hover:border-primary/30 appearance-none cursor-pointer"
                        >
                            <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                            <option>(GMT+00:00) UTC</option>
                            <option>(GMT+01:00) Central European Time</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </section>
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

export default PreferencesSettings;
