import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Event {
    id: string;
    title: string;
    type: 'beasiswa' | 'lomba' | 'event' | 'seminar';
    date: string;
    location?: string;
    description: string;
    status: 'open' | 'closed' | 'deadline-soon';
    deadline?: string;
    saved?: boolean;
    registered?: boolean;
}

export interface User {
    id: string;
    name: string;
    nim: string;
    major: string;
    year: number;
    eventsJoined: number;
    scholarshipsApplied: number;
    competitionsJoined: number;
}

interface AppState {
    // User state
    user: User | null;
    setUser: (user: User) => void;

    // Events state
    events: Event[];
    savedEvents: string[];
    registeredEvents: string[];
    setEvents: (events: Event[]) => void;
    saveEvent: (eventId: string) => void;
    unsaveEvent: (eventId: string) => void;
    registerEvent: (eventId: string) => void;
    unregisterEvent: (eventId: string) => void;

    // UI state
    activeView: string;
    setActiveView: (view: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedEventType: string;
    setSelectedEventType: (type: string) => void;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;

    // Calendar state
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    currentMonth: Date;
    setCurrentMonth: (date: Date) => void;

    // Notifications
    notifications: Array<{
        id: string;
        title: string;
        message: string;
        type: 'info' | 'warning' | 'success' | 'error';
        read: boolean;
        createdAt: Date;
    }>;
    addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'createdAt'>) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;

    // Toast notifications
    toasts: Array<{
        id: string;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>;
    addToast: (toast: Omit<AppState['toasts'][0], 'id'>) => void;
    removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial user state
            user: {
                id: '1',
                name: 'Ahmad Mahasiswa',
                nim: '09021382126***',
                major: 'Teknik Informatika',
                year: 2022,
                eventsJoined: 23,
                scholarshipsApplied: 5,
                competitionsJoined: 3,
            },
            setUser: (user) => set({ user }),

            // Initial events state
            events: [
                {
                    id: '1',
                    title: 'Seminar Beasiswa LPDP 2025',
                    type: 'beasiswa',
                    date: '2025-10-15',
                    location: 'Gedung Rektorat UNSRI',
                    description: 'Informasi lengkap tentang beasiswa LPDP untuk S2 dan S3',
                    status: 'open',
                    deadline: '2025-10-30'
                },
                {
                    id: '2',
                    title: 'Lomba Programming ICPC',
                    type: 'lomba',
                    date: '2025-10-20',
                    location: 'Lab Komputer Fasilkom',
                    description: 'Kompetisi programming tingkat internasional',
                    status: 'open',
                    deadline: '2025-10-18'
                },
                {
                    id: '3',
                    title: 'Workshop Machine Learning',
                    type: 'event',
                    date: '2025-10-25',
                    location: 'Auditorium Fasilkom',
                    description: 'Pelatihan dasar machine learning dengan Python',
                    status: 'open'
                },
                {
                    id: '4',
                    title: 'Beasiswa Unggulan Kemendikbud',
                    type: 'beasiswa',
                    date: '2025-11-05',
                    location: 'Online',
                    description: 'Beasiswa untuk mahasiswa berprestasi',
                    status: 'deadline-soon',
                    deadline: '2025-11-10'
                }
            ],
            savedEvents: [],
            registeredEvents: [],
            setEvents: (events) => set({ events }),
            saveEvent: (eventId) => set((state) => ({
                savedEvents: [...state.savedEvents, eventId]
            })),
            unsaveEvent: (eventId) => set((state) => ({
                savedEvents: state.savedEvents.filter(id => id !== eventId)
            })),
            registerEvent: (eventId) => set((state) => ({
                registeredEvents: [...state.registeredEvents, eventId]
            })),
            unregisterEvent: (eventId) => set((state) => ({
                registeredEvents: state.registeredEvents.filter(id => id !== eventId)
            })),

            // UI state
            activeView: 'dashboard',
            setActiveView: (view) => set({ activeView: view }),
            searchQuery: '',
            setSearchQuery: (query) => set({ searchQuery: query }),
            selectedEventType: 'all',
            setSelectedEventType: (type) => set({ selectedEventType: type }),
            isMobileMenuOpen: false,
            setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

            // Calendar state
            selectedDate: null,
            setSelectedDate: (date) => set({ selectedDate: date }),
            currentMonth: new Date(),
            setCurrentMonth: (date) => set({ currentMonth: date }),

            // Notifications
            notifications: [
                {
                    id: '1',
                    title: 'Deadline Mendekat',
                    message: 'Beasiswa LPDP akan berakhir dalam 14 hari',
                    type: 'warning',
                    read: false,
                    createdAt: new Date()
                },
                {
                    id: '2',
                    title: 'Event Baru',
                    message: 'Workshop Machine Learning telah dibuka',
                    type: 'info',
                    read: false,
                    createdAt: new Date()
                }
            ],
            addNotification: (notification) => set((state) => ({
                notifications: [
                    {
                        ...notification,
                        id: Date.now().toString(),
                        createdAt: new Date()
                    },
                    ...state.notifications
                ]
            })),
            markNotificationRead: (id) => set((state) => ({
                notifications: state.notifications.map(notif =>
                    notif.id === id ? { ...notif, read: true } : notif
                )
            })),
            clearNotifications: () => set({ notifications: [] }),

            // Toast notifications
            toasts: [],
            addToast: (toast) => set((state) => ({
                toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
            })),
            removeToast: (id) => set((state) => ({
                toasts: state.toasts.filter(t => t.id !== id)
            }))
        }),
        {
            name: 'unsri-student-portal',
            partialize: (state) => ({
                user: state.user,
                savedEvents: state.savedEvents,
                registeredEvents: state.registeredEvents,
                activeView: state.activeView,
                selectedEventType: state.selectedEventType,
                notifications: state.notifications
            })
        }
    )
);