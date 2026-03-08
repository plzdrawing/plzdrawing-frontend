import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import FontStyles from '@/src/constants/Fonts';

import { View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { ShowPasswordOn, ShowPasswordOff } from '@/assets/images';

interface TextFieldProps extends TextInputProps {
  id?: string;
  content?: string;
  type?: 'text' | 'password';
  state?: 'empty' | 'filled' | 'error' | 'failed';
  setState: (state: 'empty' | 'filled' | 'error' | 'failed') => void;
  validation?: (text: string) => void;
  errorMessage?: string;
  className?: string;
}

export default function TextField(props: TextFieldProps) {
  const {
    placeholder,
    content,
    type,
    state = 'empty',
    setState,
    errorMessage,
    validation,
    className = '',
    ...rest
  } = props;

  const [value, setValue] = useState(content || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (text: string) => {
    setValue(text);
    if (text.length <= 0) {
      setState('empty');
    } else {
      setState('filled');
    }
    if (validation) {
      validation(text);
    }
  };

  const getBorderColor = () => {
    if (state === 'error' || state === 'failed') return tw`border-error-red`;
    if (isFocused) return tw`border-sub-yellow`;
    return tw`border-light-gray-2`;
  };

  const getBackgroundColor = () => {
    if (isFocused || value) return tw`bg-white`;
    return tw`bg-light-gray-1`;
  };

  return (
    <View style={tw`gap-[9px]`}>
      <View
        style={[
          tw`flex-row items-center relative w-full rounded-[12px] border ${className}`,
          getBorderColor(),
          getBackgroundColor(),
        ]}
      >
        <TextInput
          style={[tw`flex-1 px-[20px] py-[17.5px] text-[14px] text-black`, FontStyles.bodySubText]}
          multiline={false}
          numberOfLines={1}
          placeholder={placeholder}
          placeholderTextColor={tw.color('dark-gray-1')}
          value={value}
          secureTextEntry={type === 'password' && !showPassword}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (value.length <= 0) setState('empty');
          }}
          {...rest}
        />
        {type === 'password' && (
          <TouchableOpacity
            style={tw`justify-center items-center mr-[20px]`}
            onPress={() => setShowPassword(!showPassword)}
          >
            {isFocused ? <ShowPasswordOn /> : <ShowPasswordOff />}
          </TouchableOpacity>
        )}
      </View>

      {(state === 'error' || state === 'failed') && errorMessage && (
        <Txt variant="bodySubText" color="error_red" style={tw`ml-[20px]`}>
          {errorMessage}
        </Txt>
      )}
    </View>
  );
}
