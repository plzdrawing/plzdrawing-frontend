export type RootStackParamList = {
  LoginSplash: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Main: undefined;
  HomePostDetail: {
    postId: string;
    userName?: string;
    price?: number;
    sampleImage?: string;
  };
  HomeRequestComplete: { chatRoomId: number };
  UserProfile: { memberId: number };
  ProfileEdit: undefined;
  PasswordChange: undefined;
  PasswordChangeComplete: undefined;
  LogoutComplete: undefined;
  WithdrawComplete: undefined;
  AlarmNotification: undefined;
  NotificationCenter: undefined;
  NotificationDetail: { id: number };
  Announcement: undefined;
  AnnouncementDetail: { id: number };
  AppManagement: undefined;
  TermsOfService: undefined;
  Chatting: { chatRoomId: number };
  ReviewCreate: { chatRoomId: number; receiverNickname?: string };
  EmailSignup: undefined;
  EmailVerification: { email: string };
  EmailVerificationComplete: { email: string };
  PasswordSetting: {
    email: string;
    agreements: { terms: boolean; privacy: boolean; marketing: boolean };
  };
  NicknameSettingSplash: {
    email: string;
    password: string;
    agreements: { terms: boolean; privacy: boolean; marketing: boolean };
  };
  NicknameSetting: {
    email: string;
    password: string;
    agreements: { terms: boolean; privacy: boolean; marketing: boolean };
  };
  NicknameSettingComplete: undefined;
  PostEditor:
    | {
        postId?: string;
      }
    | undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  ResetPasswordComplete: undefined;
  CoinShop: undefined;
  CoinPurchase: {
    productId?: number;
    coinAmount: number;
    price: number;
    name: string;
    description?: string | null;
  };
  CustomerService: undefined;
  FAQDetail: { id: number };
};
