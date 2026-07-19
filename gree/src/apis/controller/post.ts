import apiClient from '../apiClient';
import { LatestContentsPageResponseDto, Post } from '../api';

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

export const postController = {
  // 포스트 생성
  createPost: async (
    images: File[] | ImageFile[],
    title: string,
    content: string,
    timeTaken?: string,
    price?: number,
    hashTag?: string[],
    category: 'REQUEST' | 'DRAWING' | 'ACCOUNT' | 'PAYMENT' | 'GUIDE' | 'ETC' = 'DRAWING',
  ): Promise<Post> => {
    const formData = new FormData();

    // 요청 데이터 로깅
    console.log('[PostController] 포스트 생성 요청:', {
      imagesCount: images.length,
      title,
      content,
      timeTaken,
      price,
      hashTag,
      category,
    });

    images.forEach((file) => {
      if (file instanceof File) {
        formData.append('images', file);
      } else {
        // ImageFile 객체인 경우, URL에서 fetch하여 File로 변환
        formData.append('images', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      }
    });

    if (title) formData.append('title', title);
    if (content) formData.append('content', content);
    // timeTaken과 price는 DRAWING 타입에서만 사용 가능
    if (category === 'DRAWING') {
      if (timeTaken) formData.append('timeTaken', timeTaken);
      if (price) formData.append('price', price.toString());
    }
    // 해시태그는 반드시 #으로 시작해야 함
    hashTag?.forEach((tag) => formData.append('hashTag', `#${tag}`));
    formData.append('category', category);

    try {
      const response = await apiClient.post<Post>('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('[PostController] 포스트 생성 성공:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[PostController] 포스트 생성 실패:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // 포스트 상세 조회
  getPost: async (postId: string) => {
    const response = await apiClient.get<Post>(`/api/posts/${postId}`);
    return response.data;
  },

  // 포스트 수정
  updatePost: async (
    postId: string,
    updates: {
      newImages?: File[] | ImageFile[];
      deleteImageIds?: number[];
      title?: string;
      content?: string;
      hashTag?: string[];
    },
  ): Promise<Post> => {
    const formData = new FormData();

    updates.newImages?.forEach((file) => {
      if (file instanceof File) {
        formData.append('newImages', file);
      } else {
        formData.append('newImages', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      }
    });

    updates.deleteImageIds?.forEach((id) => formData.append('deleteImageIds', id.toString()));

    if (updates.title) formData.append('title', updates.title);
    if (updates.content) formData.append('content', updates.content);
    updates.hashTag?.forEach((tag) => formData.append('hashTag', tag));

    const response = await apiClient.patch<Post>(`/api/posts/${postId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // 포스트 삭제
  deletePost: async (postId: string) => {
    await apiClient.delete(`/api/posts/${postId}`);
  },

  // 최신 포스트 조회
  getLatestPosts: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<LatestContentsPageResponseDto>('/api/posts', {
      params: { page, limit },
    });
    return response.data;
  },

  // 사용자 포스트 조회
  getMemberPosts: async (memberId: number, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<LatestContentsPageResponseDto>(`/api/member/v1/${memberId}/posts`, {
      params: { page, limit },
    });
    return response.data;
  },
};
