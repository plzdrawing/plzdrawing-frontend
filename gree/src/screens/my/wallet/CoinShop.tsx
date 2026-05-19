import tw from '@/src/lib/tailwind';
import { useEffect, useMemo, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';
import { walletController } from '@/src/apis/controller/wallet';
import { CoinProductResponseDto } from '@/src/apis/api';

type Props = StackScreenProps<RootStackParamList, 'CoinShop'>;

type CoinOption = {
  coinAmount: number;
  name: string;
  price: number;
  description?: string | null;
  productId?: number;
  isActive?: boolean;
};

const DEFAULT_OPTIONS: CoinOption[] = [
  { coinAmount: 1, name: '그리코인 1개', price: 120 },
  { coinAmount: 10, name: '그리코인 10개', price: 1200 },
  { coinAmount: 20, name: '그리코인 20개', price: 2400 },
  { coinAmount: 30, name: '그리코인 30개', price: 3600 },
  { coinAmount: 50, name: '그리코인 50개', price: 6000 },
  { coinAmount: 70, name: '그리코인 70개', price: 8400 },
  { coinAmount: 100, name: '그리코인 100개', price: 12000 },
];

export default function CoinShop({ navigation }: Props) {
  const [walletBalance, setWalletBalance] = useState(0);
  const [products, setProducts] = useState<CoinOption[]>(DEFAULT_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'purchase' | 'free' | 'orders' | 'transactions'>('purchase');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [wallet, coinProducts] = await Promise.all([
          walletController.getMyWallet().catch(() => null),
          walletController.getCoinProducts().catch(() => [] as CoinProductResponseDto[]),
        ]);

        if (wallet) {
          setWalletBalance(wallet.balance ?? 0);
        }

        const merged = DEFAULT_OPTIONS.map((option) => {
          const match = coinProducts.find((product) => product.coinAmount === option.coinAmount);
          return {
            ...option,
            productId: match?.id,
            name: match?.name ?? option.name,
            price: match?.price ?? option.price,
            description: match?.description ?? option.description,
            isActive: match?.isActive ?? true,
          };
        });

        setProducts(merged);
      } catch (error) {
        console.error('CoinShop load failed:', error);
        setProducts(DEFAULT_OPTIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabItems = useMemo(
    () => [
      { key: 'purchase', label: '코인구매' },
      { key: 'free', label: '무료코인' },
      { key: 'orders', label: '구매내역' },
      { key: 'transactions', label: '거래내역' },
    ] as const,
    []
  );

  const handleSelectProduct = (product: CoinOption) => {
    navigation.navigate('CoinPurchase', {
      productId: product.productId,
      coinAmount: product.coinAmount,
      price: product.price,
      name: product.name,
      description: product.description,
    });
  };

  return (
    <Container className='w-full bg-light-gray-1'>
      <Header title='코인상점' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`px-[20px] pb-[40px]`}>
        <View style={tw`mt-[18px] flex-row rounded-[18px] bg-white p-[4px] border border-light-gray-3`}>
          {tabItems.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={tw`${active ? 'bg-sub-yellow' : 'bg-transparent'} flex-1 rounded-[14px] py-[12px]`}
              >
                <Txt variant={active ? 'bodyTextBold' : 'bodySubText'} align='center'>
                  {tab.label}
                </Txt>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === 'purchase' && (
          <View style={tw`mt-[20px]`}>
            <View style={tw`mb-[18px] rounded-[20px] bg-white px-[20px] py-[18px] border border-light-gray-3`}>
              <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[8px]`}>
                보유 코인
              </Txt>
              <Txt variant='mainTitleBold'>
                {walletBalance.toLocaleString()}개
              </Txt>
            </View>

            <Txt variant='mainTitleBold' style={tw`mb-[10px]`}>
              코인구매
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[18px]`}>
              원하는 그리코인을 선택해 결제를 진행하세요.
            </Txt>

            {loading ? (
              <View style={tw`py-[40px] items-center`}>
                <ActivityIndicator size='large' color='#FFC311' />
              </View>
            ) : (
              products.map((product, index) => (
                <TouchableOpacity
                  key={`${product.coinAmount}-${index}`}
                  onPress={() => handleSelectProduct(product)}
                  style={tw`mb-[12px] rounded-[18px] bg-white px-[18px] py-[18px] border border-light-gray-3 flex-row items-center justify-between`}
                >
                  <View style={tw`flex-1 pr-[12px]`}>
                    <Txt variant='bodyTextBold' style={tw`mb-[6px]`}>
                      {product.name}
                    </Txt>
                    <Txt variant='bodySubText' color='dark_gray1'>
                      {product.coinAmount.toLocaleString()}개 · {product.price.toLocaleString()}원
                    </Txt>
                  </View>

                  <View style={tw`items-end`}>
                    <View style={tw`rounded-full bg-sub-yellow px-[14px] py-[8px]`}>
                      <Txt variant='bodySubText' color='black'>
                        구매
                      </Txt>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {activeTab === 'free' && (
          <View style={tw`mt-[28px] rounded-[18px] bg-white px-[18px] py-[24px] border border-light-gray-3`}>
            <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
              무료코인
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1'>
              출석, 이벤트, 미션 코인 영역은 다음 단계에서 연결됩니다.
            </Txt>
          </View>
        )}

        {activeTab === 'orders' && (
          <View style={tw`mt-[28px] rounded-[18px] bg-white px-[18px] py-[24px] border border-light-gray-3`}>
            <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
              구매내역
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1'>
              코인 구매내역 화면은 다음 단계에서 연동됩니다.
            </Txt>
          </View>
        )}

        {activeTab === 'transactions' && (
          <View style={tw`mt-[28px] rounded-[18px] bg-white px-[18px] py-[24px] border border-light-gray-3`}>
            <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
              거래내역
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1'>
              지갑 거래내역 화면은 다음 단계에서 연동됩니다.
            </Txt>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}