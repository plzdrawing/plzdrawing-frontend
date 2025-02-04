import Colors from "@/src/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";

// Props 타입 정의
interface TextFieldProps extends TextInputProps {
  id?: string;
  content?: string;
  type?: "text" | "password";
  state?: "emtpy" | "filled" | "error";
  setState: (state: "emtpy" | "filled" | "error") => void;
}

const TextField = (props: TextFieldProps) => {
  const {
    placeholder,
    content,
    type,
    state = "normal",
    setState,
    ...rest
  } = props;
  const colors = Colors.colors;
  const [value, setValue] = useState(content || "");

  const getBorderColor = () => {
    switch (state) {
      case "filled":
        return colors.main_yellow;
      case "error":
        return colors.error_red;
      default:
        return colors.light_gray2;
    }
  };

  const handleChange = (text: string) => {
    setValue(text);
    if (text.length <= 0 || text === "") {
      setState("emtpy");
    }
  };

  return (
    <StyledTextInput
      placeholder={placeholder}
      placeholderTextColor={colors.dark_gray1}
      value={value}
      onChangeText={handleChange}
      borderColor={getBorderColor()}
      onFocus={() => {
        setState("filled");
      }}
      onBlur={() => {
        if (value.length <= 0) {
          setState("emtpy");
        }
      }}
      {...rest}
    />
  );
};

const StyledTextInput = styled(TextInput)`
  font-size: 14px;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.white};
  font-family: "SsurroundAir";
  outline: none;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
`;

export default TextField;
