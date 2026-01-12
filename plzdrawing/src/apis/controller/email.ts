import apiClient from '../apiClient';
import {
  
} from '../api';

export const emailController = {
  // 이메일 인증 코드 발송: POST
  sendEmailVerificationCode: async (email: string) => {
    const response = await apiClient.post('/api/auth/email/v1/email-verification', { email });
    return response.data;
  },

  // 이메일 인증 코드 검증: GET
  verifyEmailCode: async (email: string, code: string) => {
    const response = await apiClient.get('/api/auth/email/v1/email-verification', {
      params: { email, code },
    });
    return response.data;
  },

  // 이메일 인증 취소: DELETE
  cancelEmailVerification: async (email: string) => {
    const response = await apiClient.delete('/api/auth/email/v1/email-verification/cancel', {
      params: { email },
    });
    return response.data;
  },

  // 비밀전호 재설정 인증 코드 발송: POST
  sendPasswordResetCode: async (email: string) => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', { email });
    return response.data;
  },

  // 비밀번호 재설정: PATCH
  verifyPasswordResetCode: async (email: string, code: string) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', {
      email,
      code,
    });
    return response.data;
  },

  // 비밀번호 변경: PATCH
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', {
      currentPassword,
      newPassword,
    });
    return response.data;
  }
};
