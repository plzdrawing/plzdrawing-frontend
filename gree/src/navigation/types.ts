export type RootStackParamList = {
  LoginSplash: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Main: undefined;
  HomePostDetail: { postId: string };
  ProfileEdit: undefined;
  AlarmNotification: undefined;
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
