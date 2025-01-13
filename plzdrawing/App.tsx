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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false); // 앱 준비 상태
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
