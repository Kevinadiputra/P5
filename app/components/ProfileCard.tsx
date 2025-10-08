"use client";

import React, { useState } from 'react';
import { EllipsisHorizontalIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '../lib/store';

export default function ProfileCard() {
    const { user, registeredEvents, savedEvents, setUser, updateTargets, addToast } = useAppStore();
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTarget, setIsEditingTarget] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || '');
    const [editedTarget, setEditedTarget] = useState(user?.targets?.events || 15);

    const handleSaveName = () => {
        if (user && editedName.trim()) {
            setUser({ ...user, name: editedName.trim() });
            setIsEditing(false);
        }
    };

    return (
        <section className="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center ring-2 ring-green-200 hover:ring-4 transition-all cursor-pointer group">
                        <span className="text-white font-bold text-sm lg:text-lg group-hover:scale-110 transition-transform">
                            {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="text-sm lg:text-base font-semibold text-gray-800 border-b-2 border-blue-500 focus:outline-none flex-1"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSaveName}
                                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                                    title="Simpan"
                                >
                                    <CheckCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <h3 className="font-semibold text-gray-800 text-sm lg:text-base">{user?.name}</h3>
                        )}
                        <p className="text-xs lg:text-sm text-gray-500">Mahasiswa UNSRI</p>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 animate-scaleIn">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 rounded-lg transition-all duration-200"
                            >
                                <PencilIcon className="w-4 h-4" />
                                Edit Nama
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Tahun Masuk:</span>
                    <span className="text-xs lg:text-sm font-medium">{user.year}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Event Diikuti:</span>
                    <span className="text-xs lg:text-sm font-medium">{registeredEvents.length} Events</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">NIM:</span>
                    <span className="text-xs lg:text-sm font-medium">{user.nim}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs lg:text-sm text-gray-600">Event Tersimpan:</span>
                    <span className="text-xs lg:text-sm font-medium">{savedEvents.length} Events</span>
                </div>
            </div>

            <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs lg:text-sm font-medium text-gray-700">Progress Event</span>
                    <div className="flex items-center gap-2">
                        {isEditingTarget ? (
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">{registeredEvents.length} /</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={editedTarget}
                                    onChange={(e) => setEditedTarget(parseInt(e.target.value) || 0)}
                                    className="w-12 px-1 py-0.5 text-xs border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center"
                                />
                                <button
                                    onClick={() => {
                                        updateTargets({
                                            events: editedTarget,
                                            beasiswa: user?.targets?.beasiswa || 0,
                                            lomba: user?.targets?.lomba || 0,
                                        });
                                        setIsEditingTarget(false);
                                        addToast({ message: 'Target event berhasil diperbarui!', type: 'success' });
                                    }}
                                    className="text-green-600 hover:bg-green-50 rounded p-0.5 transition-all duration-200"
                                >
                                    <CheckCircleIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">{registeredEvents.length} / {user?.targets?.events || 15} Target</span>
                                <button
                                    onClick={() => {
                                        setEditedTarget(user?.targets?.events || 15);
                                        setIsEditingTarget(true);
                                    }}
                                    className="text-blue-600 hover:bg-blue-50 rounded p-0.5 transition-all duration-200"
                                >
                                    <PencilIcon className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((registeredEvents.length / (user?.targets?.events || 15)) * 100, 100)}%` }}
                    ></div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-3 lg:mt-4">
                    <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-green-600">
                            {registeredEvents.filter(id => {
                                const event = useAppStore.getState().events.find(e => e.id === id);
                                return event?.type === 'beasiswa';
                            }).length}
                        </div>
                        <div className="text-xs text-gray-500">Beasiswa</div>
                    </div>
                    <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-yellow-600">
                            {registeredEvents.filter(id => {
                                const event = useAppStore.getState().events.find(e => e.id === id);
                                return event?.type === 'lomba';
                            }).length}
                        </div>
                        <div className="text-xs text-gray-500">Lomba</div>
                    </div>
                    <div className="text-center">
                        <div className="text-base lg:text-lg font-bold text-blue-600">
                            {registeredEvents.filter(id => {
                                const event = useAppStore.getState().events.find(e => e.id === id);
                                return event?.type === 'event';
                            }).length}
                        </div>
                        <div className="text-xs text-gray-500">Seminar</div>
                    </div>
                </div>
            </div>
        </section>
    );
}