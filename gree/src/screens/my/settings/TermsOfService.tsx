import tw from '@/src/lib/tailwind';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'TermsOfService'>;

const TERMS_SECTIONS = [
  {
    title: '제 1장 환영합니다!',
    items: [
      '제 1조 (목적 및 정의)',
      '제 2조 (약관의 효력 및 변경)',
      '제 3조 (약관 외 준칙)'
    ],
  },
  {
    title: '제 2장 통합서비스 이용계약',
    items: [
      '제 4조 (계약의 성립)',
      '제 5조 (통합서비스 가입의 제한)'
    ],
  },
  {
    title: '제 3장 통합서비스 이용',
    items: [
      '제 6조 (다양한 서비스의 제공)',
      '제 7조 (통합서비스의 변경 및 종료)',
      '제 8조 (게시물의 관리)',
      '제 9조 (권리의 귀속 및 저작물의 이용)',
      '제 10조 (유료 서비스의 이용)',
      '제 11조 (게시판 이용 상거래)',
      '제 12조 (통합서비스 이용방법 및 주의점)',
      '제 13조 (이용 계약 해지)',
      '제 14조 (개인정보의 보호)',
    ],
  },
  {
    title: '제 4장 기타',
    items: [
      '제 15조 (손해배상 등)',
      '제 16조 (청소년 보호)',
      '제 17조 (통지 및 공지)',
      '제 18조 (분쟁의 해결)'
    ],
  },
];

export default function TermsOfService({}: Props) {
  return (
    <Container className='w-full'>
      <Header title='이용약관' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] py-[28px]`}>
          <TouchableOpacity>
            <Txt variant='auxiliaryTextLight' color='dark_gray1' style={tw`mb-[14px] underline`}>
              PDF 다운로드
            </Txt>
          </TouchableOpacity>

          {TERMS_SECTIONS.map((section) => (
            <View key={section.title} style={tw`mb-[30px]`}>
              <Txt variant='mainTitleBold' style={tw`mb-[18px]`}>
                {section.title}
              </Txt>

              {section.items.map((item) => (
                <Txt
                  key={item}
                  variant='bodySubText'
                  color='dark_gray1'
                  style={tw`mb-[4px]`}
                >
                  {item}
                </Txt>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}