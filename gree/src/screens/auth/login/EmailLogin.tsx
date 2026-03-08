import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/src/stores/authStore';

import { NavigationProp, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import { View, Keyboard } from 'react-native';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import Button from '@/src/components/common/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';
import { authController } from '@/src/apis/controller/auth';

export default function EmailLogin() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordState, setPasswordState] = useState<'empty' | 'filled' | 'error' | 'failed'>(
    'empty'
  );

  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  useEffect(() => {
    if (!email) {
      setEmailState('empty');
      setEmailError('');
    } else if (validateEmail(email)) {
      setEmailState('filled');
      setEmailError('');
    } else {
      setEmailState('error');
      setEmailError('이메일 양식에 맞지 않아요.');
    }
  }, [email]);

  const { setAuth } = useAuthStore();

  const handleLoginClick = async () => {
    Keyboard.dismiss();
    if (emailState === 'error') return;

    try {
      const response = await authController.login({ email, password });
      const accessToken = response.access_token;
      if (!accessToken) throw new Error('No access token in response');

      await setAuth(accessToken);

      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] })
      );
    } catch (error) {
      console.error('Login failed:', error);
      setModalVisible(true);
    }
  };

  const handleConfirm = () => {
    setEmailState('failed');
    setPasswordState('failed');
    setModalVisible(false);
  };

  return (
    <>
      <Header leftIcon={<BackArrowIcon />} />
      <Container className="px-[32px]">
        <Txt variant="headLineBold" style={tw`mb-[67px]`}>
          안녕하세요 :) {'\n'}
          '그리'입니다.
        </Txt>

        <View style={tw`gap-[17px]`}>
          <Txt variant="bodySubText">먼저 로그인이 필요해요.</Txt>
          <TextField
            placeholder="이메일"
            state={emailState}
            setState={setEmailState}
            content={email}
            validation={(text) => setEmail(text)}
            errorMessage={emailError}
          />
          <TextField
            placeholder="비밀번호"
            state={passwordState}
            setState={setPasswordState}
            content={password}
            validation={(text) => setPassword(text)}
            type="password"
            errorMessage={
              passwordState === 'failed'
                ? '이메일, 비밀번호를 다시 한 번 확인해주세요.'
                : '비밀번호를 다시 한 번 확인해주세요.'
            }
          />
          <Button
            isValid={emailState === 'filled' && passwordState === 'filled'}
            variant="default"
            title="로그인"
            onClick={handleLoginClick}
          />
        </View>
      </Container>

      {modalVisible && (
        <AlertModal
          modalTitle={'이메일 혹은 비밀번호가\n일치하지 않아요.'}
          buttonTitle="확인"
          onClickButton={handleConfirm}
        />
      )}
    </>
  );
}
