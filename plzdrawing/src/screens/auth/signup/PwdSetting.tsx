import colors from "@/src/constants/Colors";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { Container } from "@/src/components/common/container/Container";
import { Col, Row } from "@/src/components/common/flex/Flex";
import Header from "@/src/components/common/header/Header";
import Txt from "@/src/components/common/text/Txt";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import TextField from "@/src/components/common/input/TextField";
import AlertModal from "@/src/components/common/modal/AlertModal";
import { EmptyCheck, FilledCheck } from "@/assets/images";

export default function PwdSetting() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordState, setPasswordState] = useState<
    "empty" | "filled" | "error"
  >("empty");
  const [confirmState, setConfirmState] = useState<
    "empty" | "filled" | "error"
  >("empty");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [lengthCheck, setLengthCheck] = useState(false);
  const [combinationCheck, setCombinationCheck] = useState(false);

  const validatePassword = (
    pwd: string
  ): { isValid: boolean; message: string } => {
    if (!pwd) {
      return { isValid: false, message: "" };
    }

    // 8자 이상 체크
    const lengthValid = pwd.length >= 8;
    setLengthCheck(lengthValid);

    // 영문, 숫자, 특수문자 조합 체크
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[@$!%*#?&]/.test(pwd);
    const combinationValid = hasLetter && hasDigit && hasSpecial;
    setCombinationCheck(combinationValid);

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

    // 동일한 비밀번호 체크
    const identicalValid = pwd === confirmPwd;

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
      setPasswordState("empty");
    } else {
      setPasswordState("filled");
    }
    setPasswordError(passwordResult.message);

    const confirmResult = validateConfirmPassword(password, confirmPassword);
    if (!confirmPassword) {
      setConfirmState("empty");
    } else {
      setConfirmState(confirmResult.isValid ? "filled" : "error");
    }
    setConfirmError(confirmResult.message);

    setIsValid(passwordResult.isValid && confirmResult.isValid);
  }, [password, confirmPassword]);

  const handlePasswordFocus = () => {
    setShowPasswordChecks(true);
  };

  const handleConfirmButton = () => {
    if (isValid) {
      console.log("비밀번호 설정 완료");
      setModalVisible(true);
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
              placeholder="영문, 숫자, 특수문자 8자 이상."
              state={passwordState}
              setState={setPasswordState}
              value={password}
              onChangeText={setPassword}
              type="password"
              onFocus={handlePasswordFocus}
            />

            {showPasswordChecks && (
              <Col gap={7} padding={"0 0 0 20px"}>
                <Row gap={17}>
                  {lengthCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant="bodySubText" color="icon_default">
                    최소 8자 이상
                  </Txt>
                </Row>
                <Row gap={17}>
                  {combinationCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant="bodySubText" color="icon_default">
                    영문, 숫자, 특수문자 3가지 조합
                  </Txt>
                </Row>
              </Col>
            )}
          </Col>
          <Col gap={17}>
            <Txt variant="bodySubText" align="left">
              비밀번호 확인
            </Txt>
            <TextField
              placeholder="영문, 숫자, 특수문자 8자 이상."
              state={confirmState}
              setState={setConfirmState}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage="비밀번호가 일치하지 않아요"
              type="password"
            />
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
      {modalVisible && (
        <AlertModal
          title="비밀번호 설정이 완료되었어요 :)"
          buttonTitle="확인"
          onClick={() => {
            setModalVisible(false);
            navigation.navigate("Login");
          }}
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
