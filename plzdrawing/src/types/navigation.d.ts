// 네비게이션에 사용할 ParamList 정의
import { Home } from '@/src/screens/Home';
import HomeDrawingCardDetail from '../screens/post/HomeDrawingCardDetail';
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
  PasswordChange: undefined;
  EmailVerification: undefined;
  VerificationComplete: undefined;
  PwdSetting: undefined;
  Chatting: undefined;
  PasswordFindVerification: undefined;
  PainterProfile: undefined;
  HomePostDetail: { postId: string };
  HomeDrawingCardDetail: { cardId: string, postId: string };
  HomeRequest: { postId: string };
  ProfileUpload: undefined
};

// 바텀네비게이션 타입 정의
export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Talk: undefined;
  Profile: undefined;
};
