import { create } from 'zustand';
import { ProfileInfoResponse } from '@/src/apis/api';

interface UserState {
  user: ProfileInfoResponse | null;
  setUser: (user: ProfileInfoResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
