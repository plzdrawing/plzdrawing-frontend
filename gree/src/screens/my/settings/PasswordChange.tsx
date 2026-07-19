import tw from '@/src/lib/tailwind';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, Keyboard } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

import { BackArrowIcon, FilledCheck, EmptyCheck } from '@/assets/images';
import { emailController } from '@/src/apis/controller/email';

type Props = StackScreenProps<RootStackParamList, 'PasswordChange'>;

type InputState = 'empty' | 'filled' | 'error' | 'failed';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export default function PasswordChange({ navigation }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordState, setCurrentPasswordState] = useState<InputState>('empty');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordState, setNewPasswordState] = useState<InputState>('empty');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordState, setConfirmPasswordState] = useState<InputState>('empty');

  const [lengthCheck, setLengthCheck] = useState(false);
  const [combinationCheck, setCombinationCheck] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&]/.test(password);

    setLengthCheck(hasMinLength);
    setCombinationCheck(hasLetter && hasDigit && hasSpecial);

    return PASSWORD_REGEX.test(password);
  };

  useEffect(() => {
    const nextPasswordValid = validatePassword(newPassword);

    setCurrentPasswordState(currentPassword ? 'filled' : 'empty');
    setNewPasswordState(newPassword ? (nextPasswordValid ? 'filled' : 'error') : 'empty');
    setConfirmPasswordState(
      !confirmPassword ? 'empty' : newPassword === confirmPassword ? 'filled' : 'error'
    );

    setIsValid(
      !!currentPassword &&
        nextPasswordValid &&
        !!confirmPassword &&
        newPassword === confirmPassword &&
        currentPassword !== newPassword
    );
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = async () => {
    if (!isValid || isSaving) return;

    Keyboard.dismiss();
    setIsSaving(true);

    try {
      await emailController.changePassword(currentPassword, newPassword);
      navigation.replace('PasswordChangeComplete');
    } catch (error) {
      console.error('Failed to change password:', error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || '';

      if (message.includes('현재') || message.includes('비밀번호')) {
        setCurrentPasswordState('failed');
      } else {
        setCurrentPasswordState('failed');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Container className='w-full'>
      <Header title='비밀번호 변경' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] pt-[36px] pb-[140px]`}>
          <View style={tw`mb-[32px]`}>
            <Txt variant='bodyText' style={tw`mb-[14px]`}>
              기존 비밀번호
            </Txt>
            <TextField
              placeholder='기존 비밀번호를 입력해주세요.'
              state={currentPasswordState}
              setState={setCurrentPasswordState}
              content={currentPassword}
              validation={(text) => setCurrentPassword(text)}
              type='password'
              errorMessage='기존 비밀번호를 다시 확인해주세요.'
            />
          </View>

          <View style={tw`mb-[20px]`}>
            <Txt variant='bodyText' style={tw`mb-[14px]`}>
              새 비밀번호
            </Txt>
            <TextField
              placeholder='새 비밀번호를 입력해주세요.'
              state={newPasswordState}
              setState={setNewPasswordState}
              content={newPassword}
              validation={(text) => {
                setNewPassword(text);
                setShowPasswordChecks(true);
              }}
              type='password'
            />
          </View>

          {showPasswordChecks && (
            <View style={tw`gap-[8px] ml-[20px] mb-[24px]`}>
              <View style={tw`flex-row items-center gap-[12px]`}>
                {lengthCheck ? <FilledCheck /> : <EmptyCheck />}
                <Txt variant='bodySubText' color='dark_gray1'>
                  최소 8자 이상
                </Txt>
              </View>
              <View style={tw`flex-row items-center gap-[12px]`}>
                {combinationCheck ? <FilledCheck /> : <EmptyCheck />}
                <Txt variant='bodySubText' color='dark_gray1'>
                  영문, 숫자, 특수문자 3가지 조합
                </Txt>
              </View>
              {currentPassword.length > 0 && currentPassword === newPassword && (
                <Txt variant='bodySubText' color='error_red'>
                  새 비밀번호는 기존 비밀번호와 다르게 입력해주세요.
                </Txt>
              )}
            </View>
          )}

          <View>
            <Txt variant='bodyText' style={tw`mb-[14px]`}>
              새 비밀번호 확인
            </Txt>
            <TextField
              placeholder='새 비밀번호를 입력해주세요.'
              state={confirmPasswordState}
              setState={setConfirmPasswordState}
              content={confirmPassword}
              validation={(text) => setConfirmPassword(text)}
              type='password'
              errorMessage='비밀번호가 일치하지 않아요.'
            />
          </View>
        </View>
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <PrimaryButton
            isValid={isValid && !isSaving}
            title={isSaving ? '변경 중...' : '확인'}
            color='sub_yellow'
            onClick={handleSubmit}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}