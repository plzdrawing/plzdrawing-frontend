import apiClient from '../apiClient';
import {
  CreateMemberDto,
  MemberResponseDto,
  AuthCredentialsDto,
  LoginResponseDto,
} from '../api';

export const authController = {
  // 회원가입: POST
  signup: async (data: CreateMemberDto) => {
    const response = await apiClient.post<MemberResponseDto>('/api/auth/register', data);
    return response.data;
  },

  // 로그인: POST
  login: async (data: AuthCredentialsDto) => {
    const response = await apiClient.post<LoginResponseDto>('/api/auth/login', data);
    return response.data;
  },

  // 프로필 조회: GET
  checkProfile: async () => {
    const response = await apiClient.get<MemberResponseDto>('/api/auth/profile');
    return response.data;
  },

  // 구글 로그인: GET
  googleLogin: async () => {
    const response = await apiClient.get('/api/auth/google');
    return response.data;
  },

  // 구글 로그인 콜백: GET
  googleLoginCallback: async () => {
    const response = await apiClient.get('/api/auth/google/callback');
    return response.data;
  },

  // 카카오 로그인: GET
  kakaoLogin: async () => {
    const response = await apiClient.get('/api/auth/kakao');
    return response.data;
  },

  // 카카오 로그인 콜백: GET
  kakaoLoginCallback: async () => {
    const response = await apiClient.get('/api/auth/kakao/callback');
    return response.data;
  },
};
