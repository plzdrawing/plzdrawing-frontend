// 네비게이션에 사용할 ParamList 정의
import { Home } from '@/src/screens/Home';
import HomeDrawingCardDetail from '../screens/post/HomeDrawingCardDetail';

type Agreements = {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  LoginSplash: undefined;
  Login: { userId: string } | undefined;
  Signup: undefined;
  EmailSignup: undefined;
  ProfileMakingSplash: { email: string; password: string; agreements: Agreements };
  ProfileMakingNickname: { email: string; password: string; agreements: Agreements };
  ProfileMakingDone: undefined;
  PasswordFind: undefined;
  PasswordChange: { email: string };
  EmailVerification: { email: string };
  VerificationComplete: { email: string };
  PwdSetting: { email: string; agreements: Agreements };
  Chatting: undefined;
  PasswordFindVerification: { email: string };
  PainterProfile: undefined;
  HomePostDetail: { postId: string };
  HomeDrawingCardDetail: { cardId: string, postId: string };
  HomeRequest: { postId: string };
  ProfileUpload: undefined;
  DrawingCardUpload: undefined;
  Alarm: undefined;
  AlarmSetting: undefined;
  CustomerService: undefined;
  Notice: undefined;
  ProfileEdit: undefined;
  Tos: undefined;
  EditAccount: undefined;
  EditPassword: { email: string };
  EditSuccess: { type: 'profile' | 'password' };
  Payments: undefined;
  UserProfile: undefined;
};

// 바텀네비게이션 타입 정의
export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Talk: undefined;
  Profile: undefined;
};
