import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import { View, TextInput } from 'react-native';
import Txt from '@/src/components/common/Txt';
import FontStyles from '@/src/constants/Fonts';
import Colors from '@/src/constants/Colors';

interface TextAreaFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  maxLength?: number;
  minHeight?: number;
}

export default function TextAreaField({
  label,
  placeholder = '',
  value,
  onChange,
  maxLength,
  minHeight = 140,
}: TextAreaFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={tw`gap-[9px]`}>
      {label && <Txt variant='subtitleBold'>{label}</Txt>}
      <View
        style={[
          tw`w-full rounded-[12px] border px-[20px] py-[14px]`,
          isFocused ? tw`border-sub-yellow bg-white` : tw`border-light-gray-2 bg-light-gray-1`,
          { minHeight },
        ]}
      >
        <TextInput
          style={[tw`text-[14px] text-black`, FontStyles.bodySubText, { textAlignVertical: 'top' }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.colors.dark_gray1}
          value={value}
          onChangeText={onChange}
          multiline
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {maxLength && (
        <Txt variant='auxiliaryTextLight' color='dark_gray1' align='right'>
          {value.length}/{maxLength}
        </Txt>
      )}
    </View>
  );
}
