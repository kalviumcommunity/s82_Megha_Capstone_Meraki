import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24">
                <div className="flex min-h-[calc(100vh-96px)]">
                    {/* Page Content */}
                    <main className="flex-1 min-w-0 py-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
