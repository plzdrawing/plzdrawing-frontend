import apiClient from './client';
import {
  ApiResponse,
  PaginatedResponse,
  UserProfile,
  UpdateProfileRequest,
  Drawing,
  Review,
} from './types';

export const userApi = {
  // 현재 로그인한 사용자 정보 조회 (JWT 기반)
  getMe: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get('/api/member/v1/me');
    return response.data;
  },

  // 현재 사용자 프로필 조회
  getMyProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  // 특정 사용자 프로필 조회
  getUserProfile: async (userId: string): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.get(`/user/profile/${userId}`);
    return response.data;
  },

  // 프로필 업데이트
  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> => {
    const response = await apiClient.put('/user/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 프로필 수정 (PATCH)
  updateMyProfile: async (data: {
    nickname: string;
    introduction: string;
    hashtags: string;
    profileImageUrl?: string;
  }): Promise<ApiResponse> => {
    const response = await apiClient.patch('/api/member/v1/profile', data);
    return response.data;
  },

  // 사용자의 그림 목록 조회
  getUserDrawings: async (
    userId: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Drawing>> => {
    const response = await apiClient.get(`/user/${userId}/drawings`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 사용자의 리뷰 목록 조회
  getUserReviews: async (
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Review>> => {
    const response = await apiClient.get(`/user/${userId}/reviews`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> => {
    const response = await apiClient.put('/user/password', data);
    return response.data;
  },

  // 계정 삭제
  deleteAccount: async (): Promise<ApiResponse> => {
    const response = await apiClient.delete('/user/account');
    return response.data;
  },
};