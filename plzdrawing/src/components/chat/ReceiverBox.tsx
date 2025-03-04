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
    <Row justifyContent="flex-start" alignItems="flex-start" gap={17}>
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
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray2};
`;

const ChattingTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.white};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Colors.colors.main_yellow};
  padding: 10px 20px;
`;

export default ReceiverBox;
