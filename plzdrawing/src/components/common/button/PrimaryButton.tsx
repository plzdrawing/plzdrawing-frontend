import React from "react";
import styled from "styled-components/native";
import { Pressable, TouchableOpacityProps } from "react-native";
import Txt from "../text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  color?: keyof typeof Colors.colors;
  onClick?: () => void;
}

const PrimaryButton = ({
  title,
  color = "main_yellow",
  onClick,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <ButtonContainer
      {...rest}
      onPress={onClick}
      buttonColor={Colors.colors[color]}
    >
      <Txt variant="bodyText" color="black" align="center">
        {title}
      </Txt>
    </ButtonContainer>
  );
};

interface ButtonContainerProps {
  buttonColor: string;
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  width: 100%;
  padding: 10px 20px;
  border-radius: 12px;
  align-items: center;
  background-color: ${(props: ButtonContainerProps) => props.buttonColor};
  z-index: 200;
`;

export default PrimaryButton;
