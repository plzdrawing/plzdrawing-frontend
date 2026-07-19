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

/** 채팅방 상태 */
export type ChatRoomStatus =
  | 'REQUESTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED';

export const chatController = {
  /**
   * 채팅방 생성
   * - 동일한 조합(게시글/요청자/작가)이 이미 존재하면 기존 채팅방 반환
   * - isExisting: true → 기존 채팅방 재사용 안내 가능
   */
  createChatRoom: async (data: CreateChatRoomDto) => {
    const response = await apiClient.post<ChatRoomCreateResponseDto>('/api/chats', data);
    return response.data;
  },

  /**
   * 내 채팅방 목록
   * - 최신 업데이트 순 정렬
   * - status 필터, unreadOnly 옵션 지원
   */
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

  /**
   * 채팅방 상세 조회
   * - 게시글 정보, 참여자, 금액, 상태 포함
   */
  getChatRoomDetail: async (chatRoomId: number) => {
    const response = await apiClient.get<ChatRoomDetailResponseDto>(`/api/chats/${chatRoomId}`);
    return response.data;
  },

  /**
   * 채팅방 상태 변경
   * - REQUESTED → IN_PROGRESS → COMPLETED → REVIEWED
   * - 상태 변경 시 시스템 메시지 자동 생성
   */
  updateChatRoomStatus: async (chatRoomId: number, data: UpdateChatRoomStatusDto) => {
    const response = await apiClient.patch<ChatRoomDetailResponseDto>(
      `/api/chats/${chatRoomId}/status`,
      data,
    );
    return response.data;
  },

  /**
   * 채팅 메시지 목록 조회 (커서 기반 페이지네이션)
   * - beforeId: 이 ID보다 이전 메시지 조회 (위로 스크롤)
   * - afterId: 이 ID보다 이후 메시지 조회 (새 메시지 폴링)
   * - beforeId / afterId 동시 사용 불가
   */
  getMessages: async (
    chatRoomId: number,
    params?: {
      beforeId?: number;
      afterId?: number;
      limit?: number;
    },
  ) => {
    const response = await apiClient.get<MessageListResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      { params: { limit: 30, ...params } },
    );
    return response.data;
  },

  /**
   * 텍스트 메시지 전송
   */
  sendTextMessage: async (chatRoomId: number, content: string) => {
    const data: SendMessageDto = { type: 'TEXT', content };
    const response = await apiClient.post<MessageResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      data,
    );
    return response.data;
  },

  /**
   * 이미지 메시지 전송 (S3 업로드 후 objectKey 전달 방식)
   */
  sendImageMessage: async (
    chatRoomId: number,
    imageInfo: {
      objectKey: string;
      size: number;
      mimeType: string;
      width: number;
      height: number;
    },
  ) => {
    const data: SendMessageDto = { type: 'IMAGE', ...imageInfo };
    const response = await apiClient.post<MessageResponseDto>(
      `/api/chats/${chatRoomId}/messages`,
      data,
    );
    return response.data;
  },

  /**
   * 이미지 업로드용 presigned URL 발급
   * - 반환된 uploadUrl로 PUT 요청하여 S3에 직접 업로드
   * - 업로드 완료 후 objectKey를 sendImageMessage에 전달
   */
  getImageUploadUrl: async (chatRoomId: number) => {
    const response = await apiClient.post<ChatImageUploadResponseDto>(
      `/api/chats/${chatRoomId}/messages/image-upload`,
      {},
    );
    return response.data;
  },

  /**
   * 메시지 읽음 처리
   * - 상대방이 보낸 미읽음 메시지를 읽음으로 표시
   * - lastReadMessageId 이하 메시지 일괄 처리
   */
  markAsRead: async (chatRoomId: number, data: ReadChatDto) => {
    const response = await apiClient.patch<{ updatedCount: number }>(
      `/api/chats/${chatRoomId}/read`,
      data,
    );
    return response.data;
  },
};
