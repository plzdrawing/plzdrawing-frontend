import tw from '@/src/lib/tailwind';
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import Colors from "@/src/constants/Colors";

interface TextAreaFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (text: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
  maxLength?: number;
}

const TextAreaField = ({
  placeholder = "",
  value = "",
  onChange,
  readOnly = false,
  maxLength,
}: TextAreaFieldProps) => {
  const colors = Colors.colors;
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(135);

  const handleChange = (input: string) => {
    setText(input);
    onChange(input);
  };

  const handleContentSizeChange = (event: any) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <View style={tw`relative w-full`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={text}
        onChangeText={handleChange}
        editable={!readOnly}
        multiline
        textAlignVertical="top"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        onContentSizeChange={handleContentSizeChange}
        style={{
          fontSize: 14,
          fontWeight: '300',
          color: colors.black,
          backgroundColor: 'white',
          fontFamily: "SsurroundAir",
          width: '100%',
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isFocused ? colors.main_yellow : colors.light_gray2,
          height: Math.max(135, inputHeight),
        }}
      />
      {maxLength && (
        <Text
          style={[
            tw`absolute bottom-[15px] right-[15px]`,
            { fontSize: 14, color: Colors.colors.dark_gray1 },
          ]}
        >
          {text.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

export default TextAreaField;
