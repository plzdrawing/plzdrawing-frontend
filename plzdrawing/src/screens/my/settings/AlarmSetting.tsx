import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';

import Txt from "@/src/components/ui/Txt";
import ToggleSwitch from "@/src/components/ui/button/TogleSwitch";

type AlarmSettingProps = NativeStackScreenProps<RootStackParamList, 'AlarmSetting'>;

export default function AlarmSetting({ 
  route, 
  navigation 
}: AlarmSettingProps) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  // TODO: 약관 링크 추가, 알림 설정 api 연동
  return (
    <Container>
      <Header title='알림 설정' />

      <View style={tw`px-[32px] mt-[66px] w-full`}>
        <View style={tw`flex-row justify-between items-center border-b border-light-gray-3 pb-[28px]`}>
          <Txt variant='bodyText'>
            푸시 알림 동의
          </Txt>
          <ToggleSwitch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>
        
        <View style={tw`flex-row justify-between items-center mt-[17px] mb-[17px] border-b border-light-gray-3 pb-[17px]`}>
          <View>
            <Txt variant='bodyText' style={tw`mb-[7px]`}>
              광고성 수신 약관 동의
            </Txt>
            <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`underline`}>
              약관보기
            </Txt>
          </View>
          <ToggleSwitch
            value={isMarketingEnabled}
            onValueChange={setIsMarketingEnabled}
          />
        </View>

        <View style={tw`flex-row justify-between items-center border-b border-light-gray-3 pb-[17px]`}>
          <View>
            <Txt variant='bodyText' style={tw`mb-[7px]`}>
              위치 서비스 약관 동의
            </Txt>
            <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`underline`}>
              약관보기
            </Txt>
          </View>
          <ToggleSwitch
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
          />
        </View>
      </View>
    </Container>
  );
}
