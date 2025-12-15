import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import tw from "twrnc";

import { RootStackParamList } from "@/src/types/navigation";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { Container } from "@/src/components/common/container/Container";
import PrimaryButton from "@/src/components/common/button/PrimaryButton";
import { GreeNormal } from "@/assets/images";
import { View } from "react-native";

export default function LoginSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStartButtonOnClick = () => {
    navigation.navigate("Signup");
  };

  return (
    <Container style={tw`items-center justify-center`}>
      <GreeNormal />

      <Txt
        variant="mainTitleBold"
        align="center"
        style={tw`mt-[9px] mb-10`}
      >
        환영합니다 :) {"\n"}{"\n"}
        '그리'와 함께 {"\n"}
        소소한 일상을 즐겨보아요!
      </Txt>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px]`}>
          <PrimaryButton
            title="시작하기"
            onClick={handleStartButtonOnClick}
            color="sub_yellow"
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
