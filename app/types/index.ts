export interface User {
    id: string;
    name: string;
    role: 'student' | 'admin';
    avatarUrl?: string;
}

export interface Event {
    id: string;
    title: string;
    type: string;
    date: string;
    description: string;
    location?: string;
    organizer?: string;
    status?: 'pending' | 'done';
}
