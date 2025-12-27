import apiClient from './apiClient';
import {
  UploadContentRequest,
  UploadContentResponse,
  UpdateContentRequest,
  PageResponseLatestContentsResponse,
  PageResponseContentsDto,
} from './api';

export const drawingApi = {
  // 콘텐츠 업로드
  uploadContent: async (data: UploadContentRequest, images: File[]) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await apiClient.post<UploadContentResponse>('/api/content', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 콘텐츠 수정
  updateContent: async (contentId: number, data: UpdateContentRequest, images?: File[]) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (images) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    const response = await apiClient.patch('/api/content', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 콘텐츠 삭제
  deleteContent: async (contentId: number) => {
    const response = await apiClient.delete(`/api/content/${contentId}`);
    return response.data;
  },

  // 최신 콘텐츠 목록 조회
  getLatestContents: async (page: number = 1, size: number = 10) => {
    const response = await apiClient.get<PageResponseLatestContentsResponse>('/api/content', {
      params: { page, size },
    });
    return response.data;
  },

  // 콘텐츠 검색
  searchContents: async (params: {
    page?: number;
    size?: number;
    keyword?: string;
    sortBy?: 'latest' | 'popular';
  }) => {
    const response = await apiClient.get<PageResponseContentsDto>('/api/content/search', {
      params,
    });
    return response.data;
  },

  // 특정 콘텐츠 상세 조회
  getContentDetail: async (contentId: number) => {
    const response = await apiClient.get(`/api/content/v1/${contentId}`);
    return response.data;
  },

  // 내 콘텐츠 목록 조회
  getMyContents: async (page: number = 0, size: number = 12) => {
    const response = await apiClient.get('/api/content/v1/my', {
      params: { page, size },
    });
    return response.data;
  },
};