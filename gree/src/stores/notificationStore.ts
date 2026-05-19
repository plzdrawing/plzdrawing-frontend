import { create } from 'zustand';
import { alarmController } from '@/src/apis/controller/alarm';

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (n: number) => void;
  refreshUnreadCount: () => Promise<void>;
  increment: (by?: number) => void;
  decrement: (by?: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (n) => set({ unreadCount: n }),
  refreshUnreadCount: async () => {
    try {
      const res = await alarmController.getNotifications(1, 100);
      const items = (res?.data ?? res) as any[];
      const unread = items.filter((i) => !i.read).length;
      set({ unreadCount: unread });
    } catch (err: any) {
      if (err?.response?.status === 404) {
        set({ unreadCount: 0 });
      } else {
        console.error('refreshUnreadCount failed', err);
      }
    }
  },
  increment: (by = 1) => set((s) => ({ unreadCount: s.unreadCount + by })),
  decrement: (by = 1) => set((s) => ({ unreadCount: Math.max(0, s.unreadCount - by) })),
}));
