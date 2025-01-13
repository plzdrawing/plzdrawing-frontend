// 네비게이션에 사용할 ParamList 정의
export type RootStackParamList = {
  Main: undefined;
  LoginSplash: undefined;
  Login: { userId: string } | undefined;
};

// 필요하다면 다른 네비게이션 타입도 정의
export type BottomTabParamList = {
  Home: undefined;
  Community: undefined;
  Talk: undefined;
  Profile: undefined;
};
