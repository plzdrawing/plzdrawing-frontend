import React from 'react';
import tw from '@/src/lib/tailwind';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';
import { TouchableOpacity, View } from 'react-native';

interface PaymentsItemProps {
  id: string;
  amount: number;
  painterProfile: string;
  painterName: string;
  date: string;
  onPress?: () => void;
}

export default function PaymentsItem({ 
  id, 
  amount, 
  painterProfile, 
  painterName, 
  date, 
  onPress 
}: PaymentsItemProps) {
  // 날짜 포맷 적용
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row w-full py-[8px]`}>
      <View style={[tw`w-[52px] h-[52px] rounded-[5px] overflow-hidden mr-[17px]`, { backgroundColor: colors.colors.light_gray1, borderWidth: 1, borderColor: colors.colors.light_gray2 }]}>
        {/* <img src={painterProfile} alt='' /> */}
      </View>
      <View style={tw`flex-1 justify-center gap-[7px]`}>
        <Txt variant='auxiliaryTextBold'>
          - {amount.toLocaleString()} 원
        </Txt>
        <Txt variant='auxiliaryTextLight'>
          {painterName} 님 | {formatDate(date)}
        </Txt>
      </View>
    </TouchableOpacity>
  )
}
