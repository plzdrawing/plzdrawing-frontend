import Colors from "@/src/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import Txt from "../text/Txt";
import { Col } from "../flex/Flex";

// Props 타입 정의
interface TextFieldProps extends TextInputProps {
  id?: string;
  content?: string;
  type?: "text" | "password";
  state?: "empty" | "filled" | "error";
  setState: (state: "empty" | "filled" | "error") => void;
  validation?: (text: string) => void;
  errorMessage?: string;
}

const TextField = (props: TextFieldProps) => {
  const {
    placeholder,
    content,
    type,
    state = "normal",
    setState,
    errorMessage,
    validation,
    ...rest
  } = props;
  const colors = Colors.colors;
  const [value, setValue] = useState(content || "");
  const [maskedValue, setMaskedValue] = useState(""); // 별 모양으로 표시할 텍스트

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
      setState("empty");
    } else {
      setState("filled");
    }

    if (type === "password") {
      setMaskedValue(text.replace(/./g, "*"));
    }
  };

  return (
    <Col gap={7}>
      <StyledTextInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={value}
        secureTextEntry={type === "password"}
        onChangeText={handleChange}
        borderColor={getBorderColor()}
        color={colors.black}
        onFocus={() => {
          setState("filled");
        }}
        onBlur={() => {
          if (value.length <= 0) {
            setState("empty");
          }
        }}
        {...rest}
      />
      {state === "error" && (
        <Txt variant="bodySubText" color="error_red">
          {errorMessage}
        </Txt>
      )}
    </Col>
  );
};

const StyledTextInput = styled(TextInput)`
  font-size: 14px;
  color: ${(props: { color: string }) => props.color};
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
