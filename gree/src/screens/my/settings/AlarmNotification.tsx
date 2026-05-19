import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, Switch } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import { alarmController } from '@/src/apis/controller/alarm';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'AlarmNotification'>;

export default function AlarmNotification({ navigation }: Props) {
  const [pushNotification, setPushNotification] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(false);
  const [locationService, setLocationService] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefs = await alarmController.getNotificationPreferences();
        setPushNotification(Boolean(prefs.allEnabled));
        setAdvertisingConsent(Boolean(prefs.marketingEnabled));
        // map chatEnabled to locationService toggle for now
        setLocationService(Boolean(prefs.chatEnabled));
      } catch (err) {
        console.error('Failed to load notification preferences', err);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = async (data: Partial<any>) => {
    try {
      await alarmController.updateNotificationPreferences(data);
    } catch (err) {
      console.error('Failed to update notification preferences', err);
    }
  };

  return (
    <Container className='w-full'>
      <Header title='알림 설정' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`p-[32px] w-full flex-1 bg-light-gray-1`}
      >
        {/* 푸시 알림 동의 */}
        <View style={tw`flex-row items-center justify-between mb-[17px]`}>
          <Txt variant='bodyText'>푸시 알림 동의</Txt>
          <Switch
            value={pushNotification}
            onValueChange={(v) => {
              setPushNotification(v);
              updatePreferences({ allEnabled: v });
            }}
            trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
            thumbColor={pushNotification ? '#FFC311' : '#FFFFFF'}
          />
        </View>
        <View style={tw`h-[1px] bg-light-gray-3 mb-[17px]`} />

        {/* 광고성 수신 약관 동의 */}
        <View style={tw`mb-[8px]`}>
          <View style={tw`flex-row items-center justify-between mb-[-7px]`}>
            <Txt variant='bodyText'>광고성 수신 약관 동의</Txt>
            <Switch
              value={advertisingConsent}
              onValueChange={(v) => {
                setAdvertisingConsent(v);
                updatePreferences({ marketingEnabled: v });
              }}
              trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
              thumbColor={advertisingConsent ? '#FFC311' : '#FFFFFF'}
            />
          </View>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[17px]`}>
            약관보기
          </Txt>
        </View>
        <View style={tw`h-[1px] bg-light-gray-3 mb-[17px]`} />

        {/* 위치 서비스 약관 동의 */}
        <View style={tw`mb-[8px]`}>
          <View style={tw`flex-row items-center justify-between mb-[-7px]`}>
            <Txt variant='bodyText'>위치 서비스 약관 동의</Txt>
            <Switch
              value={locationService}
              onValueChange={(v) => {
                setLocationService(v);
                // mapped to chatEnabled
                updatePreferences({ chatEnabled: v });
              }}
              trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
              thumbColor={locationService ? '#FFC311' : '#FFFFFF'}
            />
          </View>
          <Txt variant='bodySubText' color='dark_gray1'>
            약관보기
          </Txt>
        </View>
      </ScrollView>
    </Container>
  );
}
