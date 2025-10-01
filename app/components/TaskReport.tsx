import React from 'react';

export default function TaskReport() {
    return (
        <section className="col-span-4 bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Task Report</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Task Done</span>
                    <span className="font-bold text-lg">23</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">50</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{ width: '46%' }}></div>
                </div>
            </div>

            {/* Team members */}
            <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-medium ${i % 3 === 0 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                    i % 3 === 1 ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
                                        'bg-gradient-to-r from-pink-400 to-pink-500'
                                }`}
                        >
                            {String.fromCharCode(65 + i)}
                        </div>
                    ))}
                </div>

                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}