import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { RootStackParamList } from "@/src/types/navigation";

import { View } from 'react-native';
import Header from '@/src/components/layout/header/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/ui/Txt';
import CodeField from '@/src/components/ui/input/CodeField';
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Button from '@/src/components/ui/button/Button';
import AlertModal from '@/src/components/ui/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';

import { emailController } from '@/src/apis/controller/email';

type EmailVerificationRouteProp = RouteProp<RootStackParamList, 'EmailVerification'>;

export default function EmailVerification() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const route = useRoute<EmailVerificationRouteProp>();
  const { email } = route.params;

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [codeState, setCodeState] = useState<'default' | 'error'>('default');
  const [timeLeft, setTimeLeft] = useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // 시간이 0이 되면 인증 취소
          emailController.cancelEmailVerification(email).catch(console.error);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      // 컴포넌트 언마운트시 인증 취소
      emailController.cancelEmailVerification(email).catch(console.error);
    };
  }, [email]);

  const handleResendCode = async () => {
    try {
      // 기존 인증 취소
      await emailController.cancelEmailVerification(email);
      // 새 인증번호 전송
      await emailController.sendEmailCode({ email });
      // 상태 초기화
      setTimeLeft(300);
      setVerificationCode(["", "", "", "", "", ""]);
      setCodeState('default');
    } catch (error) {
      console.error('인증번호 재전송 실패:', error);
    }
  };

  const handleVerificationButtonClick = async () => {
    const code = verificationCode.join("");
    if (!code || code.length !== 6 || isLoading) {
      return;
    }

    setIsLoading(true); // 로딩 시작

    try {
      await emailController.verifyEmailCode({ email, code });

      // 성공 시
      setCodeState('default');
      setModalVisible(true);
    } catch (error) {
      // 실패 시
      console.error("인증 실패:", error);
      setCodeState('error');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const isVerificationComplete = verificationCode.every((code) => code !== "");

  return (
    <>
      <Header leftIcon={<BackArrowIcon />} />
      <Container className='px-[32px]'>
        <Txt variant='headLineBold' style={tw`mb-[133px]`}>
          인증번호를 확인해주세요 :)
        </Txt>
        <CodeField
          state={codeState}
          setState={setCodeState}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          timeLeft={timeLeft}
          onClickResend={handleResendCode}
        />
      </Container>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px]`}>
          <Button
            isValid={isVerificationComplete}
            title='확인'
            onClick={handleVerificationButtonClick}
          />
        </View>
      </BottomFixedArea>

      {errorModalVisible && (
        <AlertModal
          modalTitle='인증번호가 일치하지 않아요.'
          buttonTitle="확인"
          onClickButton={() => {
            setErrorModalVisible(false);
          }}
        />
      )}

      {modalVisible && (
        <AlertModal
          modalTitle="인증번호 확인이 완료되었어요 :)!"
          buttonTitle="확인"
          onClickButton={() => {
            setModalVisible(false);
            navigation.navigate("VerificationComplete", { email: email });
          }}
        />
      )}
    </>
  );
}
