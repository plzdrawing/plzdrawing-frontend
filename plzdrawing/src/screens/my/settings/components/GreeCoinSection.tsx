import tw from '@/src/lib/tailwind';

import { View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/ui/Txt';

interface GreeCoinSectionProps {
  amount?: number;
  onCharge?: () => void;
}

export default function GreeCoinSection({
  amount = 0,
  onCharge,
}: GreeCoinSectionProps) {
  return (
    <View style={[tw`w-full flex-row items-center justify-between p-[15px] border border-highlight-orange rounded-[5px]`, { backgroundColor: 'rgba(255, 225, 141, 0.35)' }]}>
      {/* 그리코인 정보 */}
      <View style={tw`flex-row items-center gap-[8px]`}>
        <View style={tw`flex-row items-center gap-[7px]`}>
          <Txt variant='bodySubText' color='black'>내 그리코인</Txt>
          <Txt variant='bodyTextBold' color='highlight_orange'>
            {amount.toLocaleString()}개
          </Txt>
        </View>
      </View>

      {/* 충전하기 버튼 */}
      <TouchableOpacity onPress={onCharge}>
        <Txt variant='bodySubText' color='highlight_orange'>충전하기</Txt>
      </TouchableOpacity>
    </View>
  );
}
