import React from 'react';
import { Link2, Github, Cloud, Linkedin } from 'lucide-react';
import Button from '../ui/Button';

const ConnectedAccounts = () => {
    const accounts = [
        { id: 'google', name: 'Google', icon: Cloud, connected: true, email: 'alex.j@gmail.com' },
        { id: 'github', name: 'GitHub', icon: Github, connected: false },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: false }
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h2 className="text-xl font-black text-gray-900">Connected Accounts</h2>
                <p className="mt-2 text-sm font-medium text-gray-500">
                    Manage your connections with third-party services for faster access.
                </p>
            </header>

            <div className="space-y-6">
                {accounts.map((account) => (
                    <div key={account.id} className="group flex items-center justify-between p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                                <account.icon className="h-6 w-6 text-gray-700" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">{account.name}</p>
                                {account.connected ? (
                                    <p className="text-[11px] font-bold text-green-600 mt-2 uppercase tracking-wider">Connected as {account.email}</p>
                                ) : (
                                    <p className="text-[11px] font-medium text-gray-400 mt-2">Not connected</p>
                                )}
                            </div>
                        </div>
                        {account.connected ? (
                            <Button variant="outline" className="text-red-500 border-red-100 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest rounded-xl px-8 h-12 transition-all">
                                Disconnect
                            </Button>
                        ) : (
                            <Button variant="outline" className="border-gray-200 text-gray-500 hover:text-primary hover:border-primary/30 font-black text-[10px] uppercase tracking-widest rounded-xl px-8 h-12 transition-all">
                                Connect
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectedAccounts;
