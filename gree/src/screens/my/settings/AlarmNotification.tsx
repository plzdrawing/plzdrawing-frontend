import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, Switch } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import { alarmController } from '@/src/apis/controller/alarm';
import { UpdateNotificationPreferenceDto } from '@/src/apis/api';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'AlarmNotification'>;

export default function AlarmNotification({ navigation }: Props) {
  const [chat, setChat] = useState(true);
  const [payment, setPayment] = useState(false);
  const [marketing, setMarketing] = useState(true);
  
  const [initialPreferences, setInitialPreferences] = useState({
    chat: true,
    payment: false,
    marketing: true,
  });

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefs = await alarmController.getNotificationPreferences();
        setChat(Boolean(prefs.chatEnabled));
        setPayment(Boolean(prefs.paymentEnabled));
        setMarketing(Boolean(prefs.marketingEnabled));
        setInitialPreferences({
          chat: Boolean(prefs.chatEnabled),
          payment: Boolean(prefs.paymentEnabled),
          marketing: Boolean(prefs.marketingEnabled),
        });
      } catch (err) {
        console.error('Failed to load notification preferences', err);
      }
    };

    loadPreferences();
  }, []);

  // 뒤로가기 시 변경사항 저장
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      const hasChanges =
        chat !== initialPreferences.chat ||
        payment !== initialPreferences.payment ||
        marketing !== initialPreferences.marketing;

      if (hasChanges) {
        const updateData: UpdateNotificationPreferenceDto = {};
        if (chat !== initialPreferences.chat) updateData.chatEnabled = chat;
        if (payment !== initialPreferences.payment) updateData.paymentEnabled = payment;
        if (marketing !== initialPreferences.marketing) updateData.marketingEnabled = marketing;

        try {
          await alarmController.updateNotificationPreferences(updateData);
        } catch (err) {
          console.error('Failed to update notification preferences', err);
        }
      }
    });

    return unsubscribe;
  }, [navigation, chat, payment, marketing, initialPreferences]);

  return (
    <Container className='w-full'>
      <Header title='알림 설정' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`p-[32px] w-full flex-1 bg-light-gray-1`}
      >
        {/* Chat */}
        <View style={tw`flex-row items-center justify-between mb-[17px]`}>
          <Txt variant='bodyText'>Chat</Txt>
          <Switch
            value={chat}
            onValueChange={setChat}
            trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
            thumbColor={chat ? '#FFC311' : '#FFFFFF'}
          />
        </View>
        <View style={tw`h-[1px] bg-light-gray-3 mb-[17px]`} />

        {/* Payment */}
        <View style={tw`mb-[8px]`}>
          <View style={tw`flex-row items-center justify-between mb-[-7px]`}>
            <Txt variant='bodyText'>Payment</Txt>
            <Switch
              value={payment}
              onValueChange={setPayment}
              trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
              thumbColor={payment ? '#FFC311' : '#FFFFFF'}
            />
          </View>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[17px]`}>
            약관보기
          </Txt>
        </View>
        <View style={tw`h-[1px] bg-light-gray-3 mb-[17px]`} />

        {/* Marketing */}
        <View style={tw`mb-[8px]`}>
          <View style={tw`flex-row items-center justify-between mb-[-7px]`}>
            <Txt variant='bodyText'>Marketing</Txt>
            <Switch
              value={marketing}
              onValueChange={setMarketing}
              trackColor={{ false: '#E0DFDF', true: '#FFE18D' }}
              thumbColor={marketing ? '#FFC311' : '#FFFFFF'}
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
