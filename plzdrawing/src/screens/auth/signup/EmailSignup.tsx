import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [textFieldState, setTextFieldState] = useState<
    "normal" | "focus" | "error"
  >("normal");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validateEmail = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { isValid: false, message: "이메일 양식에 맞지 않아요" };
    }
    return { isValid: true, message: "" };
  };

  const handleVerificationButtonOnClick = () => {
    const result = validateEmail(email);
    setTextFieldState(result.isValid ? "normal" : "error");
    setErrorMessage(result.message);

    if (result.isValid) {
      console.log("유효성 검사 통 과");
      navigation.navigate("EmailVerification");
      // 이미 가입된 회원인지 확인하는 api 호출해야됨
    }
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          이메일을 입력해주세요 :) {"\n"}
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            이메일
          </Txt>
          Copy
          <TextField
            placeholder="이메일을 입력해주세요."
            state={textFieldState}
            setState={setTextFieldState}
            value={email}
            onChangeText={setEmail}
          />
          {textFieldState === "error" && (
            <Txt
              variant="bodySubText"
              color="error_red"
              style={{ marginLeft: 21, marginTop: -10 }}
            >
              {errorMessage}
            </Txt>
          )}
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="인증하기"
            color="sub_yellow"
            onClick={handleVerificationButtonOnClick}
          />
        </ButtonContainer>
      </BottomFixedArea>
    </Container>
  );
}

const ButtonContainer = styled.View`
  width: 100%;
  padding: 10px 57px;
`;
