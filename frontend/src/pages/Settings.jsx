import React, { useState, useEffect } from 'react';
import SettingsLayout from '../components/settings/SettingsLayout';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import AccountSettings from '../components/settings/AccountSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import PreferencesSettings from '../components/settings/PreferencesSettings';
import ConnectedAccounts from '../components/settings/ConnectedAccounts';
import ImpactSettings from '../components/settings/ImpactSettings';
import TeamSettings from '../components/settings/TeamSettings';
import SecurityLogs from '../components/settings/SecurityLogs';
import DangerZone from '../components/settings/DangerZone';
import { userApi } from '../lib/api';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('account');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await userApi.getMe();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                // For demo purposes, set a mock user if API fails
                setUser({
                    name: 'Alex Johnson',
                    email: 'alex.j@meraki.org',
                    username: 'alexj',
                    role: 'volunteer',
                    bio: 'Passionate about environmental conservation.',
                    settings: {
                        theme: 'light',
                        notifications: { email: true, push: true, weeklyDigest: true },
                        privacy: { publicProfile: true, showHours: true, allowContact: true }
                    }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUser = async (updatedFields) => {
        try {
            const { data } = await userApi.updateMe(updatedFields);
            setUser(prev => ({ ...prev, ...data }));
            return { success: true };
        } catch (error) {
            console.error('Update failed:', error);
            return { success: false, error: error.response?.data?.message || 'Update failed' };
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const renderSecondarySection = () => {
        const props = { user, onUpdate: handleUpdateUser };

        switch (activeSection) {
            case 'account':
                return <AccountSettings {...props} />;
            case 'profile':
                return <ProfileSettings {...props} userRole={user.role} />;
            case 'notifications':
                return <NotificationSettings {...props} settings={user.settings.notifications} />;
            case 'privacy':
                return <PrivacySettings {...props} settings={user.settings.privacy} />;
            case 'security':
                return <SecuritySettings {...props} onNavigate={setActiveSection} />;
            case 'preferences':
                return <PreferencesSettings {...props} settings={user.settings} />;
            case 'connected':
                return <ConnectedAccounts {...props} />;
            case 'impact':
                return <ImpactSettings {...props} />;
            case 'team':
                return <TeamSettings {...props} />;
            case 'logs':
                return <SecurityLogs {...props} />;
            case 'danger':
                return <DangerZone {...props} userRole={user.role} />;
            default:
                return <AccountSettings {...props} />;
        }
    };

    return (
        <SettingsLayout
            sidebar={
                <SettingsSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    userRole={user.role}
                />
            }
        >
            {renderSecondarySection()}
        </SettingsLayout>
    );
};

export default Settings;
