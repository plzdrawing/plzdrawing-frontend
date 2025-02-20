import { TextInput } from "react-native-gesture-handler";
import { Col, Row } from "../common/flex/Flex";
import { Keyboard, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  AddIcon,
  CameraIcon,
  DrawerIcon,
  FileIcon,
  PictureIcon,
  SendIcon,
} from "@/assets/images";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "../common/text/Txt";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  isOpenMenu?: boolean;
  setIsOpenMenu?: (isOpenMenu: boolean) => void;
}

const ChatInput = (props: ChatInputProps) => {
  const {
    message,
    setMessage,
    handleSendMessage,
    isOpenMenu = false,
    setIsOpenMenu = () => {},
  } = props;

  const handleOpenMenu = () => {
    Keyboard.dismiss();
    setIsOpenMenu(true);
  };

  return (
    <Col>
      <Row
        padding="13px 32px"
        alignItems="center"
        justifyContent="space-between"
        gap={6}
        style={{ backgroundColor: Colors.colors.white }}
      >
        <TouchableOpacity onPress={handleOpenMenu}>
          <IconContainer color={Colors.colors.main_yellow}>
            <AddIcon />
          </IconContainer>
        </TouchableOpacity>
        <ChattingTextInput
          placeholder="메시지를 입력하세요"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <IconContainer color={Colors.colors.sub_yellow}>
            <SendIcon />
          </IconContainer>
        </TouchableOpacity>
      </Row>
      {isOpenMenu && (
        <Col padding="15px 32px" gap={12}>
          <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width="1px">
              <FileIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              파일 보내기
            </Txt>
          </Row>
          <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width="1px">
              <PictureIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              사진 보내기
            </Txt>
          </Row>
          <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width="1px">
              <CameraIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              직접 촬영하기
            </Txt>
          </Row>
          <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width="1px">
              <DrawerIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              서랍 열기
            </Txt>
          </Row>
        </Col>
      )}
    </Col>
  );
};

const ChattingTextInput = styled(TextInput)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.sub_yellow};
  font-family: "SsurroundAir";
  width: 100%;
  height: 45px;
  border-radius: 12px;
  padding: 13.5px 16px;
`;

const IconContainer = styled.View`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { color: string }) => props.color};
  border-width: ${(props: { width: string }) => props.width};
  border-color: ${Colors.colors.light_gray2};
  border-radius: 12px;
`;

export default ChatInput;
