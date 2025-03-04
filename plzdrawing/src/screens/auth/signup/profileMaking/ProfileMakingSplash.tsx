import Header from "@/src/components/common/header/Header";
import React from "react";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { Container } from "@/src/components/common/container/Container";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import styled from "styled-components/native";

export default function ProfileMakingSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleProfileMakingButtonOnClick = () => {
    navigation.navigate("ProfileMakingNickname");
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
