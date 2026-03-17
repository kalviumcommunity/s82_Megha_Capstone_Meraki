import React, { useState } from 'react';
import { Briefcase, Heart, Globe, MessageSquare, Check, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
const ProfileSettings = ({ user, onUpdate, userRole }) => {
    const [formData, setFormData] = useState({
        bio: user?.bio || '',
        skills: user?.skills?.join(', ') || '',
        interests: user?.interests?.join(', ') || '',
        mission: user?.mission || '',
        website: user?.website || '',
        description: user?.description || ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', message: '' });

        const updatedFields = {
            bio: formData.bio,
            ...(userRole === 'volunteer' ? {
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
                interests: formData.interests.split(',').map(s => s.trim()).filter(s => s)
            } : {
                mission: formData.mission,
                website: formData.website,
                description: formData.description
            })
        };

        const result = await onUpdate(updatedFields);

        if (result.success) {
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } else {
            setStatus({ type: 'error', message: result.error || 'Failed to update profile.' });
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Profile Settings</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Share your story and help others understand your impact.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" /> {userRole === 'volunteer' ? 'Bio' : 'Organization Description'}
                    </label>
                    <textarea
                        value={userRole === 'volunteer' ? formData.bio : formData.description}
                        onChange={(e) => setFormData({ ...formData, [userRole === 'volunteer' ? 'bio' : 'description']: e.target.value })}
                        className="w-full p-6 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm font-medium text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5 min-h-[150px] resize-none"
                        placeholder={userRole === 'volunteer' ? "Tell the community about yourself..." : "Describe your organization's work..."}
                    />
                </section>

                {userRole === 'volunteer' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Briefcase className="h-3 w-3" /> Skills
                            </label>
                            <input
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
                                placeholder="Web Development, Design, etc."
                            />
                        </section>
                        <section className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Heart className="h-3 w-3" /> Interests
                            </label>
                            <input
                                value={formData.interests}
                                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
                                placeholder="Environment, Education, etc."
                            />
                        </section>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <section className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Heart className="h-3 w-3" /> Mission Statement
                            </label>
                            <input
                                value={formData.mission}
                                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
                                placeholder="To empower local communities..."
                            />
                        </section>
                        <section className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                                <Globe className="h-3 w-3" /> Website
                            </label>
                            <input
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
                                placeholder="https://meraki.org"
                            />
                        </section>
                    </div>
                )}

                {status.message && (
                    <div className={`p - 4 rounded - 2xl flex items - center gap - 3 animate -in fade -in slide -in -from - top - 2 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'} `}>
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
                        {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
