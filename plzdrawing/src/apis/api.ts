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
   * @example "user@example.com"
   */
  email: string;
  /**
   * 비밀번호
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
   * @example "user@example.com"
   */
  email: string;
  /**
   * 비밀번호
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
   * @example "user@example.com"
   */
  email: string;
}

export interface CodeGenerateForPasswordRequest {
  /**
   * 이메일
   * @example "user@example.com"
   */
  email: string;
}

export interface PasswordResetRequest {
  /**
   * 이메일
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
   * @example "newpassword123"
   */
  newPassword: string;
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
      this.request<void, any>({
        path: `/api`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerUploadProfile
     * @summary 프로필 업로드
     * @request POST:/api/member/profile
     * @secure
     */
    memberControllerUploadProfile: (
      data: {
        /** @format binary */
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
     * No description
     *
     * @tags Member
     * @name MemberControllerUpdateProfile
     * @summary 프로필 수정
     * @request PATCH:/api/member/v1/profile
     * @secure
     */
    memberControllerUpdateProfile: (
      data: {
        /** @format binary */
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
      this.request<void, any>({
        path: `/api/auth/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerKakaoAuth
     * @summary 카카오 로그인
     * @request GET:/api/auth/kakao
     */
    authControllerKakaoAuth: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/kakao`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerKakaoAuthRedirect
     * @summary 카카오 로그인 콜백
     * @request GET:/api/auth/kakao/callback
     */
    authControllerKakaoAuthRedirect: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/auth/kakao/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostControllerCreate
     * @summary 게시글 작성
     * @request POST:/api/posts
     * @secure
     */
    postControllerCreate: (
      data: {
        images?: File[];
        title?: string;
        content?: string;
        hashTag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/posts`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
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
         * @default 1
         */
        page?: number;
        /**
         * 페이지 당 항목 수
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
         * @default 1
         */
        page?: number;
        /**
         * 페이지 당 항목 수
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
  };
}
