import Header from "@/src/components/common/header/Header";
import React, { useState, useEffect } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import AlertModal from "@/src/components/common/modal/AlertModal";
import { authApi } from "@/src/apis/auth";

export default function PasswordFind() {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"empty" | "filled" | "error">("empty");
  const [emailError, setEmailError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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

  const handleNextButtonOnClick = async () => {
    if (!isButtonEnabled) return;

    console.log("인증번호 전송 버튼 클릭");

    try {
      // [수정] API 호출
      await authApi.requestPasswordReissue({ email });
      // API 호출 성공
      setModalVisible(true);
    } catch (error) {
      // API 호출 실패 (가입되지 않은 이메일 등)
      console.error("Password reissue request failed:", error);
      setErrorModalVisible(true);
    }
  };

  const handleModalButtonClick = () => {
    setModalVisible(false);
    navigation.navigate("PasswordFindVerification", { email: email });
  };

  const handleModalClose = () => {
    setErrorModalVisible(false);
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
            isValid={isButtonEnabled}
          />
        </ButtonContainer>
      </BottomFixedArea>
      {errorModalVisible && (
        <AlertModal
          title={"가입되지 않은 이메일이에요."}
          buttonTitle="확인"
          onClick={handleModalClose}
          textVariant="thirdText"
        />
      )}
      {modalVisible && (
        <AlertModal
          title="인증번호가 전송되었어요!"
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
