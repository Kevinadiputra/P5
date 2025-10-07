"use client";

import React, { useState } from 'react';
import { UserCircleIcon, PencilIcon, CheckIcon, XMarkIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../../lib/store';

export default function ProfilePage() {
    const { user, updateProfile, addToast } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        major: user?.major || '',
        year: user?.year || new Date().getFullYear(),
        bio: user?.bio || '',
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
                <div className="flex items-center gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <UserCircleIcon className="w-16 h-16 text-white" />
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition">
                            <CameraIcon className="w-4 h-4" />
                        </button>
                    </div>

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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Event Diikuti</span>
                        <span className="text-3xl">🎉</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{user?.eventsJoined || 0}</div>
                    <div className="text-sm text-gray-500 mt-1">Total event</div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Beasiswa</span>
                        <span className="text-3xl">🎓</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600">{user?.scholarshipsApplied || 0}</div>
                    <div className="text-sm text-gray-500 mt-1">Diajukan</div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Lomba</span>
                        <span className="text-3xl">🏆</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600">{user?.competitionsJoined || 0}</div>
                    <div className="text-sm text-gray-500 mt-1">Diikuti</div>
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
