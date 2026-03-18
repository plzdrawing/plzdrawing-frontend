import apiClient from '../apiClient';
import { CreateReviewDto, ReviewResponseDto } from '../api';

export const reviewController = {
  createReview: async (data: CreateReviewDto) => {
    const response = await apiClient.post<ReviewResponseDto>('/api/reviews', data);
    return response.data;
  },
};
