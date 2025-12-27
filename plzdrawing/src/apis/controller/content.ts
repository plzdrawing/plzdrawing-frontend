import apiClient from '../apiClient';
import {
  PageResponseLatestContentsResponse,
  UploadContentRequest,
  UploadContentResponse,
  UpdateContentRequest,
  PageResponseContentsDto,
} from '../api';

export const contentController = {
  // 최신순 콘텐츠 조회: GET
  getLatestPosts: async (page: number = 0, size: number = 10) => {
    const response = await apiClient.get<PageResponseLatestContentsResponse>('/api/content', {
      params: { page, size },
    });
    return response.data;
  },

  // 게시글 업로드: POST
  uploadPost: async (data: UploadContentRequest) => {
    const response = await apiClient.post<UploadContentResponse>('/api/content', data);
    return response.data;
  },

  // 게시글 수정: PATCH
  editPost: async (data: UpdateContentRequest) => {
    const response = await apiClient.patch(`/api/content`, data);
    return response.data;
  },

  // 멤버별 콘텐츠 조회: GET
  getMemberPosts: async (memberId: number, page: number = 0, size: number = 10) => {
    const response = await apiClient.get<PageResponseContentsDto>(`/api/content/${memberId}`, {
      params: { page, size },
    });
    return response.data;
  },
};
