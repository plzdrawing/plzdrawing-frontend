import tw from '@/src/lib/tailwind';
import Header from "@/src/components/layout/header/Header";
import React from "react";
import Txt from "@/src/components/ui/Txt";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import { View } from "react-native";
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Container from "@/src/components/layout/Container";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

type NicknameSettingSplashRouteProp = RouteProp<RootStackParamList, 'NicknameSettingSplash'>;

export default function NicknameSettingSplash() {
  const route = useRoute<NicknameSettingSplashRouteProp>();
  const { email, password, agreements } = route.params;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfileMakingButtonOnClick = () => {
    navigation.navigate("NicknameSetting", {
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
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title="프로필 만들기"
            color="sub_yellow"
            onClick={handleProfileMakingButtonOnClick}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
