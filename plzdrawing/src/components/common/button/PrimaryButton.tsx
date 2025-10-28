import React from "react";
import styled from "styled-components/native";
import { Pressable, TouchableOpacityProps } from "react-native";
import Txt from "../text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";

interface PrimaryButtonProps extends TouchableOpacityProps {
  isValid?: boolean;
  title: string;
  color?: keyof typeof Colors.colors;
  onClick?: () => void;
}

const PrimaryButton = ({
  isValid = true,
  title,
  color = "main_yellow",
  onClick,
  ...rest
}: PrimaryButtonProps) => {
  // 배경색에 알파값 적용
  const getBackgroundColor = () => {
    const baseColor = Colors.colors[color];
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
      onPress={onClick}
      buttonColor={getBackgroundColor()}
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
  isValid?: boolean;
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  width: 100%;
  padding: 10px 20px;
  border-radius: 12px;
  border: ${(props: ButtonContainerProps) => props.isValid ? '0' : `1px solid ${Colors.colors.main_yellow}`};
  align-items: center;
  background-color: ${(props: ButtonContainerProps) => props.buttonColor};
  z-index: 200;
`;

export default PrimaryButton;
