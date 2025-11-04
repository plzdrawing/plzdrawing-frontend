import React from "react";
import styled from "styled-components/native";
import { Pressable, PressableProps } from "react-native";
import Txt from "../text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";

interface AuthButtonProps extends PressableProps {
  isValid?: boolean;
  type?: "login" | "signup";
  title: string;
  onClick?: () => void;
}

export default function AuthButton({
  isValid = true,
  title,
  type = "login",
  onClick,
  ...rest
}: AuthButtonProps) {
  // 배경색에 알파값 적용
  const getBackgroundColor = () => {
    const baseColor = Colors.colors["sub_yellow"];
    if (isValid) return baseColor;
    
    // HEX to RGBA 변환 (35% 투명도)
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.35)`;
  };

  return (
    <ButtonContainer
      {...rest}
      buttonColor={getBackgroundColor()}
      onPress={onClick}
      type={type}
      isValid={isValid}
    >
      <Txt variant="bodyText" color="black" align="center">
        {title}
      </Txt>
    </ButtonContainer>
  );
};

interface ButtonContainerProps {
  buttonColor: string;
  type: "login" | "signup";
  isValid?: boolean;
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: ${(props: ButtonContainerProps) => {
    if (props.isValid) return '0';
    return props.type === "login" ? `2px solid ${Colors.colors.main_yellow}` : `1px solid ${Colors.colors.main_yellow}`;
  }};
  align-items: center;
  background-color: ${(props: ButtonContainerProps) => props.buttonColor};
  z-index: 200;
`;
