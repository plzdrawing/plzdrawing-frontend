import Header from "@/src/components/common/header/Header";
import React from "react";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { Container } from "@/src/components/common/container/Container";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import styled from "styled-components/native";

export default function ProfileMakingDone() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleStartButtonOnClick = () => {
    navigation.navigate("Main");
  };

  return (
    <Container>
      <Header />
      <Txt
        variant="headLineBold"
        align="left"
        style={{ marginTop: 43, paddingLeft: 32 }}
      >
        환영합니다:)
        {"\n"}
        {"\n"}
        소일거리 드로잉어플과 함께 {"\n"}
        소소한 일상을 즐겨보아요!
      </Txt>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton title="시작하기" onClick={handleStartButtonOnClick} />
        </ButtonContainer>
      </BottomFixedArea>
    </Container>
  );
}

const ButtonContainer = styled.View`
  width: 100%;
  padding: 10px 57px;
`;
