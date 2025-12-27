import apiClient from '../apiClient';
import {
  CodeGenerateRequest,
  CodeGenerateForPasswordRequest,
  PasswordResetRequest,
  UpdatePasswordRequest,
} from '../api';

export const emailController = {
  // 이메일 인증: GET
  verifyEmailCode: async (data: { email: string; code: string }) => {
    const response = await apiClient.get('/api/auth/email/v1/email-verification', {
      params: data,
    });
    return response.data;
  },

  // 이메일 코드 보내기: POST
  sendEmailCode: async (data: CodeGenerateRequest) => {
    const response = await apiClient.post('/api/auth/email/v1/email-verification', data);
    return response.data;
  },

  // 이메일 인증 취소: DELETE
  cancelEmailVerification: async (email: string) => {
    const response = await apiClient.delete('/api/auth/email/v1/email-verification/cancel', {
      params: { email },
    });
    return response.data;
  },

  // 비밀번호 재발급 인증번호 전송: POST
  sendNewPasswordCode: async (data: CodeGenerateForPasswordRequest) => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 재발급: PATCH
  verifyNewPasswordCode: async (data: PasswordResetRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비민번호 변경 (로그인 사용자 기준): PATCH
  updatePassword: async (data: UpdatePasswordRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', data);
    return response.data;
  },
};
