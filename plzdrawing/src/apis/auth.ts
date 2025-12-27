import apiClient from './apiClient';
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  UpdatePasswordRequest,
  CodeGenerateForPasswordRequest,
  PasswordResetRequest,
} from './api';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest) => {
    const response = await apiClient.post('/api/auth/v1/login', data);
    return response.data;
  },

  // 회원가입
  signup: async (data: SignUpRequest) => {
    const response = await apiClient.post<SignUpResponse>('/api/auth/v1/signup', data);
    return response.data;
  },

  // 비밀번호 재발급 인증번호 전송
  requestPasswordReissue: async (data: CodeGenerateForPasswordRequest) => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 재발급 (인증번호 확인 및 변경)
  verifyPasswordReissue: async (data: PasswordResetRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 변경 (JWT 기반)
  updatePassword: async (data: UpdatePasswordRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', data);
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await apiClient.post('/api/auth/v1/logout');
    return response.data;
  },

  // 이메일 인증번호 전송
  sendEmailVerification: async (data: CodeGenerateForPasswordRequest) => {
    const response = await apiClient.post('/api/auth/email/v1/email-verification', data);
    return response.data;
  },

  // 이메일 인증번호 확인
  verifyEmailCode: async (data: { email: string; code: string }) => {
    const response = await apiClient.get('/api/auth/email/v1/email-verification', {
      params: data,
    });
    return response.data;
  },
};
