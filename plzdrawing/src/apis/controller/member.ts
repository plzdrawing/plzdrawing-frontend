import apiClient from '../apiClient';
import {
  UpsertProfileRequest,
  ProfileInfoResponse,
  UpdateProfileRequest,
} from '../api';

export const memberController = {
  // 프로필 업로드: POST
  uploadProfile: async (data: UpsertProfileRequest) => {
    const response = await apiClient.post('/api/member/profile', data);
    return response.data;
  },

  // 마이페이지 사용자 정보 조회: GET
  checkMyPage: async () => {
    const response = await apiClient.get<ProfileInfoResponse>('/api/member/v1/me');
    return response.data;
  },

  // 프로필 수정: PATCH
  editProfile: async (data: UpdateProfileRequest) => {
    const response = await apiClient.patch('/api/member/v1/profile', data);
    return response.data;
  },

  // 회원 탈퇴: DELETE
  withdrawMember: async () => {
    const response = await apiClient.delete('/api/member/v1/withdraw');
    return response.data;
  },
};
