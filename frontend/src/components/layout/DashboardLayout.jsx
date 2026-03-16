import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
