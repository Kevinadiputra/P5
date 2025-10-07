"use client";

import React, { useState } from 'react';
import {
    ChartBarIcon,
    UsersIcon,
    CalendarIcon,
    AcademicCapIcon,
    TrophyIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAppStore } from '../../lib/store';

export default function AdminDashboardPage() {
    const { events, setEvents, user, logout, setActiveView, addToast } = useAppStore();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        type: 'event' as 'beasiswa' | 'lomba' | 'event' | 'seminar',
        date: '',
        location: '',
        description: '',
        status: 'open' as 'open' | 'closed' | 'deadline-soon',
        deadline: '',
    });

    const handleAddEvent = () => {
        const event = {
            id: Date.now().toString(),
            ...newEvent,
        };

        setEvents([...events, event]);
        setShowAddModal(false);
        setNewEvent({
            title: '',
            type: 'event',
            date: '',
            location: '',
            description: '',
            status: 'open',
            deadline: '',
        });
        addToast({ message: 'Event berhasil ditambahkan!', type: 'success' });
    };

    const handleDeleteEvent = (eventId: string) => {
        if (confirm('Yakin ingin menghapus event ini?')) {
            setEvents(events.filter(e => e.id !== eventId));
            addToast({ message: 'Event berhasil dihapus!', type: 'success' });
        }
    };

    const handleLogout = () => {
        if (confirm('Yakin ingin keluar dari admin panel?')) {
            logout();
        }
    };

    // Stats
    const totalEvents = events.filter(e => e.type === 'event' || e.type === 'seminar').length;
    const totalBeasiswa = events.filter(e => e.type === 'beasiswa').length;
    const totalLomba = events.filter(e => e.type === 'lomba').length;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                            <ChartBarIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                            <p className="text-gray-400">Portal Manajemen UNSRI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="font-semibold">{user?.name}</div>
                            <div className="text-sm text-gray-400">Administrator</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition flex items-center gap-2"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-500 bg-opacity-20 rounded-lg">
                                <CalendarIcon className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-3xl font-bold text-blue-400">{totalEvents}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Event & Seminar</div>
                        <div className="text-sm text-gray-500 mt-1">Total aktif</div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-500 bg-opacity-20 rounded-lg">
                                <AcademicCapIcon className="w-6 h-6 text-green-400" />
                            </div>
                            <span className="text-3xl font-bold text-green-400">{totalBeasiswa}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Beasiswa</div>
                        <div className="text-sm text-gray-500 mt-1">Program tersedia</div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-500 bg-opacity-20 rounded-lg">
                                <TrophyIcon className="w-6 h-6 text-orange-400" />
                            </div>
                            <span className="text-3xl font-bold text-orange-400">{totalLomba}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Lomba</div>
                        <div className="text-sm text-gray-500 mt-1">Kompetisi aktif</div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                                <UsersIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-3xl font-bold text-purple-400">1</span>
                        </div>
                        <div className="text-gray-300 font-medium">Mahasiswa</div>
                        <div className="text-sm text-gray-500 mt-1">Terdaftar (demo)</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Manajemen Event</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Tambah Event Baru
                        </button>
                    </div>
                </div>

                {/* Events Table */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Judul</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tipe</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tanggal</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {events.map(event => (
                                    <tr key={event.id} className="hover:bg-gray-750 transition">
                                        <td className="px-6 py-4 text-gray-300">{event.title}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.type === 'beasiswa' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                                                    event.type === 'lomba' ? 'bg-orange-500 bg-opacity-20 text-orange-400' :
                                                        'bg-blue-500 bg-opacity-20 text-blue-400'
                                                }`}>
                                                {event.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{new Date(event.date).toLocaleDateString('id-ID')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'open' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                                                    event.status === 'deadline-soon' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                                                        'bg-gray-500 bg-opacity-20 text-gray-400'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-blue-500 bg-opacity-20 text-blue-400 rounded hover:bg-opacity-30 transition">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                    className="p-2 bg-red-500 bg-opacity-20 text-red-400 rounded hover:bg-opacity-30 transition"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                        <div className="p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold">Tambah Event Baru</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipe</label>
                                    <select
                                        value={newEvent.type}
                                        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    >
                                        <option value="event">Event</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="beasiswa">Beasiswa</option>
                                        <option value="lomba">Lomba</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                    <select
                                        value={newEvent.status}
                                        onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    >
                                        <option value="open">Open</option>
                                        <option value="deadline-soon">Deadline Soon</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal</label>
                                    <input
                                        type="date"
                                        value={newEvent.date}
                                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                                    <input
                                        type="date"
                                        value={newEvent.deadline}
                                        onChange={(e) => setNewEvent({ ...newEvent, deadline: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Lokasi</label>
                                <input
                                    type="text"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi</label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleAddEvent}
                                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition"
                            >
                                Tambah Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
