import { StyleSheet } from "react-native";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React, { useState, useEffect } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import AuthButton from "@/src/components/common/button/AuthButton";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/types/navigation";
import TextField from "@/src/components/common/input/TextField";
import AlertModal from "@/src/components/common/modal/AlertModal";

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<"empty" | "filled" | "error">(
    "empty"
  );
  const [emailError, setEmailError] = useState("");

  const [passwordState, setPasswordState] = useState<
    "empty" | "filled" | "error"
  >("empty");
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!email) {
      setEmailState("empty");
      setEmailError("");
    } else if (validateEmail(email)) {
      setEmailState("filled");
      setEmailError("");
    } else {
      setEmailState("error");
      setEmailError("이메일 양식에 맞지 않아요.");
    }
  }, [email]);

  const handleSignupButtonOnClick = () => {
    console.log("회원가입 버튼 클릭");
    navigation.navigate("Signup");
  };

  const handlePasswordFindButtonOnClick = () => {
    console.log("비밀번호찾기 버튼 클릭");
    navigation.navigate("PasswordFind");
  };

  const handleLoginButtonOnClick = () => {
    // 이메일 형식이 유효하지 않으면 로그인 막기
    if (emailState === "error") {
      return;
    }

    // 일치하는지 확인하는 로직 필요
    navigation.navigate("Main");
    // 일치하지 않을 경우 모달 띄우기
    // setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
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
            state={emailState}
            setState={setEmailState}
            value={email}
            onChangeText={setEmail}
            errorMessage="이메일 양식에 맞지 않아요."
          />

          <TextField
            placeholder="비밀번호"
            state={passwordState}
            setState={setPasswordState}
            type="password"
            errorMessage="비밀번호를 다시 한 번 확인해주세요."
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
            아이디/비밀번호 찾기
          </Txt>
        </Col>
      </Col>
      {modalVisible && (
        <AlertModal
          title={"이메일 혹은 비밀번호가\n일치하지 않아요."}
          buttonTitle="확인"
          onClick={handleConfirm}
          textVariant="thirdText"
        />
      )}
    </Container>
  );
}

const Seperator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.colors.seperator};
`;
