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
}

const TextAreaField = ({
  placeholder = "",
  value = "",
  onChange,
  readOnly = false,
}: TextAreaFieldProps) => {
  const colors = Colors.colors;
  const [text, setText] = useState(value);

  const handleChange = (input: string) => {
    setText(input);
    onChange(input);
  };

  return (
    <>
      <TextAreaInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={text}
        onChangeText={handleChange}
        editable={!readOnly}
        multiline
        textAlignVertical="top"
        color={colors.black}
      />
    </>
  );
};

const TextAreaInput = styled(TextInput)`
  font-size: 14px;
  font-weight: 300;
  color: ${(props: { color: string }) => props.color};
  background-color: ${Colors.colors.light_gray1};
  font-family: "SsurroundAir";
  outline: none;
  width: 100%;
  height: 90px;
  padding: 15px 11px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${Colors.colors.light_gray2};
`;

export default TextAreaField;
