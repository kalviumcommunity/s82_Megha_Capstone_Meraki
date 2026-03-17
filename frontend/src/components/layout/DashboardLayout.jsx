import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16">
                <div className="flex min-h-[calc(100vh-64px)]">
                    {/* Page Content */}
                    <main className="flex-1 min-w-0 py-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
