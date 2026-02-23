import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  /**
   * AsyncStorage에서 토큰을 읽어와 store를 초기화했는지 여부.
   * App 최초 렌더 시 hydrate()가 완료되기 전까지 false.
   */
  isHydrated: boolean;

  /** 로그인 성공 시 호출 — 토큰 저장 + isLoggedIn = true */
  setAuth: (accessToken: string, refreshToken?: string) => Promise<void>;
  /** 토큰 갱신(refresh) 시 호출 — 토큰만 교체, isLoggedIn 유지 */
  setTokens: (accessToken: string, refreshToken?: string) => Promise<void>;
  /** 로그아웃 시 호출 — 토큰 제거 + isLoggedIn = false */
  logout: () => Promise<void>;
  /** 앱 시작 시 AsyncStorage → store로 토큰 복원 */
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
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      isLoggedIn: true,
    });
  },

  setTokens: async (accessToken, refreshToken) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken);
    set({
      accessToken,
      ...(refreshToken ? { refreshToken } : {}),
    });
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
      set({
        accessToken,
        refreshToken,
        isLoggedIn: !!accessToken,
        isHydrated: true,
      });
    } catch {
      set({ isHydrated: true });
    }
  },
}));
