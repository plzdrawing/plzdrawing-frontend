import tw from '@/src/lib/tailwind';
import { useEffect, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import Button from '@/src/components/common/button/Button';

import { BackArrowIcon } from '@/assets/images';
import { walletController } from '@/src/apis/controller/wallet';

type Props = StackScreenProps<RootStackParamList, 'CoinPurchase'>;
type PaymentMode = 'SIMPLE' | 'CARD';
type SimplePaymentProvider = 'TOSS_PAY' | 'NAVER_PAY' | 'PAYCO' | 'KAKAO_PAY';

const PAYMENT_MODE_OPTIONS: Array<{
  value: PaymentMode;
  label: string;
  description: string;
}> = [
  {
    value: 'SIMPLE',
    label: '간편결제',
    description: '토스, 네이버페이, 페이코, 카카오페이 중에서 선택합니다.',
  },
  {
    value: 'CARD',
    label: '카드결제',
    description: '신용카드 또는 체크카드로 결제합니다.',
  },
];

const SIMPLE_PAYMENT_OPTIONS: Array<{
  value: SimplePaymentProvider;
  label: string;
}> = [
  { value: 'TOSS_PAY', label: '토스' },
  { value: 'NAVER_PAY', label: '네이버페이' },
  { value: 'PAYCO', label: '페이코' },
  { value: 'KAKAO_PAY', label: '카카오페이' },
];

export default function CoinPurchase({ navigation, route }: Props) {
  const { productId, coinAmount, price, name, description } = route.params;
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [orderCode, setOrderCode] = useState('');
  const [orderStatusMessage, setOrderStatusMessage] = useState('');
  const [orderError, setOrderError] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode | null>(null);
  const [selectedSimpleProvider, setSelectedSimpleProvider] = useState<SimplePaymentProvider>('TOSS_PAY');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const wallet = await walletController.getMyWallet();
        setWalletBalance(wallet.balance ?? 0);
      } catch (error) {
        console.error('Failed to fetch wallet balance:', error);
        setWalletBalance(0);
      }
    };

    fetchWallet();
  }, []);

  const handlePurchase = async () => {
    setOrderError('');
    setOrderStatusMessage('');

    if (!productId) {
      setOrderError('상품 정보를 불러오지 못했습니다.');
      return;
    }

    if (!paymentMode) {
      setOrderError('결제수단을 선택해주세요.');
      return;
    }

    if (!isAgreementChecked) {
      setOrderError('동의 항목을 체크해주세요.');
      return;
    }

    setLoading(true);
    try {
      const order = await walletController.createCoinOrder({
        coinProductId: productId,
        paymentMethod:
          paymentMode === 'CARD'
            ? 'CREDIT_CARD'
            : selectedSimpleProvider === 'NAVER_PAY'
              ? 'NAVER_PAY'
              : selectedSimpleProvider === 'KAKAO_PAY'
                ? 'KAKAO_PAY'
                : 'TOSS_PAY',
      });
      setOrderCode(order.orderCode);

      if (paymentMode === 'SIMPLE' && selectedSimpleProvider === 'TOSS_PAY') {
          if (!order.paymentKey) {
            setOrderStatusMessage('주문이 생성되었습니다. 결제 승인에 필요한 paymentKey가 아직 없어 승인 연동은 보류되었습니다.');
          } else {
            try {
              const approvedOrder = await walletController.confirmCoinOrder(order.id, {
                paymentKey: order.paymentKey,
                amount: order.amount,
              });

              setOrderStatusMessage(`결제 승인 완료: ${approvedOrder.status}`);
            } catch (approvalError) {
              console.error('confirmCoinOrder failed:', approvalError);
              setOrderStatusMessage('주문은 생성되었지만 결제 승인에 실패했습니다.');
            }
          }
      } else if (paymentMode === 'SIMPLE') {
        setOrderStatusMessage('주문이 생성되었습니다. 선택한 간편결제수단의 실제 결제 승인 연동은 다음 단계에서 이어집니다.');
      } else {
        setOrderStatusMessage('카드 결제 주문이 생성되었습니다. 결제 승인 연동은 다음 단계에서 이어집니다.');
      }
    } catch (error) {
      console.error('createCoinOrder failed:', error);
      setOrderError('주문 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className='w-full bg-light-gray-1'>
      <Header title='그리코인 구매' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <View style={tw`flex-1 px-[20px] pt-[16px] pb-[28px]`}>
        <View style={tw`rounded-[20px] bg-white px-[20px] py-[18px] border border-light-gray-3`}>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[8px]`}>
            현재 보유 코인
          </Txt>
          <Txt variant='mainTitleBold'>
            {walletBalance === null ? '불러오는 중...' : `${walletBalance.toLocaleString()}개`}
          </Txt>
        </View>

        <View style={tw`mt-[18px] rounded-[20px] bg-white px-[20px] py-[22px] border border-light-gray-3`}>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[8px]`}>
            선택한 코인
          </Txt>
          <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
            {name}
          </Txt>
          <View style={tw`rounded-[14px] bg-light-gray-1 px-[16px] py-[14px]`}>
            <Txt variant='bodyTextBold' style={tw`mb-[4px]`}>
              {coinAmount.toLocaleString()}개
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1'>
              결제 금액 {price.toLocaleString()}원
            </Txt>
          </View>
          {description ? (
            <Txt variant='bodySubText' color='dark_gray1' style={tw`mt-[12px]`}>
              {description}
            </Txt>
          ) : null}
        </View>

        <View style={tw`mt-[18px] rounded-[20px] bg-white px-[20px] py-[22px] border border-light-gray-3`}>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[10px]`}>
            결제 수단
          </Txt>

          {PAYMENT_MODE_OPTIONS.map((option, index) => {
            const selected = paymentMode === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => setPaymentMode(option.value)}
                style={tw`${selected ? 'border-sub-yellow bg-sub-yellow/10' : 'border-light-gray-3 bg-light-gray-1'} ${index === 0 ? 'mb-[10px]' : ''} flex-row items-center justify-between rounded-[16px] border px-[16px] py-[14px]`}
              >
                <View style={tw`flex-1 pr-[12px]`}>
                  <Txt variant='bodyTextBold' style={tw`mb-[4px]`}>
                    {option.label}
                  </Txt>
                  <Txt variant='bodySubText' color='dark_gray1'>
                    {option.description}
                  </Txt>
                </View>

                <View
                  style={tw`${selected ? 'bg-sub-yellow border-sub-yellow' : 'bg-white border-light-gray-3'} h-[24px] w-[24px] items-center justify-center rounded-full border`}
                >
                  {selected ? <View style={tw`h-[10px] w-[10px] rounded-full bg-black`} /> : null}
                </View>
              </TouchableOpacity>
            );
          })}

          {paymentMode === 'SIMPLE' ? (
            <View style={tw`mt-[14px]`}>
              <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[10px]`}>
                간편결제 선택
              </Txt>
              <View style={tw`flex-row flex-wrap`}>
                {SIMPLE_PAYMENT_OPTIONS.map((option) => {
                  const selected = selectedSimpleProvider === option.value;

                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => setSelectedSimpleProvider(option.value)}
                      style={tw`${selected ? 'bg-sub-yellow border-sub-yellow' : 'bg-light-gray-1 border-light-gray-3'} mr-[8px] mb-[8px] rounded-full border px-[14px] py-[10px]`}
                    >
                      <Txt variant={selected ? 'bodyTextBold' : 'bodySubText'}>{option.label}</Txt>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>

        <View style={tw`mt-[18px] rounded-[20px] bg-white px-[20px] py-[22px] border border-light-gray-3`}>
          <TouchableOpacity
            onPress={() => setIsAgreementChecked((value) => !value)}
            style={tw`flex-row items-start`}
            activeOpacity={0.8}
          >
            <View
              style={tw`${isAgreementChecked ? 'bg-sub-yellow border-sub-yellow' : 'bg-white border-light-gray-3'} mt-[2px] h-[22px] w-[22px] items-center justify-center rounded-[6px] border`}
            >
              {isAgreementChecked ? <Txt variant='bodySubText' color='black'>✓</Txt> : null}
            </View>

            <View style={tw`ml-[12px] flex-1`}>
              <Txt variant='bodyTextBold' style={tw`mb-[4px]`}>
                주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
              </Txt>
              <Txt variant='bodySubText' color='dark_gray1'>
                결제 진행을 위해 필수 동의가 필요합니다.
              </Txt>
            </View>
          </TouchableOpacity>
        </View>

        {orderCode ? (
          <View style={tw`mt-[18px] rounded-[20px] bg-white px-[20px] py-[22px] border border-sub-yellow`}>
            <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
              주문이 생성되었습니다
            </Txt>
            <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[8px]`}>
              주문번호
            </Txt>
            <Txt variant='bodyTextBold' style={tw`mb-[8px]`}>
              {orderCode}
            </Txt>
            {orderStatusMessage ? (
              <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[8px]`}>
                {orderStatusMessage}
              </Txt>
            ) : null}
            <Txt variant='bodySubText' color='dark_gray1'>
              실제 결제 화면 연결은 다음 단계에서 이어집니다.
            </Txt>
          </View>
        ) : null}

        {orderError ? (
          <Txt variant='bodyText' color='error_red' style={tw`mt-[14px]`}>
            {orderError}
          </Txt>
        ) : null}

        <View style={tw`flex-1`} />

        <Button
          onClick={handlePurchase}
          isValid={!loading && !!productId && !!paymentMode && isAgreementChecked}
          title={loading ? '처리 중...' : '충전하기'}
          className='mt-[18px]'
        />

        {orderCode ? (
          <TouchableOpacity onPress={() => navigation.navigate('CoinShop')} style={tw`mt-[12px] py-[10px]`}>
            <Txt variant='bodySubText' color='dark_gray1' align='center'>
              상점으로 돌아가기
            </Txt>
          </TouchableOpacity>
        ) : null}
      </View>
    </Container>
  );
}