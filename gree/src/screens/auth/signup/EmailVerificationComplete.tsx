import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { TouchableOpacity, View } from 'react-native';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import Colors from '@/src/constants/Colors';

type RouteProps = RouteProp<RootStackParamList, 'EmailVerificationComplete'>;

export default function EmailVerificationComplete() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { email } = route.params;

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAllAgreements = () => {
    const newValue = !agreements.all;
    setAgreements({ all: newValue, terms: newValue, privacy: newValue, marketing: newValue });
  };

  const handleSingleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      next.all = next.terms && next.privacy && next.marketing;
      return next;
    });
  };

  const isNextEnabled = agreements.terms && agreements.privacy;

  const checkbox = (checked: boolean) => (
    <View
      style={[
        tw`w-[19px] h-[19px] rounded-[5px] justify-center items-center`,
        {
          borderWidth: 1,
          borderColor: checked ? Colors.colors.main_yellow : Colors.colors.light_gray3,
          backgroundColor: checked ? Colors.colors.sub_yellow : 'transparent',
        },
      ]}
    />
  );

  return (
    <Container>
      <Header />
      <View style={tw`gap-[30px] p-[43px_32px]`}>
        <View style={tw`gap-[12px]`}>
          <Txt variant='headLineBold' align='left'>
            환영합니다 :)
          </Txt>
          <Txt variant='bodySubText' align='left'>
            인증이 완료되었어요.
          </Txt>
        </View>

        <View style={tw`mt-[250px] w-full`}>
          <TouchableOpacity onPress={handleAllAgreements}>
            <View style={tw`gap-[12px] flex-row`}>
              {checkbox(agreements.all)}
              <Txt variant='bodySubText'>약관 전체 동의</Txt>
            </View>
          </TouchableOpacity>

          <View style={[tw`h-[1px] my-[16px]`, { backgroundColor: Colors.colors.seperator }]} />

          <View style={tw`gap-[16px]`}>
            <TouchableOpacity onPress={() => handleSingleAgreement('terms')}>
              <View style={tw`gap-[12px] flex-row`}>
                {checkbox(agreements.terms)}
                <Txt variant='bodySubText'>[필수] 약관동의 (개인정보 수집 및 이용)</Txt>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSingleAgreement('privacy')}>
              <View style={tw`gap-[12px] flex-row`}>
                {checkbox(agreements.privacy)}
                <Txt variant='bodySubText'>[필수] 이용정책 동의</Txt>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSingleAgreement('marketing')}>
              <View style={tw`gap-[12px] flex-row`}>
                {checkbox(agreements.marketing)}
                <Txt variant='bodySubText'>[선택] 할인, 이벤트 소식 받기</Txt>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            isValid={isNextEnabled}
            title='다음'
            color='sub_yellow'
            disabled={!isNextEnabled}
            onClick={() =>
              navigation.navigate('PasswordSetting', {
                email,
                agreements: {
                  terms: agreements.terms,
                  privacy: agreements.privacy,
                  marketing: agreements.marketing,
                },
              })
            }
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
