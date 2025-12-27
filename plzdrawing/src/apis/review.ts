import apiClient from './apiClient';

export const reviewApi = {
  // 리뷰 작성
  createReview: async (data: {
    rating: number;
    content: string;
    targetMemberId: number;
  }) => {
    const response = await apiClient.post('/api/review', data);
    return response.data;
  },

  // 리뷰 수정
  updateReview: async (
    reviewId: number,
    data: {
      rating?: number;
      content?: string;
    }
  ) => {
    const response = await apiClient.patch(`/api/review/${reviewId}`, data);
    return response.data;
  },

  // 리뷰 삭제
  deleteReview: async (reviewId: number) => {
    const response = await apiClient.delete(`/api/review/${reviewId}`);
    return response.data;
  },

  // 특정 사용자의 리뷰 목록 조회
  getUserReviews: async (memberId: number, page: number = 0, size: number = 10) => {
    const response = await apiClient.get(`/api/review/member/${memberId}`, {
      params: { page, size },
    });
    return response.data;
  },

  // 내가 작성한 리뷰 목록
  getMyReviews: async (page: number = 0, size: number = 10) => {
    const response = await apiClient.get('/api/review/my', {
      params: { page, size },
    });
    return response.data;
  },

  // 내가 받은 리뷰 목록
  getReceivedReviews: async (page: number = 0, size: number = 10) => {
    const response = await apiClient.get('/api/review/received', {
      params: { page, size },
    });
    return response.data;
  },
};