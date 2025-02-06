import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function PasswordFind() {
  const [pwdTextFieldState, setPwdTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const [newPwdtextFieldState, setNewPwdTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const [newPwdChecktextFieldState, setNewPwdCheckTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNextButtonOnClick = () => {
    console.log("다음 버튼 클릭");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const [password, setPassword] = useState("");
  const [newPwderrorMessage, setNewPwdErrorMessage] = useState("");
  const [newPwdCheckErrorMessage, setNewPwdCheckErrorMessage] = useState("");

  const validatePassword = (text: string) => {
    setPassword(text);
    console.log("p", text);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (text === "") {
      setNewPwdTextFieldState("empty");
      setNewPwdErrorMessage("");
    } else if (!regex.test(text)) {
      setNewPwdTextFieldState("error");
      setNewPwdErrorMessage(
        "영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요."
      );
    } else {
      setNewPwdTextFieldState("filled");
      setNewPwdErrorMessage("");
    }
  };

  const validatePasswordCheck = (text: string) => {
    if (text === "") {
      setNewPwdCheckTextFieldState("empty");
    } else if (text !== password) {
      setNewPwdCheckTextFieldState("error");
      console.log("password", text);
      setNewPwdCheckErrorMessage("비밀번호가 일치하지 않아요.");
    } else {
      console.log("password", text);
      setNewPwdCheckTextFieldState("filled");
    }
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={73} padding="43px 32px">
        <Col gap={7}>
          <Txt variant="headLineBold" align="left">
            비밀번호 변경하기
          </Txt>
          <Txt variant="bodySubText" align="left">
            영문 + 숫자 + 특수문자 8자 이상 설정해주세요.
          </Txt>
        </Col>

        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            비밀번호
          </Txt>
          <TextField
            placeholder="기존 비밀번호를 입력해주세요."
            type="password"
            state={pwdTextFieldState}
            setState={setPwdTextFieldState}
          />
          <Txt variant="bodySubText" align="left">
            새 비밀번호
          </Txt>
          <TextField
            placeholder="새로운 비밀번호를 입력해주세요."
            type="password"
            state={newPwdtextFieldState}
            setState={setNewPwdTextFieldState}
            validation={validatePassword}
            errorMessage={newPwderrorMessage}
          />
          <Txt variant="bodySubText" align="left">
            새 비밀번호 확인
          </Txt>
          <TextField
            placeholder="새로운 비밀번호를 확인해주세요."
            type="password"
            state={newPwdChecktextFieldState}
            setState={setNewPwdCheckTextFieldState}
            validation={validatePasswordCheck}
            errorMessage={newPwdCheckErrorMessage}
          />
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="완료"
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
