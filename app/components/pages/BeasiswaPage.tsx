"use client";

import React, { useState } from 'react';
import { AcademicCapIcon, MagnifyingGlassIcon, BookmarkIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../../lib/store';

export default function BeasiswaPage() {
    const { events, savedEvents, registeredEvents, saveEvent, unsaveEvent, registerEvent, addToast, setActiveView } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');

    const beasiswaItems = events.filter(e => e.type === 'beasiswa');
    const filteredBeasiswa = beasiswaItems.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSave = (eventId: string) => {
        if (savedEvents.includes(eventId)) {
            unsaveEvent(eventId);
            addToast({ message: 'Beasiswa dihapus dari daftar tersimpan', type: 'info' });
        } else {
            saveEvent(eventId);
            addToast({ message: 'Beasiswa berhasil disimpan!', type: 'success' });
        }
    };

    const handleRegister = (eventId: string, eventTitle: string) => {
        if (!registeredEvents.includes(eventId)) {
            registerEvent(eventId);
            addToast({ message: `Berhasil apply: ${eventTitle}`, type: 'success' });
        }
    };

    const getStatusBadge = (status: string, deadline?: string) => {
        if (status === 'deadline-soon') {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">⏰ Deadline Dekat</span>;
        }
        if (status === 'open') {
            return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">✓ Dibuka</span>;
        }
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Ditutup</span>;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <AcademicCapIcon className="w-10 h-10" />
                    <div>
                        <h1 className="text-3xl font-bold">Beasiswa</h1>
                        <p className="text-green-100 mt-1">Raih kesempatan mendapatkan beasiswa untuk pendidikan Anda</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{beasiswaItems.length}</div>
                        <div className="text-sm text-green-100">Total Beasiswa</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{beasiswaItems.filter(b => b.status === 'open').length}</div>
                        <div className="text-sm text-green-100">Masih Dibuka</div>
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-2xl font-bold">{registeredEvents.filter(id => beasiswaItems.some(b => b.id === id)).length}</div>
                        <div className="text-sm text-green-100">Sudah Apply</div>
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
                        placeholder="Cari beasiswa..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Beasiswa List */}
            <div className="space-y-4">
                {filteredBeasiswa.map((beasiswa, index) => {
                    const isSaved = savedEvents.includes(beasiswa.id);
                    const isRegistered = registeredEvents.includes(beasiswa.id);

                    return (
                        <div
                            key={beasiswa.id}
                            onClick={() => setActiveView(`event-${beasiswa.id}`)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-[1.01] transform animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Top border */}
                            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>

                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Left Content */}
                                    <div className="flex-1">
                                        {/* Title & Status */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="p-3 bg-green-100 rounded-lg">
                                                <AcademicCapIcon className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition mb-2">
                                                    {beasiswa.title}
                                                </h3>
                                                {getStatusBadge(beasiswa.status, beasiswa.deadline)}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-4">{beasiswa.description}</p>

                                        {/* Info */}
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            {beasiswa.deadline && (
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="w-4 h-4 text-green-500" />
                                                    <span>Deadline: {new Date(beasiswa.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                </div>
                                            )}
                                            {beasiswa.location && (
                                                <div className="flex items-center gap-2">
                                                    <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                                                    <span>{beasiswa.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {isRegistered && (
                                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <p className="text-sm text-green-700 font-medium">✓ Anda sudah mengajukan beasiswa ini</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex lg:flex-col gap-2 lg:min-w-[140px]">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave(beasiswa.id);
                                            }}
                                            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition ${isSaved ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            {isSaved ? <BookmarkSolidIcon className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                                            <span className="hidden lg:inline">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRegister(beasiswa.id, beasiswa.title);
                                            }}
                                            disabled={isRegistered || beasiswa.status === 'closed'}
                                            className={`flex-1 lg:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition ${isRegistered || beasiswa.status === 'closed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg'}`}
                                        >
                                            {isRegistered ? '✓ Sudah Apply' : 'Apply Sekarang'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredBeasiswa.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada beasiswa ditemukan</h3>
                    <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
                </div>
            )}
        </div>
    );
}
