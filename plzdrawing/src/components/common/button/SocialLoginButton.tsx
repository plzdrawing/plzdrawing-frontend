import React from "react";
import styled from "styled-components/native";
import { Pressable, PressableProps } from "react-native";
import Txt from "../text/Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";
import { KaKaoLoginIcon, GoogleLoginIcon, AppleLoginIcon } from "@/assets/images";

interface SocialLoginButtonProps extends PressableProps {
  type?: "kakao" | "google" | "apple";
  onClick?: () => void;
}

const SocialLoginButton = ({
  type = "kakao",
  onClick,
  ...rest
}: SocialLoginButtonProps) => {
  return (
    <ButtonContainer {...rest} onPress={onClick} type={type}>
      {type === "kakao"
        ? <KaKaoLoginIcon />
        : type === "google"
          ? <GoogleLoginIcon />
          : <AppleLoginIcon />
      }
    </ButtonContainer>
  );
};

interface ButtonContainerProps {
  type: "kakao" | "google" | "apple";
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  width: 100%;
  height: 49px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props: ButtonContainerProps) =>
    props.type === "kakao" ? "#FEE500" : "#FFFFFF"};
  border: ${(props: ButtonContainerProps) =>
    props.type === "kakao" ? "none" : "1px solid #000000"};
  z-index: 200;
`;

export default SocialLoginButton;
