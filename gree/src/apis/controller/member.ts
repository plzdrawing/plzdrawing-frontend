import apiClient from '../apiClient';
import { ProfileInfoResponse } from '../api';
import { useAuthStore } from '@/src/stores/authStore';

const BASE_URL = 'https://plzdrawing.o-r.kr';

export const memberController = {
  // 내 프로필 조회: GET
  checkMyProfile: async () => {
    const response = await apiClient.get<ProfileInfoResponse>('/api/member/v1/me');
    return response.data;
  },

  // 닉네임 중복 확인: GET
  checkNicknameDuplicate: async (nickname: string) => {
    const response = await apiClient.get('/api/member/check-nickname', {
      params: { nickname },
    });
    return response.data;
  },

  // 프로필 업로드: POST
  uploadProfile: async (file: any, introduce: string, hashTag: string[]) => {
    const token = useAuthStore.getState().accessToken;
    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
    formData.append('introduce', introduce);
    hashTag.forEach((tag) => formData.append('hashTag', tag));

    const response = await fetch(`${BASE_URL}/api/member/profile`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error(`Profile upload failed: ${response.status}`);
    return await response.json();
  },

  // 프로필 수정: PATCH
  editProfile: async (file: any, nickname: string, introduce: string, hashTag: string[]) => {
    const token = useAuthStore.getState().accessToken;
    const formData = new FormData();

    if (file?.uri) {
      formData.append('file', { uri: file.uri, name: file.name, type: file.type } as any);
    }
    formData.append('nickname', nickname);
    formData.append('introduce', introduce);
    hashTag.forEach((tag) => formData.append('hashTag', tag));

    const response = await fetch(`${BASE_URL}/api/member/v1/profile`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error(`Profile update failed: ${response.status}`);
    return await response.json();
  },

  // 회원 탈퇴: DELETE
  withdrawMember: async () => {
    const response = await apiClient.delete('/api/member/v1/withdraw');
    return response.data;
  },
};
