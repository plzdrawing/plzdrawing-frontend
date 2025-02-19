import React from "react";
import styled from "styled-components/native";
import { Pressable, TouchableOpacityProps } from "react-native";
import Txt from "../text/Txt";
import Colors from "@/src/constants/Colors";

interface DefaultButtonProps extends TouchableOpacityProps {
  title: string;
  color?: keyof typeof Colors.colors;
  borderColor?: keyof typeof Colors.colors;
  onClick?: () => void;
}

const DefaultButton = ({
  title,
  color = "white",
  borderColor = "seperator",
  onClick,
  ...rest
}: DefaultButtonProps) => {
  return (
    <ButtonContainer
      {...rest}
      onPress={onClick}
      buttonColor={Colors.colors[color]}
      borderColor={Colors.colors[borderColor]}
    >
      <Txt variant="bodyText" color="dark_gray2" align="center">
        {title}
      </Txt>
    </ButtonContainer>
  );
};

interface ButtonContainerProps {
  buttonColor: string;
  borderColor: string;
}

const ButtonContainer = styled(Pressable)<ButtonContainerProps>`
  padding: 5px 15px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: ButtonContainerProps) => props.buttonColor};
  border: 1px solid ${(props: ButtonContainerProps) => props.borderColor};
`;

export default DefaultButton;
