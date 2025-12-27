import apiClient from './apiClient';
import {
  UpdateProfileRequest,
  ProfileResponse,
  ProfileInfoResponse,
} from './api';

export const userApi = {
  // 현재 로그인한 사용자 정보 조회 (JWT 기반)
  getMyProfile: async () => {
    const response = await apiClient.get<ProfileInfoResponse>('/api/member/v1/me');
    return response.data;
  },

  // 프로필 수정
  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await apiClient.patch<ProfileResponse>('/api/member/v1/profile', data);
    return response.data;
  },

  // 특정 사용자 프로필 조회
  getUserProfile: async (memberId: number) => {
    const response = await apiClient.get<ProfileInfoResponse>(`/api/member/v1/profile/${memberId}`);
    return response.data;
  },

  // 회원 탈퇴
  deleteAccount: async () => {
    const response = await apiClient.delete('/api/member/v1/withdraw');
    return response.data;
  },
};