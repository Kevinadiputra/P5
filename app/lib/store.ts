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
    image?: string;
    registrationLink?: string;
    organizer?: string;
    prize?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    nim: string;
    major: string;
    year: number;
    phone?: string;
    bio?: string;
    avatar?: string;
    eventsJoined: number;
    scholarshipsApplied: number;
    competitionsJoined: number;
    isProfileComplete: boolean;
    targets?: {
        events: number;
        beasiswa: number;
        lomba: number;
    };
}

export interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    token: string | null;
}

interface AppState {
    // Auth state
    auth: AuthState;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, nim: string) => Promise<boolean>;
    adminLogin: (email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // User state
    user: User | null;
    setUser: (user: User) => void;
    updateProfile: (data: Partial<User>) => void;
    updateTargets: (targets: { events: number; beasiswa: number; lomba: number }) => void;

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

    // Helper functions
    getEventStatus: (deadline?: string) => 'open' | 'closed' | 'deadline-soon';
    updateEventStatuses: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Auth state
            auth: {
                isAuthenticated: false,
                isAdmin: false,
                token: null,
            },
            login: async (email: string, password: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock login validation
                if (email && password.length >= 6) {
                    const user: User = {
                        id: Date.now().toString(),
                        name: email.split('@')[0],
                        email,
                        nim: '09021382126***',
                        major: '',
                        year: new Date().getFullYear(),
                        eventsJoined: 0,
                        scholarshipsApplied: 0,
                        competitionsJoined: 0,
                        isProfileComplete: false,
                    };

                    set({
                        auth: { isAuthenticated: true, isAdmin: false, token: 'mock-token-' + Date.now() },
                        user,
                    });

                    get().addToast({ message: 'Login berhasil! Silakan lengkapi profil Anda.', type: 'success' });
                    return true;
                }

                get().addToast({ message: 'Email atau password salah', type: 'error' });
                return false;
            },
            register: async (email: string, password: string, nim: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock registration
                if (email && password.length >= 6 && nim) {
                    const user: User = {
                        id: Date.now().toString(),
                        name: '',
                        email,
                        nim,
                        major: '',
                        year: new Date().getFullYear(),
                        eventsJoined: 0,
                        scholarshipsApplied: 0,
                        competitionsJoined: 0,
                        isProfileComplete: false,
                    };

                    set({
                        auth: { isAuthenticated: true, isAdmin: false, token: 'mock-token-' + Date.now() },
                        user,
                        activeView: 'complete-profile',
                    });

                    get().addToast({ message: 'Registrasi berhasil! Lengkapi profil Anda.', type: 'success' });
                    return true;
                }

                get().addToast({ message: 'Registrasi gagal. Periksa data Anda.', type: 'error' });
                return false;
            },
            adminLogin: async (email: string, password: string) => {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock admin login (admin@unsri.ac.id / admin123)
                if (email === 'admin@unsri.ac.id' && password === 'admin123') {
                    set({
                        auth: { isAuthenticated: true, isAdmin: true, token: 'admin-token-' + Date.now() },
                        user: {
                            id: 'admin',
                            name: 'Administrator',
                            email: 'admin@unsri.ac.id',
                            nim: 'ADMIN',
                            major: 'Administration',
                            year: 2025,
                            eventsJoined: 0,
                            scholarshipsApplied: 0,
                            competitionsJoined: 0,
                            isProfileComplete: true,
                        },
                        activeView: 'admin-dashboard',
                    });

                    get().addToast({ message: 'Login admin berhasil!', type: 'success' });
                    return true;
                }

                get().addToast({ message: 'Email atau password admin salah', type: 'error' });
                return false;
            },
            logout: () => {
                set({
                    auth: { isAuthenticated: false, isAdmin: false, token: null },
                    user: null,
                    activeView: 'dashboard',
                });
                get().addToast({ message: 'Logout berhasil', type: 'info' });
            },

            // Initial user state
            user: null,
            setUser: (user) => set({ user }),
            updateProfile: (data) => set((state) => ({
                user: state.user ? { ...state.user, ...data } : null
            })),
            updateTargets: (targets) => set((state) => ({
                user: state.user ? { ...state.user, targets } : null
            })),

            // Initial events state with auto deadline calculation
            events: [
                {
                    id: '1',
                    title: 'Seminar Beasiswa LPDP 2025',
                    type: 'beasiswa',
                    date: '2025-10-15',
                    location: 'Gedung Rektorat UNSRI',
                    description: 'Informasi lengkap tentang beasiswa LPDP untuk S2 dan S3. Program beasiswa penuh untuk jenjang magister dan doktor di dalam dan luar negeri.',
                    status: 'open',
                    deadline: '2025-10-30',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500',
                    registrationLink: 'https://lpdp.kemenkeu.go.id',
                    organizer: 'LPDP Kemenkeu',
                    prize: 'Beasiswa penuh S2/S3'
                },
                {
                    id: '2',
                    title: 'Lomba Programming ICPC Regional',
                    type: 'lomba',
                    date: '2025-10-20',
                    location: 'Lab Komputer Fasilkom',
                    description: 'International Collegiate Programming Contest - kompetisi programming bergengsi tingkat internasional untuk mahasiswa.',
                    status: 'open',
                    deadline: '2025-10-12',
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
                    registrationLink: 'https://icpc.global',
                    organizer: 'ACM ICPC',
                    prize: 'Medali + Sertifikat + Hadiah'
                },
                {
                    id: '3',
                    title: 'Workshop Machine Learning & AI',
                    type: 'event',
                    date: '2025-10-25',
                    location: 'Auditorium Fasilkom UNSRI',
                    description: 'Pelatihan intensif machine learning dengan Python, TensorFlow, dan praktik hands-on project AI.',
                    status: 'open',
                    deadline: '2025-10-20',
                    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500',
                    registrationLink: 'https://forms.gle/workshop-ml',
                    organizer: 'Fasilkom UNSRI',
                    prize: 'Sertifikat + E-Book'
                },
                {
                    id: '4',
                    title: 'Beasiswa Unggulan Kemendikbud',
                    type: 'beasiswa',
                    date: '2025-11-05',
                    location: 'Online',
                    description: 'Beasiswa untuk mahasiswa berprestasi dengan IPK minimal 3.25. Bantuan biaya pendidikan full semester.',
                    status: 'open',
                    deadline: '2025-10-10',
                    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500',
                    registrationLink: 'https://beasiswaunggulan.kemdikbud.go.id',
                    organizer: 'Kemendikbud RI',
                    prize: 'Beasiswa Full Semester'
                },
                {
                    id: '5',
                    title: 'Hackathon Innovation Challenge 2025',
                    type: 'lomba',
                    date: '2025-11-10',
                    location: 'Jakarta Convention Center',
                    description: 'Kompetisi 48 jam non-stop membuat solusi inovatif untuk masalah nyata menggunakan teknologi.',
                    status: 'open',
                    deadline: '2025-10-25',
                    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
                    registrationLink: 'https://hackathon2025.com',
                    organizer: 'TechFest Indonesia',
                    prize: 'Total Rp 100 Juta'
                },
                {
                    id: '6',
                    title: 'Seminar Nasional Teknologi Digital',
                    type: 'seminar',
                    date: '2025-10-28',
                    location: 'Hotel Aryaduta Palembang',
                    description: 'Seminar dengan pembicara praktisi industri membahas tren teknologi digital dan AI di Indonesia.',
                    status: 'open',
                    deadline: '2025-10-22',
                    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
                    registrationLink: 'https://seminar-tech.unsri.ac.id',
                    organizer: 'UNSRI & ILKOM',
                    prize: 'Sertifikat 3 SKP'
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
            })),

            // Helper functions
            getEventStatus: (deadline?: string) => {
                if (!deadline) return 'open';

                const now = new Date();
                const deadlineDate = new Date(deadline);
                const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                if (daysUntilDeadline < 0) return 'closed';
                if (daysUntilDeadline <= 7) return 'deadline-soon';
                return 'open';
            },
            updateEventStatuses: () => {
                const getStatus = get().getEventStatus;
                set((state) => ({
                    events: state.events.map(event => ({
                        ...event,
                        status: getStatus(event.deadline)
                    }))
                }));
            }
        }),
        {
            name: 'unsri-student-portal',
            partialize: (state) => ({
                auth: state.auth,
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