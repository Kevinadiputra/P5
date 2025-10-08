"use client";

import React from 'react';
import {
    ArrowLeftIcon,
    CalendarIcon,
    MapPinIcon,
    ClockIcon,
    BookmarkIcon,
    LinkIcon,
    UserGroupIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../../lib/store';

interface EventDetailPageProps {
    eventId: string;
}

export default function EventDetailPage({ eventId }: EventDetailPageProps) {
    const {
        events,
        savedEvents,
        registeredEvents,
        saveEvent,
        unsaveEvent,
        registerEvent,
        setActiveView,
        addToast
    } = useAppStore();

    const event = events.find(e => e.id === eventId);

    if (!event) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Event tidak ditemukan</h2>
                <button
                    onClick={() => setActiveView('dashboard')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Kembali ke Dashboard
                </button>
            </div>
        );
    }

    const isSaved = savedEvents.includes(event.id);
    const isRegistered = registeredEvents.includes(event.id);

    const handleSave = () => {
        if (isSaved) {
            unsaveEvent(event.id);
            addToast({ message: 'Event dihapus dari daftar tersimpan', type: 'info' });
        } else {
            saveEvent(event.id);
            addToast({ message: 'Event berhasil disimpan!', type: 'success' });
        }
    };

    const handleRegister = () => {
        if (event.registrationLink) {
            window.open(event.registrationLink, '_blank');
            if (!isRegistered) {
                registerEvent(event.id);
                addToast({ message: `Berhasil mendaftar: ${event.title}`, type: 'success' });
            }
        } else {
            if (!isRegistered) {
                registerEvent(event.id);
                addToast({ message: `Berhasil mendaftar: ${event.title}`, type: 'success' });
            }
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'beasiswa': return 'from-green-600 to-emerald-600';
            case 'lomba': return 'from-orange-600 to-red-600';
            case 'event': return 'from-blue-600 to-cyan-600';
            case 'seminar': return 'from-purple-600 to-pink-600';
            default: return 'from-gray-600 to-gray-800';
        }
    };

    const getStatusBadge = () => {
        switch (event.status) {
            case 'open':
                return <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">✓ Dibuka</span>;
            case 'deadline-soon':
                return <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">⏰ Deadline Dekat</span>;
            case 'closed':
                return <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">✕ Ditutup</span>;
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Back Button */}
            <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Kembali
            </button>

            {/* Hero Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(event.type)} flex items-center justify-center`}>
                        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                            {event.title}
                        </h1>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Floating Info */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {getStatusBadge()}
                        <span className={`px-4 py-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-sm font-semibold ${event.type === 'beasiswa' ? 'text-green-700' :
                                event.type === 'lomba' ? 'text-orange-700' :
                                    event.type === 'event' ? 'text-blue-700' :
                                        'text-purple-700'
                            }`}>
                            {event.type.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title & Description */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            {event.title}
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {event.description}
                        </p>

                        {isRegistered && (
                            <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">✓</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-green-800">Anda sudah terdaftar</p>
                                    <p className="text-sm text-green-600">Terima kasih telah mendaftar event ini!</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Details */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Detail Event</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                <CalendarIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-gray-800">Tanggal</p>
                                    <p className="text-gray-600">
                                        {new Date(event.date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {event.deadline && (
                                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <ClockIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-red-800">Deadline Pendaftaran</p>
                                        <p className="text-red-600">
                                            {new Date(event.deadline).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {event.location && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <MapPinIcon className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Lokasi</p>
                                        <p className="text-gray-600">{event.location}</p>
                                    </div>
                                </div>
                            )}

                            {event.organizer && (
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                    <UserGroupIcon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Penyelenggara</p>
                                        <p className="text-gray-600">{event.organizer}</p>
                                    </div>
                                </div>
                            )}

                            {event.prize && (
                                <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <TrophyIcon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-yellow-800">Hadiah / Benefit</p>
                                        <p className="text-yellow-600">{event.prize}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                    {/* Action Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                        <h3 className="font-bold text-gray-800 mb-4">Tertarik?</h3>

                        <div className="space-y-3">
                            <button
                                onClick={handleRegister}
                                disabled={event.status === 'closed'}
                                className={`w-full px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${event.status === 'closed'
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : isRegistered
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : `bg-gradient-to-r ${getTypeColor(event.type)} text-white hover:scale-105`
                                    }`}
                            >
                                {event.status === 'closed' ? (
                                    '✕ Pendaftaran Ditutup'
                                ) : isRegistered ? (
                                    <>
                                        <span>✓</span>
                                        Sudah Terdaftar
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="w-5 h-5" />
                                        Daftar Sekarang
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleSave}
                                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isSaved
                                        ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-100'
                                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                                    }`}
                            >
                                {isSaved ? (
                                    <>
                                        <BookmarkSolidIcon className="w-5 h-5" />
                                        Tersimpan
                                    </>
                                ) : (
                                    <>
                                        <BookmarkIcon className="w-5 h-5" />
                                        Simpan Event
                                    </>
                                )}
                            </button>

                            {event.registrationLink && (
                                <a
                                    href={event.registrationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-6 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition text-center border-2 border-blue-200"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <LinkIcon className="w-5 h-5" />
                                        Buka Link Pendaftaran
                                    </div>
                                </a>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                💡 Simpan event ini agar tidak terlewat!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
