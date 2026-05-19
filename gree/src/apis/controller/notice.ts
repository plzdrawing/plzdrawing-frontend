import apiClient from '../apiClient';
import { NoticeResponseDto, CreateNoticeDto, UpdateNoticeDto } from '../api';

export interface NoticeListResponse {
  data: NoticeResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const noticeController = {
  // 공지사항 목록 조회
  getNotices: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<NoticeListResponse>('/api/notices', {
      params: { page, limit },
    });
    return response.data;
  },

  // 공지사항 상세 조회
  getNotice: async (noticeId: number) => {
    const response = await apiClient.get<NoticeResponseDto>(`/api/notices/${noticeId}`);
    return response.data;
  },

  // 공지사항 생성 (관리자)
  createNotice: async (data: CreateNoticeDto) => {
    const response = await apiClient.post<NoticeResponseDto>('/api/notices', data);
    return response.data;
  },

  // 공지사항 수정 (관리자)
  updateNotice: async (noticeId: number, data: UpdateNoticeDto) => {
    const response = await apiClient.patch<NoticeResponseDto>(`/api/notices/${noticeId}`, data);
    return response.data;
  },

  // 공지사항 삭제 (관리자)
  deleteNotice: async (noticeId: number) => {
    await apiClient.delete(`/api/notices/${noticeId}`);
  },

  // 공지사항 목록 조회 (관리자)
  getNoticesForAdmin: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<NoticeListResponse>('/api/admin/notices', {
      params: { page, limit },
    });
    return response.data;
  },

  // 공지사항 상세 조회 (관리자)
  getNoticeForAdmin: async (noticeId: number) => {
    const response = await apiClient.get<NoticeResponseDto>(`/api/admin/notices/${noticeId}`);
    return response.data;
  },
};
