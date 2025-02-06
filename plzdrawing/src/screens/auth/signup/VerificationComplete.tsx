import colors from "@/src/constants/Colors";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { Container } from "@/src/components/common/container/Container";
import { Col, Row } from "@/src/components/common/flex/Flex";
import Header from "@/src/components/common/header/Header";
import Txt from "@/src/components/common/text/Txt";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function VerificationComplete() {
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAllAgreements = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSingleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const newAgreements = {
        ...prev,
        [key]: !prev[key],
      };

      newAgreements.all =
        newAgreements.terms && newAgreements.privacy && newAgreements.marketing;

      return newAgreements;
    });
  };

  const handleNextButton = () => {  
    navigation.navigate("PwdSetting");
  }

  const isNextEnabled = agreements.terms && agreements.privacy;

  return (
    <Container>
      <Header type="back" />
      <Col gap={30} padding="43px 32px">
        <Col gap={12}>
          <Txt variant="headLineBold" align="left">
            환영합니다 :)
          </Txt>
          <Txt variant="bodySubText" align="left">
            인증이 완료되었어요.
          </Txt>
        </Col>

        <AgreementSection>
          <TouchableOpacity onPress={handleAllAgreements}>
            <Row gap={12}>
              <Checkbox checked={agreements.all}></Checkbox>
              <Txt variant="bodySubText">약관 전체 동의</Txt>
            </Row>
          </TouchableOpacity>

          <Divider />

          <Col gap={16}>
            <TouchableOpacity onPress={() => handleSingleAgreement("terms")}>
              <Row gap={12}>
                <Checkbox checked={agreements.terms}></Checkbox>
                <Txt variant="bodySubText">
                  [필수] 약관동의 (개인정보 수집 및 이용)
                </Txt>
              </Row>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSingleAgreement("privacy")}>
              <Row gap={12}>
                <Checkbox checked={agreements.privacy}></Checkbox>
                <Txt variant="bodySubText">[필수] 이용정책 동의</Txt>
              </Row>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSingleAgreement("marketing")}
            >
              <Row gap={12}>
                <Checkbox checked={agreements.marketing}></Checkbox>
                <Txt variant="bodySubText">[선택] 할인, 이벤트 소식 받기</Txt>
              </Row>
            </TouchableOpacity>
          </Col>
        </AgreementSection>
      </Col>

      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="다음"
            color="sub_yellow"
            disabled={!isNextEnabled}
            onClick={handleNextButton}
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

const AgreementSection = styled.View`
  margin-top: 250px;
  width: 100%;
`;

const Checkbox = styled.View<{ checked: boolean }>`
  width: 19px;
  height: 19px;
  border-radius: 5px;
  border: 1px solid
    ${(props: { checked: boolean }) =>
      props.checked ? colors.colors.main_yellow : colors.colors.light_gray3};
  background-color: ${(props: { checked: boolean }) =>
    props.checked ? colors.colors.sub_yellow : "transparent"};
  justify-content: center;
  align-items: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${colors.colors.seperator};
  margin: 16px 0;
`;
