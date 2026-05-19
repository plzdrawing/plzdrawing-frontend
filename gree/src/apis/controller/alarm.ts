import apiClient from '../apiClient';
import { NotificationPreferenceResponseDto } from '../api';

export interface FcmTestResponse {
  success: boolean;
  message: string;
}

export const alarmController = {
  // FCM 테스트 알림 전송
  sendFcmTestNotification: async () => {
    const response = await apiClient.post<FcmTestResponse>('/api/alarms/fcm-test');
    return response.data;
  },

  // 알림 조회
  getNotifications: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get('/api/alarms', {
      params: { page, limit },
    });
    return response.data;
  },

  // 알림 상세 조회
  getNotification: async (alarmId: number) => {
    const response = await apiClient.get(`/api/alarms/${alarmId}`);
    return response.data;
  },

  // 알림 읽음 표시
  markAsRead: async (alarmId: number) => {
    const response = await apiClient.patch(`/api/alarms/${alarmId}/read`);
    return response.data;
  },

  // 모든 알림 읽음 표시
  markAllAsRead: async () => {
    await apiClient.patch('/api/alarms/read-all');
  },

  // 알림 삭제
  deleteNotification: async (alarmId: number) => {
    await apiClient.delete(`/api/alarms/${alarmId}`);
  },

  // 모든 알림 삭제
  deleteAllNotifications: async () => {
    await apiClient.delete('/api/alarms');
  },

  // 알림 설정 조회
  getNotificationPreferences: async () => {
    const response = await apiClient.get<NotificationPreferenceResponseDto>(
      '/api/alarms/preferences',
    );
    return response.data;
  },

  // 알림 설정 업데이트
  updateNotificationPreferences: async (data: Partial<NotificationPreferenceResponseDto>) => {
    const response = await apiClient.patch<NotificationPreferenceResponseDto>(
      '/api/alarms/preferences',
      data,
    );
    return response.data;
  },
};
