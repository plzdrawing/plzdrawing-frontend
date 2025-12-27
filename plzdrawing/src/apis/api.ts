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

export interface ErrorResponse {
  code?: string;
  message?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field?: string;
  message?: string;
}

export interface UpsertProfileRequest {
  /**
   * 한 줄 소개
   * @minLength 0
   * @maxLength 30
   * @example "안녕하십니까?"
   */
  introduce?: string;
  /**
   * 해시태그
   * @example "[해시태그1, 해시태그2]"
   */
  hashTag?: string[];
}

export interface UploadContentRequest {
  /**
   * 제목
   * @minLength 0
   * @maxLength 20
   * @example "그림 제목"
   */
  title?: string;
  /**
   * 설명
   * @minLength 0
   * @maxLength 30
   * @example "게시글 설명"
   */
  explain?: string;
  /**
   * 해시태그
   * @example "[해시태그1, 해시태그2]"
   */
  hashTag?: string[];
  /**
   * 예상금액
   * @format int64
   * @example 2000
   */
  price?: number;
  /**
   * 예상 소요 시간
   * @example "TEN / HALF_HOUR / MORE_THAN_AN_HOUR / DAY"
   */
  timeTaken?: "TEN" | "HALF_HOUR" | "MORE_THAN_AN_HOUR" | "DAY";
}

export interface UploadContentResponse {
  /**
   * contentId
   * @format int64
   * @example 1
   */
  contentId?: number;
}

export interface SignUpRequest {
  /**
   * 이메일
   * @example "abc@def.com"
   */
  email?: string;
  /**
   * 비밀번호
   * @example "1234"
   */
  password?: string;
  /**
   * 닉네임
   * @example "abc"
   */
  nickName?: string;
  /**
   * 약관동의(개인정보 수집 및 이용)
   * @example true
   */
  personalInfoConsent?: boolean;
  /**
   * 이용정책 동의
   * @example true
   */
  acceptTermsOfUse?: boolean;
  /**
   * 할인, 이벤트 소식 받기 동의
   * @example false
   */
  marketingConsent?: boolean;
}

export interface SignUpResponse {
  /**
   * 멤버 식별자
   * @format int64
   * @example 1
   */
  memberId?: number;
}

export interface LoginRequest {
  /**
   * 제공자
   * @example "EMAIL / KAKAO / NAVER"
   */
  provider?: "EMAIL" | "KAKAO" | "NAVER" | "GOOGLE" | "APPLE";
  /**
   * 이메일
   * @example "abc@def.com"
   */
  email?: string;
  /**
   * 비밀번호
   * @example "1234"
   */
  password?: string;
}

export interface CodeGenerateForPasswordRequest {
  /**
   * 이메일
   * @example "abc@def.com"
   */
  email?: string;
}

export interface CodeGenerateRequest {
  /**
   * 이메일
   * @example "abc@def.com"
   */
  email?: string;
}

export interface UpdateProfileRequest {
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname?: string;
  /**
   * 한 줄 소개
   * @minLength 0
   * @maxLength 30
   * @example "그림 그리는 걸 좋아합니다."
   */
  introduce?: string;
  /**
   * 해시태그
   * @example "[해시태그1, 해시태그2]"
   */
  hashTag?: string[];
}

export interface ProfileResponse {
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname?: string;
  /**
   * 한 줄 소개
   * @example "그림 그리는 걸 좋아합니다."
   */
  introduce?: string;
  /**
   * 해시태그
   * @example "#귀여운 #낙서 #동물그림"
   */
  hashtag?: string[];
  /**
   * 프로필 이미지 URL
   * @example "https://bucket.s3.ap-northeast-2.amazonaws.com/profile123.png"
   */
  profileImageUrl?: string;
}

export interface UpdateContentRequest {
  /**
   * 수정할 게시글 Id
   * @format int64
   * @example 1
   */
  contentId?: number;
  /**
   * 수정할 게시글 제목
   * @minLength 0
   * @maxLength 20
   * @example "그림 제목"
   */
  title?: string;
  /**
   * 설명
   * @minLength 0
   * @maxLength 30
   * @example "게시글 설명"
   */
  explain?: string;
  /**
   * 해시태그
   * @example "[해시태그1, 해시태그2]"
   */
  hashTag?: string[];
  /**
   * 예상금액
   * @format int64
   * @example 2000
   */
  price?: number;
  /**
   * 예상 소요 시간
   * @example "TEN / HALF_HOUR / MORE_THAN_AN_HOUR / DAY"
   */
  timeTaken?: "TEN" | "HALF_HOUR" | "MORE_THAN_AN_HOUR" | "DAY";
}

export interface UpdatePasswordRequest {
  /**
   * 현재 비밀번호
   * @example "Test1234!"
   */
  nowPassword?: string;
  /**
   * 새 비밀번호
   * @example "Test1234!"
   */
  newPassword?: string;
}

export interface PasswordResetRequest {
  /**
   * 이메일
   * @example "abc@def.com"
   */
  email?: string;
  /**
   * 인증코드
   * @example "000042"
   */
  authCode?: string;
}

/** 마이페이지 사용자 정보 응답 */
export interface ProfileInfoResponse {
  /**
   * 닉네임
   * @example "똥강아지"
   */
  nickname?: string;
  /**
   * 한 줄 소개
   * @example "그림 그리는 걸 좋아합니다."
   */
  introduction?: string;
  /**
   * 해시태그 목록
   * @example ["귀여운","낙서","동물그림"]
   */
  hashtags?: string[];
  /**
   * 프로필 이미지 URL
   * @example "https://plzdrawing.s3.amazonaws.com/profile/abcd1234.png"
   */
  profileImageUrl?: string;
}

/** 콘텐츠 정보 */
export interface ContentsDto {
  /**
   * 콘텐츠 id
   * @format int64
   * @example 1
   */
  contentId?: number;
  /**
   * 콘텐츠 생성일자
   * @format date
   * @example "2025-12-22"
   */
  createAt?: string;
  /**
   * 콘텐츠 url
   * @example "[https://s3~, https://s3~]"
   */
  contentUrl?: string[];
  /**
   * 콘텐츠 해시태그
   * @example "[사과, 바나나]"
   */
  hashTag?: string[];
  /**
   * 콘텐츠 설명
   * @example "기린 그림입니다."
   */
  explanation?: string;
  /**
   * 소요 시간
   * @example "TEN,HALF_HOUR,MORE_THAN_AN_HOUR,DAY"
   */
  timeTaken?: "TEN" | "HALF_HOUR" | "MORE_THAN_AN_HOUR" | "DAY";
  /**
   * 가격
   * @format int64
   * @example 1000
   */
  price?: number;
  /**
   * 좋아요 수
   * @format int64
   * @example 1
   */
  like?: number;
}

/** 페이지 응답 */
export interface LatestContentsResponse {
  /** 업로더 정보 */
  uploaderDto?: UploaderDto;
  /** 콘텐츠 정보 */
  contentsDto?: ContentsDto;
}

export interface PageResponseLatestContentsResponse {
  /** 페이지 응답 */
  data?: LatestContentsResponse[];
  /**
   * 전체 페이지 수
   * @format int32
   */
  totalPages?: number;
  /** 마지막 페이지 여부 */
  isLastPage?: boolean;
}

/** 업로더 정보 */
export interface UploaderDto {
  /**
   * 닉네임
   * @example "홍길동"
   */
  nickname?: string;
  /**
   * 프로필 이미지
   * @example "https://s3~"
   */
  profileImageUrl?: string;
  /**
   * 그림 횟수
   * @format int64
   * @example 1
   */
  drawingCount?: number;
  /**
   * 후기 개수
   * @format int64
   * @example 1
   */
  reviewCount?: number;
  /**
   * 별점
   * @format float
   * @example 3.5
   */
  star?: number;
}

export interface PageResponseContentsDto {
  /** 페이지 응답 */
  data?: ContentsDto[];
  /**
   * 전체 페이지 수
   * @format int32
   */
  totalPages?: number;
  /** 마지막 페이지 여부 */
  isLastPage?: boolean;
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
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
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
 * @title Plzdrawing API Docs
 * @baseUrl http://localhost:8080
 *
 * 플리즈드로잉 관련 spring 서버 Api Document 입니다.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description 프로필 업로드
     *
     * @tags 멤버 관련 컨트롤러
     * @name UploadFile
     * @summary 프로필 업로드
     * @request POST:/api/member/profile
     * @secure
     */
    uploadFile: (
      data: {
        /** @format binary */
        multipartFile: File;
        profile: UpsertProfileRequest;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/member/profile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description fcm
     *
     * @tags fcm 관련 테스트 컨트롤러
     * @name FcmTest
     * @summary fcm 테스트
     * @request POST:/api/fcm/v1/test
     * @secure
     */
    fcmTest: (params: RequestParams = {}) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/fcm/v1/test`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 최신순으로 콘텐츠를 조회한다.
     *
     * @tags 컨텐츠 관련 컨트롤러
     * @name GetLatestContents
     * @summary 최신순 콘텐츠 조회
     * @request GET:/api/content
     * @secure
     */
    getLatestContents: (
      query?: {
        /**
         * @format int32
         * @default 1
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PageResponseLatestContentsResponse, ErrorResponse>({
        path: `/api/content`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description uploadContents
     *
     * @tags 컨텐츠 관련 컨트롤러
     * @name UploadContents
     * @summary 게시글 업로드
     * @request POST:/api/content
     * @secure
     */
    uploadContents: (
      data: {
        multipartFile: File[];
        content: UploadContentRequest;
      },
      params: RequestParams = {},
    ) =>
      this.request<UploadContentResponse, ErrorResponse>({
        path: `/api/content`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description updateContents
     *
     * @tags 컨텐츠 관련 컨트롤러
     * @name UpdateContents
     * @summary 게시글 수정
     * @request PATCH:/api/content
     * @secure
     */
    updateContents: (
      data: {
        multipartFile: File[];
        content: UpdateContentRequest;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/content`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description reissue
     *
     * @tags 인증 관련 컨트롤러
     * @name Reissue
     * @summary 토큰 재발급
     * @request POST:/api/auth/v1/token/refresh
     * @secure
     */
    reissue: (params: RequestParams = {}) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/auth/v1/token/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description signUp
     *
     * @tags 인증 관련 컨트롤러
     * @name SignUp
     * @summary 회원가입
     * @request POST:/api/auth/v1/signup
     * @secure
     */
    signUp: (data: SignUpRequest, params: RequestParams = {}) =>
      this.request<SignUpResponse, ErrorResponse>({
        path: `/api/auth/v1/signup`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description JWT 토큰을 무효화하고 세션을 종료합니다.
     *
     * @tags 인증 관련 컨트롤러
     * @name Logout
     * @summary 로그아웃
     * @request POST:/api/auth/v1/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/auth/v1/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description login
     *
     * @tags 인증 관련 컨트롤러
     * @name Login
     * @summary 로그인
     * @request POST:/api/auth/v1/login
     * @secure
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/auth/v1/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description verifyEmail
     *
     * @tags 이메일 관련 컨트롤러
     * @name SendEmailForReissuePassword
     * @summary 비밀번호 재발급 인증번호 전송
     * @request POST:/api/auth/email/v1/password/reissue
     * @secure
     */
    sendEmailForReissuePassword: (
      data: CodeGenerateForPasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/api/auth/email/v1/password/reissue`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description reissuePassword
     *
     * @tags 이메일 관련 컨트롤러
     * @name ReissuePassword
     * @summary 비밀번호 재발급
     * @request PATCH:/api/auth/email/v1/password/reissue
     * @secure
     */
    reissuePassword: (data: PasswordResetRequest, params: RequestParams = {}) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/auth/email/v1/password/reissue`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description verifyEmail
     *
     * @tags 이메일 관련 컨트롤러
     * @name VerifyEmail
     * @summary 이메일 인증
     * @request GET:/api/auth/email/v1/email-verification
     * @secure
     */
    verifyEmail: (
      query: {
        email: string;
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<boolean, ErrorResponse>({
        path: `/api/auth/email/v1/email-verification`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description sendEmailForVerification
     *
     * @tags 이메일 관련 컨트롤러
     * @name SendEmailForVerification
     * @summary 이메일 코드 보내기
     * @request POST:/api/auth/email/v1/email-verification
     * @secure
     */
    sendEmailForVerification: (
      data: CodeGenerateRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/api/auth/email/v1/email-verification`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 닉네임, 한 줄 소개, 해시태그, 프로필 이미지 수정
     *
     * @tags 멤버 관련 컨트롤러
     * @name UpdateProfile
     * @summary 프로필 수정
     * @request PATCH:/api/member/v1/profile
     * @secure
     */
    updateProfile: (
      data: {
        /** @format binary */
        multipartFile: File;
        profile: UpdateProfileRequest;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProfileResponse, ErrorResponse>({
        path: `/api/member/v1/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 로그인된 사용자의 비밀번호를 변경합니다.
     *
     * @tags 이메일 관련 컨트롤러
     * @name UpdatePassword
     * @summary 비밀번호 변경 (로그인 사용자 기준)
     * @request PATCH:/api/auth/email/v1/password/update
     * @secure
     */
    updatePassword: (data: UpdatePasswordRequest, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/auth/email/v1/password/update`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description JWT 토큰 기반으로 현재 로그인된 사용자의 정보를 조회합니다.
     *
     * @tags 멤버 관련 컨트롤러
     * @name GetMyProfile
     * @summary 마이페이지 사용자 정보 조회
     * @request GET:/api/member/v1/me
     * @secure
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.request<ProfileInfoResponse, ErrorResponse>({
        path: `/api/member/v1/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 멤버별 콘텐츠를 페이징으로 조회합니다.
     *
     * @tags 컨텐츠 관련 컨트롤러
     * @name GetContentsThumbnail
     * @summary 멤버별 콘텐츠 조회
     * @request GET:/api/content/{memberId}
     * @secure
     */
    getContentsThumbnail: (
      memberId: number,
      query?: {
        /**
         * @format int32
         * @default 1
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PageResponseContentsDto, ErrorResponse>({
        path: `/api/content/${memberId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description 현재 로그인된 회원을 탈퇴시킵니다.
     *
     * @tags 멤버 관련 컨트롤러
     * @name Withdraw
     * @summary 회원 탈퇴
     * @request DELETE:/api/member/v1/withdraw
     * @secure
     */
    withdraw: (params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/api/member/v1/withdraw`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 회원가입 도중 취소 시 임시 이메일 계정을 DB에서 제거합니다.
     *
     * @tags 이메일 관련 컨트롤러
     * @name CancelEmailVerification
     * @summary 이메일 인증 취소
     * @request DELETE:/api/auth/email/v1/email-verification/cancel
     * @secure
     */
    cancelEmailVerification: (
      query: {
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/api/auth/email/v1/email-verification/cancel`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
