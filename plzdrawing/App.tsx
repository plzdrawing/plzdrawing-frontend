import "react-native-gesture-handler"; // 반드시 첫 줄에 추가
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSplash from "@/src/screens/auth/login/LoginSplash";
import Login from "@/src/screens/auth/login/EmailLogin";
import MainNavigation from "@/src/navigation/MainNavigation";
import { RootStackParamList } from "@/src/types/navigation";

import Signup from "@/src/screens/auth/login/Login";
import EmailSignup from "@/src/screens/auth/signup/EmailSignup";
import ProfileMakingSplash from "@/src/screens/auth/signup/profileMaking/ProfileMakingSplash";
import ProfileMakingDone from "@/src/screens/auth/signup/profileMaking/ProfileMakingDone";
import ProfileMakingNickname from "@/src/screens/auth/signup/profileMaking/ProfileMakingNickname";
import PasswordFind from "@/src/screens/auth/password/PasswordFind";
import EmailVerification from "@/src/screens/auth/signup/EmailVerification";
import VerificationComplete from "@/src/screens/auth/signup/EmailVerificationComplete";
import PwdSetting from "@/src/screens/auth/signup/PasswordSetting";
import PasswordChange from "@/src/screens/my/myPage/PasswordChange";
import Chatting from "@/src/screens/talk/chatting/Chatting";
import PasswordFindVerification from "@/src/screens/auth/password/PasswordFindVerification";
import PainterProfile from "@/src/screens/my/PainterProfile";
import HomePostDetail from "@/src/screens/home/post/HomePostDetail";
import HomeDrawingCardDetail from "@/src/screens/home/post/HomeDrawingCardDetail";
import HomeRequest from "@/src/screens/home/post/HomeRequest";
import ProfileUpload from "@/src/screens/my/profile/ProfileUpload";
import DrawingCardUpload from "@/src/screens/my/profile/DrawingCardUpload";
import Alarm from "@/src/screens/talk/alarm/Alarm";
import AlarmSetting from "@/src/screens/my/profile/mypage/AlarmSetting";
import CustomerService from "@/src/screens/my/profile/mypage/CustomerService";
import Notice from "@/src/screens/my/profile/mypage/Notice";
import ProfileEdit from "@/src/screens/my/profile/mypage/ProfileEdit";
import Tos from "@/src/screens/my/profile/mypage/Tos";
import EditAccount from "@/src/screens/my/myPage/edit/EditAccount";
import EditPassword from "@/src/screens/my/myPage/edit/EditPassword";
import EditSuccess from "@/src/screens/my/myPage/edit/components/EditSuccess";
import Payments from "@/src/screens/my/myPage/payments/Payments";
import UserProfile from "@/src/screens/my/userProfile/UserProfile";

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLoggedIn ? "Main" : "LoginSplash"}
        // initialRouteName="Chatting"
      >
        <Stack.Screen name="Main" component={MainNavigation} />
        <Stack.Screen name="LoginSplash" component={LoginSplash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EmailSignup" component={EmailSignup} />
        <Stack.Screen
          name="ProfileMakingSplash"
          component={ProfileMakingSplash}
        />
        <Stack.Screen
          name="ProfileMakingNickname"
          component={ProfileMakingNickname}
        />
        <Stack.Screen name="ProfileMakingDone" component={ProfileMakingDone} />
        <Stack.Screen name="PasswordFind" component={PasswordFind} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen
          name="PasswordFindVerification"
          component={PasswordFindVerification}
        />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen
          name="VerificationComplete"
          component={VerificationComplete}
        />
        <Stack.Screen name="PwdSetting" component={PwdSetting} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="PainterProfile" component={PainterProfile} />
        <Stack.Screen name="HomePostDetail" component={HomePostDetail} />
        <Stack.Screen
          name="HomeDrawingCardDetail"
          component={HomeDrawingCardDetail}
        />
        <Stack.Screen name="HomeRequest" component={HomeRequest} />
        <Stack.Screen name="ProfileUpload" component={ProfileUpload} />
        <Stack.Screen name="DrawingCardUpload" component={DrawingCardUpload} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="AlarmSetting" component={AlarmSetting} />
        <Stack.Screen name="CustomerService" component={CustomerService} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Tos" component={Tos} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="EditSuccess" component={EditSuccess} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // 폰트 로드 상태
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 인증 확인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 폰트 로드 함수
  const loadFonts = async () => {
    await Font.loadAsync({
      Ssurround: require("./assets/fonts/Ssurround.ttf"),
      SsurroundAir: require("./assets/fonts/SsurroundAir.ttf"),
    });
    setFontsLoaded(true);
  };

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Failed to check login status:', error);
      setIsLoggedIn(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // 앱 로딩 처리
  useEffect(() => {
    loadFonts();
    checkLoginStatus();
  }, []);

  // 폰트 로딩 중이거나 인증 확인 중인 경우
  if (!fontsLoaded || isCheckingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFC311" />
      </View>
    );
  }

  // AppNavigator로 네비게이션 관리
  return <AppNavigator isLoggedIn={isLoggedIn} />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
