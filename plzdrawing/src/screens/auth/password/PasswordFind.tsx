import Header from "@/src/components/common/header/Header";
import React, { useState, useEffect } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import AlertModal from "@/src/components/common/modal/AlertModal";

export default function PasswordFind() {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"empty" | "filled" | "error">(
    "empty"
  );
  const [emailError, setEmailError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!email) {
      setEmailState("empty");
      setEmailError("");
      setIsButtonEnabled(false);
    } else if (validateEmail(email)) {
      setEmailState("filled");
      setEmailError("");
      setIsButtonEnabled(true);
    } else {
      setEmailState("error");
      setEmailError("이메일 양식에 맞지 않아요.");
      setIsButtonEnabled(false);
    }
  }, [email]);

  const handleNextButtonOnClick = () => {
    if (!isButtonEnabled) return;

    console.log("인증번호 전송 버튼 클릭");
    // TODO: 유효한 이메일인지 확인 API 호출
    // TODO: 가입되지 않은 이메일일 경우 모달 띄우기
    // TODO: 인증번호 전송 API 호출
    navigation.navigate("PasswordFindVerification");
  };

  const handleModalButtonClick = () => {
    setModalVisible(false);
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          비밀번호 찾기
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            이메일
          </Txt>
          <TextField
            placeholder="이메일을 입력해주세요."
            state={emailState}
            setState={setEmailState}
            value={email}
            onChangeText={setEmail}
            errorMessage="이메일 양식에 맞지 않아요."
          />
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="인증번호 전송"
            color="sub_yellow"
            disabled={!isButtonEnabled}
            onClick={handleNextButtonOnClick}
          />
        </ButtonContainer>
      </BottomFixedArea>
      {modalVisible && (
        <AlertModal
          title={"가입되지 않은 이메일이에요."}
          buttonTitle="확인"
          onClick={handleModalButtonClick}
          textVariant="thirdText"
        />
      )}
    </Container>
  );
}

const ButtonContainer = styled.View`
  width: 100%;
  padding: 10px 57px;
`;
