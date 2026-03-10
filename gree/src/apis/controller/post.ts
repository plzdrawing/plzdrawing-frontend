import apiClient from '../apiClient';
import { LatestContentsPageResponseDto, Post } from '../api';

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

export const postController = {
  uploadPost: async (
    images: ImageFile[],
    title: string,
    content: string,
    hashTag: string[],
  ): Promise<Post> => {
    const formData = new FormData();

    images.forEach((file) => {
      formData.append('images', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    if (title) formData.append('title', title);
    if (content) formData.append('content', content);
    hashTag.forEach((tag) => formData.append('hashTag', tag));

    const response = await apiClient.post<Post>('/api/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getLatestPosts: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<LatestContentsPageResponseDto>('/api/posts', {
      params: { page, limit },
    });
    return response.data;
  },
};
