"use client";

import React, { useState } from 'react';
import { MagnifyingGlassIcon, BellIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../lib/store';

interface HeaderProps {
    currentUser: {
        name: string;
        avatarUrl?: string;
    };
}

function UserMenu({ currentUser }: HeaderProps) {
    const [showMenu, setShowMenu] = useState(false);
    const { logout, setActiveView } = useAppStore();

    const handleLogout = () => {
        if (confirm('Yakin ingin keluar?')) {
            logout();
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser.name}</span>
            </button>

            {showMenu && (
                <>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    setActiveView('profile');
                                    setShowMenu(false);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                <UserCircleIcon className="w-5 h-5" />
                                Profil Saya
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                    ></div>
                </>
            )}
        </div>
    );
}

export default function Header({ currentUser }: HeaderProps) {
    const {
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationRead,
        isMobileMenuOpen,
        setMobileMenuOpen
    } = useAppStore();

    const [showNotifications, setShowNotifications] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>

                {/* Search */}
                <div className="flex-1 max-w-lg mx-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari beasiswa, lomba, event..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Date and time - hidden on mobile */}
                    <div className="hidden md:block text-sm text-gray-600">
                        Tuesday, 01 Oct 2025, 02:30 PM
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <BellIcon className="h-6 w-6" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800">Notifikasi</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                                                    }`}
                                                onClick={() => markNotificationRead(notification.id)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-2 h-2 mt-2 rounded-full ${notification.type === 'warning' ? 'bg-yellow-500' :
                                                        notification.type === 'error' ? 'bg-red-500' :
                                                            notification.type === 'success' ? 'bg-green-500' :
                                                                'bg-blue-500'
                                                        }`}></div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                                                        <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                                        <p className="text-gray-400 text-xs mt-2">
                                                            {new Date(notification.createdAt).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            <BellIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p>Tidak ada notifikasi</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile with Dropdown */}
                    <UserMenu currentUser={currentUser} />
                </div>
            </div>

            {/* Click outside to close notifications */}
            {showNotifications && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                ></div>
            )}
        </header>
    );
}