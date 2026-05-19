import apiClient from '../apiClient';
import { InquiryResponseDto, UpdateInquiryAdminDto } from '../api';

export interface InquiryListResponse {
  data: InquiryResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface CreateInquiryDto {
  category: 'DRAWING' | 'ACCOUNT' | 'PAYMENT' | 'REVIEW' | 'ETC';
  title: string;
  content: string;
  imageUrls?: string[];
}

export const inquiryController = {
  // 문의 생성
  createInquiry: async (data: CreateInquiryDto) => {
    const response = await apiClient.post<InquiryResponseDto>('/api/inquiries', data);
    return response.data;
  },

  // 내 문의 목록 조회
  getMyInquiries: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<InquiryListResponse>('/api/inquiries/me', {
      params: { page, limit },
    });
    return response.data;
  },

  // 문의 상세 조회
  getInquiry: async (inquiryId: number) => {
    const response = await apiClient.get<InquiryResponseDto>(`/api/inquiries/${inquiryId}`);
    return response.data;
  },

  // 문의 목록 조회 (관리자)
  getInquiriesForAdmin: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<InquiryListResponse>('/api/admin/inquiries', {
      params: { page, limit },
    });
    return response.data;
  },

  // 문의 상세 조회 (관리자)
  getInquiryForAdmin: async (inquiryId: number) => {
    const response = await apiClient.get<InquiryResponseDto>(`/api/admin/inquiries/${inquiryId}`);
    return response.data;
  },

  // 문의 답변 (관리자)
  updateInquiryForAdmin: async (inquiryId: number, data: UpdateInquiryAdminDto) => {
    const response = await apiClient.patch<InquiryResponseDto>(
      `/api/admin/inquiries/${inquiryId}`,
      data,
    );
    return response.data;
  },
};
