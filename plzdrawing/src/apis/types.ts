// API 공통 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
}

// 에러 응답 타입
export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

// API 요청/응답 관련 타입들
export interface LoginRequest {
  provider: "EMAIL" | "KAKAO" | "NAVER";
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 그림 관련 타입
export interface Drawing {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  description: string;
  date: string;
  userId: string;
  userName: string;
}

export interface CreateDrawingRequest {
  description: string;
  imageFile: FormData;
}

// 사용자 프로필 관련 타입
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  intro?: string;
  tags: string[];
  profileImage?: string;
  drawingsCount: number;
  reviewsCount: number;
  rating: number;
}

export interface UpdateProfileRequest {
  name?: string;
  intro?: string;
  tags?: string[];
  profileImage?: FormData;
}

// 리뷰 관련 타입
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userProfile?: string;
  rating: number;
  content: string;
  date: string;
}

export interface CreateReviewRequest {
  rating: number;
  content: string;
  targetUserId: string;
}

// 회원가입 요청 타입
export interface SignUpRequest {
  email: string;
  password: string;
  nickName: string;
  personalInfoConsent: boolean;
  acceptTermsOfUse: boolean;
  marketingConsent: boolean;
}

// 회원가입 응답 타입
export interface SignUpResponse {
  memberId: number;
}

// 비밀번호 변경 요청 타입
export interface PasswordUpdateRequest {
  email: string;
  nowPassword: string;
  newPassword: string;
}
