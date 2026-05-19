import apiClient from '../apiClient';
import {
  WithdrawAccountResponseDto,
  CreateWithdrawAccountDto,
  BankResponseDto,
  UpdateWithdrawAccountAdminDto,
} from '../api';

export interface WithdrawAccountListResponse {
  data: WithdrawAccountResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const withdrawAccountController = {
  // 출금 계좌 목록 조회 (내 계좌)
  getMyWithdrawAccounts: async () => {
    const response = await apiClient.get<WithdrawAccountResponseDto[]>('/api/withdraw-accounts/me');
    return response.data;
  },

  // 출금 계좌 생성
  createWithdrawAccount: async (data: CreateWithdrawAccountDto) => {
    const response = await apiClient.post<WithdrawAccountResponseDto>(
      '/api/withdraw-accounts',
      data,
    );
    return response.data;
  },

  // 출금 계좌 삭제
  deleteWithdrawAccount: async (accountId: number) => {
    await apiClient.delete(`/api/withdraw-accounts/${accountId}`);
  },

  // 출금 계좌 기본값 설정
  setPrimaryWithdrawAccount: async (accountId: number) => {
    const response = await apiClient.patch<WithdrawAccountResponseDto>(
      `/api/withdraw-accounts/${accountId}/primary`,
    );
    return response.data;
  },

  // 은행 목록 조회
  getBanks: async () => {
    const response = await apiClient.get<BankResponseDto[]>('/api/withdraw-accounts/banks');
    return response.data;
  },

  // 출금 계좌 목록 조회 (관리자)
  getWithdrawAccountsForAdmin: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<WithdrawAccountListResponse>(
      '/api/admin/withdraw-accounts',
      { params: { page, limit } },
    );
    return response.data;
  },

  // 출금 계좌 상세 조회 (관리자)
  getWithdrawAccountForAdmin: async (accountId: number) => {
    const response = await apiClient.get<WithdrawAccountResponseDto>(
      `/api/admin/withdraw-accounts/${accountId}`,
    );
    return response.data;
  },

  // 출금 계좌 확인 (관리자)
  verifyWithdrawAccountForAdmin: async (
    accountId: number,
    data: UpdateWithdrawAccountAdminDto,
  ) => {
    const response = await apiClient.patch<WithdrawAccountResponseDto>(
      `/api/admin/withdraw-accounts/${accountId}/verify`,
      data,
    );
    return response.data;
  },
};
