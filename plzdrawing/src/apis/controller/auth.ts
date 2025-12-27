import apiClient from '../apiClient';
import {
  LoginRequest,
  SignUpRequest,
  SignUpResponse,
} from '../api';

export const authController = {
  // 로그인: POST
  login: async (data: LoginRequest) => {
    const response = await apiClient.post('/api/auth/v1/login', data);
    return response.data;
  },

  // 로그아웃: POST
  logout: async () => {
    const response = await apiClient.post('/api/auth/v1/logout');
    return response.data;
  },

  // 회원가입: POST
  signup: async (data: SignUpRequest) => {
    const response = await apiClient.post<SignUpResponse>('/api/auth/v1/signup', data);
    return response.data;
  },

  // 토큰 재발급: POST
  refreshToken: async () => {
    const response = await apiClient.post('/api/auth/v1/token/refresh');
    return response.data;
  },
};
