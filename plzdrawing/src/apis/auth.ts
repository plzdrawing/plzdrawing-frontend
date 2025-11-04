import apiClient from './client';
import {
  ApiResponse,
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/api/auth/v1/login', data);
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

  // 회원가입 API
  signup: async (data: SignUpRequest): Promise<ApiResponse<SignUpResponse>> => {
    const response = await apiClient.post('/api/auth/v1/signup', data);
    return response.data;
  },
};

// 이메일 인증 코드 전송 API
export const sendVerificationEmail = async (email: string): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post('/api/auth/email/v1/email-verification', { email });
    return response.data;
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

// GET 요청으로 이메일과 코드를 보내기
export const verifyEmailCode = async (email: string, code: string): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get('/api/auth/email/v1/email-verification', {
      params: {
        email,
        code
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to verify email code:", error);
    throw error;
  }
}
