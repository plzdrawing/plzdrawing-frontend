import React from "react";
import styled from "styled-components/native";
import { Dimensions, TouchableOpacity } from "react-native";
import { Col } from "../flex/Flex";
import Txt from "../text/Txt";
import FontStyles from "@/src/constants/Fonts";

type FontStyleKey = keyof typeof FontStyles;
interface AlertModalProps {
  title?: string;
  buttonTitle?: string;
  content?: React.ReactNode;
  onClick?: () => void;
  textVariant?: FontStyleKey;
}

const AlertModal = ({
  title,
  buttonTitle,
  content,
  onClick,
  textVariant = "subtitleBold",
}: AlertModalProps) => {
  return (
    <ModalView>
      <Container>
        <Col
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: 95 }}
        >
          <Txt variant={textVariant} align="center" style={{ width: "100%" }}>
            {title}
          </Txt>
          {content && content}
        </Col>
        <CheckButton onPress={onClick}>
          <Txt variant="bodyText" align="center" style={{ width: "100%" }}>
            {buttonTitle}
          </Txt>
        </CheckButton>
      </Container>
    </ModalView>
  );
};

const Container = styled.View`
  width: 326px;
  height: 150px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
`;

const CheckButton = styled(TouchableOpacity)`
  width: 100%;
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top-width: 1px;
  border-color: #dcdfdf;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
const { width, height } = Dimensions.get("window");
const ModalView = styled.View`
  width: ${width}px;
  height: ${height}px;
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export default AlertModal;
