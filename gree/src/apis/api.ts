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

export interface PublicProfileResponseDto {
  /**
   * 회원 ID
   * @example 7
   */
  memberId: number;
  /**
   * 닉네임
   * @example "홍길동 님"
   */
  nickname: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/profㄴile.png"
   */
  profileImageUrl: string | null;
  /**
   * 자기소개
   * @example "안녕하세요. 동물 그림쟁이입니다 :)"
   */
  introduce: string | null;
  /**
   * 활성 해시태그 목록
   * @example ["#귀여운","#누사","#동물그림"]
   */
  hashTags: string[];
  /**
   * 등록한 게시글 수
   * @example 7
   */
  drawingCount: number;
}

export interface PublicReviewListItemDto {
  /**
   * 후기 ID
   * @example 1
   */
  id: number;
  /**
   * 별점(1~5)
   * @example 5
   */
  starScore: number;
  /**
   * 후기 내용
   * @example "요청사항 반영이 빨라서 만족해요!"
   */
  content: string;
  /**
   * 후기 키워드 목록
   * @example ["친절해요","원하는 대로 그려줘요"]
   */
  keywords: string[];
  /**
   * 후기 이미지 object key 목록
   * @example ["review/1/2026/03/uuid1.jpg"]
   */
  imageObjectKeys: string[];
  /**
   * 후기 작성자 ID
   * @example 4
   */
  writerId: number;
  /**
   * 후기 작성자 닉네임
   * @example "홍길동 님"
   */
  writerNickname: string;
  /**
   * 후기 작성자 프로필 이미지 URL
   * @example "https://example.com/profile.png"
   */
  writerProfileImageUrl: string | null;
  /**
   * 후기 작성일시
   * @format date-time
   */
  createdAt: string;
}

export interface PublicReviewListResponseDto {
  /** 데이터 목록 */
  data: PublicReviewListItemDto[];
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

export interface ReviewKeywordCountDto {
  /**
   * 키워드
   * @example "친절해요"
   */
  keyword: string;
  /**
   * 키워드 등장 횟수
   * @example 12
   */
  count: number;
}

export interface PublicReviewSummaryResponseDto {
  /**
   * 평균 별점 (소수점 둘째 자리 반올림)
   * @example 4.5
   */
  averageStar: number;
  /**
   * 후기 개수
   * @example 24
   */
  reviewCount: number;
  /**
   * 완료한 작업 수 (COMPLETED/REVIEWED)
   * @example 7
   */
  completedWorkCount: number;
  /** 상위 후기 키워드(최대 5개, count 내림차순) */
  topKeywords: ReviewKeywordCountDto[];
}

export interface NicknameAvailabilityResponseDto {
  /**
   * 닉네임 사용 가능 여부
   * @example true
   */
  available: boolean;
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
   * @maxLength 20
   * @pattern MEMBER_NICKNAME_REGEX
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

export interface LogoutResponseDto {
  /**
   * 로그아웃 처리 성공 여부
   * @example true
   */
  success: boolean;
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
  chatRoomId: number;
  imageObjectKeys: string[];
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
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "DRAFT_SENT"
    | "COMPLETED"
    | "REVIEWED"
    | "CANCELLED";
  requesterId: number;
  artistId: number;
  postId: number;
  description: string;
  referenceImageObjectKeys: string[];
  price: number;
  paidAmount: number;
  /** @format date-time */
  estimatedAt: string;
  feedbackCount: number;
  feedbackUsed: number;
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
   * 소요 시간
   * @example "10분"
   */
  timeTaken?: string;
  /**
   * 가격
   * @example 12000
   */
  price?: number;
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
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
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

export interface NotificationPreference {
  id: number;
  memberId: number;
  allEnabled: boolean;
  chatEnabled: boolean;
  paymentEnabled: boolean;
  marketingEnabled: boolean;
  member: Member;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface Wallet {
  id: number;
  memberId: number;
  balance: number;
  member: Member;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
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

export interface WalletTransaction {
  id: number;
  memberId: number;
  type:
    | "CHARGE"
    | "REFUND"
    | "USE"
    | "EARN"
    | "WITHDRAW_REQUEST"
    | "WITHDRAW_CANCEL"
    | "WITHDRAW_COMPLETE";
  coinAmount: number;
  cashAmount: number | null;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  description: string | null;
  sourceType: string | null;
  sourceId: number | null;
  member: Member;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CoinProduct {
  id: number;
  name: string;
  coinAmount: number;
  price: number;
  displayOrder: number;
  isActive: boolean;
  description: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface CoinOrder {
  id: number;
  memberId: number;
  coinProductId: number;
  orderCode: string;
  coinAmount: number;
  amount: number;
  paymentMethod: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
  paymentKey: string | null;
  /** @format date-time */
  approvedAt: string | null;
  cancelReason: string | null;
  /** @format date-time */
  cancelledAt: string | null;
  member: Member;
  coinProduct: CoinProduct;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface WithdrawRequest {
  id: number;
  memberId: number;
  withdrawAccountId: number;
  coinAmount: number;
  cashAmount: number;
  feeAmount: number;
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";
  reason: string | null;
  /** @format date-time */
  processedAt: string | null;
  adminId: number | null;
  member: Member;
  admin: Member | null;
  withdrawAccount: WithdrawAccount;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface WithdrawAccount {
  id: number;
  memberId: number;
  bankCode: string;
  bankName: string;
  accountHolder: string;
  accountNumberMasked: string;
  accountNumberEncrypted: string;
  isPrimary: boolean;
  status: "ACTIVE" | "INACTIVE";
  /** @format date-time */
  verifiedAt: string | null;
  member: Member;
  withdrawRequests: WithdrawRequest[];
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
  notificationPreference: NotificationPreference;
  wallet: Wallet;
  sentNotifications: Notification[];
  receivedNotifications: Notification[];
  inquiries: Inquiry[];
  answeredInquiries: Inquiry[];
  notices: Notice[];
  terms: Terms[];
  walletTransactions: WalletTransaction[];
  coinOrders: CoinOrder[];
  withdrawAccounts: WithdrawAccount[];
  withdrawRequests: WithdrawRequest[];
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

export interface ReviewListItemDto {
  /**
   * 리뷰 ID
   * @example 1
   */
  reviewId: number;
  /**
   * 게시글 ID
   * @example 10
   */
  postId: number;
  /**
   * 작성자 ID
   * @example 5
   */
  writerId: number;
  /**
   * 작성자 닉네임
   * @example "홍길동"
   */
  writerNickname: string;
  /**
   * 별점
   * @example "FIVE"
   */
  star: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  /**
   * 후기 내용
   * @example "정말 만족했어요!"
   */
  content?: string;
  /**
   * 키워드 목록
   * @example ["친절해요"]
   */
  keywords: string[];
  /**
   * 리뷰 이미지 object key 목록
   * @example ["review/1/2026/03/uuid1.jpg"]
   */
  imageObjectKeys: string[];
  /**
   * 게시글 좋아요 수
   * @example 23
   */
  likeCount: number;
  /**
   * 내가 찜한 게시글인지 여부
   * @example true
   */
  isScrapped: boolean;
  /**
   * 작성일시
   * @format date-time
   */
  createdAt: string;
}

export interface ReviewPageResponseDto {
  /** 후기 목록 */
  data: ReviewListItemDto[];
  /**
   * 총 데이터 수
   * @example 25
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

export interface CreateReviewDto {
  /**
   * 채팅방 ID
   * @example 1
   */
  chatRoomId: number;
  /**
   * 별점
   * @example "FIVE"
   */
  star: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  /**
   * 리뷰 키워드 목록 (최대 3개)
   * @maxItems 3
   * @example ["귀여워요","친절해요","섬세해요"]
   */
  keywords?: string[];
  /**
   * 자유 후기 (0~200자)
   * @maxLength 200
   * @example "요청사항을 너무 잘 들어주세요!"
   */
  content?: string;
  /**
   * 후기 이미지 object key 목록 (최대 3개)
   * @maxItems 3
   * @example ["review/1/2026/03/uuid1.jpg"]
   */
  imageObjectKeys?: string[];
}

export interface ReviewResponseDto {
  /**
   * 리뷰 ID
   * @example 1
   */
  id: number;
  /**
   * 채팅방 ID
   * @example 1
   */
  chatRoomId: number;
  /**
   * 별점
   * @example "FIVE"
   */
  star: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  /**
   * 자유 후기
   * @example "정말 만족해요!"
   */
  content?: string;
  /**
   * 키워드 목록
   * @example ["귀여워요","친절해요"]
   */
  keywords?: string[];
  /** 이미지 object key 목록 */
  imageObjectKeys?: string[];
  /**
   * 작성자 ID
   * @example 10
   */
  writerId: number;
  /**
   * 수신자(그림쟁이) ID
   * @example 20
   */
  receiverId: number;
  /**
   * 작성 일시
   * @format date-time
   */
  createdAt: string;
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
   * @maxLength 200
   * @example "강아지 그림을 부탁드려요."
   */
  description?: string;
  /**
   * 요청 금액
   * @min 0
   * @example 5000
   */
  price?: number;
  /**
   * 참고 이미지 object key 목록 (최대 5개)
   * @maxItems 5
   * @example ["chat/request/1/2026/03/uuid1.png"]
   */
  referenceImageObjectKeys?: string[];
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
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "DRAFT_SENT"
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
   * 참고 이미지 object key 목록
   * @example ["chat/request/1/2026/03/uuid1.png"]
   */
  referenceImageObjectKeys?: string[];
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

export interface ChatImageUploadRequestDto {
  /**
   * FE에서 업로드할 원본 파일명 (파일 바이너리는 전송하지 않음)
   * @example "dog.png"
   */
  fileName: string;
  /**
   * FE에서 업로드할 파일의 MIME 타입
   * @example "image/png"
   */
  contentType: string;
  /**
   * FE에서 업로드할 파일 크기 (bytes)
   * @min 1
   * @max 10485760
   * @example 5242880
   */
  size: number;
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
   * FE가 직접 PUT 업로드할 S3 presigned URL
   * @example "https://s3-presigned-put-url"
   */
  uploadUrl: string;
  /**
   * 업로드 완료 후 POST /chats/:id/messages (type=IMAGE) 에 전달할 S3 object key
   * @example "chat/12/2026/02/uuid.png"
   */
  objectKey: string;
  /**
   * URL 만료 시각(ISO)
   * @example "2026-02-01T12:00:00Z"
   */
  expiresAt: string;
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
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "DRAFT_SENT"
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
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "DRAFT_SENT"
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
   * @maxLength 1000
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

export interface ReadChatDto {
  /**
   * 마지막으로 읽은 메시지 ID
   * @min 1
   * @example 150
   */
  lastReadMessageId?: number;
}

export interface UpdateChatRequestDto {
  /**
   * 수정할 요청 내용 (1~200자)
   * @minLength 1
   * @maxLength 200
   * @example "강아지 말고 고양이 그림으로 변경해주세요 :)"
   */
  description: string;
}

export interface AcceptChatDto {
  /**
   * 견적 금액 (코인)
   * @min 1
   * @example 500
   */
  price: number;
  /**
   * 예상 완료일 (YYYY-MM-DD)
   * @example "2026-04-01"
   */
  estimatedAt: string;
  /**
   * 수정 허용 횟수
   * @min 1
   * @max 10
   * @example 2
   */
  feedbackCount: number;
}

export interface RejectChatDto {
  /**
   * 거절 사유 키워드 목록 (최대 3개)
   * @maxItems 3
   * @example ["스타일이 달라요","다른 작업중이에요"]
   */
  reasons?: string[];
  /**
   * 자유 거절 사유 (0~200자)
   * @maxLength 200
   * @example "지금은 작업이 많아서요."
   */
  reasonText?: string;
}

export interface RequestPriceChangeDto {
  /**
   * 변경된 금액 (코인)
   * @min 1
   * @example 700
   */
  price: number;
  /**
   * 예상 완료일 (YYYY-MM-DD)
   * @example "2026-04-01"
   */
  estimatedAt: string;
  /**
   * 수정 허용 횟수
   * @min 1
   * @max 10
   * @example 1
   */
  feedbackCount: number;
  /**
   * 금액 변경 사유 (0~200자)
   * @maxLength 200
   * @example "채색 작업이 추가되어 금액이 변경되었습니다."
   */
  reason?: string;
}

export interface PayChatDto {
  /**
   * 결제 수단
   * @example "KAKAO_PAY"
   */
  paymentMethod: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
}

export interface PayChatResponseDto {
  /**
   * 총 수정 가능 횟수
   * @example 2
   */
  feedbackCount: number;
}

export interface SendDrawingDto {
  /**
   * 그림 이미지 object key 목록 (1~3개)
   * @maxItems 3
   * @minItems 1
   * @example ["chat/1/2026/03/uuid1.jpg","chat/1/2026/03/uuid2.jpg"]
   */
  imageObjectKeys: string[];
}

export interface SendDrawingResponseDto {
  /**
   * 남은 수정 횟수
   * @example 1
   */
  remainingRevisions: number;
}

export interface RevisionRequestDto {
  /**
   * 수정 요청 내용
   * @minLength 1
   * @maxLength 1000
   * @example "고양이 눈 조금 더 키워주세요 :)!"
   */
  content: string;
}

export interface SettingsSummaryResponseDto {
  /** @example "홍길동" */
  nickname: string;
  /** @example "https://example.com/profile.png" */
  profileImageUrl: string | null;
  /** @example ["귀여운","낚시"] */
  hashTags: string[];
  /**
   * 코인 기능 도입 전까지는 null을 반환합니다.
   * @example null
   */
  coinBalance: number | null;
  /** @example false */
  hasWithdrawAccount: boolean;
  /** @example true */
  notificationEnabled: boolean;
}

export interface NotificationPreferenceResponseDto {
  /** @example true */
  allEnabled: boolean;
  /** @example true */
  chatEnabled: boolean;
  /** @example true */
  paymentEnabled: boolean;
  /** @example false */
  marketingEnabled: boolean;
}

export interface UpdateNotificationPreferenceDto {
  /** @example true */
  allEnabled?: boolean;
  /** @example true */
  chatEnabled?: boolean;
  /** @example true */
  paymentEnabled?: boolean;
  /** @example false */
  marketingEnabled?: boolean;
}

export interface AppInfoResponseDto {
  /** @example "0.0.1" */
  appVersion: string;
  /** @example "0.0.1" */
  minimumSupportedVersion: string;
  /** @example "support@plzdrawing.com" */
  supportEmail: string;
  /** @example "평일 10:00 - 18:00" */
  supportHours: string;
  /** @example "https://example.com/privacy-policy" */
  privacyPolicyUrl: string | null;
}

export interface UpdateAppInfoDto {
  /**
   * @maxLength 30
   * @example "1.0.0"
   */
  minimumSupportedVersion?: string;
  /**
   * @maxLength 100
   * @example "support@plzdrawing.com"
   */
  supportEmail?: string;
  /**
   * @maxLength 100
   * @example "평일 10:00 - 18:00"
   */
  supportHours?: string;
  /**
   * @format uri
   * @example "https://example.com/privacy-policy"
   */
  privacyPolicyUrl?: string | null;
}

export interface TermResponseDto {
  /** @example 1 */
  id: number;
  /** @example "이용약관" */
  title: string;
  /** @example "v1.0.0" */
  version: string;
  /** @example "약관 본문" */
  content: string;
  /** @example 10 */
  adminId: number | null;
  /** @example "관리자" */
  adminNickname: string | null;
  /** @example "admin@example.com" */
  adminEmail: string | null;
  /** @example "https://cdn.example.com/admin.png" */
  adminProfileUrl: string | null;
  /**
   * @format date-time
   * @example "2026-04-02 10:00:00"
   */
  createdAt: string;
}

export interface CreateTermDto {
  /**
   * @maxLength 100
   * @example "서비스 이용약관"
   */
  title: string;
  /**
   * @maxLength 50
   * @example "1.0.0"
   */
  version: string;
  /** @example "플리즈드로잉 서비스 이용약관입니다." */
  content: string;
}

export interface UpdateTermDto {
  /**
   * @maxLength 100
   * @example "서비스 이용약관"
   */
  title?: string;
  /**
   * @maxLength 50
   * @example "1.0.0"
   */
  version?: string;
  /** @example "플리즈드로잉 서비스 이용약관입니다." */
  content?: string;
}

export interface BankResponseDto {
  /** @example "004" */
  code: string;
  /** @example "국민은행" */
  name: string;
}

export interface WithdrawAccountResponseDto {
  /** @example 1 */
  id: number;
  /** @example "004" */
  bankCode: string;
  /** @example "국민은행" */
  bankName: string;
  /** @example "홍길동" */
  accountHolder: string;
  /** @example "123456******34" */
  accountNumberMasked: string;
  /** @example 15 */
  memberId: number | null;
  /** @example "그림좋아" */
  memberNickname: string | null;
  /** @example "user@example.com" */
  memberEmail: string | null;
  /** @example "https://cdn.example.com/profile.png" */
  memberProfileUrl: string | null;
  /** @example true */
  isPrimary: boolean;
  /** @example "ACTIVE" */
  status: "ACTIVE" | "INACTIVE";
  /**
   * @format date-time
   * @example "2026-04-05 10:00:00"
   */
  verifiedAt: string | null;
  /**
   * @format date-time
   * @example "2026-04-05 09:59:00"
   */
  createdAt: string;
}

export interface CreateWithdrawAccountDto {
  /**
   * @maxLength 10
   * @example "004"
   */
  bankCode: string;
  /**
   * @maxLength 50
   * @example "국민은행"
   */
  bankName: string;
  /**
   * @maxLength 50
   * @example "홍길동"
   */
  accountHolder: string;
  /**
   * @maxLength 30
   * @pattern /^[0-9-]+$/
   * @example "12345678901234"
   */
  accountNumber: string;
  /** @example true */
  isPrimary?: boolean;
}

export interface UpdateWithdrawAccountAdminDto {
  /**
   * @maxLength 500
   * @example "예금주 및 계좌번호 확인 완료"
   */
  note?: string;
}

export interface NoticeResponseDto {
  /** @example 1 */
  id: number;
  /** @example "서비스 점검 안내" */
  title: string;
  /** @example "점검이 예정되어 있습니다." */
  content: string;
  /** @example 10 */
  adminId: number | null;
  /** @example "관리자" */
  adminNickname: string | null;
  /** @example "admin@example.com" */
  adminEmail: string | null;
  /** @example "https://cdn.example.com/admin.png" */
  adminProfileUrl: string | null;
  /**
   * @format date-time
   * @example "2026-04-02 10:00:00"
   */
  createdAt: string;
}

export interface CreateNoticeDto {
  /**
   * @maxLength 100
   * @example "서비스 점검 안내"
   */
  title: string;
  /**
   * @maxLength 5000
   * @example "점검이 예정되어 있습니다."
   */
  content: string;
}

export interface UpdateNoticeDto {
  /**
   * @maxLength 100
   * @example "서비스 점검 안내"
   */
  title?: string;
  /**
   * @maxLength 5000
   * @example "점검이 예정되어 있습니다."
   */
  content?: string;
}

export interface InquiryResponseDto {
  /** @example 1 */
  id: number;
  /** @example "ACCOUNT" */
  category: "DRAWING" | "ACCOUNT" | "PAYMENT" | "REVIEW" | "ETC";
  /** @example "로그인이 되지 않아요" */
  title: string;
  /** @example "상세 문의 내용입니다." */
  content: string;
  /** @example "PENDING" */
  status: "PENDING" | "IN_PROGRESS" | "ANSWERED" | "CLOSED";
  /** @example null */
  answer: string | null;
  /** @example 10 */
  memberId: number | null;
  /** @example "그림좋아" */
  memberNickname: string | null;
  /** @example "user@example.com" */
  memberEmail: string | null;
  /** @example "https://cdn.example.com/profile.png" */
  memberProfileUrl: string | null;
  /**
   * @format date-time
   * @example "2026-04-02T10:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example null
   */
  answeredAt: string | null;
  /** @example ["https://example.com/inquiry/image-1.png"] */
  imageUrls: string[];
}

export interface UpdateInquiryAdminDto {
  /** @example "ANSWERED" */
  status: "PENDING" | "IN_PROGRESS" | "ANSWERED" | "CLOSED";
  /**
   * @maxLength 5000
   * @example "문의주신 내용 확인 후 조치했습니다."
   */
  answer?: string;
}

export interface WalletSummaryResponseDto {
  /** @example 0 */
  balance: number;
}

export interface WalletTransactionPageResponseDto {
  /** 데이터 목록 */
  data: any[][];
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

export interface CoinProductResponseDto {
  /** @example 1 */
  id: number;
  /** @example "그리코인 10개" */
  name: string;
  /** @example 10 */
  coinAmount: number;
  /** @example 1200 */
  price: number;
  /** @example 1 */
  displayOrder: number;
  /** @example "신규 회원 추천 상품" */
  description: string | null;
  /** @example true */
  isActive: boolean;
}

export interface CreateCoinProductDto {
  /**
   * @maxLength 50
   * @example "그리코인 10개"
   */
  name: string;
  /**
   * @min 1
   * @example 10
   */
  coinAmount: number;
  /**
   * @min 0
   * @example 1200
   */
  price: number;
  /**
   * @min 0
   * @example 1
   */
  displayOrder: number;
  /**
   * @maxLength 255
   * @example "신규 회원 추천 상품"
   */
  description?: string | null;
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
}

export interface UpdateCoinProductDto {
  /**
   * @maxLength 50
   * @example "그리코인 10개"
   */
  name?: string;
  /**
   * @min 1
   * @example 10
   */
  coinAmount?: number;
  /**
   * @min 0
   * @example 1200
   */
  price?: number;
  /**
   * @min 0
   * @example 1
   */
  displayOrder?: number;
  /**
   * @maxLength 255
   * @example "신규 회원 추천 상품"
   */
  description?: string | null;
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
}

export interface CreateCoinOrderDto {
  /**
   * @min 1
   * @example 1
   */
  coinProductId: number;
  /**
   * @default "TOSS_PAY"
   * @example "TOSS_PAY"
   */
  paymentMethod?: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
}

export interface CoinOrderResponseDto {
  /** @example 1 */
  id: number;
  /** @example "coin-order-20260405-abc123" */
  orderCode: string;
  /** @example 1 */
  coinProductId: number;
  /** @example "그리코인 10개" */
  productName: string;
  /** @example 10 */
  coinAmount: number;
  /** @example 1200 */
  amount: number;
  /** @example "TOSS_PAY" */
  paymentMethod: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
  /** @example "PENDING" */
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
  /** @example "toss_payment_key_sample" */
  paymentKey: string | null;
  /**
   * @format date-time
   * @example "2026-04-05 10:00:00"
   */
  approvedAt: string | null;
  /** @example "사용자 요청에 의한 결제 취소" */
  cancelReason: string | null;
  /** @example 15 */
  memberId: number | null;
  /** @example "그림좋아" */
  memberNickname: string | null;
  /** @example "user@example.com" */
  memberEmail: string | null;
  /** @example "https://cdn.example.com/profile.png" */
  memberProfileUrl: string | null;
  /**
   * @format date-time
   * @example "2026-04-05 10:10:00"
   */
  cancelledAt: string | null;
  /**
   * @format date-time
   * @example "2026-04-05 09:59:00"
   */
  createdAt: string;
}

export interface ConfirmCoinOrderDto {
  /**
   * 토스 결제 성공 후 전달받은 paymentKey
   * @maxLength 255
   * @example "toss_payment_key_sample"
   */
  paymentKey: string;
  /**
   * 토스 결제 성공 후 전달받은 결제 금액
   * @min 0
   * @example 1200
   */
  amount: number;
}

export interface CoinOrderPageResponseDto {
  /** 데이터 목록 */
  data: any[][];
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

export interface CancelCoinOrderDto {
  /**
   * @maxLength 200
   * @example "사용자 요청에 의한 결제 취소"
   */
  cancelReason: string;
}

export interface WithdrawPolicyResponseDto {
  /** @example 10 */
  minimumCoinAmount: number;
  /** @example 10 */
  coinUnit: number;
  /** @example 100 */
  cashPerCoin: number;
  /** @example 500 */
  flatFeeAmount: number;
}

export interface CreateWithdrawRequestDto {
  /**
   * @min 1
   * @example 10
   */
  coinAmount: number;
  /**
   * @min 1
   * @example 1
   */
  withdrawAccountId?: number;
}

export interface WithdrawRequestResponseDto {
  /** @example 1 */
  id: number;
  /** @example 1 */
  withdrawAccountId: number;
  /** @example "국민은행" */
  bankName: string;
  /** @example "123456******34" */
  accountNumberMasked: string;
  /** @example 15 */
  memberId: number | null;
  /** @example "그림좋아" */
  memberNickname: string | null;
  /** @example "user@example.com" */
  memberEmail: string | null;
  /** @example "https://cdn.example.com/profile.png" */
  memberProfileUrl: string | null;
  /** @example 10 */
  coinAmount: number;
  /** @example 10 */
  cashAmount: number;
  /** @example 0 */
  feeAmount: number;
  /** @example "REQUESTED" */
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";
  /** @example null */
  reason: string | null;
  /**
   * @format date-time
   * @example null
   */
  processedAt: string | null;
  /**
   * @format date-time
   * @example "2026-04-05 10:00:00"
   */
  createdAt: string;
}

export interface UpdateWithdrawRequestAdminDto {
  /** @example "APPROVED" */
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";
  /**
   * @maxLength 1000
   * @example "예금주 불일치로 반려"
   */
  reason?: string;
}

export interface ScrapStatusResponseDto {
  /**
   * 게시글 ID
   * @example 1
   */
  postId: number;
  /**
   * 찜 상태
   * @example true
   */
  scrapped: boolean;
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
        /** 관심 태그 목록(선택), 최대 5개. 각 태그는 #으로 시작 */
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
        /** 관심 태그 목록(선택), 최대 5개. 각 태그는 #으로 시작 */
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
     * @name MemberControllerGetPublicProfile
     * @summary 공개 프로필 조회
     * @request GET:/api/member/v1/profile/{memberId}
     */
    memberControllerGetPublicProfile: (
      memberId: number,
      params: RequestParams = {},
    ) =>
      this.request<PublicProfileResponseDto, void>({
        path: `/api/member/v1/profile/${memberId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerGetPublicReviews
     * @summary 공개 프로필 후기 목록 조회
     * @request GET:/api/member/v1/profile/{memberId}/reviews
     */
    memberControllerGetPublicReviews: (
      memberId: number,
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
      this.request<PublicReviewListResponseDto, void>({
        path: `/api/member/v1/profile/${memberId}/reviews`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Member
     * @name MemberControllerGetPublicReviewSummary
     * @summary 공개 프로필 후기 요약 조회
     * @request GET:/api/member/v1/profile/{memberId}/reviews/summary
     */
    memberControllerGetPublicReviewSummary: (
      memberId: number,
      params: RequestParams = {},
    ) =>
      this.request<PublicReviewSummaryResponseDto, void>({
        path: `/api/member/v1/profile/${memberId}/reviews/summary`,
        method: "GET",
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
      this.request<NicknameAvailabilityResponseDto, void>({
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
     * @description 현재는 서버 측 토큰 저장소 없이 동작하므로, 호출 성공 시 프론트에서 access token을 삭제하면 됩니다.
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary 로그아웃
     * @request POST:/api/auth/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<LogoutResponseDto, any>({
        path: `/api/auth/logout`,
        method: "POST",
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
     * @description 사용자를 카카오 인증 페이지로 302 리다이렉트합니다. 네이티브 앱은 시스템 브라우저/웹뷰에서 이 엔드포인트를 열어 로그인 플로우를 시작하세요.
     *
     * @tags Auth
     * @name AuthControllerKakaoAuth
     * @summary 카카오 로그인 시작 (리다이렉트)
     * @request GET:/api/auth/kakao
     */
    authControllerKakaoAuth: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/kakao`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 카카오 인증 완료 후 JWT를 발급하고 OAUTH_REDIRECT_URL(예: myapp://oauth/callback)로 302 리다이렉트합니다. 최종 URL 예시: myapp://oauth/callback?token={jwt}
     *
     * @tags Auth
     * @name AuthControllerKakaoAuthRedirect
     * @summary 카카오 로그인 콜백 처리
     * @request GET:/api/auth/kakao/callback
     */
    authControllerKakaoAuthRedirect: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/auth/kakao/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * @description 게시글과 이미지를 함께 업로드합니다. images는 선택이며 최대 3개, 파일당 최대 10MB입니다.
     *
     * @tags Post
     * @name PostControllerCreate
     * @summary 게시글 작성
     * @request POST:/api/posts
     * @secure
     */
    postControllerCreate: (
      data: {
        /** 업로드 이미지 목록(선택), 최대 3개, 파일당 최대 10MB */
        images?: File[];
        title?: string;
        content?: string;
        /** @example "10분" */
        timeTaken?: string;
        /** @example 12000 */
        price?: number;
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
     * @secure
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
        /**
         * 검색어 (작성자 닉네임, 내용, 태그)
         * @maxLength 50
         * @example "고양이"
         */
        q?: string;
        /**
         * 내가 찜한 게시글만 조회
         * @default false
         * @example true
         */
        scrappedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<LatestContentsPageResponseDto, any>({
        path: `/api/posts`,
        method: "GET",
        query: query,
        secure: true,
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
    postControllerUpdate: (
      id: string,
      data: {
        /** 추가할 이미지 목록(선택), 최대 3개, 파일당 최대 10MB */
        newImages?: File[];
        /** 삭제할 이미지 ID 목록(선택) */
        deleteImageIds?: number[];
        title?: string;
        content?: string;
        hashTag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/posts/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.FormData,
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
      this.request<void, void>({
        path: `/api/posts/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Review
     * @name ReviewControllerGetLatestReviews
     * @summary 후기 목록 조회
     * @request GET:/api/reviews
     * @secure
     */
    reviewControllerGetLatestReviews: (
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
         * 검색어 (작성자 닉네임, 후기 내용, 키워드)
         * @maxLength 50
         * @example "친절"
         */
        q?: string;
        /**
         * 내가 찜한 게시글의 후기만 조회
         * @default false
         * @example true
         */
        scrappedOnly?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReviewPageResponseDto, any>({
        path: `/api/reviews`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description COMPLETED 상태의 채팅방에 대해 요청자가 후기를 작성합니다. 채팅방당 1회만 작성 가능하며, 완료 후 채팅방 상태가 REVIEWED로 전환됩니다.
     *
     * @tags Review
     * @name ReviewControllerCreateReview
     * @summary 후기 작성
     * @request POST:/api/reviews
     * @secure
     */
    reviewControllerCreateReview: (
      data: CreateReviewDto,
      params: RequestParams = {},
    ) =>
      this.request<ReviewResponseDto, void>({
        path: `/api/reviews`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
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
          | "ACCEPTED"
          | "PAID"
          | "IN_PROGRESS"
          | "DRAFT_SENT"
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
     * @description 요청하기 폼에서 사용할 참고 이미지 업로드용 S3 presigned URL을 발급합니다. 파일 최대 크기는 10MB이며, 생성된 objectKey는 POST /chats의 referenceImageObjectKeys로 전달해야 합니다.
     *
     * @tags Chat
     * @name ChatControllerCreateRequestImageUpload
     * @summary 요청 참고 이미지 업로드 URL 발급
     * @request POST:/api/chats/request-images/upload-url
     * @secure
     */
    chatControllerCreateRequestImageUpload: (
      data: ChatImageUploadRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatImageUploadResponseDto, void>({
        path: `/api/chats/request-images/upload-url`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
     * @description 채팅방과 해당 메시지를 삭제합니다. CANCELLED 또는 REVIEWED 상태에서만 삭제할 수 있습니다.
     *
     * @tags Chat
     * @name ChatControllerDeleteChatRoom
     * @summary 채팅방 삭제
     * @request DELETE:/api/chats/{id}
     * @secure
     */
    chatControllerDeleteChatRoom: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/chats/${id}`,
        method: "DELETE",
        secure: true,
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
     * @description S3 presigned 업로드 URL만 발급합니다. 실제 파일 업로드(PUT)는 FE가 uploadUrl로 직접 수행해야 하며, 업로드 완료 후 POST /chats/:id/messages에 type=IMAGE와 objectKey를 전달해 메시지를 전송합니다. 파일 최대 크기는 10MB입니다.
     *
     * @tags Chat
     * @name ChatControllerSendImageMessage
     * @summary 이미지 업로드 URL 발급
     * @request POST:/api/chats/{id}/messages/image-upload
     * @secure
     */
    chatControllerSendImageMessage: (
      id: string,
      data: ChatImageUploadRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatImageUploadResponseDto, void>({
        path: `/api/chats/${id}/messages/image-upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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

    /**
     * @description REQUESTED 상태에서만 요청자가 요청 내용(description)을 수정합니다. 수정 시 새 REQUEST_CARD 시스템 메시지가 생성됩니다.
     *
     * @tags Chat
     * @name ChatControllerUpdateChatRequest
     * @summary 요청 내용 수정 (요청자)
     * @request PATCH:/api/chats/{id}/request
     * @secure
     */
    chatControllerUpdateChatRequest: (
      id: string,
      data: UpdateChatRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/request`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description REQUESTED 상태의 채팅방을 ACCEPTED로 전환하고 PAYMENT_REQUEST 카드를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerAcceptChatRoom
     * @summary 요청 수락 (그림쟁이)
     * @request PATCH:/api/chats/{id}/accept
     * @secure
     */
    chatControllerAcceptChatRoom: (
      id: string,
      data: AcceptChatDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/accept`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description REQUESTED 상태의 채팅방을 CANCELLED로 전환합니다.
     *
     * @tags Chat
     * @name ChatControllerRejectChatRoom
     * @summary 요청 거절 (그림쟁이)
     * @request PATCH:/api/chats/{id}/reject
     * @secure
     */
    chatControllerRejectChatRoom: (
      id: string,
      data: RejectChatDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/reject`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description REQUESTED 또는 ACCEPTED 상태의 채팅방을 CANCELLED로 전환합니다.
     *
     * @tags Chat
     * @name ChatControllerCancelChatRoom
     * @summary 요청 취소 (요청자)
     * @request PATCH:/api/chats/{id}/cancel
     * @secure
     */
    chatControllerCancelChatRoom: (id: string, params: RequestParams = {}) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/cancel`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description REQUESTED / ACCEPTED 상태에서 금액, 예상 완료일, 수정 횟수를 변경하고 PRICE_CHANGE_REQUEST 카드를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerRequestPriceChange
     * @summary 견적 수정 요청 (그림쟁이)
     * @request PATCH:/api/chats/{id}/request-price-change
     * @secure
     */
    chatControllerRequestPriceChange: (
      id: string,
      data: RequestPriceChangeDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/request-price-change`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ACCEPTED 상태에서 결제를 진행하고 PAID 상태로 전환합니다. PaymentHistory가 생성됩니다.
     *
     * @tags Chat
     * @name ChatControllerPayChatRoom
     * @summary 결제 (요청자)
     * @request PATCH:/api/chats/{id}/pay
     * @secure
     */
    chatControllerPayChatRoom: (
      id: string,
      data: PayChatDto,
      params: RequestParams = {},
    ) =>
      this.request<PayChatResponseDto, void>({
        path: `/api/chats/${id}/pay`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description PAID 상태에서 IN_PROGRESS로 전환하고 WORK_STARTED 시스템 메시지를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerStartWork
     * @summary 작업 시작 (그림쟁이)
     * @request PATCH:/api/chats/{id}/start
     * @secure
     */
    chatControllerStartWork: (id: string, params: RequestParams = {}) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/start`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description IN_PROGRESS 상태에서 DRAFT_SENT로 전환하고 DRAWING_SENT 시스템 메시지를 생성합니다. 이미지 최대 3개.
     *
     * @tags Chat
     * @name ChatControllerSendDrawing
     * @summary 그림 전송 (그림쟁이)
     * @request POST:/api/chats/{id}/send-drawing
     * @secure
     */
    chatControllerSendDrawing: (
      id: string,
      data: SendDrawingDto,
      params: RequestParams = {},
    ) =>
      this.request<SendDrawingResponseDto, void>({
        path: `/api/chats/${id}/send-drawing`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description DRAFT_SENT 상태에서 IN_PROGRESS로 복귀하고 REVISION_REQUESTED 시스템 메시지를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerRequestRevision
     * @summary 수정 요청 (요청자)
     * @request POST:/api/chats/{id}/revision
     * @secure
     */
    chatControllerRequestRevision: (
      id: string,
      data: RevisionRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/revision`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description DRAFT_SENT 상태에서 COMPLETED로 전환하고 WORK_COMPLETED + REVIEW_PROMPT 시스템 메시지를 생성합니다.
     *
     * @tags Chat
     * @name ChatControllerConfirmDrawing
     * @summary 최종 확인 / 저장하기 (요청자)
     * @request PATCH:/api/chats/{id}/confirm
     * @secure
     */
    chatControllerConfirmDrawing: (id: string, params: RequestParams = {}) =>
      this.request<ChatRoomDetailResponseDto, void>({
        path: `/api/chats/${id}/confirm`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name SettingsControllerGetSummary
     * @summary 설정 홈 요약 정보 조회
     * @request GET:/api/settings/v1/summary
     * @secure
     */
    settingsControllerGetSummary: (params: RequestParams = {}) =>
      this.request<SettingsSummaryResponseDto, any>({
        path: `/api/settings/v1/summary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name SettingsControllerGetNotificationPreferences
     * @summary 알림 설정 조회
     * @request GET:/api/settings/v1/notifications
     * @secure
     */
    settingsControllerGetNotificationPreferences: (
      params: RequestParams = {},
    ) =>
      this.request<NotificationPreferenceResponseDto, any>({
        path: `/api/settings/v1/notifications`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name SettingsControllerUpdateNotificationPreferences
     * @summary 알림 설정 수정
     * @request PATCH:/api/settings/v1/notifications
     * @secure
     */
    settingsControllerUpdateNotificationPreferences: (
      data: UpdateNotificationPreferenceDto,
      params: RequestParams = {},
    ) =>
      this.request<NotificationPreferenceResponseDto, any>({
        path: `/api/settings/v1/notifications`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name SettingsControllerGetAppInfo
     * @summary 앱 관리 정보 조회
     * @request GET:/api/settings/v1/app-info
     */
    settingsControllerGetAppInfo: (params: RequestParams = {}) =>
      this.request<AppInfoResponseDto, any>({
        path: `/api/settings/v1/app-info`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Settings
     * @name SettingsControllerUpdateAppInfo
     * @summary 앱 관리 정보 수정 (관리자)
     * @request PATCH:/api/settings/v1/admin/app-info
     * @secure
     */
    settingsControllerUpdateAppInfo: (
      data: UpdateAppInfoDto,
      params: RequestParams = {},
    ) =>
      this.request<AppInfoResponseDto, any>({
        path: `/api/settings/v1/admin/app-info`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerGetTerms
     * @summary 약관 목록 조회
     * @request GET:/api/terms/v1
     */
    termsControllerGetTerms: (params: RequestParams = {}) =>
      this.request<TermResponseDto[], any>({
        path: `/api/terms/v1`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerCreateTerm
     * @summary 약관 등록 (관리자)
     * @request POST:/api/terms/v1
     * @secure
     */
    termsControllerCreateTerm: (
      data: CreateTermDto,
      params: RequestParams = {},
    ) =>
      this.request<TermResponseDto, any>({
        path: `/api/terms/v1`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerGetTermsForAdmin
     * @summary 약관 목록 조회 (관리자)
     * @request GET:/api/terms/v1/admin
     * @secure
     */
    termsControllerGetTermsForAdmin: (
      query?: {
        /** 작성자 닉네임, 이메일, 제목, 버전 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TermResponseDto[], any>({
        path: `/api/terms/v1/admin`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerGetTermForAdmin
     * @summary 약관 상세 조회 (관리자)
     * @request GET:/api/terms/v1/admin/{id}
     * @secure
     */
    termsControllerGetTermForAdmin: (id: string, params: RequestParams = {}) =>
      this.request<TermResponseDto, any>({
        path: `/api/terms/v1/admin/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerUpdateTerm
     * @summary 약관 수정 (관리자)
     * @request PATCH:/api/terms/v1/{id}
     * @secure
     */
    termsControllerUpdateTerm: (
      id: string,
      data: UpdateTermDto,
      params: RequestParams = {},
    ) =>
      this.request<TermResponseDto, any>({
        path: `/api/terms/v1/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Terms
     * @name TermsControllerRemoveTerm
     * @summary 약관 삭제 (관리자)
     * @request DELETE:/api/terms/v1/{id}
     * @secure
     */
    termsControllerRemoveTerm: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/terms/v1/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerGetBanks
     * @summary 은행 목록 조회
     * @request GET:/api/banks/v1
     */
    withdrawAccountControllerGetBanks: (params: RequestParams = {}) =>
      this.request<BankResponseDto[], any>({
        path: `/api/banks/v1`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerFindMine
     * @summary 내 환전계좌 목록 조회
     * @request GET:/api/withdraw-accounts/v1
     * @secure
     */
    withdrawAccountControllerFindMine: (params: RequestParams = {}) =>
      this.request<WithdrawAccountResponseDto[], any>({
        path: `/api/withdraw-accounts/v1`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerCreate
     * @summary 환전계좌 등록
     * @request POST:/api/withdraw-accounts/v1
     * @secure
     */
    withdrawAccountControllerCreate: (
      data: CreateWithdrawAccountDto,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawAccountResponseDto, any>({
        path: `/api/withdraw-accounts/v1`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerSetPrimary
     * @summary 대표 환전계좌 지정
     * @request PATCH:/api/withdraw-accounts/v1/{id}/primary
     * @secure
     */
    withdrawAccountControllerSetPrimary: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawAccountResponseDto, any>({
        path: `/api/withdraw-accounts/v1/${id}/primary`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerRemove
     * @summary 환전계좌 삭제
     * @request DELETE:/api/withdraw-accounts/v1/{id}
     * @secure
     */
    withdrawAccountControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/withdraw-accounts/v1/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerFindAllForAdmin
     * @summary 환전계좌 목록 조회 (관리자)
     * @request GET:/api/withdraw-accounts/v1/admin
     * @secure
     */
    withdrawAccountControllerFindAllForAdmin: (
      query?: {
        status?: "ACTIVE" | "INACTIVE";
        /** 회원 ID */
        memberId?: number;
        /** 은행 코드 */
        bankCode?: string;
        /** 계좌 인증 여부 */
        verified?: boolean;
        /** 닉네임, 이메일, 예금주, 마스킹 계좌번호, 은행명 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WithdrawAccountResponseDto[], any>({
        path: `/api/withdraw-accounts/v1/admin`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerFindOneForAdmin
     * @summary 환전계좌 상세 조회 (관리자)
     * @request GET:/api/withdraw-accounts/v1/admin/{id}
     * @secure
     */
    withdrawAccountControllerFindOneForAdmin: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawAccountResponseDto, any>({
        path: `/api/withdraw-accounts/v1/admin/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags WithdrawAccount
     * @name WithdrawAccountControllerVerifyByAdmin
     * @summary 환전계좌 인증 처리 (관리자)
     * @request PATCH:/api/withdraw-accounts/v1/admin/{id}/verify
     * @secure
     */
    withdrawAccountControllerVerifyByAdmin: (
      id: string,
      data: UpdateWithdrawAccountAdminDto,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawAccountResponseDto, any>({
        path: `/api/withdraw-accounts/v1/admin/${id}/verify`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerFindAll
     * @summary 공지사항 목록 조회
     * @request GET:/api/notice/v1
     */
    noticeControllerFindAll: (params: RequestParams = {}) =>
      this.request<NoticeResponseDto[], any>({
        path: `/api/notice/v1`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerCreate
     * @summary 공지사항 등록 (관리자)
     * @request POST:/api/notice/v1
     * @secure
     */
    noticeControllerCreate: (
      data: CreateNoticeDto,
      params: RequestParams = {},
    ) =>
      this.request<NoticeResponseDto, void>({
        path: `/api/notice/v1`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerFindOne
     * @summary 공지사항 상세 조회
     * @request GET:/api/notice/v1/{id}
     */
    noticeControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<NoticeResponseDto, void>({
        path: `/api/notice/v1/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerUpdate
     * @summary 공지사항 수정 (관리자)
     * @request PATCH:/api/notice/v1/{id}
     * @secure
     */
    noticeControllerUpdate: (
      id: string,
      data: UpdateNoticeDto,
      params: RequestParams = {},
    ) =>
      this.request<NoticeResponseDto, void>({
        path: `/api/notice/v1/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerRemove
     * @summary 공지사항 삭제 (관리자)
     * @request DELETE:/api/notice/v1/{id}
     * @secure
     */
    noticeControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/notice/v1/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notice
     * @name NoticeControllerFindAllForAdmin
     * @summary 공지사항 목록 조회 (관리자)
     * @request GET:/api/notice/v1/admin
     * @secure
     */
    noticeControllerFindAllForAdmin: (
      query?: {
        /** 작성자 닉네임, 이메일, 제목, 내용 키워드 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NoticeResponseDto[], any>({
        path: `/api/notice/v1/admin`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inquiry
     * @name InquiryControllerCreate
     * @summary 1:1 문의 등록
     * @request POST:/api/inquiry/v1
     * @secure
     */
    inquiryControllerCreate: (
      data: {
        category?: string;
        title?: string;
        content?: string;
        images?: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<InquiryResponseDto, any>({
        path: `/api/inquiry/v1`,
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
     * @tags Inquiry
     * @name InquiryControllerFindMine
     * @summary 내 1:1 문의 목록 조회
     * @request GET:/api/inquiry/v1/me
     * @secure
     */
    inquiryControllerFindMine: (params: RequestParams = {}) =>
      this.request<InquiryResponseDto[], any>({
        path: `/api/inquiry/v1/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inquiry
     * @name InquiryControllerFindAllForAdmin
     * @summary 문의 목록 조회 (관리자)
     * @request GET:/api/inquiry/v1/admin
     * @secure
     */
    inquiryControllerFindAllForAdmin: (
      query?: {
        status?: "PENDING" | "IN_PROGRESS" | "ANSWERED" | "CLOSED";
        category?: "DRAWING" | "ACCOUNT" | "PAYMENT" | "REVIEW" | "ETC";
        /** 닉네임, 이메일, 제목, 내용 키워드 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<InquiryResponseDto[], void>({
        path: `/api/inquiry/v1/admin`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inquiry
     * @name InquiryControllerFindOneForAdmin
     * @summary 문의 상세 조회 (관리자)
     * @request GET:/api/inquiry/v1/admin/{id}
     * @secure
     */
    inquiryControllerFindOneForAdmin: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<InquiryResponseDto, void>({
        path: `/api/inquiry/v1/admin/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inquiry
     * @name InquiryControllerUpdateByAdmin
     * @summary 문의 답변/상태 수정 (관리자)
     * @request PATCH:/api/inquiry/v1/admin/{id}
     * @secure
     */
    inquiryControllerUpdateByAdmin: (
      id: string,
      data: UpdateInquiryAdminDto,
      params: RequestParams = {},
    ) =>
      this.request<InquiryResponseDto, void>({
        path: `/api/inquiry/v1/admin/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inquiry
     * @name InquiryControllerFindOne
     * @summary 내 1:1 문의 상세 조회
     * @request GET:/api/inquiry/v1/{id}
     * @secure
     */
    inquiryControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<InquiryResponseDto, void>({
        path: `/api/inquiry/v1/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetMyWallet
     * @summary 내 코인 지갑 조회
     * @request GET:/api/wallet/v1/me
     * @secure
     */
    walletControllerGetMyWallet: (params: RequestParams = {}) =>
      this.request<WalletSummaryResponseDto, any>({
        path: `/api/wallet/v1/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetMyTransactions
     * @summary 내 코인 거래내역 조회
     * @request GET:/api/wallet/v1/transactions
     * @secure
     */
    walletControllerGetMyTransactions: (
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
      this.request<WalletTransactionPageResponseDto, any>({
        path: `/api/wallet/v1/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinProducts
     * @summary 코인 상품 목록 조회
     * @request GET:/api/coin-shop/v1/products
     */
    walletControllerGetCoinProducts: (params: RequestParams = {}) =>
      this.request<CoinProductResponseDto[], any>({
        path: `/api/coin-shop/v1/products`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinProductsForAdmin
     * @summary 코인 상품 목록 조회 (관리자)
     * @request GET:/api/coin-shop/v1/admin/products
     * @secure
     */
    walletControllerGetCoinProductsForAdmin: (params: RequestParams = {}) =>
      this.request<CoinProductResponseDto[], any>({
        path: `/api/coin-shop/v1/admin/products`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerCreateCoinProduct
     * @summary 코인 상품 등록 (관리자)
     * @request POST:/api/coin-shop/v1/admin/products
     * @secure
     */
    walletControllerCreateCoinProduct: (
      data: CreateCoinProductDto,
      params: RequestParams = {},
    ) =>
      this.request<CoinProductResponseDto, any>({
        path: `/api/coin-shop/v1/admin/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinProductForAdmin
     * @summary 코인 상품 상세 조회 (관리자)
     * @request GET:/api/coin-shop/v1/admin/products/{id}
     * @secure
     */
    walletControllerGetCoinProductForAdmin: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<CoinProductResponseDto, any>({
        path: `/api/coin-shop/v1/admin/products/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerUpdateCoinProduct
     * @summary 코인 상품 수정 (관리자)
     * @request PATCH:/api/coin-shop/v1/admin/products/{id}
     * @secure
     */
    walletControllerUpdateCoinProduct: (
      id: string,
      data: UpdateCoinProductDto,
      params: RequestParams = {},
    ) =>
      this.request<CoinProductResponseDto, any>({
        path: `/api/coin-shop/v1/admin/products/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerCreateCoinOrder
     * @summary 코인 주문 생성
     * @request POST:/api/coin-shop/v1/orders
     * @secure
     */
    walletControllerCreateCoinOrder: (
      data: CreateCoinOrderDto,
      params: RequestParams = {},
    ) =>
      this.request<CoinOrderResponseDto, any>({
        path: `/api/coin-shop/v1/orders`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinOrders
     * @summary 내 코인 주문 목록 조회
     * @request GET:/api/coin-shop/v1/orders
     * @secure
     */
    walletControllerGetCoinOrders: (
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
      this.request<CoinOrderPageResponseDto, any>({
        path: `/api/coin-shop/v1/orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerConfirmCoinOrder
     * @summary 코인 주문 결제 승인
     * @request POST:/api/coin-shop/v1/orders/{id}/confirm
     * @secure
     */
    walletControllerConfirmCoinOrder: (
      id: string,
      data: ConfirmCoinOrderDto,
      params: RequestParams = {},
    ) =>
      this.request<CoinOrderResponseDto, any>({
        path: `/api/coin-shop/v1/orders/${id}/confirm`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinOrdersForAdmin
     * @summary 코인 주문 목록 조회 (관리자)
     * @request GET:/api/coin-shop/v1/admin/orders
     * @secure
     */
    walletControllerGetCoinOrdersForAdmin: (
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
        status?: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
        paymentMethod?: "KAKAO_PAY" | "NAVER_PAY" | "CREDIT_CARD" | "TOSS_PAY";
        /** 회원 ID */
        memberId?: number;
        /** 닉네임, 이메일, 주문번호, 상품명 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CoinOrderPageResponseDto, any>({
        path: `/api/coin-shop/v1/admin/orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinOrderForAdmin
     * @summary 코인 주문 상세 조회 (관리자)
     * @request GET:/api/coin-shop/v1/admin/orders/{id}
     * @secure
     */
    walletControllerGetCoinOrderForAdmin: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<CoinOrderResponseDto, any>({
        path: `/api/coin-shop/v1/admin/orders/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerGetCoinOrder
     * @summary 내 코인 주문 상세 조회
     * @request GET:/api/coin-shop/v1/orders/{id}
     * @secure
     */
    walletControllerGetCoinOrder: (id: string, params: RequestParams = {}) =>
      this.request<CoinOrderResponseDto, any>({
        path: `/api/coin-shop/v1/orders/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Wallet
     * @name WalletControllerCancelCoinOrder
     * @summary 코인 주문 결제 취소
     * @request POST:/api/coin-shop/v1/orders/{id}/cancel
     * @secure
     */
    walletControllerCancelCoinOrder: (
      id: string,
      data: CancelCoinOrderDto,
      params: RequestParams = {},
    ) =>
      this.request<CoinOrderResponseDto, any>({
        path: `/api/coin-shop/v1/orders/${id}/cancel`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerGetPolicy
     * @summary 환전 정책 조회
     * @request GET:/api/withdraw/v1/policy
     * @secure
     */
    withdrawControllerGetPolicy: (params: RequestParams = {}) =>
      this.request<WithdrawPolicyResponseDto, any>({
        path: `/api/withdraw/v1/policy`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerCreate
     * @summary 환전 신청
     * @request POST:/api/withdraw/v1/requests
     * @secure
     */
    withdrawControllerCreate: (
      data: CreateWithdrawRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawRequestResponseDto, any>({
        path: `/api/withdraw/v1/requests`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerFindMine
     * @summary 내 환전 신청 목록 조회
     * @request GET:/api/withdraw/v1/requests/me
     * @secure
     */
    withdrawControllerFindMine: (params: RequestParams = {}) =>
      this.request<WithdrawRequestResponseDto[], any>({
        path: `/api/withdraw/v1/requests/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerFindOne
     * @summary 내 환전 신청 상세 조회
     * @request GET:/api/withdraw/v1/requests/{id}
     * @secure
     */
    withdrawControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<WithdrawRequestResponseDto, any>({
        path: `/api/withdraw/v1/requests/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerFindAllForAdmin
     * @summary 환전 신청 목록 조회 (관리자)
     * @request GET:/api/withdraw/v1/admin/requests
     * @secure
     */
    withdrawControllerFindAllForAdmin: (
      query?: {
        status?:
          | "REQUESTED"
          | "APPROVED"
          | "REJECTED"
          | "COMPLETED"
          | "CANCELLED";
        /** 회원 ID */
        memberId?: number;
        /** 은행 코드 */
        bankCode?: string;
        /** 닉네임, 이메일, 예금주, 마스킹 계좌번호, 은행명 검색 */
        keyword?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WithdrawRequestResponseDto[], any>({
        path: `/api/withdraw/v1/admin/requests`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerFindOneForAdmin
     * @summary 환전 신청 상세 조회 (관리자)
     * @request GET:/api/withdraw/v1/admin/requests/{id}
     * @secure
     */
    withdrawControllerFindOneForAdmin: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawRequestResponseDto, any>({
        path: `/api/withdraw/v1/admin/requests/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Withdraw
     * @name WithdrawControllerUpdateByAdmin
     * @summary 환전 신청 처리 (관리자)
     * @request PATCH:/api/withdraw/v1/admin/requests/{id}
     * @secure
     */
    withdrawControllerUpdateByAdmin: (
      id: string,
      data: UpdateWithdrawRequestAdminDto,
      params: RequestParams = {},
    ) =>
      this.request<WithdrawRequestResponseDto, any>({
        path: `/api/withdraw/v1/admin/requests/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrap
     * @name ScrapControllerScrapPost
     * @summary 게시글 찜
     * @request POST:/api/posts/{postId}/scrap
     * @secure
     */
    scrapControllerScrapPost: (postId: string, params: RequestParams = {}) =>
      this.request<ScrapStatusResponseDto, void>({
        path: `/api/posts/${postId}/scrap`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scrap
     * @name ScrapControllerUnscrapPost
     * @summary 게시글 찜 해제
     * @request DELETE:/api/posts/{postId}/scrap
     * @secure
     */
    scrapControllerUnscrapPost: (postId: string, params: RequestParams = {}) =>
      this.request<ScrapStatusResponseDto, void>({
        path: `/api/posts/${postId}/scrap`,
        method: "DELETE",
        secure: true,
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
