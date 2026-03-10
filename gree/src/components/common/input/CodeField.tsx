import tw from '@/src/lib/tailwind';
import { useRef } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';

interface CodeFieldProps {
  state?: 'default' | 'error';
  setState?: (state: 'default' | 'error') => void;
  verificationCode: string[];
  setVerificationCode: (code: string[]) => void;
  timeLeft: number;
  onClickResend: () => void;
}

export default function CodeField({
  state = 'default',
  setState,
  verificationCode,
  setVerificationCode,
  timeLeft,
  onClickResend,
}: CodeFieldProps) {
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null, null]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInputChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!verificationCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={tw`gap-[8px]`}>
      <View style={tw`flex-row justify-between w-full`}>
        {verificationCode.map((code, index) => (
          <TextInput
            key={index}
            ref={(el: any) => (inputRefs.current[index] = el)}
            maxLength={1}
            keyboardType='numeric'
            value={code}
            onChangeText={(text: string) => handleInputChange(text, index)}
            onKeyPress={(e: any) => handleKeyPress(e, index)}
            style={tw`w-12 h-[52px] border
              ${code !== '' ? 'border-main-yellow' : 'border-light-gray-3'}
              ${state === 'error' ? 'border-error-red' : ''}
              rounded-[12px] text-center text-[20px]`}
          />
        ))}
      </View>

      <View style={tw`flex-row justify-between`}>
        <Txt variant='bodySubText' color='error_red'>
          {state === 'error' ? '인증번호를 다시 확인해주세요' : formatTime(timeLeft)}
        </Txt>
        <TouchableOpacity onPress={onClickResend}>
          <Txt
            variant='bodySubText'
            align='right'
            style={{ textDecorationLine: 'underline' }}
          >
            인증번호 재전송
          </Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
}
