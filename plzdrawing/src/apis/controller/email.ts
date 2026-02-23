import apiClient from '../apiClient';
import {
  SendVerificationCodeDto,
  CodeGenerateForPasswordRequest,
  PasswordResetRequest,
  UpdatePasswordRequest,
} from '../api';

export const emailController = {
  // 이메일 인증 코드 발송: POST
  sendEmailVerificationCode: async (data: SendVerificationCodeDto) => {
    const response = await apiClient.post<boolean>('/api/auth/email/v1/email-verification', data);
    return response.data;
  },

  // 이메일 인증 코드 검증: GET
  verifyEmailCode: async (email: string, code: string) => {
    const response = await apiClient.get<boolean>('/api/auth/email/v1/email-verification', {
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

  // 비밀번호 재설정 인증 코드 발송: POST
  sendPasswordResetCode: async (data: CodeGenerateForPasswordRequest) => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 재설정 (인증 코드 검증 + 임시 비밀번호 발급): PATCH
  // PasswordResetRequest: { email, authCode }
  resetPassword: async (data: PasswordResetRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', data);
    return response.data;
  },

  // 비밀번호 변경 (로그인 상태): PATCH
  // UpdatePasswordRequest: { nowPassword, newPassword }
  changePassword: async (data: UpdatePasswordRequest) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', data);
    return response.data;
  },
};
