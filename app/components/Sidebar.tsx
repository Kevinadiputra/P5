"use client";

import React from 'react';
import { HomeIcon, CalendarIcon, AcademicCapIcon, TrophyIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../lib/store';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'events', label: 'Event & Seminar', icon: CalendarIcon },
    { id: 'beasiswa', label: 'Beasiswa', icon: AcademicCapIcon },
    { id: 'lomba', label: 'Lomba & Kompetisi', icon: TrophyIcon },
    { id: 'deadline', label: 'Deadline Mendekat', icon: ClockIcon },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
];

export default function Sidebar() {
    const { activeView, setActiveView, isMobileMenuOpen, setMobileMenuOpen } = useAppStore();
    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white shadow-lg flex-col justify-between py-8 px-6 min-h-screen">
                <div>
                    <div className="mb-10 flex items-center gap-2">
                        <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-800">UNSRI</div>
                            <div className="text-xs text-gray-500">STUDENT PORTAL</div>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveView(item.id);
                                    setMobileMenuOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${activeView === item.id
                                    ? 'bg-blue-100 text-blue-900 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="text-xs text-gray-400 mt-8">2025 © UNSRI</div>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <aside className="relative w-64 bg-white shadow-lg flex flex-col justify-between py-8 px-6 min-h-screen">
                        <div>
                            <div className="mb-10 flex items-center gap-2">
                                <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded flex items-center justify-center text-white font-bold">
                                    U
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-gray-800">UNSRI</div>
                                    <div className="text-xs text-gray-500">STUDENT PORTAL</div>
                                </div>
                            </div>
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveView(item.id);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 ${activeView === item.id
                                            ? 'bg-blue-100 text-blue-900 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="text-xs text-gray-400 mt-8">2025 © UNSRI</div>
                    </aside>
                </div>
            )}
        </>
    );
}
