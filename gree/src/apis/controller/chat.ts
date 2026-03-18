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
  ReadChatDto,
  ChatImageUploadResponseDto,
  UpdateChatRequestDto,
  AcceptChatDto,
  RejectChatDto,
  RequestPriceChangeDto,
  PayChatDto,
  PayChatResponseDto,
  SendDrawingDto,
  SendDrawingResponseDto,
  RevisionRequestDto,
} from '../api';
import { File } from 'expo-file-system';

export type ChatRoomStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'DRAFT_SENT'
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
    image: { uri: string; name: string; type: string; size?: number; width?: number; height?: number },
  ) => {
    const localFile = new File(image.uri);
    if (!localFile.exists) {
      throw new Error('Local image file not found');
    }

    const fileInfo = localFile.info();
    const fileSize = image.size ?? Number(fileInfo.size ?? 0);

    const issueUploadResponse = await apiClient.post<ChatImageUploadResponseDto>(
      `/api/chats/${chatRoomId}/messages/image-upload`,
      {
        fileName: image.name,
        contentType: image.type,
        size: fileSize,
        width: image.width,
        height: image.height,
      },
    );

    const { uploadUrl, objectKey } = issueUploadResponse.data;
    const fileBytes = await localFile.bytes();

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': image.type,
      },
      body: fileBytes,
    });

    if (!uploadResponse.ok) {
      throw new Error(`S3 upload failed (${uploadResponse.status})`);
    }

    const messageData: SendMessageDto = {
      type: 'IMAGE',
      objectKey,
      size: fileSize,
      mimeType: image.type,
      width: image.width,
      height: image.height,
    };

    const response = await apiClient.post<MessageResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      messageData,
    );
    return response.data;
  },

  updateChatRequest: async (chatRoomId: number, data: UpdateChatRequestDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/request`,
      data,
    );
    return response.data;
  },

  acceptChatRoom: async (chatRoomId: number, data: AcceptChatDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/accept`,
      data,
    );
    return response.data;
  },

  rejectChatRoom: async (chatRoomId: number, data: RejectChatDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/reject`,
      data,
    );
    return response.data;
  },

  cancelChatRoom: async (chatRoomId: number) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/cancel`,
    );
    return response.data;
  },

  requestPriceChange: async (chatRoomId: number, data: RequestPriceChangeDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/request-price-change`,
      data,
    );
    return response.data;
  },

  payChatRoom: async (chatRoomId: number, data: PayChatDto) => {
    const response = await apiClient.patch<PayChatResponseDto>(
      `/api/chats/${chatRoomId}/pay`,
      data,
    );
    return response.data;
  },

  startWork: async (chatRoomId: number) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/start`,
    );
    return response.data;
  },

  sendDrawing: async (chatRoomId: number, data: SendDrawingDto) => {
    const response = await apiClient.post<SendDrawingResponseDto>(
      `/api/chats/${chatRoomId}/send-drawing`,
      data,
    );
    return response.data;
  },

  requestRevision: async (chatRoomId: number, data: RevisionRequestDto) => {
    const response = await apiClient.post<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/revision`,
      data,
    );
    return response.data;
  },

  confirmDrawing: async (chatRoomId: number) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/confirm`,
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
