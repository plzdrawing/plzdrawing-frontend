import React, { useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
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
    <TextAreaWrapper>
      <TextAreaInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={text}
        onChangeText={handleChange}
        editable={!readOnly}
        multiline
        textAlignVertical="top"
        color={colors.black}
        borderColor={isFocused ? colors.main_yellow : colors.light_gray2}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        onContentSizeChange={handleContentSizeChange}
        style={{ height: Math.max(135, inputHeight) }}
      />
      {maxLength && (
        <CounterText>
          {text.length}/{maxLength}
        </CounterText>
      )}
    </TextAreaWrapper>
  );
};

const TextAreaWrapper = styled.View`
  position: relative;
  width: 100%;
`;

const TextAreaInput = styled(TextInput)<{ borderColor: string }>`
  font-size: 14px;
  font-weight: 300;
  color: ${(props: { color: string }) => props.color};
  background-color: white;
  font-family: "SsurroundAir";
  outline: none;
  width: 100%;
  padding: 15px 15px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props: { borderColor: any; }) => props.borderColor};
`;

const CounterText = styled.Text`
  font-size: 14px;
  color: ${Colors.colors.dark_gray1};
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

export default TextAreaField;
