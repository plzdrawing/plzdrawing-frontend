import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'FAQDetail'>;

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// 임시 FAQ 데이터 (API 연동 전)
const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: '그림톡은 어떻게 사용하나요?',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '그림톡',
  },
  {
    id: 2,
    question: '그림톡 발송이 되지 않아요.',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '그림톡',
  },
  {
    id: 3,
    question: '그림톡은 어떻게 요청하나요?',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '그림톡',
  },
  {
    id: 4,
    question: '소셜 로그인 연동을 해제하고 싶어요.',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '계정',
  },
  {
    id: 5,
    question: '거래를 취소하고 싶어요.',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '이용안내',
  },
  {
    id: 6,
    question: '환불 금액은 언제 입금되나요?',
    answer: 'FAQ 답변을 입력해주세요.',
    category: '결제/취소',
  },
  {
    id: 7,
    question: '결제가 되지 않아요. 어떻게 하나요?',
    answer: `아래의 경로로 결제진행을 도와드리고 있어요.
사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다. 사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다. 사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다.

사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다.`,
    category: '결제/취소',
  },
];

export default function FAQDetail({ navigation, route }: Props) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);

  const faq = FAQ_DATA.find((item) => item.id === id);

  if (!faq) {
    return (
      <Container className='w-full'>
        <Header title='자주 묻는 질문' leftIcon={<BackArrowIcon />} className='pb-[12px]' />
        <View style={tw`flex-1 justify-center items-center`}>
          <Txt>FAQ를 찾을 수 없습니다</Txt>
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title='자주 묻는 질문' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-white`}
      >
        <View style={tw`px-[32px] py-[24px]`}>
          {/* 질문 */}
          <Txt variant='subheading' style={tw`mb-[24px]`}>
            {faq.question}
          </Txt>

          {/* 답변 */}
          <Txt variant='bodyText' style={tw`whitespace-pre-wrap leading-7 text-dark-gray-1`}>
            {faq.answer}
          </Txt>
        </View>
      </ScrollView>
    </Container>
  );
}
