"use client";

import React, { useMemo } from 'react';
import { ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../lib/store';

export default function DeadlineReminder() {
    const { events, registeredEvents } = useAppStore();

    const upcomingDeadlines = useMemo(() => {
        const now = new Date();
        const registeredEventsList = events.filter(event =>
            registeredEvents.includes(event.id) || event.status === 'deadline-soon'
        );

        return registeredEventsList
            .map(event => {
                const eventDate = new Date(event.date);
                const daysLeft = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return { ...event, daysLeft };
            })
            .filter(event => event.daysLeft > 0 && event.daysLeft <= 30)
            .sort((a, b) => a.daysLeft - b.daysLeft)
            .slice(0, 5);
    }, [events, registeredEvents]);

    const staticDeadlines = [
        {
            id: '1',
            title: 'Beasiswa LPDP',
            date: '2025-10-15',
            daysLeft: 14,
            type: 'beasiswa'
        },
        {
            id: '2',
            title: 'Lomba Essay Nasional',
            date: '2025-10-20',
            daysLeft: 19,
            type: 'lomba'
        },
        {
            id: '3',
            title: 'Pendaftaran Magang',
            date: '2025-10-25',
            daysLeft: 24,
            type: 'program'
        }
    ];

    const displayDeadlines = upcomingDeadlines.length > 0 ? upcomingDeadlines : staticDeadlines;

    const getUrgencyColor = (daysLeft: number) => {
        if (daysLeft <= 7) return 'text-red-600 bg-red-50';
        if (daysLeft <= 14) return 'text-orange-600 bg-orange-50';
        return 'text-green-600 bg-green-50';
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'beasiswa':
                return 'bg-green-100 text-green-800';
            case 'lomba':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center gap-2 mb-4 lg:mb-6">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-gray-800 text-lg">Deadline Reminder</h3>
            </div>

            <div className="space-y-3 lg:space-y-4">
                {displayDeadlines.map((item) => (
                    <div key={item.id} className="border border-gray-100 rounded-lg p-3 lg:p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-4 mb-3">
                            <h4 className="font-medium text-gray-900 text-sm flex-1">{item.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${getTypeColor(item.type)}`}>
                                {item.type}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ClockIcon className="w-4 h-4" />
                                <span>{new Date(item.date).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}</span>
                            </div>

                            <div className={`px-2 py-1 rounded-full text-xs font-bold self-start ${getUrgencyColor(item.daysLeft)}`}>
                                {item.daysLeft} hari lagi
                            </div>
                        </div>
                    </div>
                ))}

                {displayDeadlines.length === 0 && (
                    <div className="text-center py-8">
                        <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">Tidak ada deadline mendatang</p>
                        <p className="text-gray-400 text-xs mt-1">Daftarkan diri ke event untuk melihat deadline</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => {
                    // Scroll to events section and filter by deadline-soon
                    document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                    useAppStore.getState().setSelectedEventType('all');
                }}
                className="w-full mt-4 lg:mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 text-sm font-medium shadow-sm hover:shadow-md"
            >
                Lihat Semua Deadline →
            </button>
        </section>
    );
}