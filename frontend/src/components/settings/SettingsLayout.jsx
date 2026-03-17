import React from 'react';

const SettingsLayout = ({ children, sidebar }) => {
    return (
        <div className="min-h-screen bg-background py-12 px-6 lg:px-12 pt-32">
            <div className="max-w-[1440px] mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Settings</h1>
                    <p className="mt-3 text-lg font-medium text-gray-500 max-w-2xl">
                        Manage your Meraki account, preferences, and social impact settings.
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    <aside className="lg:w-72 shrink-0">
                        {sidebar}
                    </aside>
                    <main className="flex-1 min-w-0">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;
