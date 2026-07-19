import apiClient from '../apiClient';
import { CreateReviewDto, ReviewResponseDto, Review } from '../api';

export interface ReviewListResponse {
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export const reviewController = {
  // 리뷰 생성
  createReview: async (data: CreateReviewDto) => {
    const response = await apiClient.post<ReviewResponseDto>('/api/reviews', data);
    return response.data;
  },

  // 최신 리뷰 조회
  getLatestReviews: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<ReviewListResponse>('/api/reviews', {
      params: { page, limit },
    });
    return response.data;
  },
};
