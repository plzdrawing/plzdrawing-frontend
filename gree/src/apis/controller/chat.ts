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

export type ChatRoomStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'DRAFT_SENT'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED';

export type ChatImageSendStage =
  | 'READ_LOCAL_FILE'
  | 'ISSUE_UPLOAD_URL'
  | 'UPLOAD_TO_S3'
  | 'SEND_IMAGE_MESSAGE';

export class ChatImageSendError extends Error {
  stage: ChatImageSendStage;
  statusCode?: number;
  detail?: string;

  constructor(stage: ChatImageSendStage, message: string, statusCode?: number, detail?: string) {
    super(message);
    this.name = 'ChatImageSendError';
    this.stage = stage;
    this.statusCode = statusCode;
    this.detail = detail;
  }
}

function toChatImageSendError(
  stage: ChatImageSendStage,
  error: any,
  fallbackMessage: string,
): ChatImageSendError {
  if (error instanceof ChatImageSendError) return error;

  const statusCode = error?.response?.status;
  const detail =
    error?.response?.data?.message ??
    error?.response?.data?.error ??
    error?.message;

  return new ChatImageSendError(stage, fallbackMessage, statusCode, detail);
}

async function uploadChatImageObjectKey(
  chatRoomId: number,
  image: { uri: string; name: string; type: string; size?: number; width?: number; height?: number },
) {
  let localBlob: Blob;
  let fileSize = 0;
  let contentType = image.type || 'image/jpeg';

  try {
    const localResponse = await fetch(image.uri);
    if (!localResponse.ok) {
      throw new Error(`Local image read failed (${localResponse.status})`);
    }

    localBlob = await localResponse.blob();
    fileSize = image.size ?? localBlob.size ?? 0;

    if (!fileSize || fileSize <= 0) {
      throw new Error('이미지 파일 크기를 확인할 수 없습니다.');
    }
    if (fileSize > 10 * 1024 * 1024) {
      throw new Error('파일 크기가 10MB를 초과했습니다.');
    }

    contentType = image.type || localBlob.type || 'image/jpeg';
  } catch (error: any) {
    throw toChatImageSendError('READ_LOCAL_FILE', error, '이미지 파일 읽기 단계에서 실패했습니다.');
  }

  let uploadUrl = '';
  let objectKey = '';

  try {
    const issueUploadResponse = await apiClient.post<ChatImageUploadResponseDto>(
      `/api/chats/${chatRoomId}/messages/image-upload`,
      {
        fileName: image.name,
        contentType,
        size: fileSize,
        width: image.width,
        height: image.height,
      },
    );

    uploadUrl = issueUploadResponse.data.uploadUrl;
    objectKey = issueUploadResponse.data.objectKey;
  } catch (error: any) {
    throw toChatImageSendError('ISSUE_UPLOAD_URL', error, '업로드 URL 발급 단계에서 실패했습니다.');
  }

  try {
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: localBlob,
    });

    if (!uploadResponse.ok) {
      throw new ChatImageSendError(
        'UPLOAD_TO_S3',
        `S3 업로드 실패 (${uploadResponse.status})`,
        uploadResponse.status,
      );
    }
  } catch (error: any) {
    throw toChatImageSendError('UPLOAD_TO_S3', error, 'S3 업로드 단계에서 실패했습니다.');
  }

  return { objectKey, fileSize, contentType };
}

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

  deleteChatRoom: async (chatRoomId: number) => {
    await apiClient.delete<void>(`/api/chats/${chatRoomId}`);
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
    if (!Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width! < 1 || image.height! < 1) {
      throw new ChatImageSendError(
        'SEND_IMAGE_MESSAGE',
        '이미지 가로/세로 정보(width, height)가 올바르지 않습니다.',
      );
    }

    const { objectKey, fileSize, contentType } = await uploadChatImageObjectKey(chatRoomId, image);

    const messageData: SendMessageDto = {
      type: 'IMAGE',
      objectKey,
      size: fileSize,
      mimeType: contentType,
      width: image.width,
      height: image.height,
    };

    try {
      const response = await apiClient.post<MessageResponseDto>(
        `/api/chats/${chatRoomId}/messages`,
        messageData,
      );
      return response.data;
    } catch (error: any) {
      throw toChatImageSendError('SEND_IMAGE_MESSAGE', error, '이미지 메시지 전송 단계에서 실패했습니다.');
    }
  },

  sendDrawingImage: async (
    chatRoomId: number,
    image: { uri: string; name: string; type: string; size?: number; width?: number; height?: number },
  ) => {
    const { objectKey } = await uploadChatImageObjectKey(chatRoomId, image);
    const response = await apiClient.post<SendDrawingResponseDto>(
      `/api/chats/${chatRoomId}/send-drawing`,
      { imageObjectKeys: [objectKey] },
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
