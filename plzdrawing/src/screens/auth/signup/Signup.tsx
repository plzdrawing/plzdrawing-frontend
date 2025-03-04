import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import AuthButton from "@/src/components/common/button/AuthButton";
import styled from "styled-components/native";
import SocialLoginButton from "@/src/components/common/button/SocialLoginButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function Signup() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleEmailSignupButtonOnClick = () => {
    console.log("이메일회원가입 버튼 클릭");
    navigation.navigate("EmailSignup");
  };
  const handleLoginButtonOnClick = () => {
    console.log("로그인 버튼 클릭");
    navigation.navigate("Login");
  };
  return (
    <Container>
      <Header type="back" />
      <Col gap={67} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          안녕하세요 :) {"\n"}
          소일거리 드로잉입니다. {"\n"}
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            먼저 로그인이 필요해요.
          </Txt>
          <SocialLoginButton type="kakao" onClick={() => {}} />
          <SocialLoginButton type="naver" onClick={() => {}} />
          <AuthButton
            title="이메일 로그인"
            type="login"
            onClick={handleLoginButtonOnClick}
          />
          <Seperator />
          <Col gap={17} margin={"50px 0"}>
            <Txt variant="bodySubText" align="left">
              소일거리 드로잉이 처음이신가요?
            </Txt>
            <AuthButton
              title="회원가입"
              type="signup"
              onClick={handleEmailSignupButtonOnClick}
            />
          </Col>
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
