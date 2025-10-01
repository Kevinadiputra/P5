import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

export default function SchedulesList() {
    const schedules = [
        {
            id: 1,
            title: 'Seminar Beasiswa LPDP 2025',
            date: '23',
            status: 'pending'
        },
        {
            id: 2,
            title: 'Workshop Digital Marketing',
            date: '25',
            status: 'done'
        },
        {
            id: 3,
            title: 'Lomba Programming UNSRI',
            date: '26',
            status: 'pending'
        },
        {
            id: 4,
            title: 'Deadline Beasiswa Unggulan',
            date: '28',
            status: 'cancelled'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <section className="col-span-4 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">Schedules</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                    <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <div className="space-y-4">
                {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600">{schedule.date}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 mb-1">
                                {schedule.title}
                            </p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                                {schedule.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}