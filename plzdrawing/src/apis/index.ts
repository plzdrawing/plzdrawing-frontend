// API 클라이언트
export { default as apiClient } from './client';

// API 서비스들
export { authApi } from './auth';
export { userApi } from './user';
export { drawingApi } from './drawing';
export { reviewApi } from './review';

// 타입 정의들
export * from './types';

// API 설정 상수
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
    CHECK_EMAIL: '/auth/check-email',
    PASSWORD_RESET_REQUEST: '/auth/password-reset-request',
    PASSWORD_RESET: '/auth/password-reset',
  },
  USER: {
    PROFILE: '/user/profile',
    DRAWINGS: '/user/:userId/drawings',
    REVIEWS: '/user/:userId/reviews',
    PASSWORD: '/user/password',
    ACCOUNT: '/user/account',
  },
  DRAWINGS: {
    LIST: '/drawings',
    DETAIL: '/drawings/:id',
    LIKE: '/drawings/:id/like',
    LIKED: '/drawings/liked',
    SEARCH: '/drawings/search',
  },
  REVIEWS: {
    LIST: '/reviews/user/:userId',
    CREATE: '/reviews',
    DETAIL: '/reviews/:id',
    MY: '/reviews/my',
    STATS: '/reviews/user/:userId/stats',
  },
} as const;