import Colors from "@/src/constants/Colors";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import Txt from "../text/Txt";
import { Col } from "../flex/Flex";
import { HidePassword } from "@/assets/images";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (isFocused) {
      return colors.main_yellow;
    }
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
    if (validation) {
      validation(text);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Col gap={7}>
      <InputContainer borderColor={getBorderColor()}>
        <StyledTextInput
          placeholder={placeholder}
          placeholderTextColor={colors.dark_gray1}
          value={value}
          secureTextEntry={type === "password" && !showPassword}
          onChangeText={handleChange}
          color={colors.black}
          onFocus={() => {
            setIsFocused(true);
            setState("filled");
          }}
          onBlur={() => {
            setIsFocused(false);
            if (value.length <= 0) {
              setState("empty");
            }
          }}
          {...rest}
        />
        {type === "password" && (
          <PasswordToggle onPress={togglePasswordVisibility}>
            <HidePassword />
          </PasswordToggle>
        )}
      </InputContainer>

      {state === "error" && (
        <Txt variant="bodySubText" color="error_red" style={{ marginLeft: 20 }}>
          {errorMessage}
        </Txt>
      )}
    </Col>
  );
};

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
  background-color: ${Colors.colors.white};
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  font-size: 14px;
  color: ${(props: { color: string }) => props.color};
  font-family: "SsurroundAir";
  padding: 12px 16px;
  height: 48px;
`;

const PasswordToggle = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  align-items: center;
  margin-right: 20;
`;

export default TextField;
