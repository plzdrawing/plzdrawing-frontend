import { create } from 'zustand';
import { ProfileInfoResponse } from '@/src/apis/api';

interface UserState {
  user: ProfileInfoResponse | null;
  /** 로그인 후 프로필 조회 결과를 store에 저장 */
  setUser: (user: ProfileInfoResponse) => void;
  /** 로그아웃 시 유저 정보 초기화 */
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
