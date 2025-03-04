import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React, { useState, useEffect } from "react";
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
    "empty" | "filled" | "error" | undefined
  >("filled");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validateEmail = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!email) {
      return { isValid: false, message: "" };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { isValid: false, message: "이메일 양식에 맞지 않아요" };
    }
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    const result = validateEmail(email);
    setIsValidEmail(result.isValid);

    if (!email) {
      // 이메일이 비어있는 경우
      setTextFieldState("empty");
      setErrorMessage("");
    } else if (result.isValid) {
      // 이메일이 유효한 경우
      setTextFieldState("filled");
      setErrorMessage("");
    } else {
      // 이메일이 유효하지 않은 경우
      setTextFieldState("error");
      setErrorMessage(result.message);
    }
  }, [email]);

  const handleVerificationButtonOnClick = () => {
    if (isValidEmail) {
      console.log("유효성 검사 통과");
      navigation.navigate("EmailVerification");
      // 이미 가입된 회원인지 확인하는 api 호출해야됨
    } else {
      setErrorMessage("이미 회원가입된 이메일입니다.");
      setTextFieldState("error");
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
          <Col>
            <TextField
              placeholder="이메일을 입력해주세요."
              state={textFieldState}
              setState={setTextFieldState}
              value={email}
              onChangeText={setEmail}
              errorMessage={errorMessage}
              onFocus={() => {
                // 포커스될 때 filled 상태로 변경
                setTextFieldState("filled");
              }}
              onBlur={() => {
                // 포커스를 잃을 때 다시 유효성 검사
                if (!email) {
                  setTextFieldState("empty");
                } else if (validateEmail(email).isValid) {
                  setTextFieldState("filled");
                } else {
                  setTextFieldState("error");
                }
              }}
            />
          </Col>
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="인증하기"
            color="sub_yellow"
            onClick={handleVerificationButtonOnClick}
            disabled={!isValidEmail}
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
