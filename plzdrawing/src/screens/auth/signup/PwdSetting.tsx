import colors from "@/src/constants/Colors";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { Container } from "@/src/components/common/container/Container";
import { Col, Row } from "@/src/components/common/flex/Flex";
import Header from "@/src/components/common/header/Header";
import Txt from "@/src/components/common/text/Txt";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import TextField from "@/src/components/common/input/TextField";

export default function PwdSetting() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordState, setPasswordState] = useState<
    "emtpy" | "filled" | "error"
  >("emtpy");
  const [confirmState, setConfirmState] = useState<
    "emtpy" | "filled" | "error"
  >("emtpy");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const validatePassword = (
    pwd: string
  ): { isValid: boolean; message: string } => {
    if (!pwd) {
      return { isValid: false, message: "" };
    }
    // 영문, 숫자, 특수문자 조합 8자 이상
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regex.test(pwd)) {
      return {
        isValid: false,
        message: "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.",
      };
    }
    return { isValid: true, message: "" };
  };

  const validateConfirmPassword = (
    pwd: string,
    confirmPwd: string
  ): { isValid: boolean; message: string } => {
    if (!confirmPwd) {
      return { isValid: false, message: "" };
    }
    if (pwd !== confirmPwd) {
      return {
        isValid: false,
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    const passwordResult = validatePassword(password);
    if (!password) {
      setPasswordState("emtpy");
    } else {
      setPasswordState(passwordResult.isValid ? "filled" : "error");
    }
    setPasswordError(passwordResult.message);

    const confirmResult = validateConfirmPassword(password, confirmPassword);
    if (!confirmPassword) {
      setConfirmState("emtpy");
    } else {
      setConfirmState(confirmResult.isValid ? "filled" : "error");
    }
    setConfirmError(confirmResult.message);

    setIsValid(passwordResult.isValid && confirmResult.isValid);
  }, [password, confirmPassword]);

  const handleConfirmButton = () => {
    if (isValid) {
      console.log("비밀번호 설정 완료");
    }
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          비밀번호를 설정해주세요.
        </Txt>
        <Col gap={17}>
          <Col gap={17}>
            <Txt variant="bodySubText" align="left">
              비밀번호
            </Txt>
            <TextField
              placeholder="영문,숫자, 특수문자 8자 이상 입력해주세요."
              state={passwordState}
              setState={setPasswordState}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {passwordState === "error" && (
              <Txt
                variant="bodySubText"
                color="error_red"
                style={{ marginLeft: 21, marginTop: -10 }}
              >
                {passwordError}
              </Txt>
            )}
          </Col>
          <Col gap={17}>
            <Txt variant="bodySubText" align="left">
              비밀번호 확인
            </Txt>
            <TextField
              placeholder="영문,숫자, 특수문자 8자 이상 입력해주세요."
              state={confirmState}
              setState={setConfirmState}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            {confirmState === "error" && (
              <Txt
                variant="bodySubText"
                color="error_red"
                style={{ marginLeft: 21, marginTop: -10 }}
              >
                {confirmError}
              </Txt>
            )}
          </Col>
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="확인하기"
            color="sub_yellow"
            disabled={!isValid}
            onClick={handleConfirmButton}
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
