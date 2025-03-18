import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
} from "react-native";
import colors from "@/src/constants/Colors";
import Txt from "../text/Txt";
import DefaultButton from "../button/DefaultButton";
import { Col, Row } from "../flex/Flex";
import { CloseIcon } from "@/assets/images";

interface CheckPaintingProps {
  title?: string;
  imageUri?: string;
  painterMessage?: string;
  readOnly?: boolean;
  isLoading?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onModifyRequest?: () => void;
}

const CheckPainting = ({
  title = "그림 확인",
  imageUri = "https://i.pinimg.com/736x/c6/fe/35/c6fe3587ddbadb7e7f1b6136e83c63e4.jpg",
  painterMessage = "귀여운 강아지그림 입니다:)",
  readOnly = false,
  isLoading = false,
  onClose,
  onConfirm,
  onModifyRequest,
}: CheckPaintingProps) => {
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleModifyRequest = () => {
    if (onModifyRequest) {
      onModifyRequest();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Col gap={21}>
              <Row alignItems="center" justifyContent="space-between">
                <Txt variant="subtitleBold">{title}</Txt>
                <CloseIcon onPress={handleCancel} />
              </Row>

              <Col gap={7}>
                <Txt variant="bodyText">미리보기</Txt>
                <View style={styles.imageContainer}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                  ) : (
                    <View style={styles.placeholder}>
                      <Txt variant="bodyText" color="dark_gray1">
                        이미지가 없음
                      </Txt>
                    </View>
                  )}
                </View>
              </Col>

              <Col gap={7}>
                <Txt variant="bodyText">그림쟁이 말</Txt>
                <View style={styles.messageContainer}>
                  <Txt variant="bodyText" style={styles.message}>
                    {painterMessage}
                  </Txt>
                </View>
              </Col>
            </Col>
            <Row style={styles.buttonContainer}>
              <DefaultButton
                title="수정요청"
                onPress={handleModifyRequest}
                variant="default"
                disabled={isLoading}
              />
              <DefaultButton
                title="확인하기"
                onPress={handleConfirm}
                variant="primary"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </Row>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 21,
    paddingVertical: 21,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
  },
  imageContainer: {
    width: 118,
    height: 118,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.colors.light_gray1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: colors.colors.light_gray1,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
  },
  message: {
    color: colors.colors.black,
  },
  buttonContainer: {
    marginTop: 17,
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
});

export default CheckPainting;
