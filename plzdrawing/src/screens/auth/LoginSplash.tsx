import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import styled from "styled-components/native";
import { RootStackParamList } from "@/src/types/navigation";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { Container } from "@/src/components/common/container/Container";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { GreeNormal } from "@/assets/images";

export default function LoginSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleStartButtonOnClick = () => {
    navigation.navigate("Signup");
  };

  return (
    <Container style={{ alignItems: "center", justifyContent: "center" }}>
      <GreeNormal />
      <Txt
        variant="mainTitleBold"
        align="center"
        style={{ marginTop: 9, marginBottom: 40 }}
      >
        환영합니다 :) {"\n"}{"\n"}
        '그리'와 함께 {"\n"}
        소소한 일상을 즐겨보아요!
      </Txt>
      <BottomFixedArea>
        <ButtonContainer>
          <PrimaryButton
            title="시작하기"
            onClick={handleStartButtonOnClick}
            color="sub_yellow"
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
