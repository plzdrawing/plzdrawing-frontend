import React from "react";
import styled from "styled-components/native";
import { Pressable, PressableProps } from "react-native";
import Txt from "../../common/text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";
import { getBackgroundColor } from "@/src/utils/colorUtils";

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
  const backgroundColor = getBackgroundColor(Colors.colors["sub_yellow"], isValid);

  return (
    <ButtonContainer
      {...rest}
      buttonColor={backgroundColor}
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
