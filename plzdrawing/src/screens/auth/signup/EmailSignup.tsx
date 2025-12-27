import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { View, Keyboard } from 'react-native';
import Header from '@/src/components/common/header/Header';
import Container from '@/src/components/common/container/Container';
import Txt from '@/src/components/common/text/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/common/area/BottomFixedArea';
import Button from '@/src/components/ui/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';

import { authApi } from '@/src/apis/auth';

export default function EmailSignup() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [emailError, setEmailError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): { 
    isValid: boolean;
    message: string;
  } => {
    if (!email) {
      return { isValid: false, message: '' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { isValid: false, message: '이메일 양식에 맞지 않아요' };
    }
    return { isValid: true, message: '' };
  };

  useEffect(() => {
    const result = validateEmail(email);
    setIsValidEmail(result.isValid);

    if (!email) {
      // 이메일이 비어있는 경우
      setEmailState('empty');
      setEmailError('');
    } else if (result.isValid) {
      // 이메일이 유효한 경우
      setEmailState('filled');
      setEmailError('');
    } else {
      // 이메일이 유효하지 않은 경우
      setEmailState('error');
      setEmailError(result.message);
    }
  }, [email]);

  const handleVerificationClick = async () => {
    Keyboard.dismiss();

    // 이미 로딩 중이면 중복 요청 방지
    if (isLoading) return;
    
    if (isValidEmail) {
      setIsLoading(true); // 로딩 시작
      try {
        // API 호출
        await authApi.sendEmailVerification({ email });

        // API 호출 성공 시
        console.log("인증번호 전송 성공!");
        setSuccessModalVisible(true);

      } catch (error: any) {
        // API 호출 실패 시 (네트워크, 서버 에러 등)
        console.error("API Error:", error);
        // 서버에서 보낸 에러 메시지가 있다면 사용, 없다면 기본 메시지
        setErrorModalVisible(true);
      } finally {
        setIsLoading(false); // 로딩 종료 (성공/실패 여부와 관계없이)
      }
    } else {
      // 이메일 형식이 올바르지 않은 경우 (기존 로직)
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailState("error");
    }
  };

  const handleErrorClick = () => {
    setErrorModalVisible(false);
  };

  const handleSuccessClick = () => {
    navigation.navigate('EmailVerification', { email: email});
    setSuccessModalVisible(false);
  };

  return (
    <>
      <Header leftIcon={<BackArrowIcon />} />
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
          <Button
            isValid={isValidEmail}
            title='인증하기'
            onClick={handleVerificationClick}
          />
        </View>
      </BottomFixedArea>

      {errorModalVisible && (
        <AlertModal
          modalTitle='이미 회원가입한 이메일입니다:)'
          buttonTitle='확인'
          onClickButton={handleErrorClick}
        />
      )}

      {successModalVisible && (
        <AlertModal
          modalTitle={'인증번호가 전송되었어요!\n이메일을 확인해주세요.'}
          buttonTitle='확인'
          onClickButton={handleSuccessClick}
        />
      )}
    </>
  );
}
