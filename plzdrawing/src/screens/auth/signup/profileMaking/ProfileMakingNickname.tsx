import tw from '@/src/lib/tailwind';

import Header from "@/src/components/layout/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/ui/Txt";
import Container from "@/src/components/layout/Container";
import styled from "styled-components/native";
import TextField from "@/src/components/ui/input/TextField";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { View } from 'react-native';
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { authController } from "@/src/apis/controller/auth";

type ProfileMakingNicknameRouteProp = RouteProp<RootStackParamList, 'ProfileMakingNickname'>;

export default function ProfileMakingNickname() {
  const route = useRoute<ProfileMakingNicknameRouteProp>();
  const { email, password, agreements } = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [nickName, setNickName] = useState("");
  const [textFieldState, setTextFieldState] = useState<"empty" | "filled" | "error" | "failed">("empty");

  const handleNextButtonOnClick = async () => {
    if (!nickName.trim()) {
      return;
    }

    console.log("닉네임:", nickName);
    console.log("이메일:", email);
    console.log("비밀번호:", password);
    console.log("약관 동의:", agreements);

    try {
      await authController.signup({
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
      <Header />
      <View style={tw`gap-[98px] p-[43px_32px]`}>
        <Txt variant="headLineBold" align="left">
          사용할 별명을 입력해주세요. {"\n"}
        </Txt>
        <View style={tw`gap-[17px]`}>
          <Txt variant="bodySubText" align="left">
            별명
          </Txt>
          <TextField
            placeholder="별명은 이후에 변경할 수 있어요."
            state={textFieldState}
            setState={setTextFieldState}
            content={nickName}
            validation={(text) => setNickName(text)}
          />
        </View>
      </View>
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
