import React from "react";
import styled from "styled-components/native";
import { Pressable, PressableProps } from "react-native";
import Txt from "../text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";

interface AuthButtonProps extends PressableProps {
  type?: "login" | "signup";
  title: string;
  onClick?: () => void;
}

const AuthButton = ({
  title,
  type = "login",
  onClick,
  ...rest
}: AuthButtonProps) => {
  return (
    <ButtonContainer {...rest} onPress={onClick} type={type}>
      <Txt variant="bodyText" color="black" align="center">
        {title}
      </Txt>
    </ButtonContainer>
  );
};

interface ButtonContainerProps {
  type: "login" | "signup";
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: ${(props: ButtonContainerProps) =>
      props.type === "login" ? "2px" : "1px"}
    solid ${Colors.colors.main_yellow};
  align-items: center;
  background-color: ${(props: ButtonContainerProps) =>
    props.type === "login" ? Colors.colors.sub_yellow : "white"};
  z-index: 200;
`;

export default AuthButton;
