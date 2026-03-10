import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { View } from 'react-native';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import CodeField from '@/src/components/common/input/CodeField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/common/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';
import { emailController } from '@/src/apis/controller/email';

type RouteProps = RouteProp<RootStackParamList, 'EmailVerification'>;

export default function EmailVerification() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { email } = route.params;

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [codeState, setCodeState] = useState<'default' | 'error'>('default');
  const [timeLeft, setTimeLeft] = useState(300);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          emailController.cancelEmailVerification(email).catch(() => {});
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      emailController.cancelEmailVerification(email).catch(() => {});
    };
  }, [email]);

  const handleResendCode = async () => {
    try {
      await emailController.cancelEmailVerification(email);
      await emailController.sendEmailVerificationCode(email);
      setTimeLeft(300);
      setVerificationCode(['', '', '', '', '', '']);
      setCodeState('default');
    } catch {
      // 무시
    }
  };

  const handleVerificationButtonClick = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6 || isLoading) return;
    setIsLoading(true);
    try {
      await emailController.verifyEmailCode(email, code);
      setCodeState('default');
      setModalVisible(true);
    } catch {
      setCodeState('error');
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isVerificationComplete = verificationCode.every((c) => c !== '');

  return (
    <>
      <Header />
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
          buttonTitle='확인'
          onClickButton={() => setErrorModalVisible(false)}
        />
      )}
      {modalVisible && (
        <AlertModal
          modalTitle='인증번호 확인이 완료되었어요 :)!'
          buttonTitle='확인'
          onClickButton={() => {
            setModalVisible(false);
            navigation.navigate('EmailVerificationComplete', { email });
          }}
        />
      )}
    </>
  );
}
