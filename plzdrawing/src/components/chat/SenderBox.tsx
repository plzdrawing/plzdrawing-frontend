import Colors from "@/src/constants/Colors";
import { useState } from "react";
import styled from "styled-components/native";
import Txt from "../common/text/Txt";
import { ViewProps, Image, View, Text } from "react-native";
import { Row } from "../common/flex/Flex";

interface SenderBoxProps extends ViewProps {
  message: string;
  imageUri?: string;
}

const SenderBox = (props: SenderBoxProps) => {
  const { message, imageUri } = props;
  return (
    <Row justifyContent="flex-end" alignItems="center">
      {imageUri ? (
        <ImageContainer>
          <StyledImage source={{ uri: imageUri }} />
          <WatermarkOverlay>
            <WatermarkText style={{ top: 20, left: 20 }}>Gree</WatermarkText>
            <WatermarkText style={{ top: 80, left: 80 }}>Gree</WatermarkText>
            <WatermarkText style={{ top: 140, left: 140 }}>Gree</WatermarkText>
          </WatermarkOverlay>
        </ImageContainer>
      ) : (
        <ChattingTextBox>
          <Txt>{message}</Txt>
        </ChattingTextBox>
      )}
    </Row>
  );
};

const ChattingTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.white};
  border-radius: 10px;
  border-width: 1;
  border-color: ${Colors.colors.main_yellow};
  padding: 10px 20px;
  max-width: 70%;
`;

const ImageContainer = styled.View`
  position: relative;
  max-width: 70%;
  border-radius: 10px;
  overflow: hidden;
  border-width: 1;
  border-color: ${Colors.colors.main_yellow};
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: cover;
`;

const WatermarkOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const WatermarkText = styled.Text`
  position: absolute;
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
`;

export default SenderBox;
