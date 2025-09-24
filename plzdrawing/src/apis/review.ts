import apiClient from './client';
import {
  ApiResponse,
  PaginatedResponse,
  Review,
  CreateReviewRequest,
} from './types';

export const reviewApi = {
  // 특정 사용자의 리뷰 목록 조회
  getUserReviews: async (
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Review>> => {
    const response = await apiClient.get(`/reviews/user/${userId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 리뷰 작성
  createReview: async (data: CreateReviewRequest): Promise<ApiResponse<Review>> => {
    const response = await apiClient.post('/reviews', data);
    return response.data;
  },

  // 리뷰 수정
  updateReview: async (
    reviewId: string,
    data: { rating?: number; content?: string }
  ): Promise<ApiResponse<Review>> => {
    const response = await apiClient.put(`/reviews/${reviewId}`, data);
    return response.data;
  },

  // 리뷰 삭제
  deleteReview: async (reviewId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/reviews/${reviewId}`);
    return response.data;
  },

  // 내가 작성한 리뷰 목록
  getMyReviews: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Review>> => {
    const response = await apiClient.get('/reviews/my', {
      params: { page, limit },
    });
    return response.data;
  },

  // 사용자의 리뷰 통계 조회
  getUserReviewStats: async (userId: string): Promise<ApiResponse<{
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
    topKeywords: string[];
  }>> => {
    const response = await apiClient.get(`/reviews/user/${userId}/stats`);
    return response.data;
  },
};