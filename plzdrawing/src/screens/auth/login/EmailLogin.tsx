import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationProp, useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { View, Keyboard } from 'react-native';
import Header from '@/src/components/layout/header/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/ui/Txt';
import TextField from '@/src/components/ui/input/TextField';
import Button from '@/src/components/ui/button/Button';
import AlertModal from '@/src/components/ui/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';

import { authController } from '@/src/apis/controller/auth';

export default function EmailLogin() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordState, setPasswordState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const handleLoginClick = async () => {
    Keyboard.dismiss();
    
    if (emailState === 'error') {
      return;
    }

    try {
      const response = await authController.login({
        email: email,
        password: password,
      });

      console.log('login success:', response);

      if (response) {
        // Access Token 저장
        const accessToken = response.access_token || response.access_token;
        if (accessToken) {
          await AsyncStorage.setItem('accessToken', accessToken);
        }
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } catch (error) {
      // 로그인 실패
      console.error('Login failed:', error);
      setModalVisible(true);
    }
  };

  const handlePasswordFindClick = () => {
    navigation.navigate('PasswordFind');
  };

  const handleConfirm = () => {
    setEmailState('failed');
    setPasswordState('failed');
    setModalVisible(false);
  };

  return (
    <>
      <Header leftIcon={<BackArrowIcon />} />
      <Container className='px-[32px]'>
        <Txt variant='headLineBold' style={tw`mb-[67px]`}>
          안녕하세요 :) {'\n'}
          '그리'입니다.
        </Txt>

        <View style={tw`gap-[17px]`}>
          <Txt variant='bodySubText'>
            먼저 로그인이 필요해요.
          </Txt>
          <TextField
            placeholder='이메일'
            state={emailState}
            setState={setEmailState}
            content={email}
            validation={(text) => setEmail(text)}
            errorMessage={emailError}
          />
          <TextField
            placeholder='비밀번호'
            state={passwordState}
            setState={setPasswordState}
            content={password}
            validation={(text) => setPassword(text)}
            type='password'
            errorMessage={passwordState === 'failed'
                ? '이메일, 비밀번호를 다시 한 번 확인해주세요.'
                : '비밀번호를 다시 한 번 확인해주세요.'
            }
          />
          <Button
            isValid={emailState === 'filled' && passwordState === 'filled'}
            variant='default'
            title='로그인'
            onClick={handleLoginClick}
          />
          <Txt
            variant='bodySubText'
            align='center'
            style={{ textDecorationLine: 'underline' }}
            onPress={handlePasswordFindClick}
          >
            아이디 찾기 / 비밀번호 찾기
          </Txt>
        </View>
      </Container>

      {modalVisible && (
        <AlertModal
          modalTitle={'이메일 혹은 비밀번호가\n일치하지 않아요.'}
          buttonTitle='확인'
          onClickButton={handleConfirm}
        />
      )}
    </>
  );
}
