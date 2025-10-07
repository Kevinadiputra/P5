"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardMain from './DashboardMain';
import Toast from './Toast';
import { useAppStore } from '../lib/store';

// Auth pages
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import AdminLoginPage from './auth/AdminLoginPage';
import CompleteProfilePage from './auth/CompleteProfilePage';

// Main pages
import EventsPage from './pages/EventsPage';
import BeasiswaPage from './pages/BeasiswaPage';
import LombaPage from './pages/LombaPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function DashboardPage() {
    const { toasts, removeToast, activeView, auth, user } = useAppStore();

    // Auth routing
    if (!auth.isAuthenticated) {
        if (activeView === 'register') {
            return <RegisterPage />;
        }
        if (activeView === 'admin-login') {
            return <AdminLoginPage />;
        }
        return <LoginPage />;
    }

    // Profile completion check
    if (user && !user.isProfileComplete && activeView === 'complete-profile') {
        return <CompleteProfilePage />;
    }

    // Admin routing
    if (auth.isAdmin) {
        return (
            <>
                <AdminDashboardPage />

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
            </>
        );
    }

    // Main app routing
    const renderContent = () => {
        switch (activeView) {
            case 'events':
                return <EventsPage />;
            case 'beasiswa':
                return <BeasiswaPage />;
            case 'lomba':
                return <LombaPage />;
            case 'profile':
                return <ProfilePage />;
            case 'dashboard':
            default:
                return <DashboardMain />;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f6f8fb]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header currentUser={{ name: user?.name || 'User', avatarUrl: user?.avatar }} />
                <main className="flex-1 p-6">
                    {renderContent()}
                </main>
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
