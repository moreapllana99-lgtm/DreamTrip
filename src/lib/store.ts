import { create } from 'zustand';
import { Trip, User, Notification, Achievement } from './types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Trips
  trips: Trip[];
  currentTrip: Trip | null;
  setTrips: (trips: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  setCurrentTrip: (trip: Trip | null) => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;

  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;

  // AI Chat
  isChatOpen: boolean;
  toggleChat: () => void;
  setChatOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  theme: 'light',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),

  trips: [],
  currentTrip: null,
  setTrips: (trips) => set({ trips }),
  addTrip: (trip) => set((s) => ({ trips: [...s.trips, trip] })),
  updateTrip: (id, updates) =>
    set((s) => ({
      trips: s.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      currentTrip: s.currentTrip?.id === id ? { ...s.currentTrip, ...updates } : s.currentTrip,
    })),
  deleteTrip: (id) =>
    set((s) => ({
      trips: s.trips.filter((t) => t.id !== id),
      currentTrip: s.currentTrip?.id === id ? null : s.currentTrip,
    })),
  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  notifications: [],
  unreadCount: 0,
  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

  achievements: [],
  unlockAchievement: (id) =>
    set((s) => ({
      achievements: s.achievements.map((a) =>
        a.id === id ? { ...a, unlockedAt: new Date().toISOString() } : a
      ),
    })),

  isChatOpen: false,
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),
  setChatOpen: (open) => set({ isChatOpen: open }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
