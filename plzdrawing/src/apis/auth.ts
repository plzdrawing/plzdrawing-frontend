import apiClient from './client';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // 로그아웃
  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // 토큰 갱신
  refreshToken: async (data: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await apiClient.post('/auth/refresh', data);
    return response.data;
  },

  // 회원가입
  signup: async (data: {
    email: string;
    password: string;
    name: string;
  }): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  },

  // 이메일 중복 확인
  checkEmail: async (email: string): Promise<ApiResponse<{ available: boolean }>> => {
    const response = await apiClient.get(`/auth/check-email?email=${email}`);
    return response.data;
  },

  // 비밀번호 재설정 요청
  requestPasswordReset: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/auth/password-reset-request', { email });
    return response.data;
  },

  // 비밀번호 재설정
  resetPassword: async (data: {
    token: string;
    newPassword: string;
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/auth/password-reset', data);
    return response.data;
  },
};