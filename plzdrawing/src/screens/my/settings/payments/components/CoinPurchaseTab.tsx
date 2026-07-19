import tw from '@/src/lib/tailwind';
import { View, FlatList, TouchableOpacity } from 'react-native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';
import { GreeProfile } from '@/assets/images';
import { useUserStore } from '@/src/stores/userStore';

const COIN_PACKAGES = [
  { id: '1',  count: 1,   price: 120 },
  { id: '2',  count: 10,  price: 1200 },
  { id: '3',  count: 20,  price: 2400 },
  { id: '4',  count: 30,  price: 3600 },
  { id: '5',  count: 50,  price: 6000 },
  { id: '6',  count: 70,  price: 8400 },
  { id: '7',  count: 100, price: 12000 },
];

// 현재 미구현 — 코인 잔액은 API 연동 전까지 20 고정
const MY_COIN = 20;

export default function CoinPurchaseTab() {
  const user = useUserStore((s) => s.user);
  const nickname = user?.nickname ?? '사용자';

  return (
    <View style={tw`flex-1`}>
      {/* 보유 코인 현황 */}
      <View
        style={[
          tw`flex-row items-center gap-[12px] mx-[32px] mt-[20px] mb-[24px] p-[14px] rounded-[8px]`,
          { backgroundColor: colors.colors.white, borderWidth: 1, borderColor: colors.colors.light_gray2 },
        ]}
      >
        <View style={tw`w-[48px] h-[48px] rounded-[8px] bg-light-gray-1 items-center justify-center`}>
          <GreeProfile width={36} height={36} />
        </View>
        <View>
          <Txt variant='secondaryText' color='dark_gray2'>{nickname} 님의 보유코인</Txt>
          <Txt variant='mainTitleBold' color='black'>{MY_COIN.toLocaleString()}개</Txt>
        </View>
      </View>

      {/* 코인 패키지 목록 */}
      <FlatList
        data={COIN_PACKAGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 100 }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.colors.light_gray2 }} />
        )}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center justify-between py-[16px]`}>
            {/* 코인 아이콘 + 이름 */}
            <View style={tw`flex-row items-center gap-[10px]`}>
              <View
                style={[
                  tw`w-[28px] h-[28px] rounded-full items-center justify-center`,
                  { borderWidth: 1.5, borderColor: colors.colors.highlight_orange },
                ]}
              >
                <Txt variant='auxiliaryTextBold' color='highlight_orange'>A</Txt>
              </View>
              <Txt variant='bodySubText' color='black'>그리 코인 {item.count}개</Txt>
            </View>

            {/* 가격 버튼 (onPress 미구현) */}
            <TouchableOpacity
              onPress={() => {/* TODO: 결제 기능 구현 */}}
              style={[
                tw`px-[14px] py-[6px] rounded-[6px]`,
                { borderWidth: 1, borderColor: colors.colors.main_yellow, backgroundColor: 'rgba(255, 195, 17, 0.12)' },
              ]}
            >
              <Txt variant='bodySubText' color='highlight_orange'>
                {item.price.toLocaleString()}원
              </Txt>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 하단 환전하기 버튼 */}
      <View
        style={[
          tw`w-full px-[120px] pb-[32px] pt-[12px]`,
          { backgroundColor: colors.colors.white },
        ]}
      >
        <TouchableOpacity
          onPress={() => {/* TODO: 환전 기능 구현 */}}
          style={[
            tw`px-[15px] py-[5px] rounded-[8px] items-center`,
            { borderWidth: 1, borderColor: colors.colors.main_yellow },
          ]}
        >
          <Txt variant='bodySubText' color='highlight_orange'>보유코인 환전하기</Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
}
