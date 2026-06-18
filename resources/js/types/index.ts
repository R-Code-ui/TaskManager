export type * from './auth';
export type * from './navigation';
export type * from './ui';

// Task Manager types
export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    roles: string[];
    permissions: string[];
    avatar?: string | null;
    unread_messages_count?: number;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    due_date: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    user_id: number;
    user?: User;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

// Message types
export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    subject: string;
    body: string;
    is_read: boolean;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    sender?: User;
    receiver?: User;
    replies?: Message[];
}

export interface Conversation {
    with_user: User;
    last_message: Message;
    unread_count: number;
}

// Game types
export interface GameSetting {
    id: number;
    game_key: string;
    name: string;
    enabled: boolean;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface GameQuestion {
    text: string;
    options?: string[];
    correct: string | number;
    type?: 'text' | 'radio' | 'select';
}

export interface GameScore {
    game_key: string;
    score: number;
    total: number;
    completed_at: string;
}

// 👇 ADDED – Activity Log type
export interface ActivityLog {
    id: number;
    user_id: number;
    user?: User;
    action: string;
    details: any;
    created_at: string;
    updated_at: string;
}

// Extend Inertia PageProps
declare module '@inertiajs/react' {
    export interface PageProps {
        auth: {
            user: User | null;
        };
        sidebarOpen?: boolean;
        [key: string]: unknown;
    }
}
