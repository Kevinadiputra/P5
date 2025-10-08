"use client";

import React, { useState } from 'react';
import { TrophyIcon, MagnifyingGlassIcon, BookmarkIcon, CalendarIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../../lib/store';

export default function LombaPage() {
    const { events, savedEvents, registeredEvents, saveEvent, unsaveEvent, registerEvent, addToast, setActiveView } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');

    const lombaItems = events.filter(e => e.type === 'lomba');
    const filteredLomba = lombaItems.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSave = (eventId: string) => {
        if (savedEvents.includes(eventId)) {
            unsaveEvent(eventId);
            addToast({ message: 'Lomba dihapus dari daftar tersimpan', type: 'info' });
        } else {
            saveEvent(eventId);
            addToast({ message: 'Lomba berhasil disimpan!', type: 'success' });
        }
    };

    const handleRegister = (eventId: string, eventTitle: string) => {
        if (!registeredEvents.includes(eventId)) {
            registerEvent(eventId);
            addToast({ message: `Berhasil daftar: ${eventTitle}`, type: 'success' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <TrophyIcon className="w-10 h-10" />
                    <div>
                        <h1 className="text-3xl font-bold">Lomba & Kompetisi</h1>
                        <p className="text-orange-100 mt-1">Tunjukkan kemampuan terbaikmu dan raih prestasi!</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{lombaItems.length}</div>
                        <div className="text-sm text-orange-100">Total Lomba</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{lombaItems.filter(l => l.status === 'open').length}</div>
                        <div className="text-sm text-orange-100">Dibuka</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{registeredEvents.filter(id => lombaItems.some(l => l.id === id)).length}</div>
                        <div className="text-sm text-orange-100">Diikuti</div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari lomba atau kompetisi..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Lomba Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLomba.map((lomba, index) => {
                    const isSaved = savedEvents.includes(lomba.id);
                    const isRegistered = registeredEvents.includes(lomba.id);

                    return (
                        <div
                            key={lomba.id}
                            onClick={() => setActiveView(`event-${lomba.id}`)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 cursor-pointer animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image placeholder / gradient header */}
                            <div className="h-32 bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <TrophyIcon className="w-16 h-16 text-white opacity-30" />
                                </div>
                                {/* Status badge */}
                                <div className="absolute top-4 right-4">
                                    {lomba.status === 'open' && (
                                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                            🔥 Dibuka
                                        </span>
                                    )}
                                    {lomba.status === 'deadline-soon' && (
                                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                            ⏰ Segera Ditutup
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                {/* Title */}
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition line-clamp-2">
                                    {lomba.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lomba.description}</p>

                                {/* Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarIcon className="w-4 h-4 text-orange-500" />
                                        <span>{new Date(lomba.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    {lomba.deadline && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CalendarIcon className="w-4 h-4 text-red-500" />
                                            <span>Deadline: {new Date(lomba.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                        </div>
                                    )}
                                    {lomba.location && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPinIcon className="w-4 h-4 text-orange-500" />
                                            <span className="line-clamp-1">{lomba.location}</span>
                                        </div>
                                    )}
                                </div>

                                {isRegistered && (
                                    <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
                                        <UsersIcon className="w-4 h-4" />
                                        <span className="font-medium">Anda sudah terdaftar</span>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSave(lomba.id);
                                        }}
                                        className={`p-2 rounded-lg font-medium transition ${isSaved ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        title={isSaved ? 'Tersimpan' : 'Simpan'}
                                    >
                                        {isSaved ? <BookmarkSolidIcon className="w-5 h-5" /> : <BookmarkIcon className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRegister(lomba.id, lomba.title);
                                        }}
                                        disabled={isRegistered || lomba.status === 'closed'}
                                        className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition ${isRegistered || lomba.status === 'closed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 shadow-md hover:shadow-lg'}`}
                                    >
                                        {isRegistered ? '✓ Terdaftar' : 'Daftar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredLomba.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <TrophyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada lomba ditemukan</h3>
                    <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
                </div>
            )}
        </div>
    );
}
