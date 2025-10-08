"use client";

import React, { useState } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon, MagnifyingGlassIcon, FunnelIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../../lib/store';

export default function EventsPage() {
    const { events, savedEvents, registeredEvents, saveEvent, unsaveEvent, registerEvent, addToast, setActiveView } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'event' | 'seminar'>('all');

    const eventItems = events.filter(e => e.type === 'event' || e.type === 'seminar');
    const filteredEvents = eventItems.filter(event => {
        const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = filterType === 'all' || event.type === filterType;
        return matchSearch && matchType;
    });

    const handleSave = (eventId: string) => {
        if (savedEvents.includes(eventId)) {
            unsaveEvent(eventId);
            addToast({ message: 'Event dihapus dari daftar tersimpan', type: 'info' });
        } else {
            saveEvent(eventId);
            addToast({ message: 'Event berhasil disimpan!', type: 'success' });
        }
    };

    const handleRegister = (eventId: string, eventTitle: string, registrationLink?: string) => {
        if (!registeredEvents.includes(eventId)) {
            registerEvent(eventId);
            addToast({ message: `Berhasil mendaftar: ${eventTitle}`, type: 'success' });

            // Open registration link if available
            if (registrationLink) {
                window.open(registrationLink, '_blank');
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <CalendarIcon className="w-10 h-10" />
                    <div>
                        <h1 className="text-3xl font-bold">Event & Seminar</h1>
                        <p className="text-purple-100 mt-1">Temukan dan daftarkan diri Anda ke berbagai acara menarik</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{eventItems.length}</div>
                        <div className="text-sm text-purple-100">Total Event</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{registeredEvents.filter(id => eventItems.some(e => e.id === id)).length}</div>
                        <div className="text-sm text-purple-100">Terdaftar</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{savedEvents.filter(id => eventItems.some(e => e.id === id)).length}</div>
                        <div className="text-sm text-purple-100">Tersimpan</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari event atau seminar..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Filter */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilterType('event')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'event' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Event
                        </button>
                        <button
                            onClick={() => setFilterType('seminar')}
                            className={`px-4 py-2 rounded-lg font-medium transition ${filterType === 'seminar' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Seminar
                        </button>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event, index) => {
                    const isSaved = savedEvents.includes(event.id);
                    const isRegistered = registeredEvents.includes(event.id);

                    return (
                        <div
                            key={event.id}
                            onClick={() => setActiveView(`event-${event.id}`)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-[1.02] transform animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header with gradient */}
                            <div className={`h-2 ${event.type === 'event' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}></div>

                            <div className="p-4 sm:p-6">
                                {/* Title & Badge */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition flex-1">
                                        {event.title}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.type === 'event' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {event.type === 'event' ? '🎉 Event' : '🎓 Seminar'}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                {/* Info Grid */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarIcon className="w-4 h-4 text-purple-500" />
                                        <span>{new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPinIcon className="w-4 h-4 text-purple-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    {isRegistered && (
                                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                            <UserGroupIcon className="w-4 h-4" />
                                            <span>Anda sudah terdaftar</span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSave(event.id);
                                        }}
                                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition ${isSaved ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {isSaved ? <BookmarkSolidIcon className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                                        {isSaved ? 'Tersimpan' : 'Simpan'}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRegister(event.id, event.title, event.registrationLink);
                                        }}
                                        disabled={isRegistered}
                                        className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105 transform ${isRegistered ? 'bg-green-50 text-green-700 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'}`}
                                    >
                                        {isRegistered ? '✓ Sudah Terdaftar' : 'Daftar Sekarang'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada event ditemukan</h3>
                    <p className="text-gray-500">Coba ubah kata kunci atau filter pencarian Anda</p>
                </div>
            )}
        </div>
    );
}
