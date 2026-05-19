import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';
import { noticeController } from '@/src/apis/controller/notice';
import { NoticeResponseDto } from '@/src/apis/api';
import { formatRelativeTime } from '@/src/utils/formatTime';

type Props = StackScreenProps<RootStackParamList, 'AnnouncementDetail'>;

// 임시 공지 사항 데이터 (Announcement.tsx와 동일 유지)
const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    title: '개인정보 열람 및 수정에 대한 안내',
    date: '2025.00.00',
    content: `
안녕하세요 그리앱 입니다.

그리앱은 ‘이용자 프라이버스 보호 최우선 원칙’에 대한 정확한 사실을 전달하고 이용자 여러분이 보다 안전하고 신뢰할 수 있는 환경에서 그리앱을 이용할 수 있도록 아래와 같이 알려드립니다.
      
1. 그리앱 운영정책 위반에 대한 검토는 이용자 ‘신고’를 기반으로만 진행되며, 대화 내용은 기술적, 정책적으로 열람이 불가능합니다.
      
  그리앱은 이용자의 ‘신고에 기반하여 제한적으로 운영정책 위반를 확인합니다.
      
2. 그리앱 운영정책 위반에 대한 검토는 이용자 ‘신고’를 기반으로만 진행되며, 대화 내용은 기술적, 정책적으로 열람이 불가능합니다.
      
  그리앱은 이용자의 ‘신고에 기반하여 제한적으로 운영정책 위반를 확인합니다.
    `,
  },
  {
    id: 2,
    title: '재정관련 안내',
    date: '2025.00.00',
    content: '재정관련 공지사항 내용',
  },
  {
    id: 3,
    title: '사용관련 안내',
    date: '2025.00.05',
    content: '사용관련 공지사항 내용',
  },
];

export default function AnnouncementDetail({ navigation, route }: Props) {
  const { id } = route.params;
  const announcement = ANNOUNCEMENTS.find((item) => item.id === id);

  if (!announcement) {
    return (
      <Container className='w-full'>
        <Header title='공지 사항' leftIcon={<BackArrowIcon />} className='pb-[12px]' />
        <View style={tw`flex-1 justify-center items-center`}>
          <Txt>공지사항을 찾을 수 없습니다</Txt>
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title={announcement.title} leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-white`}
      >
        <View style={tw`px-[32px] py-[24px]`}>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[24px]`}>
            {announcement.date}
          </Txt>

          <Txt variant='bodyText' style={tw`whitespace-pre-wrap leading-7`}>
            {announcement.content}
          </Txt>
        </View>
      </ScrollView>
    </Container>
  );
}
