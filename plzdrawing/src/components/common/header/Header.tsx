import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { BackArrowIcon, CloseIcon } from "@/assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

interface HeaderProps {
  title?: string;
  type?: "close" | "back";
  onClick?: () => void;
  backgroundColor?: string;
}

const Header = ({
  type = "back",
  onClick,
  backgroundColor = "#fff",
}: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container>
      <BackButton
        onPress={
          onClick
            ? onClick
            : () => {
                navigation.goBack();
              }
        }
      >
        <IconContainer>
          {type === "back" ? (
            <BackArrowIcon width={24} height={24} />
          ) : (
            <CloseIcon width={24} height={24} />
          )}
        </IconContainer>
      </BackButton>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 4px 30px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor};
`;

const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;
