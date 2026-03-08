import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackParamList } from '@/src/navigation/types';
import Login from '@/src/screens/auth/login/Login';
import EmailLogin from '@/src/screens/auth/login/EmailLogin';
import MainNavigation from '@/src/navigation/MainNavigation';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    Ssurround: require('./assets/fonts/Ssurround.ttf'),
    SsurroundAir: require('./assets/fonts/SsurroundAir.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmailLogin" component={EmailLogin} />
          <Stack.Screen name="Main" component={MainNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
