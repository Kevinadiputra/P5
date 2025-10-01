import React from 'react';

export default function UpcomingBirthdays() {
    const birthdays = [
        {
            id: 1,
            name: 'Ahmed Syed Ali',
            date: '10 Feb 2020',
            avatar: 'AS'
        },
        {
            id: 2,
            name: 'Ahmed Syed Ali',
            date: '22 April',
            avatar: 'AS'
        }
    ];

    return (
        <section className="col-span-4 bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎉</span>
                    <span className="font-medium text-purple-600">Happy</span>
                </div>
                <h3 className="text-xl font-bold text-purple-600">Birthday</h3>
            </div>

            <div className="text-sm text-gray-600 mb-4">Upcoming Birthday</div>

            <div className="space-y-4">
                {birthdays.map((person) => (
                    <div key={person.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{person.avatar}</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-right text-xs text-gray-400">
                2020 © JS Bank
            </div>
        </section>
    );
}