import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import {
  Alert,
  View, 
  ScrollView,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';
import Txt from '@/src/components/ui/Txt';
import TextField from '@/src/components/ui/input/TextField';
import Button from '@/src/components/ui/button/Button';

import { emailController } from '@/src/apis/controller/email';

type EditPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EditPassword() {
  const navigation = useNavigation<EditPasswordNavigationProp>();

  const [pwdTextFieldState, setPwdTextFieldState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [newPwdtextFieldState, setNewPwdTextFieldState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [newPwdChecktextFieldState, setNewPwdCheckTextFieldState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPwderrorMessage, setNewPwdErrorMessage] = useState('');
  const [newPwdCheckErrorMessage, setNewPwdCheckErrorMessage] = useState('');

  const validateCurrentPassword = (text: string) => {
    setCurrentPassword(text);
  };

  const validatePassword = (text: string) => {
    setNewPassword(text);

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (text === '') {
      setNewPwdTextFieldState('empty');
      setNewPwdErrorMessage('');
    } else if (!regex.test(text)) {
      setNewPwdTextFieldState('error');
      setNewPwdErrorMessage('영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요.');
    } else {
      setNewPwdTextFieldState('filled');
      setNewPwdErrorMessage('');
    }
  };

  const validatePasswordCheck = (text: string) => {
    setConfirmPassword(text);
    if (text === '') {
      setNewPwdCheckTextFieldState('empty');
      setNewPwdCheckErrorMessage('');
    } else if (text !== newPassword) {
      setNewPwdCheckTextFieldState('error');
      setNewPwdCheckErrorMessage('비밀번호가 일치하지 않아요.');
    } else {
      setNewPwdCheckTextFieldState('filled');
      setNewPwdCheckErrorMessage('');
    }
  };

  const handleSubmit = async () => {
    console.log('🔄 Submitting password change...');

    if (!currentPassword.trim()) {
      Alert.alert('알림', '기존 비밀번호를 입력해주세요.');
      return;
    }

    if (newPwdtextFieldState !== 'filled') {
      Alert.alert('알림', '새 비밀번호를 올바르게 입력해주세요.');
      return;
    }

    if (newPwdChecktextFieldState !== 'filled') {
      Alert.alert('알림', '비밀번호 확인을 올바르게 입력해주세요.');
      return;
    }

    try {
      // 토큰 확인
      const token = await AsyncStorage.getItem('accessToken');
      console.log('🔑 Current token:', token ? token.substring(0, 20) + '...' : 'NOT FOUND');
      
      // API 호출 (JWT 토큰으로 사용자 식별)
      console.log('📤 Calling changePassword API...');
      await emailController.changePassword(
        currentPassword,
        newPassword,
      );

      console.log('✅ Password changed successfully');
      // 성공 시
      navigation.navigate('EditSuccess', { type: 'password' });

    } catch (error: any) {
      // 실패 시
      console.error('❌ Password update failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      Alert.alert('오류', '비밀번호 변경에 실패했습니다. 기존 비밀번호를 확인해주세요.');
    }
  };

  return (
    <Container className='w-full'>
      <Header title='비밀번호 변경' />

      <ScrollView
        contentContainerStyle={tw`px-[32px] pt-[37px] pb-[50px]`}
        showsVerticalScrollIndicator={false}
      >
        <Txt variant='bodySubText' style={tw`mb-[17px]`}>
          기존 비밀번호
        </Txt>
        <TextField
          placeholder='기존 비밀번호를 입력해주세요.'
          type='password'
          value={currentPassword}
          state={pwdTextFieldState}
          setState={setPwdTextFieldState}
          validation={validateCurrentPassword}
        />

        <Txt variant='bodySubText' style={tw`mt-[27px] mb-[17px]`}>
          새 비밀번호
        </Txt>
        <TextField
          placeholder='새로운 비밀번호를 입력해주세요.'
          type='password'
          value={newPassword}
          state={newPwdtextFieldState}
          setState={setNewPwdTextFieldState}
          validation={validatePassword}
          errorMessage={newPwderrorMessage}
        />

        <Txt variant='bodySubText' style={tw`mt-[27px] mb-[17px]`}>
          비밀번호 확인
        </Txt>
        <TextField
          placeholder='새로운 비밀번호를 확인해주세요.'
          type='password'
          value={confirmPassword}
          state={newPwdChecktextFieldState}
          setState={setNewPwdCheckTextFieldState}
          validation={validatePasswordCheck}
          errorMessage={newPwdCheckErrorMessage}
        />
      </ScrollView>

      <View style={tw`px-[32px] pb-[25px] mt-auto`}>
        <Button
          title='확인'
          onClick={handleSubmit}
          isValid={
            pwdTextFieldState === 'filled' &&
            newPwdtextFieldState === 'filled' &&
            newPwdChecktextFieldState === 'filled'
          }
        />
      </View>
    </Container>
  );
}
