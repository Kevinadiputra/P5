"use client";

import React, { useState } from 'react';
import { UserIcon, PhoneIcon, AcademicCapIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../../lib/store';

export default function CompleteProfilePage() {
    const { user, updateProfile, setActiveView, addToast } = useAppStore();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        major: user?.major || '',
        year: user?.year || new Date().getFullYear(),
        bio: user?.bio || '',
    });
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        updateProfile({
            ...formData,
            isProfileComplete: true,
        });

        addToast({ message: 'Profil berhasil dilengkapi!', type: 'success' });
        setActiveView('dashboard');
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full items-center justify-center text-white mb-4 shadow-lg">
                        <UserIcon className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Lengkapi Profil Anda</h1>
                    <p className="text-gray-600">Isi informasi berikut untuk melengkapi profil mahasiswa Anda</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Progres Profil</span>
                            <span className="text-sm font-medium text-blue-600">50%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ahmad Mahasiswa"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Telepon <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="08123456789"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Major & Year Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Major */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Program Studi <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <AcademicCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        name="major"
                                        value={formData.major}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                                    >
                                        <option value="">Pilih Prodi</option>
                                        {majors.map(major => (
                                            <option key={major} value={major}>{major}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tahun Angkatan <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio Singkat (Opsional)
                            </label>
                            <div className="relative">
                                <ChatBubbleLeftIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Ceritakan sedikit tentang diri Anda..."
                                    rows={4}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                />
                            </div>
                        </div>

                        {/* NIM Display */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-blue-800">NIM Anda:</span>
                                <code className="text-blue-600 font-mono font-bold">{user?.nim}</code>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setActiveView('dashboard')}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Lewati
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Menyimpan...' : 'Simpan & Lanjutkan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Data Anda aman dan hanya digunakan untuk keperluan portal mahasiswa
                </p>
            </div>
        </div>
    );
}
