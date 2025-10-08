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
        setMobileMenuOpen,
        events,
        setActiveView
    } = useAppStore();

    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const unreadCount = notifications.filter(n => !n.read).length;

    // Real-time clock
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Filter events based on search
    const searchResults = searchQuery.trim() ? events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) : [];

    const formatDateTime = (date: Date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes}`;
    };

    return (
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-50">
            <div className="flex items-center justify-between gap-4">
                {/* Left side: Logo & Mobile menu */}
                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>

                    {/* Logo UNSRI */}
                    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveView('dashboard')}>
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center">
                            {/* Placeholder untuk logo - akan diganti dengan logo UNSRI */}
                            <img
                                src="/logo-unsri.png"
                                alt="Logo UNSRI"
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                    // Fallback jika gambar tidak ditemukan
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = '<div class="text-orange-500 font-bold text-lg">U</div>';
                                }}
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="font-bold text-gray-800 text-sm lg:text-base">UNSRI</div>
                            <div className="text-xs text-gray-500">Student Portal</div>
                        </div>
                    </div>
                </div>

                {/* Search with Dropdown */}
                <div className="flex-1 max-w-lg relative">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari beasiswa, lomba, event..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(true);
                            }}
                            onFocus={() => setShowSearchResults(true)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && searchQuery.trim() && searchResults.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-[400px] overflow-y-auto">
                            {searchResults.map((event) => (
                                <button
                                    key={event.id}
                                    onClick={() => {
                                        setActiveView(`event-${event.id}`);
                                        setShowSearchResults(false);
                                        setSearchQuery('');
                                    }}
                                    className="w-full p-3 hover:bg-gray-50 transition flex items-center gap-3 border-b border-gray-100 last:border-0"
                                >
                                    {/* Image */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                        {event.image ? (
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <MagnifyingGlassIcon className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-left">
                                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{event.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${event.type === 'beasiswa' ? 'bg-green-100 text-green-700' :
                                            event.type === 'lomba' ? 'bg-orange-100 text-orange-700' :
                                                event.type === 'event' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-6 text-center">
                            <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Tidak ada hasil untuk "{searchQuery}"</p>
                        </div>
                    )}

                    {/* Click outside to close */}
                    {showSearchResults && (
                        <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)}></div>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Real-time Date and Time */}
                    <div className="hidden md:block text-sm text-gray-600 font-medium">
                        {formatDateTime(currentTime)}
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