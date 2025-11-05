import apiClient from './client';
import {
  ApiResponse,
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  PasswordUpdateRequest,
  PasswordReissueRequest,
  PasswordReissueVerifyRequest,
} from './types';

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post('/api/auth/v1/login', data);
    return response.data;
  },

  // 비밀번호 재발급 인증번호 전송 (POST)
  requestPasswordReissue: async (data: PasswordReissueRequest): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 재발급 (PATCH)
  verifyPasswordReissue: async (data: PasswordReissueVerifyRequest): Promise<ApiResponse> => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 회원가입 API
  signup: async (data: SignUpRequest): Promise<ApiResponse<SignUpResponse>> => {
    const response = await apiClient.post('/api/auth/v1/signup', data);
    return response.data;
  },

  // 비밀번호 변경
  updatePassword: async (data: PasswordUpdateRequest): Promise<ApiResponse> => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', data);
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
