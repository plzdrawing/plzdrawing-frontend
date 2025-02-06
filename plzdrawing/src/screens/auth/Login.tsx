import { StyleSheet } from "react-native";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import AuthButton from "@/src/components/common/button/AuthButton";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/types/navigation";
import TextField from "@/src/components/common/input/TextField";

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [textFieldState, setTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const handleSignupButtonOnClick = () => {
    console.log("회원가입 버튼 클릭");
    navigation.navigate("Signup");
  };

  const handlePasswordFindButtonOnClick = () => {
    console.log("비밀번호찾기 버튼 클릭");
    navigation.navigate("PasswordFind");
  };

  const handleLoginButtonOnClick = () => {
    console.log("로그인 버튼 클릭");
    navigation.navigate("Main");
  };
  return (
    <Container>
      <Header type="close" />
      <Col gap={67} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          안녕하세요 :) {"\n"}
          소일거리 드로잉입니다. {"\n"}
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            먼저 로그인이 필요해요.
          </Txt>
          <TextField
            placeholder="이메일"
            state={textFieldState}
            setState={setTextFieldState}
          />
          <TextField
            placeholder="비밀번호"
            state={textFieldState}
            setState={setTextFieldState}
          />
          <AuthButton
            title="로그인"
            type="login"
            onClick={handleLoginButtonOnClick}
          />
          <Txt
            variant="bodySubText"
            align="center"
            style={{ textDecorationLine: "underline", width: "100%" }}
            onPress={handlePasswordFindButtonOnClick}
          >
            비밀번호 찾기
          </Txt>
          <Seperator />
        </Col>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            소일거리 드로잉이 처음이신가요?
          </Txt>
          <AuthButton
            title="회원가입"
            type="signup"
            onClick={handleSignupButtonOnClick}
          />
        </Col>
      </Col>
    </Container>
  );
}

const Seperator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.colors.seperator};
`;
