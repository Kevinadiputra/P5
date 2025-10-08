"use client";

import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../../lib/store';
import AvatarUpload from '../AvatarUpload';

export default function ProfilePage() {
    const { user, updateProfile, updateTargets, addToast } = useAppStore();

    const handleAvatarUpload = (imageUrl: string) => {
        updateProfile({ avatar: imageUrl });
        addToast({ message: 'Foto profil berhasil diperbarui!', type: 'success' });
    };
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTargets, setIsEditingTargets] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        major: user?.major || '',
        year: user?.year || new Date().getFullYear(),
        bio: user?.bio || '',
    });
    const [targetData, setTargetData] = useState({
        events: user?.targets?.events || 0,
        beasiswa: user?.targets?.beasiswa || 0,
        lomba: user?.targets?.lomba || 0,
    });

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
        addToast({ message: 'Profil berhasil diperbarui!', type: 'success' });
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            major: user?.major || '',
            year: user?.year || new Date().getFullYear(),
            bio: user?.bio || '',
        });
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const majors = [
        'Teknik Informatika',
        'Sistem Informasi',
        'Teknik Elektro',
        'Teknik Sipil',
        'Teknik Mesin',
        'Kedokteran',
        'Hukum',
        'Ekonomi',
        'Pertanian',
        'MIPA',
    ];

    const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar with Upload */}
                    <AvatarUpload
                        currentAvatar={user?.avatar}
                        onUpload={handleAvatarUpload}
                    />

                    {/* User Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-1">{user?.name || 'Nama Belum Diisi'}</h1>
                        <p className="text-blue-100 mb-2">{user?.nim}</p>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full">
                                {user?.major || 'Prodi belum diisi'}
                            </span>
                            <span className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full">
                                Angkatan {user?.year}
                            </span>
                        </div>
                    </div>

                    {/* Edit Button */}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg flex items-center gap-2"
                        >
                            <PencilIcon className="w-5 h-5" />
                            Edit Profil
                        </button>
                    )}
                </div>
            </div>

            {/* Target Cards with Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Target Pencapaian</h2>
                    {!isEditingTargets ? (
                        <button
                            onClick={() => {
                                setTargetData({
                                    events: user?.targets?.events || 0,
                                    beasiswa: user?.targets?.beasiswa || 0,
                                    lomba: user?.targets?.lomba || 0,
                                });
                                setIsEditingTargets(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 transform flex items-center gap-2"
                        >
                            <PencilIcon className="w-4 h-4" />
                            Atur Target
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditingTargets(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 transform flex items-center gap-2"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    updateTargets(targetData);
                                    setIsEditingTargets(false);
                                    addToast({ message: 'Target berhasil diperbarui!', type: 'success' });
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 transform flex items-center gap-2"
                            >
                                <CheckIcon className="w-4 h-4" />
                                Simpan
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Events Target */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover-lift">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-700 font-medium">Event & Seminar</span>
                            <span className="text-3xl">🎉</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-blue-600">{user?.eventsJoined || 0}</span>
                                <span className="text-gray-500 mb-1">/ {user?.targets?.events || 0} target</span>
                            </div>
                            {isEditingTargets && (
                                <input
                                    type="number"
                                    min="0"
                                    value={targetData.events}
                                    onChange={(e) => setTargetData({ ...targetData, events: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Set target"
                                />
                            )}
                            {!isEditingTargets && user?.targets?.events ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Progress</span>
                                        <span>{Math.min(100, Math.round((user.eventsJoined / user.targets.events) * 100))}%</span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (user.eventsJoined / user.targets.events) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Beasiswa Target */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover-lift">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-700 font-medium">Beasiswa</span>
                            <span className="text-3xl">🎓</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-green-600">{user?.scholarshipsApplied || 0}</span>
                                <span className="text-gray-500 mb-1">/ {user?.targets?.beasiswa || 0} target</span>
                            </div>
                            {isEditingTargets && (
                                <input
                                    type="number"
                                    min="0"
                                    value={targetData.beasiswa}
                                    onChange={(e) => setTargetData({ ...targetData, beasiswa: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                    placeholder="Set target"
                                />
                            )}
                            {!isEditingTargets && user?.targets?.beasiswa ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Progress</span>
                                        <span>{Math.min(100, Math.round((user.scholarshipsApplied / user.targets.beasiswa) * 100))}%</span>
                                    </div>
                                    <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-green-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (user.scholarshipsApplied / user.targets.beasiswa) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* Lomba Target */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover-lift">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-700 font-medium">Lomba & Kompetisi</span>
                            <span className="text-3xl">🏆</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-purple-600">{user?.competitionsJoined || 0}</span>
                                <span className="text-gray-500 mb-1">/ {user?.targets?.lomba || 0} target</span>
                            </div>
                            {isEditingTargets && (
                                <input
                                    type="number"
                                    min="0"
                                    value={targetData.lomba}
                                    onChange={(e) => setTargetData({ ...targetData, lomba: parseInt(e.target.value) || 0 })}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Set target"
                                />
                            )}
                            {!isEditingTargets && user?.targets?.lomba ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Progress</span>
                                        <span>{Math.min(100, Math.round((user.competitionsJoined / user.targets.lomba) * 100))}%</span>
                                    </div>
                                    <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-purple-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (user.competitionsJoined / user.targets.lomba) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Informasi Pribadi</h2>
                    {isEditing && (
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2"
                            >
                                <XMarkIcon className="w-5 h-5" />
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-md flex items-center gap-2"
                            >
                                <CheckIcon className="w-5 h-5" />
                                Simpan
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user?.name || '-'}</div>
                        )}
                    </div>

                    {/* Email (Read only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user?.email || '-'}</div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user?.phone || '-'}</div>
                        )}
                    </div>

                    {/* Major & Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Program Studi</label>
                            {isEditing ? (
                                <select
                                    name="major"
                                    value={formData.major}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                                >
                                    <option value="">Pilih Prodi</option>
                                    {majors.map(major => (
                                        <option key={major} value={major}>{major}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user?.major || '-'}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Angkatan</label>
                            {isEditing ? (
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                                >
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user?.year || '-'}</div>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                placeholder="Ceritakan sedikit tentang diri Anda..."
                            />
                        ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 min-h-[100px]">{user?.bio || '-'}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
