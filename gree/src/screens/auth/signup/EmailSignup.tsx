import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { View, Keyboard } from 'react-native';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/common/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';
import { emailController } from '@/src/apis/controller/email';

export default function EmailSignup() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [emailError, setEmailError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return { isValid: false, message: '' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return { isValid: false, message: '이메일 양식에 맞지 않아요' };
    return { isValid: true, message: '' };
  };

  useEffect(() => {
    const result = validateEmail(email);
    setIsValidEmail(result.isValid);
    if (!email) {
      setEmailState('empty');
      setEmailError('');
    } else if (result.isValid) {
      setEmailState('filled');
      setEmailError('');
    } else {
      setEmailState('error');
      setEmailError(result.message);
    }
  }, [email]);

  const handleVerificationClick = async () => {
    Keyboard.dismiss();
    if (isLoading) return;
    if (!isValidEmail) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      setEmailState('error');
      return;
    }
    setIsLoading(true);
    try {
      await emailController.sendEmailVerificationCode(email);
      setSuccessModalVisible(true);
    } catch {
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className='px-[32px]'>
        <Txt variant='headLineBold' style={tw`mb-[98px]`}>
          이메일을 입력해주세요 :)
        </Txt>
        <View style={tw`gap-[17px]`}>
          <Txt variant='bodySubText' align='left'>
            이메일
          </Txt>
          <TextField
            placeholder='이메일'
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
          <Button isValid={isValidEmail} title='인증하기' onClick={handleVerificationClick} />
        </View>
      </BottomFixedArea>

      {errorModalVisible && (
        <AlertModal
          modalTitle='이미 회원가입한 이메일입니다:)'
          buttonTitle='확인'
          onClickButton={() => setErrorModalVisible(false)}
        />
      )}
      {successModalVisible && (
        <AlertModal
          modalTitle={'인증번호가 전송되었어요!\n이메일을 확인해주세요.'}
          buttonTitle='확인'
          onClickButton={() => {
            setSuccessModalVisible(false);
            navigation.navigate('EmailVerification', { email });
          }}
        />
      )}
    </>
  );
}
