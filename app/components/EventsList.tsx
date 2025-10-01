"use client";

import React, { useState, useMemo } from 'react';
import { CalendarDaysIcon, AcademicCapIcon, TrophyIcon, BookmarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon, UserPlusIcon as UserPlusSolidIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../lib/store';

export default function EventsList() {
    const {
        events,
        savedEvents,
        registeredEvents,
        saveEvent,
        unsaveEvent,
        registerEvent,
        unregisterEvent,
        searchQuery,
        selectedEventType,
        addToast
    } = useAppStore();

    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const getIcon = (type: string) => {
        switch (type) {
            case 'beasiswa':
                return AcademicCapIcon;
            case 'lomba':
                return TrophyIcon;
            default:
                return CalendarDaysIcon;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-green-100 text-green-800';
            case 'deadline-soon':
                return 'bg-red-100 text-red-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-blue-100 text-blue-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'beasiswa':
                return 'bg-green-50 text-green-600';
            case 'lomba':
                return 'bg-yellow-50 text-yellow-600';
            default:
                return 'bg-blue-50 text-blue-600';
        }
    };

    // Filter events based on search and type
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedEventType === 'all' || event.type === selectedEventType;
            return matchesSearch && matchesType;
        });
    }, [events, searchQuery, selectedEventType]);

    const handleSaveEvent = (eventId: string, eventTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (savedEvents.includes(eventId)) {
            unsaveEvent(eventId);
            addToast({
                message: `"${eventTitle}" dihapus dari tersimpan`,
                type: 'info'
            });
        } else {
            saveEvent(eventId);
            addToast({
                message: `"${eventTitle}" berhasil disimpan!`,
                type: 'success'
            });
        }
    };

    const handleRegisterEvent = (eventId: string, eventTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (registeredEvents.includes(eventId)) {
            unregisterEvent(eventId);
            addToast({
                message: `Pendaftaran "${eventTitle}" dibatalkan`,
                type: 'warning'
            });
        } else {
            registerEvent(eventId);
            addToast({
                message: `Berhasil mendaftar "${eventTitle}"!`,
                type: 'success'
            });
        }
    };

    return (
        <section className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-sm p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="font-semibold text-gray-800 text-lg">Event Terbaru</h3>

                {/* Event type filter */}
                <div className="flex flex-wrap gap-2">
                    {['all', 'beasiswa', 'lomba', 'event'].map((type) => (
                        <button
                            key={type}
                            onClick={() => useAppStore.getState().setSelectedEventType(type)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedEventType === type
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type === 'all' ? 'Semua' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => {
                        const Icon = getIcon(event.type);
                        const isSaved = savedEvents.includes(event.id);
                        const isRegistered = registeredEvents.includes(event.id);

                        return (
                            <div
                                key={event.id}
                                className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer border border-gray-100 hover:border-gray-200"
                                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                            >
                                <div className={`p-3 rounded-lg ${getTypeColor(event.type)} flex-shrink-0`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="flex-1 min-w-0 w-full">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 mb-2">{event.title}</h4>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                                                <span>📍 {event.location}</span>
                                                <span>📅 {new Date(event.date).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            {selectedEvent === event.id && (
                                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {/* Action buttons */}
                                            <button
                                                onClick={(e) => handleSaveEvent(event.id, event.title, e)}
                                                className={`p-2 rounded-lg transition-all ${isSaved
                                                    ? 'bg-blue-100 text-blue-600 scale-110'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                title={isSaved ? 'Hapus dari tersimpan' : 'Simpan event'}
                                            >
                                                {isSaved ? (
                                                    <BookmarkSolidIcon className="w-4 h-4" />
                                                ) : (
                                                    <BookmarkIcon className="w-4 h-4" />
                                                )}
                                            </button>

                                            <button
                                                onClick={(e) => handleRegisterEvent(event.id, event.title, e)}
                                                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all shadow-sm hover:shadow-md ${isRegistered
                                                    ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                                                    }`}
                                            >
                                                {isRegistered ? 'Terdaftar' : 'Daftar'}
                                            </button>

                                            {/* Status and type badges */}
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                                                    {event.status === 'deadline-soon' ? 'Deadline Dekat' :
                                                        event.status === 'open' ? 'Terbuka' : event.status}
                                                </span>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(event.type)}`}>
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12">
                        <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Tidak ada event yang ditemukan</p>
                        <p className="text-sm text-gray-400 mt-2">Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                )}
            </div>
        </section>
    );
}