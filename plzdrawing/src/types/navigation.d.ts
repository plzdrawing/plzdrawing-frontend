// 네비게이션에 사용할 ParamList 정의
export type RootStackParamList = {
  Main: undefined;
  LoginSplash: undefined;
  Login: { userId: string } | undefined;
  Signup: undefined;
  EmailSignup: undefined;
  ProfileMakingSplash: undefined;
  ProfileMakingNickname: undefined;
  ProfileMakingDone: undefined;
  PasswordFind: undefined;
  EmailVerification: undefined;
  VerificationComplete: undefined;
  PwdSetting: undefined;
};

// 바텀네비게이션 타입 정의
export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Talk: undefined;
  Profile: undefined;
};
