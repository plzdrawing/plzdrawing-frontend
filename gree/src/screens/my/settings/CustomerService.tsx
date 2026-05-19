import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'CustomerService'>;

interface FAQ {
  id: number;
  question: string;
  category: string;
}

// 임시 FAQ 데이터 (API 연동 전)
const FAQ_DATA: FAQ[] = [
  {
    id: 1,
    question: '그림톡은 어떻게 사용하나요?',
    category: '그림톡',
  },
  {
    id: 2,
    question: '그림톡 발송이 되지 않아요.',
    category: '그림톡',
  },
  {
    id: 3,
    question: '그림톡은 어떻게 요청하나요?',
    category: '그림톡',
  },
  {
    id: 4,
    question: '소셜 로그인 연동을 해제하고 싶어요.',
    category: '계정',
  },
  {
    id: 5,
    question: '거래를 취소하고 싶어요.',
    category: '이용안내',
  },
  {
    id: 6,
    question: '환불 금액은 언제 입금되나요?',
    category: '결제/취소',
  },
];

const CATEGORIES = ['그림톡', '계정', '이용안내', '결제/취소'];

export default function CustomerService({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredFAQ, setFilteredFAQ] = useState<FAQ[]>(FAQ_DATA);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredFAQ(FAQ_DATA);
    } else {
      setSelectedCategory(category);
      const filtered = FAQ_DATA.filter((faq) => faq.category === category);
      setFilteredFAQ(filtered);
    }
  };

  const handleSelectFAQ = (id: number) => {
    navigation.navigate('FAQDetail', { id });
  };

  return (
    <Container className='w-full'>
      <Header title='고객 센터' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] pt-[24px] pb-[40px]`}>
          {/* 카테고리 버튼들 */}
          <View style={tw`flex-wrap flex-row gap-[10px] mb-[24px]`}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(category)}
                style={[
                  tw`px-[16px] py-[10px] rounded-full border border-dark_gray1`,
                  selectedCategory === category && tw`bg-yellow-400 border-yellow-400`,
                ]}
              >
                <Txt
                  variant='bodySubText'
                  color={selectedCategory === category ? 'black' : 'dark_gray1'}
                >
                  {category}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>

          {/* 결과 카운트 또는 제목 */}
          <Txt variant='subheading' style={tw`mb-[16px]`}>
            {selectedCategory
              ? `카테고리 선택결과 ${filteredFAQ.length}`
              : '자주 묻는 질문'}
          </Txt>

          {/* FAQ 리스트 */}
          {filteredFAQ.length === 0 ? (
            <View style={tw`items-center justify-center pt-[60px]`}>
              <Txt variant='bodyText' color='dark_gray1'>
                해당하는 질문이 없습니다
              </Txt>
            </View>
          ) : (
            filteredFAQ.map((faq, index) => (
              <View key={faq.id}>
                <TouchableOpacity
                  onPress={() => handleSelectFAQ(faq.id)}
                  style={tw`flex-row items-center justify-between py-[16px]`}
                >
                  <View style={tw`flex-1`}>
                    <Txt variant='bodyText' color='primary' style={tw`mr-[12px]`}>
                      {faq.question}
                    </Txt>
                  </View>
                  <Txt color='dark_gray1'>{'›'}</Txt>
                </TouchableOpacity>
                {index < filteredFAQ.length - 1 && (
                  <View style={tw`h-[1px] bg-light-gray-3`} />
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Container>
  );
}
