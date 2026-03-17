import apiClient from '../apiClient';
import {
  CreateMemberDto,
  MemberResponseDto,
  AuthCredentialsDto,
  LoginResponseDto,
} from '../api';

const BASE_URL = 'https://plzdrawing.o-r.kr';

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

  // 구글 로그인 진입 URL 생성
  getGoogleLoginUrl: (redirectUri?: string) => {
    if (!redirectUri) return `${BASE_URL}/api/auth/google`;
    return `${BASE_URL}/api/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  // 카카오 로그인 진입 URL 생성
  getKakaoLoginUrl: (redirectUri?: string) => {
    if (!redirectUri) return `${BASE_URL}/api/auth/kakao`;
    return `${BASE_URL}/api/auth/kakao?redirect_uri=${encodeURIComponent(redirectUri)}`;
  },

  // 구글 로그인 콜백 코드 교환
  googleLoginCallback: async (code: string, redirectUri?: string) => {
    const response = await apiClient.get('/api/auth/google/callback', {
      params: {
        code,
        ...(redirectUri ? { redirect_uri: redirectUri } : {}),
      },
    });
    return response.data;
  },

  // 카카오 로그인 콜백 코드 교환
  kakaoLoginCallback: async (code: string, redirectUri?: string) => {
    const response = await apiClient.get('/api/auth/kakao/callback', {
      params: {
        code,
        ...(redirectUri ? { redirect_uri: redirectUri } : {}),
      },
    });
    return response.data;
  },
};
