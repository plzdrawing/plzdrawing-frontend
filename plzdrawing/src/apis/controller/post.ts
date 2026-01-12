import apiClient from '../apiClient';
import {
  
} from '../api';

export const postController = {
  // 게시글 작성: POST
  uploadPost: async (images: any[], title: string, content: string, hashTag: string[]) => {
    const formData = new FormData();

    images.forEach((file, index) => {
      formData.append('multipartFiles', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    const contentObj: any = {
      title,
      content,
      hashTag,
    };

    const contentJson = JSON.stringify(contentObj);

    formData.append('content', {
      string: contentJson,
      type: 'application/json',
    } as any);

    const response = await apiClient.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // 최신 게시글 조회: GET
  getLatestPosts: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get(`/api/posts`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 멤버별 게시글 조회: GET
  getMemberPosts: async (memberId: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get(`/api/posts/member/${memberId}`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 게시글 상세 조회: GET
  getPostDetails: async (postId: string) => {
    const response = await apiClient.get(`/api/posts/${postId}`);
    return response.data;
  },

  // 게시글 수정: PATCH
  editPost: async (postId: string,) => {
    const response = await apiClient.patch(`/api/posts/${postId}`);
    return response.data;
  },

  // 게시글 삭제: DELETE
  deletePost: async (postId: string) => {
    const response = await apiClient.delete(`/api/posts/${postId}`);
    return response.data;
  },
};
