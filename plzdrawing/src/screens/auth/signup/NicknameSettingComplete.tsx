import tw from '@/src/lib/tailwind';
import Header from "@/src/components/layout/header/Header";
import React from "react";
import Txt from "@/src/components/ui/Txt";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import { View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Container from "@/src/components/layout/Container";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

export default function NicknameSettingComplete() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleStartButtonOnClick = () => {
    navigation.navigate('Main');
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
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton title="시작하기" onClick={handleStartButtonOnClick} />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
