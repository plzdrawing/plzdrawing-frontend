import Header from "@/src/components/layout/header/Header";
import React from "react";
import Txt from "@/src/components/ui/Txt";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Container from "@/src/components/layout/Container";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import styled from "styled-components/native";

type ProfileMakingSplashRouteProp = RouteProp<RootStackParamList, 'ProfileMakingSplash'>;

export default function ProfileMakingSplash() {
  const route = useRoute<ProfileMakingSplashRouteProp>();
  const { email, password, agreements } = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfileMakingButtonOnClick = () => {
    navigation.navigate("ProfileMakingNickname", {
      email,
      password,
      agreements,
    });
  };

  return (
    <Container>
      <Header />
      <Txt
        variant="headLineBold"
        align="left"
        style={{ marginTop: 43, paddingLeft: 32 }}
      >
        감사합니다. {"\n"}
        인증이 완료되었어요!
        {"\n"}
        {"\n"}
        이제 프로필을 만들어보아요:)
      </Txt>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="프로필 만들기"
            color="sub_yellow"
            onClick={handleProfileMakingButtonOnClick}
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
