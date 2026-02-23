import tw from '@/src/lib/tailwind';

import colors from "@/src/constants/Colors";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/header/Header";
import Txt from "@/src/components/ui/Txt";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

type VerificationCompleteRouteProp = RouteProp<RootStackParamList, 'EmailVerificationComplete'>;

export default function VerificationComplete() {
  const route = useRoute<VerificationCompleteRouteProp>();
  const { email } = route.params;

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
    navigation.navigate('PasswordSetting', { 
      email: email,
      agreements: {
        terms: agreements.terms,
        privacy: agreements.privacy,
        marketing: agreements.marketing,
      }
    });
  }

  const isNextEnabled = agreements.terms && agreements.privacy;

  return (
    <Container>
      <Header />
      <View style={tw`gap-[30px] p-[43px_32px]`}>
        <View style={tw`gap-[12px]`}>
          <Txt variant="headLineBold" align="left">
            환영합니다 :)
          </Txt>
          <Txt variant="bodySubText" align="left">
            인증이 완료되었어요.
          </Txt>
        </View>

        <View style={tw`mt-[250px] w-full`}>
          <TouchableOpacity onPress={handleAllAgreements}>
            <View style={tw`gap-[12px] flex-row`}>
              <View style={[tw`w-[19px] h-[19px] rounded-[5px] justify-center items-center`, { borderWidth: 1, borderColor: agreements.all ? colors.colors.main_yellow : colors.colors.light_gray3, backgroundColor: agreements.all ? colors.colors.sub_yellow : 'transparent' }]} />
              <Txt variant="bodySubText">약관 전체 동의</Txt>
            </View>
          </TouchableOpacity>

          <View style={[tw`h-[1px] my-[16px]`, { backgroundColor: colors.colors.seperator }]} />

          <View style={tw`gap-[16px]`}>
            <TouchableOpacity onPress={() => handleSingleAgreement("terms")}>
              <View style={tw`gap-[12px] flex-row`}>
                <View style={[tw`w-[19px] h-[19px] rounded-[5px] justify-center items-center`, { borderWidth: 1, borderColor: agreements.terms ? colors.colors.main_yellow : colors.colors.light_gray3, backgroundColor: agreements.terms ? colors.colors.sub_yellow : 'transparent' }]} />
                <Txt variant="bodySubText">
                  [필수] 약관동의 (개인정보 수집 및 이용)
                </Txt>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSingleAgreement("privacy")}>
              <View style={tw`gap-[12px] flex-row`}>
                <View style={[tw`w-[19px] h-[19px] rounded-[5px] justify-center items-center`, { borderWidth: 1, borderColor: agreements.privacy ? colors.colors.main_yellow : colors.colors.light_gray3, backgroundColor: agreements.privacy ? colors.colors.sub_yellow : 'transparent' }]} />
                <Txt variant="bodySubText">[필수] 이용정책 동의</Txt>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSingleAgreement("marketing")}
            >
              <View style={tw`gap-[12px] flex-row`}>
                <View style={[tw`w-[19px] h-[19px] rounded-[5px] justify-center items-center`, { borderWidth: 1, borderColor: agreements.marketing ? colors.colors.main_yellow : colors.colors.light_gray3, backgroundColor: agreements.marketing ? colors.colors.sub_yellow : 'transparent' }]} />
                <Txt variant="bodySubText">[선택] 할인, 이벤트 소식 받기</Txt>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            isValid={isNextEnabled}
            title="다음"
            color="sub_yellow"
            disabled={!isNextEnabled}
            onClick={handleNextButton}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}


