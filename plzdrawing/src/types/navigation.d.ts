// 네비게이션에 사용할 ParamList 정의
import { Home } from '@/src/screens/home/Home';
import HomeDrawingCardDetail from '../screens/home/post/HomeDrawingCardDetail';

type Agreements = {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export type RootStackParamList = {
  Main: undefined;

  LoginSplash: undefined;
  Login: undefined;
  EmailLogin: undefined;
  EmailSignup: undefined;
  EmailVerification: { email: string };
  EmailVerificationComplete: { email: string };
  PasswordSetting: { email: string; agreements: Agreements };
  NicknameSettingSplash: { email: string; password: string; agreements: Agreements };
  NicknameSetting: { email: string; password: string; agreements: Agreements };
  NicknameSettingComplete: undefined;
  PasswordFind: undefined;
  PasswordFindVerification: { email: string };
  
  Chatting: { chatRoomId: number };
  
  HomePostDetail: { postId: string };
  HomeDrawingCardDetail: { cardId: string, postId: string };
  HomeRequest: { postId: string };

  PasswordChange: { email: string };
  PainterProfile: undefined;

  AppManagement: undefined;
  
  ProfileUpload: undefined;
  DrawingCardUpload: undefined;
  Alarm: undefined;
  AlarmSetting: undefined;
  CustomerService: undefined;
  Notice: undefined;
  ProfileEdit: undefined;
  Tos: undefined;
  EditAccount: undefined;
  EditPassword: undefined;
  EditSuccess: { type: 'profile' | 'password' };
  Payments: undefined;
  UserProfile: undefined;
};

// 바텀네비게이션 타입 정의
export type BottomTabParamList = {
  Home: undefined;
  Talk: undefined;
  Profile: undefined;
};
