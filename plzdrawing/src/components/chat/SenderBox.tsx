import Colors from "@/src/constants/Colors";
import { useState } from "react";
import styled from "styled-components/native";
import Txt from "../common/text/Txt";
import { ViewProps } from "react-native";
import { Row } from "../common/flex/Flex";

interface SenderBoxProps extends ViewProps {
  message: string;
}

const SenderBox = (props: SenderBoxProps) => {
  const { message } = props;
  return (
    <Row justifyContent="flex-end" alignItems="center">
      <ChattingTextBox>
        <Txt>{message}</Txt>
      </ChattingTextBox>
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

export default SenderBox;
