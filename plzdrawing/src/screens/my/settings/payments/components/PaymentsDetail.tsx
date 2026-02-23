import React, { useState } from 'react';
import { SectionList, View } from 'react-native';
import tw from '@/src/lib/tailwind';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';
import DefaultButton from '@/src/components/ui/button/DefaultButton';
import PrimaryButton from '@/src/components/ui/button/PrimaryButton';
import PaymentsItem from './PaymentsItem';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

interface PaymentsDetailProps {
  amount: number;
  painterProfile: string;
  painterName: string;
  date: string;
  painterPayments: Array<{
    id: string;
    amount: number;
    painterProfile: string;
    painterName: string;
    date: string;
  }>;
}

export default function PaymentsDetail({ 
  amount, 
  painterProfile, 
  painterName, 
  date,
  painterPayments
}: PaymentsDetailProps) {
  // 날짜별로 그룹화
  const groupedPayments = painterPayments.reduce((groups: { [date: string]: typeof painterPayments }, payment) => {
    if (!groups[payment.date]) groups[payment.date] = [];
    groups[payment.date].push(payment);
    return groups;
  }, {});
  
  const sections = Object.entries(groupedPayments).map(([date, data]) => ({ 
    title: formatDate(date), 
    data 
  }));

  return (
    <View style={tw`flex-col w-full h-full`}>
      <View style={[tw`flex-col items-center justify-between`, { borderBottomWidth: 1, borderBottomColor: colors.colors.seperator }]}>
        <View style={tw`flex-row items-center w-full my-[12px] p-[30px_30px_0_30px]`}>
          <View style={[tw`w-[52px] h-[52px] rounded-[5px] overflow-hidden mr-[17px]`, { backgroundColor: colors.colors.light_gray1, borderWidth: 1, borderColor: colors.colors.light_gray2 }]}>
            <img src={painterProfile} alt='' />
          </View>
          <View style={tw`flex-1 justify-center gap-[7px]`}>
            <Txt variant='auxiliaryTextLight'>
              {painterName} 님
            </Txt>
            <Txt variant='mainTitleBold'>
              - {amount.toLocaleString()} 원
            </Txt>
          </View>
        </View>

        <View style={tw`flex-col gap-[22px] w-full my-[27px] p-[8px_30px]`}>
          <View style={tw`flex-row justify-between`}>
            <Txt variant='auxiliaryTextLight'>결제방법/수단</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>네이버 페이 &gt;</Txt>
          </View>
          <View style={tw`flex-row justify-between`}>
            <Txt variant='auxiliaryTextLight'>결제일시</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>{formatDate(date)} &gt;</Txt>
          </View>
        </View>

        <View style={tw`flex-row justify-center gap-[7px] w-full mb-[22px]`}>
          <DefaultButton title='프로필 확인하기' onPress={() => {}} />
          <DefaultButton title='톡방 확인하기' onPress={() => {}} />
        </View>
      </View>
      
      <View style={tw`flex-1 flex-col justify-start p-[27px_30px_0_30px]`}>
        <Txt variant='auxiliaryTextLight'>{painterName} 님과의 거래 내역</Txt>
        <View style={tw`flex-row justify-center gap-[107px] w-full my-[27px] mb-[8px]`}>
          <View style={tw`flex-col items-center gap-[20px]`}>
            <Txt variant='auxiliaryTextLight'>거래 횟수</Txt>
            <Txt variant='auxiliaryTextBold'>{painterPayments.length} 회</Txt>
          </View>
          <View style={tw`flex-col items-center gap-[20px]`}>
            <Txt variant='auxiliaryTextLight'>총 금액</Txt>
            <Txt variant='auxiliaryTextBold'>{painterPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}원</Txt>
          </View>
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <View style={tw`py-[19px_0_9px_0]`}>
              <Txt variant="auxiliaryTextLight">{title}</Txt>
            </View>
          )}
          renderItem={({ item }) => (
            <PaymentsItem {...item} />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </View>
    </View>
  )
}

