import apiClient from '../apiClient';
import {
  CreateMemberDto,
  MemberResponseDto,
  AuthCredentialsDto,
  LoginResponseDto,
} from '../api';

export const authController = {
  // 회원가입
  signup: async (data: CreateMemberDto) => {
    const response = await apiClient.post<MemberResponseDto>('/api/auth/register', data);
    return response.data;
  },

  // 로그인
  login: async (data: AuthCredentialsDto) => {
    const response = await apiClient.post<LoginResponseDto>('/api/auth/login', data);
    return response.data;
  },

  // 프로필 조회
  checkProfile: async () => {
    const response = await apiClient.get<MemberResponseDto>('/api/auth/profile');
    return response.data;
  },
};
