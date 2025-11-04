import Header from "@/src/components/common/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/common/text/Txt";
import { Container } from "@/src/components/common/container/Container";
import { Col } from "@/src/components/common/flex/Flex";
import styled from "styled-components/native";
import TextField from "@/src/components/common/input/TextField";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { authApi } from "@/src/apis/auth";

type ProfileMakingNicknameRouteProp = RouteProp<RootStackParamList, 'ProfileMakingNickname'>;

export default function ProfileMakingNickname() {
  const route = useRoute<ProfileMakingNicknameRouteProp>();
  const { email, password, agreements } = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [nickName, setNickName] = useState("");
  const [textFieldState, setTextFieldState] = useState<"empty" | "filled" | "error">("empty");

  const handleNextButtonOnClick = async () => {
    if (!nickName.trim()) {
      return;
    }

    console.log("닉네임:", nickName);
    console.log("이메일:", email);
    console.log("비밀번호:", password);
    console.log("약관 동의:", agreements);

    try {
      await authApi.signup({
        email: email,
        password: password,
        nickName: nickName,
        personalInfoConsent: agreements.privacy,
        acceptTermsOfUse: agreements.terms,
        marketingConsent: agreements.marketing,
      });

      // 회원가입 성공
      navigation.navigate("ProfileMakingDone");

    } catch (error: any) {
      // 회원가입 실패
      console.error("Signup failed:", error);
    }
  };

  return (
    <Container>
      <Header type="back" />
      <Col gap={98} padding="43px 32px">
        <Txt variant="headLineBold" align="left">
          사용할 별명을 입력해주세요. {"\n"}
        </Txt>
        <Col gap={17}>
          <Txt variant="bodySubText" align="left">
            별명
          </Txt>
          <TextField
            placeholder="별명은 이후에 변경할 수 있어요."
            state={textFieldState}
            setState={setTextFieldState}
          />
        </Col>
      </Col>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="다음"
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
