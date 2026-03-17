import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState } from 'react';
import { NavigationProp, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { useAuthStore } from '@/src/stores/authStore';

import * as ExpoLinking from 'expo-linking';
import { View, Linking } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import Button from '@/src/components/common/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';
import { authController } from '@/src/apis/controller/auth';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { setAuth } = useAuthStore();
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [socialError, setSocialError] = useState('');
  const pendingProviderRef = useRef<'kakao' | 'google' | null>(null);

  const resetToMain = () => {
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
  };

  const extractTokensFromUrl = (url: string) => {
    const parsed = ExpoLinking.parse(url);
    const query = (parsed.queryParams || {}) as Record<string, string | undefined>;

    const hashIndex = url.indexOf('#');
    const hashParams = new URLSearchParams(hashIndex >= 0 ? url.slice(hashIndex + 1) : '');

    const accessToken =
      query.access_token ||
      query.accessToken ||
      query.token ||
      hashParams.get('access_token') ||
      hashParams.get('accessToken') ||
      hashParams.get('token') ||
      '';
    const refreshToken =
      query.refresh_token || query.refreshToken || hashParams.get('refresh_token') || hashParams.get('refreshToken') || '';
    const code = (query.code || hashParams.get('code') || '') as string;
    const provider = (query.provider || hashParams.get('provider') || pendingProviderRef.current || '') as
      | 'kakao'
      | 'google'
      | '';

    return { accessToken, refreshToken, code, provider };
  };

  const handleSocialCallbackUrl = async (url: string) => {
    if (!url) return;

    const lowerUrl = url.toLowerCase();
    if (!lowerUrl.includes('auth/callback') && !lowerUrl.includes('access_token') && !lowerUrl.includes('code=')) {
      return;
    }

    setIsSocialLoading(true);
    try {
      let { accessToken, refreshToken, code, provider } = extractTokensFromUrl(url);

      if (!accessToken && code) {
        const redirectUri = ExpoLinking.createURL('auth/callback');
        if (provider !== 'kakao' && provider !== 'google') {
          throw new Error('소셜 로그인 제공자 정보를 확인할 수 없습니다.');
        }

        const callbackResponse =
          provider === 'kakao'
            ? await authController.kakaoLoginCallback(code, redirectUri)
            : await authController.googleLoginCallback(code, redirectUri);

        accessToken = (callbackResponse as any)?.access_token || (callbackResponse as any)?.accessToken || '';
        refreshToken = (callbackResponse as any)?.refresh_token || (callbackResponse as any)?.refreshToken || '';
      }

      if (!accessToken) {
        throw new Error('소셜 로그인 토큰이 응답에 없습니다.');
      }

      await setAuth(accessToken, refreshToken || undefined);
      pendingProviderRef.current = null;
      setSocialError('');
      resetToMain();
    } catch (error) {
      console.error('social callback failed:', error);
      setSocialError('소셜 로그인에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSocialLoading(false);
    }
  };

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      handleSocialCallbackUrl(url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) handleSocialCallbackUrl(url);
    });

    return () => {
      sub.remove();
    };
  }, []);

  const handleSocialLogin = async (provider: 'kakao' | 'google') => {
    if (isSocialLoading) return;

    pendingProviderRef.current = provider;
    setSocialError('');
    try {
      const redirectUri = ExpoLinking.createURL('auth/callback');
      const loginUrl =
        provider === 'kakao'
          ? authController.getKakaoLoginUrl(redirectUri)
          : authController.getGoogleLoginUrl(redirectUri);

      await Linking.openURL(loginUrl);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      setSocialError('소셜 로그인에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleLoginKakao = () => handleSocialLogin('kakao');
  const handleLoginGoogle = () => handleSocialLogin('google');
  const handleLoginApple = () => {};
  const handleLoginEmail = () => {
    navigation.navigate('EmailLogin');
  };
  const handleSignupEmail = () => {
    navigation.navigate('EmailSignup');
  };

  return (
    <Container className="px-[32px] pt-[71px] pb-[97px]">
      <Txt variant="headLineBold" style={tw`mb-[67px]`}>
        안녕하세요 :) {'\n'}
        '그리'입니다.
      </Txt>

      <View style={tw`gap-[17px]`}>
        <Txt variant="bodySubText">먼저 로그인이 필요해요.</Txt>
        <Button
          variant="auth"
          loginType="kakao"
          isValid={!isSocialLoading}
          onClick={handleLoginKakao}
        />
        <Button
          variant="auth"
          loginType="google"
          isValid={!isSocialLoading}
          onClick={handleLoginGoogle}
        />
        <Button variant="auth" loginType="apple" onClick={handleLoginApple} />
        <Button
          variant="auth"
          loginType="email"
          title="이메일 로그인"
          onClick={handleLoginEmail}
        />
        <View style={tw`h-[1px] w-full bg-light-gray-3`} />
        <Button
          variant="auth"
          loginType="signup"
          title="이메일 회원가입"
          onClick={handleSignupEmail}
        />
      </View>

      {socialError ? (
        <AlertModal
          modalTitle={socialError}
          buttonTitle='확인'
          onClickButton={() => setSocialError('')}
        />
      ) : null}
    </Container>
  );
}
