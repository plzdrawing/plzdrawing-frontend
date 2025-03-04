import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { BackArrowIcon, CloseIcon } from "@/assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { Row } from "../flex/Flex";
import Txt from "../text/Txt";
import Colors from "@/src/constants/Colors";

interface MainHeaderProps {
  title?: string;
  subTitle?: string;
  state?: "request" | "submitted" | "inProgress" | "reject" | "complete";
  onClick?: () => void;
}

const MainHeader = ({ title, subTitle, state, onClick }: MainHeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const getType = () => {
    switch (state) {
      case "request":
        return "거래 요청";
      case "submitted":
        return "거래 요청중";
      case "inProgress":
        return "거래 진행중";
      case "reject":
        return "거래 거절";
      case "complete":
        return "거래 완료";
      default:
        return "";
    }
  };

  return (
    <Container>
      <Row style={{ flex: 1 }}>
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
            <BackArrowIcon width={24} height={24} />
          </IconContainer>
        </BackButton>
        <Row
          gap={2}
          padding="0px 14px"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Txt variant="subtitleBold" align="left" height={24}>
            {title}
          </Txt>
          <Txt variant="bodyText" align="left" style={{ paddingBottom: 1 }}>
            {subTitle}
          </Txt>
        </Row>
      </Row>
      {state && (
        <StateBox state={state}>
          <Txt
            variant="bodyText"
            color={
              state === "complete" || state === "reject" ? "white" : "black"
            }
          >
            {getType()}
          </Txt>
        </StateBox>
      )}
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 33px 30px 23px;
  background-color: #f6f6f7;
  elevation: 4; /* 안드로이드 */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  z-index: 1;
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

const StateBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: ${({ state }: { state: string }) => {
    switch (state) {
      case "reject":
        return Colors.colors.dark_gray2;
      case "complete":
        return Colors.colors.dark_gray2;
      default:
        return Colors.colors.main_yellow;
    }
  }};
`;

export default MainHeader;
