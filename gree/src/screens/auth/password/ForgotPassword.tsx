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

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPassword({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleSendCode = async () => {
    setError('');

    if (!email.trim()) {
      setError('이메일을 입력해주세요');
      setEmailState('error');
      return;
    }

    if (!validateEmail(email)) {
      setError('유효한 이메일을 입력해주세요');
      setEmailState('error');
      return;
    }

    setLoading(true);
    try {
      await emailController.sendPasswordResetCode(email);
      navigation.navigate('ResetPassword', { email });
    } catch (err: any) {
      console.error('sendPasswordResetCode 실패', err);
      setError(
        err?.response?.data?.message ||
          '비밀번호 초기화 코드 전송에 실패했습니다. 이메일을 다시 확인해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() && validateEmail(email);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <Container className='w-full'>
        <Header title='비밀번호 찾기' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

        <View style={tw`flex-1 px-[32px] py-[40px]`}>
          <View style={tw`mb-[32px]`}>
            <Txt variant='mainTitleBold' style={tw`mb-[12px]`}>
              가입한 이메일 주소를 입력해주세요
            </Txt>
            <Txt variant='bodyText' color='dark_gray1'>
              비밀번호 초기화 링크가 이메일로 전송됩니다
            </Txt>
          </View>

          <TextField
            placeholder='이메일 주소'
            state={emailState}
            setState={setEmailState}
            content={email}
            validation={(text) => setEmail(text)}
            keyboardType='email-address'
            editable={!loading}
            className='mb-[20px]'
          />

          {error && (
            <Txt variant='bodyText' color='error_red' style={tw`mb-[20px]`}>
              {error}
            </Txt>
          )}

          <View style={tw`flex-1`} />

          <Button
            onPress={handleSendCode}
            disabled={!isFormValid || loading}
            loading={loading}
            style={tw`mb-[12px]`}
          >
            확인
          </Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
