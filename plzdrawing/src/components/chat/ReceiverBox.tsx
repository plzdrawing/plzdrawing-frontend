import Colors from "@/src/constants/Colors";
import { useState } from "react";
import styled from "styled-components/native";
import Txt from "../common/text/Txt";
import { ViewProps } from "react-native";
import { Row } from "../common/flex/Flex";

interface ReceiverBoxProps extends ViewProps {
  message: string;
}

const ReceiverBox = (props: ReceiverBoxProps) => {
  const { message } = props;
  return (
    <Row justifyContent="flex-start" alignItems="flex-start" gap={17} style={{ maxWidth: '100%' }}>
      <ProfileImage />
      <ChattingTextBox>
        <Txt>{message}</Txt>
      </ChattingTextBox>
    </Row>
  );
};

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${Colors.colors.light_gray2};
`;

const ChattingTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.sub_yellow};
  border-radius: 10px;
  border-width: 1;
  border-color: ${Colors.colors.main_yellow};
  padding: 10px 20px;
  max-width: 70%;
  flex-shrink: 1;
`;

export default ReceiverBox;
