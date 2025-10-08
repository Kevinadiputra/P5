"use client";

import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../lib/store';
import { ClockIcon, CalendarIcon, MapPinIcon, BookmarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon, CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

export default function DeadlinePage() {
    const { events, savedEvents, registeredEvents, saveEvent, unsaveEvent, registerEvent, unregisterEvent, setActiveView, addToast } = useAppStore();
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Filter events with approaching deadlines (within 7 days)
    const urgentEvents = events.filter(event => {
        if (!event.deadline) return false;
        const deadlineDate = new Date(event.deadline);
        const now = new Date();
        const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 7 && daysUntil >= 0;
    }).sort((a, b) => {
        // Sort by closest deadline first
        const dateA = new Date(a.deadline || '').getTime();
        const dateB = new Date(b.deadline || '').getTime();
        return dateA - dateB;
    });

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString('id-ID', options);
    };

    const getDaysUntilDeadline = (deadline: string) => {
        const deadlineDate = new Date(deadline);
        const now = new Date();
        const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil;
    };

    const getUrgencyColor = (daysUntil: number) => {
        if (daysUntil <= 2) return 'text-red-600 bg-red-50 border-red-200';
        if (daysUntil <= 5) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    };

    const getUrgencyText = (daysUntil: number) => {
        if (daysUntil === 0) return 'Hari ini!';
        if (daysUntil === 1) return 'Besok!';
        return `${daysUntil} hari lagi`;
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'beasiswa':
                return 'bg-gradient-to-r from-green-500 to-emerald-600';
            case 'lomba':
                return 'bg-gradient-to-r from-purple-500 to-pink-600';
            case 'event':
                return 'bg-gradient-to-r from-blue-500 to-cyan-600';
            default:
                return 'bg-gradient-to-r from-gray-500 to-slate-600';
        }
    };

    const handleSaveEvent = (eventId: string) => {
        if (savedEvents.includes(eventId)) {
            unsaveEvent(eventId);
            addToast({ message: 'Event dihapus dari simpanan', type: 'info' });
        } else {
            saveEvent(eventId);
            addToast({ message: 'Event disimpan!', type: 'success' });
        }
    };

    const handleRegisterEvent = (eventId: string, registrationLink?: string) => {
        if (registeredEvents.includes(eventId)) {
            unregisterEvent(eventId);
            addToast({ message: 'Pendaftaran dibatalkan', type: 'info' });
        } else {
            registerEvent(eventId);
            addToast({ message: 'Berhasil mendaftar!', type: 'success' });
            if (registrationLink) {
                window.open(registrationLink, '_blank');
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto transition-all duration-300">
            {/* Header with live countdown */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 sm:p-3 bg-red-500 rounded-xl shadow-lg animate-pulse">
                        <ExclamationTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Deadline Mendekat</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            Event yang akan berakhir dalam 7 hari
                        </p>
                    </div>
                </div>

                {/* Live timer */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5 text-red-600" />
                            <span className="text-sm font-medium text-gray-700">Waktu saat ini:</span>
                        </div>
                        <div className="text-lg font-bold text-red-600 tabular-nums">
                            {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Event list */}
            {urgentEvents.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Deadline Mendesak</h3>
                    <p className="text-gray-600">Semua deadline masih aman untuk saat ini</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {urgentEvents.map((event, index) => {
                        const daysUntil = getDaysUntilDeadline(event.deadline || '');
                        const isSaved = savedEvents.includes(event.id);
                        const isRegistered = registeredEvents.includes(event.id);

                        return (
                            <div
                                key={event.id}
                                onClick={() => setActiveView(`event-${event.id}`)}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image */}
                                    <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                                        <img
                                            src={event.image || 'https://via.placeholder.com/300x200?text=Event'}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-4 sm:p-6">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                {/* Type badge */}
                                                <span className={`inline-block ${getTypeColor(event.type)} text-white text-xs font-semibold px-3 py-1 rounded-full mb-2`}>
                                                    {event.type.toUpperCase()}
                                                </span>

                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                                    {event.title}
                                                </h3>

                                                {/* Urgency badge */}
                                                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${getUrgencyColor(daysUntil)} font-bold text-sm mb-3`}>
                                                    <ExclamationTriangleIcon className="h-5 w-5" />
                                                    <span>{getUrgencyText(daysUntil)}</span>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex gap-2 flex-shrink-0">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSaveEvent(event.id);
                                                    }}
                                                    className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 transform"
                                                >
                                                    {isSaved ? (
                                                        <BookmarkSolidIcon className="h-6 w-6 text-blue-600" />
                                                    ) : (
                                                        <BookmarkIcon className="h-6 w-6 text-gray-400 hover:text-blue-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Event details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                                                <span>Tanggal: {formatDateTime(event.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                                                <ClockIcon className="h-4 w-4 flex-shrink-0" />
                                                <span>Deadline: {formatDateTime(event.deadline || '')}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {event.description}
                                        </p>

                                        {/* Register button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRegisterEvent(event.id, event.registrationLink);
                                            }}
                                            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 transform ${isRegistered
                                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                }`}
                                        >
                                            {isRegistered ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <CheckCircleSolidIcon className="h-5 w-5" />
                                                    Sudah Terdaftar
                                                </span>
                                            ) : (
                                                'Daftar Sekarang'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
