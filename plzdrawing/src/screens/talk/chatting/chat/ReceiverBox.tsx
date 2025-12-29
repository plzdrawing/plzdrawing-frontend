import tw from '@/src/lib/tailwind';

import Colors from "@/src/constants/Colors";
import { useState } from "react";
import styled from "styled-components/native";
import Txt from "@/src/components/ui/Txt";
import { View, ViewProps } from "react-native";

interface ReceiverBoxProps extends ViewProps {
  message: string;
}

const ReceiverBox = (props: ReceiverBoxProps) => {
  const { message } = props;
  return (
    <View style={tw`flex-row justify-start items-start gap-[17px] max-w-full`}>
      <ProfileImage />
      <ChattingTextBox>
        <Txt>{message}</Txt>
      </ChattingTextBox>
    </View>
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
