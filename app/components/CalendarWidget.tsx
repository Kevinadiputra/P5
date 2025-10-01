"use client";

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '../lib/store';

export default function CalendarWidget() {
    const { events, selectedDate, setSelectedDate } = useAppStore();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [selectedDayEvents, setSelectedDayEvents] = useState<any[]>([]);

    const currentMonth = currentDate.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    const today = new Date().getDate();
    const currentMonthNum = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Generate calendar days
    const daysInMonth = new Date(currentYear, currentMonthNum + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonthNum, 1).getDay();

    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Check if a day has events
    const hasEvent = (day: number) => {
        return events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonthNum &&
                eventDate.getFullYear() === currentYear;
        });
    };

    // Get events for a specific day
    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonthNum &&
                eventDate.getFullYear() === currentYear;
        });
    };

    // Handle day click
    const handleDayClick = (day: number) => {
        const dayEvents = getEventsForDay(day);
        if (dayEvents.length > 0) {
            setSelectedDayEvents(dayEvents);
            setShowEventPopup(true);
        }
        const clickedDate = new Date(currentYear, currentMonthNum, day);
        setSelectedDate(clickedDate);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    return (
        <>
            <section className="bg-white rounded-2xl shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800 text-lg">{currentMonth}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToToday}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Kembali ke hari ini"
                        >
                            Hari Ini
                        </button>
                        <button
                            onClick={() => navigateMonth('prev')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bulan sebelumnya"
                        >
                            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={() => navigateMonth('next')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Bulan berikutnya"
                        >
                            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Calendar header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'].map((day) => (
                        <div key={day} className="text-xs font-medium text-gray-400 text-center py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                        <div key={index} className="aspect-square flex items-center justify-center">
                            {day && (
                                <button
                                    onClick={() => handleDayClick(day)}
                                    className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all relative ${day === today &&
                                            currentMonthNum === new Date().getMonth() &&
                                            currentYear === new Date().getFullYear()
                                            ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                                            : hasEvent(day)
                                                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        } ${hasEvent(day) ? 'cursor-pointer' : ''}`}
                                    title={hasEvent(day) ? `Ada ${getEventsForDay(day).length} event` : ''}
                                >
                                    {day}
                                    {hasEvent(day) && (
                                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Event indicator legend */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Ada Event (Klik untuk detail)</span>
                    </div>
                    <div className="text-xs text-gray-400">
                        {events.filter(e => {
                            const eventDate = new Date(e.date);
                            return eventDate.getMonth() === currentMonthNum && eventDate.getFullYear() === currentYear;
                        }).length} event bulan ini
                    </div>
                </div>
            </section>

            {/* Event Popup */}
            {showEventPopup && selectedDayEvents.length > 0 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowEventPopup(false)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Event Hari Ini</h3>
                            <button
                                onClick={() => setShowEventPopup(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-3">
                            {selectedDayEvents.map(event => (
                                <div key={event.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.type === 'beasiswa' ? 'bg-green-100 text-green-700' :
                                                event.type === 'lomba' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {event.type}
                                        </span>
                                        {event.location && (
                                            <span className="text-xs text-gray-500">📍 {event.location}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}