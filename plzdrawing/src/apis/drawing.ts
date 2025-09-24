import apiClient from './client';
import {
  ApiResponse,
  PaginatedResponse,
  Drawing,
  CreateDrawingRequest,
} from './types';

export const drawingApi = {
  // 그림 목록 조회 (홈 화면용)
  getDrawings: async (
    page: number = 1,
    limit: number = 12,
    filters?: {
      category?: string;
      sortBy?: 'latest' | 'popular' | 'likes';
      search?: string;
    }
  ): Promise<PaginatedResponse<Drawing>> => {
    const response = await apiClient.get('/drawings', {
      params: { page, limit, ...filters },
    });
    return response.data;
  },

  // 특정 그림 상세 조회
  getDrawing: async (drawingId: string): Promise<ApiResponse<Drawing>> => {
    const response = await apiClient.get(`/drawings/${drawingId}`);
    return response.data;
  },

  // 그림 업로드
  createDrawing: async (data: CreateDrawingRequest): Promise<ApiResponse<Drawing>> => {
    const response = await apiClient.post('/drawings', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 그림 수정
  updateDrawing: async (
    drawingId: string,
    data: { description?: string; imageFile?: FormData }
  ): Promise<ApiResponse<Drawing>> => {
    const response = await apiClient.put(`/drawings/${drawingId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 그림 삭제
  deleteDrawing: async (drawingId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/drawings/${drawingId}`);
    return response.data;
  },

  // 그림 좋아요/좋아요 취소
  toggleLike: async (drawingId: string): Promise<ApiResponse<{ liked: boolean; likeCount: number }>> => {
    const response = await apiClient.post(`/drawings/${drawingId}/like`);
    return response.data;
  },

  // 내가 좋아요한 그림 목록
  getLikedDrawings: async (
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Drawing>> => {
    const response = await apiClient.get('/drawings/liked', {
      params: { page, limit },
    });
    return response.data;
  },

  // 그림 검색
  searchDrawings: async (
    query: string,
    page: number = 1,
    limit: number = 12
  ): Promise<PaginatedResponse<Drawing>> => {
    const response = await apiClient.get('/drawings/search', {
      params: { query, page, limit },
    });
    return response.data;
  },
};