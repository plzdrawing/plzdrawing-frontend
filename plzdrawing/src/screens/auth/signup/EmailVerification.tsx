import colors from "@/src/constants/Colors";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { Container } from "@/src/components/common/container/Container";
import { Col, Row } from "@/src/components/common/flex/Flex";
import Header from "@/src/components/common/header/Header";
import Txt from "@/src/components/common/text/Txt";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function EmailVerification() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<Array<TextInput | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleInputChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!verificationCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setVerificationCode(["", "", "", "", "", ""]);
  };

  const isVerificationComplete = verificationCode.every((code) => code !== "");

  const handleCompleteButtonOnClick = () => {
    navigation.navigate("VerificationComplete");
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          인증번호를 확인해주세요 :) {"\n"}
        </Txt>
        <Col gap={8}>
          <VerificationInputContainer>
            {verificationCode.map((code, index) => (
              <Input
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                maxLength={1}
                keyboardType="numeric"
                value={code}
                hasValue={code !== ""}
                onChangeText={(text: string) => handleInputChange(text, index)}
                onKeyPress={(e: any) => handleKeyPress(e, index)}
              />
            ))}
          </VerificationInputContainer>

          <Row style={{ justifyContent: "space-between", marginTop: 8 }}>
            <Txt variant="bodySubText" color="error_red">
              {formatTime(timeLeft)}
            </Txt>
            <Txt
              variant="bodySubText"
              align="right"
              style={{ textDecorationLine: "underline" }}
              onPress={handleResendCode}
            >
              인증번호 재전송
            </Txt>
          </Row>
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="확인하기"
            color="sub_yellow"
            disabled={!isVerificationComplete}
            onClick={handleCompleteButtonOnClick}
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

const VerificationInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.TextInput<{ hasValue?: boolean }>`
  width: 48px;
  height: 52px;
  border: 1px solid
    ${(props: any) =>
      props.hasValue ? colors.colors.main_yellow : colors.colors.light_gray3};
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
`;
