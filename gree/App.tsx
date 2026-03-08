import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { RootStackParamList } from '@/src/navigation/types';
import { queryClient } from '@/src/lib/queryClient';
import { useAuthStore } from '@/src/stores/authStore';

import LoginSplash from '@/src/screens/auth/login/LoginSplash';
import Login from '@/src/screens/auth/login/Login';
import EmailLogin from '@/src/screens/auth/login/EmailLogin';
import MainNavigation from '@/src/navigation/MainNavigation';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Ssurround: require('./assets/fonts/Ssurround.ttf'),
    SsurroundAir: require('./assets/fonts/SsurroundAir.ttf'),
  });

  const { isLoggedIn, isHydrated, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isHydrated]);

  if (!fontsLoaded || !isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#FFC311' />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoggedIn ? 'Main' : 'LoginSplash'}
          >
            <Stack.Screen name='LoginSplash' component={LoginSplash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='EmailLogin' component={EmailLogin} />
            <Stack.Screen name='Main' component={MainNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
