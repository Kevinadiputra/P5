"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardMain from './DashboardMain';
import Toast from './Toast';
import { useAppStore } from '../lib/store';

export default function DashboardPage() {
    const { toasts, removeToast } = useAppStore();
    const currentUser = {
        name: 'Danish Ahmed',
        avatarUrl: '/danish-avatar.jpg'
    };

    return (
        <div className="flex min-h-screen bg-[#f6f8fb]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header currentUser={currentUser} />
                <DashboardMain />
            </div>

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </div>
    );
}
