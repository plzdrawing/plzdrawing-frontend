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

export default function EmailSignup() {
  const [textFieldState, setTextFieldState] = useState<
    "emtpy" | "filled" | "error"
  >("emtpy");
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
          <TextField
            placeholder="비밀번호"
            state={textFieldState}
            setState={setTextFieldState}
          />
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton title="인증하기" color="sub_yellow" />
        </ButtonContainer>
      </BottomFixedArea>
    </Container>
  );
}

const ButtonContainer = styled.View`
  width: 100%;
  padding: 10px 57px;
`;
