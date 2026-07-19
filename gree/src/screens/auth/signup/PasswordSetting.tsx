import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import { Keyboard, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import AlertModal from '@/src/components/common/modal/AlertModal';
import { FilledCheck, EmptyCheck } from '@/assets/images';

type RouteProps = RouteProp<RootStackParamList, 'PasswordSetting'>;

export default function PasswordSetting() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { email, agreements } = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordState, setPasswordState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [confirmState, setConfirmState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [combinationCheck, setCombinationCheck] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);

  const validatePassword = (pwd: string) => {
    if (!pwd) return { isValid: false };
    const lengthValid = pwd.length >= 8;
    setLengthCheck(lengthValid);
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[@$!%*#?&]/.test(pwd);
    setCombinationCheck(hasLetter && hasDigit && hasSpecial);
    return {
      isValid: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pwd),
    };
  };

  useEffect(() => {
    const pwResult = validatePassword(password);
    setPasswordState(password ? 'filled' : 'empty');

    const confirmResult = !confirmPassword
      ? false
      : password === confirmPassword;
    setConfirmState(!confirmPassword ? 'empty' : confirmResult ? 'filled' : 'error');

    setIsValid(pwResult.isValid && !!confirmPassword && password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Container>
      <Header />
      <View style={tw`gap-[98px] p-[43px_32px]`}>
        <Txt variant='headLineBold' align='left'>
          비밀번호를 설정해주세요.
        </Txt>
        <View style={tw`gap-[37px]`}>
          <View style={tw`gap-[17px]`}>
            <Txt variant='bodySubText' align='left'>
              비밀번호
            </Txt>
            <TextField
              placeholder='영문, 숫자, 특수문자 8자 이상.'
              state={passwordState}
              setState={setPasswordState}
              content={password}
              validation={(text) => {
                setPassword(text);
                setShowPasswordChecks(true);
              }}
              type='password'
            />
            {showPasswordChecks && (
              <View style={tw`gap-[7px] p-[0_0_0_20px]`}>
                <View style={tw`flex-row gap-[17px]`}>
                  {lengthCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant='bodySubText' color='icon_default'>
                    최소 8자 이상
                  </Txt>
                </View>
                <View style={tw`flex-row gap-[17px]`}>
                  {combinationCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant='bodySubText' color='icon_default'>
                    영문, 숫자, 특수문자 3가지 조합
                  </Txt>
                </View>
              </View>
            )}
          </View>
          <View style={tw`gap-[17px]`}>
            <Txt variant='bodySubText' align='left'>
              비밀번호 확인
            </Txt>
            <TextField
              placeholder='영문, 숫자, 특수문자 8자 이상.'
              state={confirmState}
              setState={setConfirmState}
              content={confirmPassword}
              validation={(text) => setConfirmPassword(text)}
              errorMessage='비밀번호가 일치하지 않아요'
              type='password'
            />
          </View>
        </View>
      </View>

      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            isValid={isValid}
            title='다음'
            color='sub_yellow'
            disabled={!isValid}
            onClick={() => {
              Keyboard.dismiss();
              setModalVisible(true);
            }}
          />
        </View>
      </BottomFixedArea>

      {modalVisible && (
        <AlertModal
          modalTitle='비밀번호 설정이 완료되었어요 :)'
          buttonTitle='확인'
          onClickButton={() => {
            setModalVisible(false);
            navigation.navigate('NicknameSettingSplash', { email, password, agreements });
          }}
        />
      )}
    </Container>
  );
}
