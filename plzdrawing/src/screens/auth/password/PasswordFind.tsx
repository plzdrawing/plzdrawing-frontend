import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function PasswordFind() {
  const [textFieldState, setTextFieldState] = useState<
    "emtpy" | "filled" | "error"
  >("emtpy");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNextButtonOnClick = () => {
    console.log("다음 버튼 클릭");
    navigation.navigate("ProfileMakingDone");
  };
  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          비밀번호 찾기 {"\n"}
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            휴대폰 번호 / 이메일
          </Txt>
          <TextField
            placeholder="휴대폰 번호 또는 이메일을 입력해주세요."
            state={textFieldState}
            setState={setTextFieldState}
          />
          <Txt variant="bodySubText" align="left">
            인증번호
          </Txt>
          <TextField
            placeholder="인증번호를 입력해주세요."
            state={textFieldState}
            setState={setTextFieldState}
          />
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="인증번호 전송하기"
            color="sub_yellow"
            onClick={handleNextButtonOnClick}
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
