"use client";

import React, { useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../../lib/store';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { adminLogin, setActiveView } = useAppStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await adminLogin(email, password);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 p-4">
            <div className="w-full max-w-md">
                {/* Logo & Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-20 w-20 bg-white rounded-2xl items-center justify-center mb-4 shadow-2xl border-2 border-orange-500 overflow-hidden p-2 hover:scale-105 transition-transform duration-300 relative">
                        <img
                            src="/logo-unsri.png"
                            alt="Logo UNSRI"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                // Fallback jika gambar tidak ditemukan
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.classList.remove('bg-white');
                                e.currentTarget.parentElement!.classList.add('bg-gradient-to-r', 'from-orange-500', 'to-red-500');
                                e.currentTarget.parentElement!.innerHTML = '<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>';
                            }}
                        />
                        {/* Admin badge overlay */}
                        <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-1 shadow-lg">
                            <ShieldCheckIcon className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-300">Akses terbatas untuk administrator</p>
                </div>

                {/* Info Box */}
                <div className="bg-orange-500 bg-opacity-20 border border-orange-500 rounded-lg p-4 mb-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <ShieldCheckIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-orange-100">
                            <p className="font-semibold mb-1">Demo Admin Credentials:</p>
                            <p>Email: <code className="bg-black bg-opacity-30 px-2 py-0.5 rounded">admin@unsri.ac.id</code></p>
                            <p>Password: <code className="bg-black bg-opacity-30 px-2 py-0.5 rounded">admin123</code></p>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Admin
                            </label>
                            <div className="relative">
                                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@unsri.ac.id"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password Admin
                            </label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Memverifikasi...' : '🔐 Masuk sebagai Admin'}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <button
                            type="button"
                            onClick={() => setActiveView('login')}
                            className="text-gray-400 hover:text-gray-300"
                        >
                            ← Kembali ke login mahasiswa
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    © 2025 Universitas Sriwijaya Admin Panel
                </p>
            </div>
        </div>
    );
}
