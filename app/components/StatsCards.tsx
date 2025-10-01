"use client";

import React from 'react';
import { AcademicCapIcon, TrophyIcon, CalendarDaysIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../lib/store';

export default function StatsCards() {
    const { events, setSelectedEventType, setActiveView } = useAppStore();

    // Calculate actual stats from events
    const beasiswaCount = events.filter(e => e.type === 'beasiswa').length;
    const lombaCount = events.filter(e => e.type === 'lomba').length;
    const eventCount = events.filter(e => e.type === 'event' || e.type === 'seminar').length;
    const deadlineCount = events.filter(e => e.status === 'deadline-soon').length;

    const stats = [
        {
            title: 'Beasiswa Tersedia',
            value: beasiswaCount.toString(),
            icon: AcademicCapIcon,
            color: 'from-green-400 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            filter: 'beasiswa',
            description: 'Klik untuk lihat semua beasiswa'
        },
        {
            title: 'Lomba & Kompetisi',
            value: lombaCount.toString(),
            icon: TrophyIcon,
            color: 'from-yellow-400 to-orange-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
            filter: 'lomba',
            description: 'Klik untuk lihat semua lomba'
        },
        {
            title: 'Event & Seminar',
            value: eventCount.toString(),
            icon: CalendarDaysIcon,
            color: 'from-blue-400 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            filter: 'event',
            description: 'Klik untuk lihat semua event'
        },
        {
            title: 'Deadline Minggu Ini',
            value: deadlineCount.toString(),
            icon: DocumentTextIcon,
            color: 'from-red-400 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            filter: 'deadline-soon',
            description: 'Klik untuk lihat deadline mendekat'
        }
    ];

    const handleCardClick = (filter: string) => {
        if (filter === 'deadline-soon') {
            // Scroll to deadline section
            document.getElementById('deadline-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setSelectedEventType(filter);
            // Scroll to events list
            document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {stats.map((stat, index) => (
                <button
                    key={index}
                    onClick={() => handleCardClick(stat.filter)}
                    className="bg-white rounded-xl shadow-sm p-4 lg:p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group text-left w-full"
                    title={stat.description}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-2 group-hover:text-gray-800 transition-colors">{stat.title}</p>
                            <p className={`text-2xl lg:text-3xl font-bold ${stat.textColor} group-hover:scale-110 transition-transform inline-block`}>{stat.value}</p>
                        </div>
                        <div className={`p-2 lg:p-3 rounded-xl ${stat.bgColor} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.textColor}`} />
                        </div>
                    </div>
                    <div className="mt-3 lg:mt-4">
                        <div className={`h-1.5 lg:h-2 bg-gradient-to-r ${stat.color} rounded-full group-hover:h-2 lg:group-hover:h-2.5 transition-all`}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stat.description}
                    </p>
                </button>
            ))}
        </section>
    );
}