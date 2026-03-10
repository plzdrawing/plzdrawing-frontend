import apiClient from '../apiClient';

export const emailController = {
  sendEmailVerificationCode: async (email: string) => {
    const response = await apiClient.post<boolean>(
      '/api/auth/email/v1/email-verification',
      { email },
    );
    return response.data;
  },

  verifyEmailCode: async (email: string, code: string) => {
    const response = await apiClient.get<boolean>('/api/auth/email/v1/email-verification', {
      params: { email, code },
    });
    return response.data;
  },

  cancelEmailVerification: async (email: string) => {
    const response = await apiClient.delete('/api/auth/email/v1/email-verification/cancel', {
      params: { email },
    });
    return response.data;
  },

  sendPasswordResetCode: async (email: string) => {
    const response = await apiClient.post('/api/auth/email/v1/password/reissue', { email });
    return response.data;
  },

  resetPassword: async (email: string, authCode: string) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/reissue', {
      email,
      authCode,
    });
    return response.data;
  },

  changePassword: async (nowPassword: string, newPassword: string) => {
    const response = await apiClient.patch('/api/auth/email/v1/password/update', {
      nowPassword,
      newPassword,
    });
    return response.data;
  },
};
