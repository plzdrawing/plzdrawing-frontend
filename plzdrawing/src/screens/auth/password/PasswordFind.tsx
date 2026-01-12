import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { View, Keyboard } from 'react-native';
import Header from '@/src/components/layout/header/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/ui/Txt';
import TextField from '@/src/components/ui/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/ui/button/Button';
import AlertModal from '@/src/components/ui/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';

import { emailController } from '@/src/apis/controller/email';

export default function PasswordFind() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [emailError, setEmailError] = useState('');

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!email) {
      setEmailState('empty');
      setEmailError('');
      setIsButtonEnabled(false);
    } else if (validateEmail(email)) {
      setEmailState('filled');
      setEmailError('');
      setIsButtonEnabled(true);
    } else {
      setEmailState('error');
      setEmailError('이메일 양식에 맞지 않아요.');
      setIsButtonEnabled(false);
    }
  }, [email]);

  const handleSendCodeClick = async () => {
    Keyboard.dismiss();

    if (!isButtonEnabled) return;

    try {
      await emailController.sendPasswordResetCode(email);
      // API 호출 성공
      console.log('new password code sent');
      setSuccessModalVisible(true);
    } catch (error) {
      // API 호출 실패 (가입되지 않은 이메일)
      console.error('Password reissue request failed:', error);
      setErrorModalVisible(true);
    }
  };

  const handleSuccessModalClick = () => {
    setSuccessModalVisible(false);
    navigation.navigate('PasswordFindVerification', { email: email });
  };

  const handleErrorModalClose = () => {
    setErrorModalVisible(false);
  };

  return (
    <>
      <Header leftIcon={<BackArrowIcon />} />
      <Container className='px-[32px]'>
        <Txt variant='headLineBold' style={tw`mb-[98px]`}>
          비밀번호 찾기
        </Txt>

        <View style={tw`gap-[17px]`}>
          <Txt variant='bodySubText'>
            이메일
          </Txt>
          <TextField
            placeholder='이메일을 입력해주세요.'
            state={emailState}
            setState={setEmailState}
            content={email}
            validation={(text) => setEmail(text)}
            errorMessage={emailError}
          />
        </View>
      </Container>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px]`}>
          <Button
            isValid={isButtonEnabled}
            title='인증번호 전송'
            onClick={handleSendCodeClick}
          />
        </View>
      </BottomFixedArea>

      {errorModalVisible && (
        <AlertModal
          modalTitle='가입되지 않은 이메일이에요.'
          buttonTitle='확인'
          onClickButton={handleErrorModalClose}
        />
      )}

      {successModalVisible && (
        <AlertModal
          modalTitle='인증번호가 전송되었어요!'
          buttonTitle='확인'
          onClickButton={handleSuccessModalClick}
        />
      )}
    </>
  );
}
