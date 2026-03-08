import apiClient from '../apiClient';
import { LatestContentsPageResponseDto } from '../api';

export const postController = {
  getLatestPosts: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<LatestContentsPageResponseDto>('/api/posts', {
      params: { page, limit },
    });
    return response.data;
  },
};
