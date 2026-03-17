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
  ProfileEdit: undefined;
  PasswordChange: undefined;
  PasswordChangeComplete: undefined;
  LogoutComplete: undefined;
  WithdrawComplete: undefined;
  AlarmNotification: undefined;
  Announcement: undefined;
  AnnouncementDetail: { id: number };
  AppManagement: undefined;
  TermsOfService: undefined;
  Chatting: { chatRoomId: number };
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
  PostUpload: undefined;
};
