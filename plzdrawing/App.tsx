import "react-native-gesture-handler"; // 반드시 첫 줄에 추가
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginSplash from "@/src/screens/auth/LoginSplash";
import Login from "@/src/screens/auth/Login";
import MainNavigation from "@/src/navigation/MainNavigation";
import { RootStackParamList } from "@/src/types/navigation";
import Signup from "@/src/screens/auth/signup/Signup";
import EmailSignup from "@/src/screens/auth/signup/EmailSignup";
import ProfileMakingSplash from "@/src/screens/auth/signup/profileMaking/ProfileMakingSplash";
import ProfileMakingDone from "@/src/screens/auth/signup/profileMaking/ProfileMakingDone";
import ProfileMakingNickname from "@/src/screens/auth/signup/profileMaking/ProfileMakingNickname";
import PasswordFind from "@/src/screens/auth/password/PasswordFind";
import EmailVerification from "@/src/screens/auth/signup/EmailVerification";
import VerificationComplete from "@/src/screens/auth/signup/VerificationComplete";
import PwdSetting from "@/src/screens/auth/signup/PwdSetting";
import PasswordChange from "@/src/screens/auth/password/PasswordChange";
import Chatting from "@/src/screens/talk/Chatting";
import PasswordFindVerification from "@/src/screens/auth/password/PasswordFindVerification";
import PainterProfile from "@/src/screens/PainterProfile";
import Home from "@/src/screens/Home";
import HomePostDetail from "@/src/screens/post/HomePostDetail";

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LoginSplash"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false); // 폰트 로드 상태

  // 폰트 로드 함수
  const loadFonts = async () => {
    await Font.loadAsync({
      Ssurround: require("./assets/fonts/Ssurround.ttf"),
      SsurroundAir: require("./assets/fonts/SsurroundAir.ttf"),
    });
    setFontsLoaded(true);
  };

  // 앱 로딩 처리
  useEffect(() => {
    loadFonts();
  }, []);

  // 폰트 로딩 중인 경우
  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFC311" />
      </View>
    );
  }

  // AppNavigator로 네비게이션 관리
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
