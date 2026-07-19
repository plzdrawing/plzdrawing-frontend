import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isHydrated: boolean;

  setAuth: (accessToken: string, refreshToken?: string) => Promise<void>;
  setTokens: (accessToken: string, refreshToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  isHydrated: false,

  setAuth: async (accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken: refreshToken ?? null, isLoggedIn: true });
  },

  setTokens: async (accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, ...(refreshToken ? { refreshToken } : {}) });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    set({ accessToken: null, refreshToken: null, isLoggedIn: false });
  },

  hydrate: async () => {
    try {
      const [[, accessToken], [, refreshToken]] = await AsyncStorage.multiGet([
        'accessToken',
        'refreshToken',
      ]);
      set({ accessToken, refreshToken, isLoggedIn: !!accessToken, isHydrated: true });
    } catch {
      set({ isHydrated: true });
    }
  },
}));
