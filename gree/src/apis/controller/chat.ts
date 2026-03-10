import apiClient from '../apiClient';
import {
  CreateChatRoomDto,
  ChatRoomCreateResponseDto,
  ChatRoomDetailResponseDto,
  ChatRoomListResponseDto,
  UpdateChatRoomStatusDto,
  MessageListResponseDto,
  MessageResponseDto,
  SendMessageDto,
  ChatImageUploadResponseDto,
  ReadChatDto,
} from '../api';

export type ChatRoomStatus =
  | 'REQUESTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED';

export const chatController = {
  createChatRoom: async (data: CreateChatRoomDto) => {
    const response = await apiClient.post<ChatRoomCreateResponseDto>('/api/chats', data);
    return response.data;
  },

  getChatRooms: async (params?: {
    page?: number;
    limit?: number;
    status?: ChatRoomStatus;
    unreadOnly?: boolean;
  }) => {
    const response = await apiClient.get<ChatRoomListResponseDto>('/api/chats', {
      params: { page: 1, limit: 20, ...params },
    });
    return response.data;
  },

  getChatRoomDetail: async (chatRoomId: number) => {
    const response = await apiClient.get<ChatRoomDetailResponseDto>(`/api/chats/${chatRoomId}`);
    return response.data;
  },

  updateChatRoomStatus: async (chatRoomId: number, data: UpdateChatRoomStatusDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/status`,
      data,
    );
    return response.data;
  },

  getMessages: async (
    chatRoomId: number,
    params?: { beforeId?: number; afterId?: number; limit?: number },
  ) => {
    const response = await apiClient.get<MessageListResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      { params: { limit: 30, ...params } },
    );
    return response.data;
  },

  sendTextMessage: async (chatRoomId: number, content: string) => {
    const data: SendMessageDto = { type: 'TEXT', content };
    const response = await apiClient.post<MessageResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      data,
    );
    return response.data;
  },

  sendImageMessage: async (
    chatRoomId: number,
    imageInfo: { objectKey: string; size: number; mimeType: string; width: number; height: number },
  ) => {
    const data: SendMessageDto = { type: 'IMAGE', ...imageInfo };
    const response = await apiClient.post<MessageResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      data,
    );
    return response.data;
  },

  getImageUploadUrl: async (chatRoomId: number) => {
    const response = await apiClient.get<ChatImageUploadResponseDto>(
      `/api/chats/${chatRoomId}/messages/image-upload-url`,
    );
    return response.data;
  },

  markAsRead: async (chatRoomId: number, data: ReadChatDto) => {
    const response = await apiClient.patch<{ updatedCount: number }>(
      `/api/chats/${chatRoomId}/read`,
      data,
    );
    return response.data;
  },
};
