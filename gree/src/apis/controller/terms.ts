import apiClient from '../apiClient';
import { TermResponseDto, CreateTermDto, UpdateTermDto } from '../api';

export interface TermListResponse {
  data: TermResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const termsController = {
  // 약관 목록 조회
  getTerms: async () => {
    const response = await apiClient.get<TermResponseDto[]>('/api/terms/v1');
    return response.data;
  },

  // 약관 생성 (관리자)
  createTerm: async (data: CreateTermDto) => {
    const response = await apiClient.post<TermResponseDto>('/api/terms/v1', data);
    return response.data;
  },

  // 약관 목록 조회 (관리자)
  getTermsForAdmin: async (keyword?: string) => {
    const response = await apiClient.get<TermResponseDto[]>('/api/terms/v1/admin', {
      params: { keyword },
    });
    return response.data;
  },

  // 약관 상세 조회 (관리자)
  getTermForAdmin: async (termId: string) => {
    const response = await apiClient.get<TermResponseDto>(`/api/terms/v1/admin/${termId}`);
    return response.data;
  },

  // 약관 수정 (관리자)
  updateTerm: async (termId: string, data: UpdateTermDto) => {
    const response = await apiClient.patch<TermResponseDto>(`/api/terms/v1/${termId}`, data);
    return response.data;
  },

  // 약관 삭제 (관리자)
  removeTerm: async (termId: string) => {
    await apiClient.delete(`/api/terms/v1/${termId}`);
  },
};
