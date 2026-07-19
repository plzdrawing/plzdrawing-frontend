import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, KeyboardAvoidingView, Platform } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import Button from '@/src/components/common/button/Button';

import { BackArrowIcon } from '@/assets/images';
import { emailController } from '@/src/apis/controller/email';

type Props = StackScreenProps<RootStackParamList, 'ResetPassword'>;

export default function ResetPassword({ navigation, route }: Props) {
  const { email } = route.params;
  const [authCode, setAuthCode] = useState('');
  const [authCodeState, setAuthCodeState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setError('');

    if (!authCode.trim()) {
      setError('인증코드를 입력해주세요');
      setAuthCodeState('error');
      return;
    }

    setLoading(true);
    try {
      await emailController.resetPassword(email, authCode);
      navigation.reset({
        index: 0,
        routes: [{ name: 'ResetPasswordComplete' }],
      });
    } catch (err: any) {
      console.error('resetPassword 실패', err);
      setError(
        err?.response?.data?.message || '인증코드가 유효하지 않습니다. 다시 확인해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = authCode.trim();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <Container className='w-full'>
        <Header title='비밀번호 초기화' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

        <View style={tw`flex-1 px-[32px] py-[40px]`}>
          <View style={tw`mb-[32px]`}>
            <Txt variant='mainTitleBold' style={tw`mb-[12px]`}>
              이메일로 받은 인증코드를 입력하세요
            </Txt>
            <Txt variant='bodyText' color='dark_gray1'>
              {email}
            </Txt>
          </View>

          <TextField
            placeholder='인증코드 (예: 123456)'
            state={authCodeState}
            setState={setAuthCodeState}
            content={authCode}
            validation={(text) => setAuthCode(text)}
            editable={!loading}
            className='mb-[20px]'
            maxLength={10}
          />

          {error && (
            <Txt variant='bodyText' color='error_red' style={tw`mb-[20px]`}>
              {error}
            </Txt>
          )}

          <View style={tw`flex-1`} />

          <Button
            onPress={handleResetPassword}
            disabled={!isFormValid || loading}
            loading={loading}
            style={tw`mb-[12px]`}
          >
            비밀번호 초기화
          </Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
