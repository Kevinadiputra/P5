import React from 'react';
import StatsCards from './StatsCards';
import WelcomeCard from './WelcomeCard';
import CalendarWidget from './CalendarWidget';
import ProfileCard from './ProfileCard';
import EventsList from './EventsList';
import DeadlineReminder from './DeadlineReminder';

export default function DashboardMain() {
    return (
        <main className="flex-1 p-4 lg:p-8">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
                {/* Stats Cards */}
                <StatsCards />

                {/* Welcome Card */}
                <WelcomeCard />

                {/* Calendar Widget */}
                <div id="calendar-section" className="col-span-12 lg:col-span-4">
                    <CalendarWidget />
                </div>

                {/* Profile Card */}
                <ProfileCard />

                {/* Events List */}
                <div id="events-section" className="col-span-12 lg:col-span-8">
                    <EventsList />
                </div>

                {/* Deadline Reminder */}
                <div id="deadline-section" className="col-span-12 lg:col-span-4">
                    <DeadlineReminder />
                </div>
            </div>
        </main>
    );
}
