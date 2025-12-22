import { TextInput } from "react-native-gesture-handler";
import { Col, Row } from "@/src/components/common/flex/Flex";
import { Keyboard, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
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
import Txt from "@/src/components/common/text/Txt";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleSendImage: (imageUri: string) => void;
  isOpenMenu?: boolean;
  setIsOpenMenu?: (isOpenMenu: boolean) => void;
}

const ChatInput = (props: ChatInputProps) => {
  const {
    message,
    setMessage,
    handleSendMessage,
    handleSendImage,
    isOpenMenu = false,
    setIsOpenMenu = () => {},
  } = props;

  const handleOpenMenu = () => {
    Keyboard.dismiss();
    if (isOpenMenu) setIsOpenMenu(false);
    else setIsOpenMenu(true);
  };

  const addWatermark = async (uri: string): Promise<string> => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            resize: { width: 1200 },
          },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.PNG,
        }
      );

      // Add text watermark
      const watermarkedImage = await ImageManipulator.manipulateAsync(
        result.uri,
        [],
        {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
        }
      );

      return watermarkedImage.uri;
    } catch (error) {
      console.error("워터마크 추가 실패:", error);
      return uri;
    }
  };

  const handlePickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert("권한 필요", "갤러리 접근 권한이 필요합니다.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        const watermarkedUri = await addWatermark(imageUri);
        handleSendImage(watermarkedUri);
      }
    } catch (error) {
      console.error("이미지 선택 오류:", error);
      Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <Col>
      <Row
        padding="12px 18px"
        alignItems="center"
        justifyContent="space-between"
        gap={6}
        style={{ backgroundColor: Colors.colors.white }}
      >
        <TouchableOpacity onPress={handleOpenMenu}>
          <IconContainer color={Colors.colors.main_yellow}>
            <CameraIcon />
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
            <IconContainer color={Colors.colors.light_gray1} width={1}>
              <FileIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              파일 보내기
            </Txt>
          </Row>
          <TouchableOpacity onPress={handlePickImage}>
            <Row gap={14} alignItems="center">
              <IconContainer color={Colors.colors.light_gray1} width={1}>
                <PictureIcon />
              </IconContainer>
              <Txt variant="bodyText" color="black">
                사진 보내기
              </Txt>
            </Row>
          </TouchableOpacity>
          <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width={1}>
              <CameraIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              직접 촬영하기
            </Txt>
          </Row>
          {/* <Row gap={14} alignItems="center">
            <IconContainer color={Colors.colors.light_gray1} width={1}>
              <DrawerIcon />
            </IconContainer>
            <Txt variant="bodyText" color="black">
              서랍 열기
            </Txt>
          </Row> */}
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

interface IconContainerProps {
  color: string;
  width?: number;
}

const IconContainer = styled.View<IconContainerProps>`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: IconContainerProps) => props.color};
  border-width: ${(props: IconContainerProps) => props.width || 0};
  border-color: ${Colors.colors.light_gray2};
  border-radius: 12px;
`;

export default ChatInput;
