/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProfileInfoResponse {
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname: string;
  /**
   * 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/image.jpg"
   */
  profileImageUrl: string;
  /**
   * 자기소개
   * @example "안녕하세요."
   */
  introduce: string;
  /**
   * 관심 태그 목록
   * @example ["그림","일러스트"]
   */
  hashTags: string[];
}

export interface CreateMemberDto {
  /**
   * 이메일
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * 비밀번호
   * @minLength 4
   * @example "password123"
   */
  password: string;
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname: string;
}

export interface MemberResponseDto {
  /**
   * 회원 ID
   * @example 1
   */
  id: number;
  /**
   * 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname: string;
  /**
   * 역할
   * @example "ROLE_MEMBER"
   */
  role: "ROLE_TEMP" | "ROLE_MEMBER" | "ROLE_ADMIN";
  /**
   * 가입 경로
   * @example "EMAIL"
   */
  provider: "EMAIL" | "KAKAO" | "NAVER" | "GOOGLE" | "APPLE";
  /**
   * 생성일
   * @format date-time
   * @example "2023-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 수정일
   * @format date-time
   * @example "2023-01-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export interface AuthCredentialsDto {
  /**
   * 이메일
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * 비밀번호
   * @minLength 4
   * @example "password123"
   */
  password: string;
}

export interface LoginResponseDto {
  /**
   * JWT 액세스 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  access_token: string;
}

export interface Profile {
  id: number;
  memberId: number;
  profileUrl: string;
  introduction: string;
  member: Member;
}

export interface PostImage {
  id: number;
  imageUrl: string;
  postId: number;
  post: Post;
}

export interface Comment {
  id: number;
  postId: number;
  memberId: number;
  content: string;
  /** @format date-time */
  createdAt: string;
  post: Post;
  member: Member;
}

export interface Scrap {
  id: number;
  memberId: number;
  postId: number;
  member: Member;
  post: Post;
}

export interface ReviewKeyword {
  id: number;
  keyword: string;
  isActive: boolean;
}

export interface ReviewKeywordMap {
  id: number;
  reviewId: number;
  keywordId: number;
  review: Review;
  keyword: ReviewKeyword;
}

export interface Review {
  id: number;
  content: string;
  star: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  writerId: number;
  receiverId: number;
  postId: number;
  /** @format date-time */
  createdAt: string;
  writer: Member;
  receiver: Member;
  post: Post;
  reviewKeywordMaps: ReviewKeywordMap[];
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  chatRoomId: number;
  imageUrl: string;
  type: "TEXT" | "IMAGE" | "SYSTEM";
  isRead: boolean;
  /** @format date-time */
  sentAt: string;
  sender: Member;
  chatRoom: ChatRoom;
}

export interface ChatRoom {
  id: number;
  status:
    | "REQUESTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "REVIEWED"
    | "CANCELLED";
  requesterId: number;
  artistId: number;
  postId: number;
  description: string;
  price: number;
  paidAmount: number;
  requester: Member;
  artist: Member;
  post: Post;
  messages: Message[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Post {
  /**
   * 게시글 ID
   * @example 1
   */
  id: number;
  /**
   * 작성자 ID
   * @example 1
   */
  memberId: number;
  /**
   * 제목
   * @example "그림 그려주세요"
   */
  title: string;
  /**
   * 카테고리
   * @example "REQUEST"
   */
  category: "REQUEST" | "DRAWING" | "ACCOUNT" | "PAYMENT" | "GUIDE" | "ETC";
  /**
   * 내용
   * @example "상세 내용입니다."
   */
  content: string;
  /**
   * 썸네일 URL
   * @example "https://example.com/image.jpg"
   */
  thumbnailUrl: string;
  member: Member;
  images: PostImage[];
  postTags: PostTag[];
  comments: Comment[];
  scraps: Scrap[];
  reviews: Review[];
  chatRooms: ChatRoom[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface PostTag {
  id: number;
  postId: number;
  tagId: number;
  status: "ACTIVE" | "DORMANT" | "INACTIVE";
  post: Post;
  tag: Tag;
}

export interface Tag {
  id: number;
  name: string;
  status: "ACTIVE" | "DORMANT" | "INACTIVE";
  createdById: number;
  createdBy: Member;
  memberTags: MemberTag[];
  postTags: PostTag[];
}

export interface MemberTag {
  id: number;
  memberId: number;
  tagId: number;
  status: "ACTIVE" | "DORMANT" | "INACTIVE";
  member: Member;
  tag: Tag;
}

export interface RefundHistory {
  id: number;
  reason: string;
  amount: number;
  /** @format date-time */
  refundedAt: string;
  paymentId: number;
  payment: PaymentHistory;
}

export interface PaymentHistory {
  id: number;
  senderId: number;
  receiverId: number;
  amount: number;
  method: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
  status: "PENDING" | "COMPLETED" | "REFUNDED" | "CANCELLED";
  type: "SEND" | "RECEIVE";
  chatRoomId: number;
  sender: Member;
  receiver: Member;
  refunds: RefundHistory[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Notification {
  id: number;
  memberId: number;
  senderId: number;
  receiverId: number;
  title: string;
  message: string;
  type:
    | "REQUEST_ARRIVED"
    | "PAYMENT_CONFIRMED"
    | "WORK_STARTED"
    | "WORK_COMPLETED"
    | "NEW_MESSAGE"
    | "REVIEW_RECEIVED";
  link: string;
  member: Member;
  sender: Member;
  receiver: Member;
}

export interface InquiryImage {
  id: number;
  imageUrl: string;
  inquiryId: number;
  inquiry: Inquiry;
}

export interface Inquiry {
  id: number;
  category: "DRAWING" | "ACCOUNT" | "PAYMENT" | "REVIEW" | "ETC";
  title: string;
  content: string;
  status: "PENDING" | "IN_PROGRESS" | "ANSWERED" | "CLOSED";
  answer: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  answeredAt: string;
  /** @format date-time */
  closedAt: string;
  memberId: number;
  adminId: number;
  member: Member;
  admin: Member;
  images: InquiryImage[];
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  adminId: number;
  admin: Member;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Terms {
  id: number;
  title: string;
  version: string;
  content: string;
  adminId: number;
  admin: Member;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Member {
  id: number;
  email: string;
  password: string;
  nickname: string;
  provider: "EMAIL" | "KAKAO" | "NAVER" | "GOOGLE" | "APPLE";
  status: "ACTIVE" | "DORMANT" | "INACTIVE";
  role: "ROLE_TEMP" | "ROLE_MEMBER" | "ROLE_ADMIN";
  isDeleted: boolean;
  isVerified: boolean;
  isMarketingAgreed: boolean;
  profile: Profile;
  memberTags: MemberTag[];
  createdTags: Tag[];
  posts: Post[];
  comments: Comment[];
  scraps: Scrap[];
  writtenReviews: Review[];
  receivedReviews: Review[];
  requestedChatRooms: ChatRoom[];
  artistChatRooms: ChatRoom[];
  messages: Message[];
  sentPayments: PaymentHistory[];
  receivedPayments: PaymentHistory[];
  notifications: Notification[];
  sentNotifications: Notification[];
  receivedNotifications: Notification[];
  inquiries: Inquiry[];
  answeredInquiries: Inquiry[];
  notices: Notice[];
  terms: Terms[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UploaderDto {
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/image.jpg"
   */
  profileImageUrl: string;
  /**
   * 그림 개수
   * @example 10
   */
  drawingCount: number;
  /**
   * 리뷰 개수
   * @example 5
   */
  reviewCount: number;
  /**
   * 별점
   * @example 4.5
   */
  star: number;
}

export interface ContentsDto {
  /**
   * 게시글 ID
   * @example 1
   */
  contentId: number;
  /**
   * 생성일
   * @format date-time
   * @example "2023-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * 이미지 URL 목록
   * @example ["https://example.com/image1.jpg"]
   */
  imageUrls: string[];
  /**
   * 태그 목록
   * @example ["그림","일러스트"]
   */
  tags: string[];
  /**
   * 설명
   * @example "멋진 그림입니다."
   */
  explanation: string;
  /**
   * 소요 시간
   * @example "1시간"
   */
  timeTaken: string;
  /**
   * 가격
   * @example 10000
   */
  price: number;
  /**
   * 좋아요 수
   * @example 10
   */
  likeCount: number;
}

export interface LatestContentsResponse {
  /** 업로더 정보 */
  uploader: UploaderDto;
  /** 게시글 정보 */
  contents: ContentsDto;
}

export interface LatestContentsPageResponseDto {
  /** 데이터 목록 */
  data: LatestContentsResponse[];
  /**
   * 총 데이터 수
   * @example 100
   */
  total: number;
  /**
   * 현재 페이지
   * @example 1
   */
  page: number;
  /**
   * 페이지 당 항목 수
   * @example 10
   */
  limit: number;
}

export interface ContentsPageResponseDto {
  /** 데이터 목록 */
  data: ContentsDto[];
  /**
   * 총 데이터 수
   * @example 100
   */
  total: number;
  /**
   * 현재 페이지
   * @example 1
   */
  page: number;
  /**
   * 페이지 당 항목 수
   * @example 10
   */
  limit: number;
}

export interface SendVerificationCodeDto {
  /**
   * 이메일
   * @format email
   * @example "user@example.com"
   */
  email: string;
}

export interface CodeGenerateForPasswordRequest {
  /**
   * 이메일
   * @format email
   * @example "user@example.com"
   */
  email: string;
}

export interface PasswordResetRequest {
  /**
   * 이메일
   * @format email
   * @example "user@example.com"
   */
  email: string;
  /**
   * 인증 코드
   * @example "123456"
   */
  authCode: string;
}

export interface UpdatePasswordRequest {
  /**
   * 현재 비밀번호
   * @example "password123"
   */
  nowPassword: string;
  /**
   * 새 비밀번호
   * @minLength 8
   * @example "newpassword123"
   */
  newPassword: string;
}

export interface CreateChatRoomDto {
  /**
   * 게시글 ID
   * @min 1
   * @example 1
   */
  postId: number;
  /**
   * 요청 설명
   * @maxLength 1000
   * @example "강아지 그림을 부탁드려요."
   */
  description?: string;
  /**
   * 요청 금액
   * @min 0
   * @example 5000
   */
  price?: number;
}

export interface ChatRoomPostDto {
  /**
   * 게시글 ID
   * @example 10
   */
  id: number;
  /**
   * 게시글 제목
   * @example "귀여운 그림"
   */
  title: string;
  /**
   * 게시글 썸네일 URL
   * @example "https://example.com/thumb.png"
   */
  thumbnailUrl?: string;
}

export interface ChatUserDto {
  /**
   * 회원 ID
   * @example 1
   */
  id: number;
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/profile.png"
   */
  profileImageUrl?: string;
}

export interface ChatRoomDetailResponseDto {
  /**
   * 채팅방 ID
   * @example 1
   */
  chatRoomId: number;
  /** @example "REQUESTED" */
  status:
    | "REQUESTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "REVIEWED"
    | "CANCELLED";
  post: ChatRoomPostDto;
  requester: ChatUserDto;
  artist: ChatUserDto;
  /**
   * 요청 설명
   * @example "강아지 그림 요청"
   */
  description?: string;
  /**
   * 요청 금액
   * @example 5000
   */
  price?: number;
  /**
   * 결제 금액
   * @example 5000
   */
  paidAmount?: number;
  /**
   * 생성 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  createdAt: string;
  /**
   * 업데이트 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt: string;
}

export interface ChatRoomCreateResponseDto {
  /**
   * 기존 채팅방 여부
   * @example false
   */
  isExisting: boolean;
  chatRoom: ChatRoomDetailResponseDto;
}

export interface LastMessageDto {
  /**
   * 메시지 ID
   * @example 100
   */
  id: number;
  /** @example "TEXT" */
  type: "TEXT" | "IMAGE" | "SYSTEM";
  /**
   * 메시지 내용
   * @example "안녕하세요"
   */
  content?: string;
  /**
   * 이미지 URL
   * @example "https://example.com/image.png"
   */
  imageUrl?: string;
  /**
   * 전송 시간
   * @format date-time
   * @example "2025-01-01T00:00:00.000Z"
   */
  sentAt: string;
}

export interface ChatRoomListItemDto {
  /**
   * 채팅방 ID
   * @example 1
   */
  chatRoomId: number;
  /**
   * 게시글 ID
   * @example 10
   */
  postId: number;
  /**
   * 게시글 제목
   * @example "귀여운 그림"
   */
  title: string;
  /**
   * 게시글 썸네일 URL
   * @example "https://example.com/thumb.png"
   */
  thumbnailUrl?: string;
  /** @example "REQUESTED" */
  status:
    | "REQUESTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "REVIEWED"
    | "CANCELLED";
  counterpart: ChatUserDto;
  lastMessage?: LastMessageDto;
  /**
   * 미읽음 메시지 수
   * @example 2
   */
  unreadCount: number;
  /**
   * 요청 금액
   * @example 5000
   */
  price?: number;
  /**
   * 결제 금액
   * @example 5000
   */
  paidAmount?: number;
  /**
   * 최근 업데이트 시간
   * @format date-time
   * @example "2025-01-01 12:00:00"
   */
  updatedAt: string;
}

export interface ChatRoomListResponseDto {
  /** 채팅방 목록 */
  data: ChatRoomListItemDto[];
  /**
   * 총 데이터 수
   * @example 100
   */
  total: number;
  /**
   * 현재 페이지
   * @example 1
   */
  page: number;
  /**
   * 페이지 당 항목 수
   * @example 10
   */
  limit: number;
}

export interface UpdateChatRoomStatusDto {
  /** @example "IN_PROGRESS" */
  status:
    | "REQUESTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "REVIEWED"
    | "CANCELLED";
}

export interface MessageResponseDto {
  /**
   * 메시지 ID
   * @example 100
   */
  id: number;
  /**
   * 채팅방 ID
   * @example 1
   */
  chatRoomId: number;
  /**
   * 발신자 ID
   * @example 5
   */
  senderId: number;
  /** @example "TEXT" */
  type: "TEXT" | "IMAGE" | "SYSTEM";
  /**
   * 메시지 내용
   * @example "안녕하세요"
   */
  content?: string;
  /**
   * 이미지 URL
   * @example "https://example.com/image.png"
   */
  imageUrl?: string;
  /**
   * 읽음 여부
   * @example false
   */
  isRead: boolean;
  /**
   * 전송 시간
   * @format date-time
   * @example "2025-01-01T00:00:00.000Z"
   */
  sentAt: string;
}

export interface MessageListResponseDto {
  /** 메시지 목록 */
  data: MessageResponseDto[];
}

export interface SendMessageDto {
  /**
   * 메시지 타입 (기본값 TEXT)
   * @example "TEXT"
   */
  type?: "TEXT" | "IMAGE" | "SYSTEM";
  /**
   * 텍스트 메시지 내용
   * @maxLength 2000
   * @example "안녕하세요 :)"
   */
  content?: string;
  /**
   * 이미지 object key
   * @example "chat/12/2026/02/uuid.png"
   */
  objectKey?: string;
  /**
   * 파일 크기 (bytes)
   * @min 1
   * @max 10485760
   * @example 5242880
   */
  size?: number;
  /**
   * MIME 타입
   * @example "image/png"
   */
  mimeType?: string;
  /**
   * 이미지 너비 (px)
   * @min 1
   * @example 1200
   */
  width?: number;
  /**
   * 이미지 높이 (px)
   * @min 1
   * @example 900
   */
  height?: number;
}

export interface ChatImageUploadResponseDto {
  /**
   * S3 업로드 presigned URL
   * @example "https://s3-presigned-put-url"
   */
  uploadUrl: string;
  /**
   * S3 object key
   * @example "chat/12/2026/02/uuid.png"
   */
  objectKey: string;
  /**
   * URL 만료 시각(ISO)
   * @example "2026-02-01T12:00:00Z"
   */
  expiresAt: string;
}

export interface ReadChatDto {
  /**
   * 마지막으로 읽은 메시지 ID
   * @min 1
   * @example 150
   */
  lastReadMessageId?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title PlzDrawing API
 * @version 1.0
 * @contact
 *
 * PlzDrawing API 문서
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags App
     * @name AppControllerGetHello
     * @request GET:/api
     */
    appControllerGetHello: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description 프로필 정보를 업로드합니다. file은 선택이며 업로드 시 파일 최대 크기는 5MB입니다.
     *
     * @tags Member
     * @name MemberControllerUploadProfile
     * @summary 프로필 업로드
     * @request POST:/api/member/profile
     * @secure
     */
    memberControllerUploadProfile: (
      data: {
        /**
         * 프로필 이미지 파일(선택), 최대 5MB
         * @format binary
         */
        file?: File;
        introduce?: string;
        hashTag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, void>({
        path: `/api/member/profile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description 프로필 정보를 수정합니다. file은 선택이며 업로드 시 파일 최대 크기는 5MB입니다.
     *
     * @tags Member
     * @name MemberControllerUpdateProfile
     * @summary 프로필 수정
     * @request PATCH:/api/member/v1/profile
     * @secure
     */
    memberControllerUpdateProfile: (
      data: {
        /**
         * 프로필 이미지 파일(선택), 최대 5MB
         * @format binary
         */
        file?: File;
        nickname?: string;
        introduce?: string;
        hashTag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, void>({
        path: `/api/member/v1/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerGetMyProfile
     * @summary 내 프로필 조회
     * @request GET:/api/member/v1/me
     * @secure
     */
    memberControllerGetMyProfile: (params: RequestParams = {}) =>
      this.request<ProfileInfoResponse, any>({
        path: `/api/member/v1/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerCheckNickname
     * @summary 닉네임 중복 확인
     * @request GET:/api/member/check-nickname
     */
    memberControllerCheckNickname: (
      query: {
        nickname: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, void>({
        path: `/api/member/check-nickname`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerWithdraw
     * @summary 회원 탈퇴
     * @request DELETE:/api/member/v1/withdraw
     * @secure
     */
    memberControllerWithdraw: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/member/v1/withdraw`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary 회원가입
     * @request POST:/api/auth/register
     */
    authControllerRegister: (
      data: CreateMemberDto,
      params: RequestParams = {},
    ) =>
      this.request<MemberResponseDto, void>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary 로그인
     * @request POST:/api/auth/login
     */
    authControllerLogin: (
      data: AuthCredentialsDto,
      params: RequestParams = {},
    ) =>
      this.request<LoginResponseDto, void>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGetProfile
     * @summary 프로필 조회
     * @request GET:/api/auth/profile
     * @secure
     */
    authControllerGetProfile: (params: RequestParams = {}) =>
      this.request<MemberResponseDto, any>({
        path: `/api/auth/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleAuth
     * @summary 구글 로그인
     * @request GET:/api/auth/google
     */
    authControllerGoogleAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/google`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleAuthRedirect
     * @summary 구글 로그인 콜백
     * @request GET:/api/auth/google/callback
     */
    authControllerGoogleAuthRedirect: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 사용자를 카카오 로그인 페이지로 리다이렉트합니다.
     *
     * @tags Auth
     * @name AuthControllerKakaoAuth
     * @summary 카카오 로그인 진입
     * @request GET:/api/auth/kakao
     */
    authControllerKakaoAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/kakao`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 카카오 인증 완료 후, 유저 정보를 조회하여 JWT 토큰을 발급하고 프론트엔드 URL로 리다이렉트합니다.
     *
     * @tags Auth
     * @name AuthControllerKakaoAuthRedirect
     * @summary 카카오 로그인 콜백
     * @request GET:/api/auth/kakao/callback
     */
    authControllerKakaoAuthRedirect: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/kakao/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 게시글과 이미지를 함께 업로드합니다. images는 선택이며 최대 5개, 파일당 최대 10MB입니다.
     *
     * @tags Post
     * @name PostControllerCreate
     * @summary 게시글 작성
     * @request POST:/api/posts
     * @secure
     */
    postControllerCreate: (
      data: {
        /** 업로드 이미지 목록(선택), 최대 5개, 파일당 최대 10MB */
        images?: File[];
        title?: string;
        content?: string;
        hashTag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Post, void>({
        path: `/api/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerGetLatestContents
     * @summary 최신 게시글 조회
     * @request GET:/api/posts
     */
    postControllerGetLatestContents: (
      query?: {
        /**
         * 페이지 번호
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * 페이지 당 항목 수
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<LatestContentsPageResponseDto, any>({
        path: `/api/posts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerGetMemberContents
     * @summary 멤버별 게시글 조회
     * @request GET:/api/posts/member/{memberId}
     */
    postControllerGetMemberContents: (
      memberId: string,
      query?: {
        /**
         * 페이지 번호
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * 페이지 당 항목 수
         * @min 1
         * @default 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContentsPageResponseDto, any>({
        path: `/api/posts/member/${memberId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerFindOne
     * @summary 게시글 상세 조회
     * @request GET:/api/posts/{id}
     */
    postControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/posts/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerUpdate
     * @summary 게시글 수정
     * @request PATCH:/api/posts/{id}
     * @secure
     */
    postControllerUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/posts/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerRemove
     * @summary 게시글 삭제
     * @request DELETE:/api/posts/{id}
     * @secure
     */
    postControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/posts/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerSendEmailForVerification
     * @summary 이메일 인증 코드 발송
     * @request POST:/api/auth/email/v1/email-verification
     */
    emailControllerSendEmailForVerification: (
      data: SendVerificationCodeDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/email/v1/email-verification`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerVerifyEmail
     * @summary 이메일 인증 코드 검증
     * @request GET:/api/auth/email/v1/email-verification
     */
    emailControllerVerifyEmail: (
      query: {
        email: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, void>({
        path: `/api/auth/email/v1/email-verification`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerCancelEmailVerification
     * @summary 이메일 인증 취소
     * @request DELETE:/api/auth/email/v1/email-verification/cancel
     */
    emailControllerCancelEmailVerification: (
      query: {
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/email/v1/email-verification/cancel`,
        method: "DELETE",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerSendEmailForReissuePassword
     * @summary 비밀번호 재설정 인증 코드 발송
     * @request POST:/api/auth/email/v1/password/reissue
     */
    emailControllerSendEmailForReissuePassword: (
      data: CodeGenerateForPasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/email/v1/password/reissue`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerReissuePassword
     * @summary 비밀번호 재설정
     * @request PATCH:/api/auth/email/v1/password/reissue
     */
    emailControllerReissuePassword: (
      data: PasswordResetRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/email/v1/password/reissue`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Email
     * @name EmailControllerUpdatePassword
     * @summary 비밀번호 변경
     * @request PATCH:/api/auth/email/v1/password/update
     * @secure
     */
    emailControllerUpdatePassword: (
      data: UpdatePasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/auth/email/v1/password/update`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Alarm
     * @name AlarmControllerFcmTest
     * @summary FCM 알림 전송 테스트
     * @request POST:/api/fcm/v1/test
     */
    alarmControllerFcmTest: (params: RequestParams = {}) =>
      this.request<boolean, void>({
        path: `/api/fcm/v1/test`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description 게시글 기반으로 채팅방을 생성합니다. 동일한 조합(게시글/요청자/작가)이 이미 존재하면 기존 채팅방을 반환합니다.
     *
     * @tags Chat
     * @name ChatControllerCreateChatRoom
     * @summary 채팅방 생성
     * @request POST:/api/chats
     * @secure
     */
    chatControllerCreateChatRoom: (
      data: CreateChatRoomDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomCreateResponseDto, void>({
        path: `/api/chats`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 참여 중인 채팅방 목록을 최신 업데이트 순으로 조회합니다. status/unreadOnly/page/limit 파라미터를 지원합니다.
     *
     * @tags Chat
     * @name ChatControllerGetChatRooms
     * @summary 내 채팅방 목록
     * @request GET:/api/chats
     * @secure
     */
    chatControllerGetChatRooms: (
      query?: {
        /**
         * 페이지 번호
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * 페이지 당 항목 수
         * @min 1
         * @default 10
         */
        limit?: number;
        /**
         * 채팅방 상태 필터
         * @example "REQUESTED"
         */
        status?:
          | "REQUESTED"
          | "PAID"
          | "IN_PROGRESS"
          | "COMPLETED"
          | "REVIEWED"
          | "CANCELLED";
        /**
         * 미읽음 채팅방만 조회
         * @example true
         */
        unreadOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomListResponseDto, void>({
        path: `/api/chats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 채팅방 상세 정보(게시글/참여자/금액/상태)를 조회합니다.
     *
     * @tags Chat
     * @name ChatControllerGetChatRoomDetail
     * @summary 채팅방 상세 조회
     * @request GET:/api/chats/{id}
     * @secure
     */
    chatControllerGetChatRoomDetail: (id: string, params: RequestParams = {}) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 채팅방 상태를 변경하고 시스템 메시지(STATUS_CHANGED)를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerUpdateChatRoomStatus
     * @summary 채팅방 상태 변경
     * @request PATCH:/api/chats/{id}/status
     * @secure
     */
    chatControllerUpdateChatRoomStatus: (
      id: string,
      data: UpdateChatRoomStatusDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 채팅 메시지를 조회합니다. beforeId/afterId는 동시에 사용할 수 없습니다.
     *
     * @tags Chat
     * @name ChatControllerGetMessages
     * @summary 채팅 메시지 목록 조회
     * @request GET:/api/chats/{id}/messages
     * @secure
     */
    chatControllerGetMessages: (
      id: string,
      query?: {
        /**
         * 이전 메시지 기준 ID (afterId와 동시 사용 불가)
         * @min 1
         * @example 120
         */
        beforeId?: number;
        /**
         * 이후 메시지 기준 ID (beforeId와 동시 사용 불가)
         * @min 1
         * @example 150
         */
        afterId?: number;
        /**
         * 조회 개수
         * @min 1
         * @default 30
         * @example 30
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<MessageListResponseDto, void>({
        path: `/api/chats/${id}/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 텍스트 또는 이미지 메시지를 전송하고 채팅방 updatedAt을 갱신합니다.
     *
     * @tags Chat
     * @name ChatControllerSendMessage
     * @summary 메시지 전송
     * @request POST:/api/chats/{id}/messages
     * @secure
     */
    chatControllerSendMessage: (
      id: string,
      data: SendMessageDto,
      params: RequestParams = {},
    ) =>
      this.request<MessageResponseDto, void>({
        path: `/api/chats/${id}/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description 이미지 파일(필수)을 업로드하여 IMAGE 타입 메시지를 전송합니다. 파일 최대 크기는 10MB입니다.
     *
     * @tags Chat
     * @name ChatControllerSendImageMessage
     * @summary 이미지 메시지 전송
     * @request POST:/api/chats/{id}/messages/image-upload
     * @secure
     */
    chatControllerSendImageMessage: (
      id: string,
      data: {
        /**
         * 전송할 이미지 파일(필수), 최대 10MB
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChatImageUploadResponseDto, void>({
        path: `/api/chats/${id}/messages/image-upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description 상대방이 보낸 미읽음 메시지를 읽음 처리합니다. lastReadMessageId를 지정하면 해당 ID 이하만 처리합니다.
     *
     * @tags Chat
     * @name ChatControllerMarkAsRead
     * @summary 메시지 읽음 처리
     * @request PATCH:/api/chats/{id}/read
     * @secure
     */
    chatControllerMarkAsRead: (
      id: string,
      data: ReadChatDto,
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api/chats/${id}/read`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  chatTest = {
    /**
     * No description
     *
     * @tags App
     * @name AppControllerGetChatTest
     * @request GET:/chat-test
     */
    appControllerGetChatTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/chat-test`,
        method: "GET",
        ...params,
      }),
  };
}
