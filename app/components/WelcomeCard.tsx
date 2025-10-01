"use client";

import React, { useState, useEffect } from 'react';
import { useAppStore } from '../lib/store';
import { SparklesIcon, AcademicCapIcon, TrophyIcon } from '@heroicons/react/24/solid';

export default function WelcomeCard() {
    const { user, registeredEvents, savedEvents } = useAppStore();
    const [greeting, setGreeting] = useState('Selamat Datang');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Selamat Pagi');
        else if (hour < 15) setGreeting('Selamat Siang');
        else if (hour < 18) setGreeting('Selamat Sore');
        else setGreeting('Selamat Malam');
    }, []);

    return (
        <section className="col-span-12 lg:col-span-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-sm p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden group hover:shadow-md transition-all">
            {/* Animated Background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full transform translate-x-12 lg:translate-x-16 -translate-y-12 lg:-translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-full transform -translate-x-8 lg:-translate-x-12 translate-y-8 lg:translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="flex-1 relative z-10 text-center lg:text-left mb-4 lg:mb-0">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                    <SparklesIcon className="w-6 h-6 text-yellow-500 animate-pulse" />
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                        {greeting}, {user?.name || 'Mahasiswa UNSRI'}
                    </h2>
                </div>
                <p className="text-sm lg:text-base text-gray-600 lg:max-w-md mb-4">
                    Kelola semua informasi beasiswa, lomba, event, dan aktivitas kampus dari satu dashboard terpadu.
                </p>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm">
                        <AcademicCapIcon className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-700">{registeredEvents.length} Event Terdaftar</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm">
                        <TrophyIcon className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs font-semibold text-gray-700">{savedEvents.length} Event Tersimpan</span>
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 relative z-10">
                <div className="w-32 h-24 lg:w-40 lg:h-32 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-2xl flex items-center justify-center relative group-hover:rotate-6 transition-transform duration-300">
                    <div className="text-5xl lg:text-7xl animate-bounce">🎓</div>
                    <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                        <span className="text-xs absolute">✨</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 lg:-bottom-2 lg:-left-2 w-5 h-5 lg:w-6 lg:h-6 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">📚</span>
                    </div>
                </div>
            </div>
        </section>
    );
}