import tw from '@/src/lib/tailwind';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'Announcement'>;

export interface AnnouncementItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

// 임시 공지 사항 데이터
const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    title: '개인정보 열람 및 수정에 대한 안내',
    date: '2025.00.00',
    content: `
안녕하세요 그리앱 입니다.

그리앱은 ‘이용자 프라이버스 보호 최우선 원칙’에 대한 정확한 사실을 전달하고 이용자 여러분이 보다 안전하고 신뢰할 수 있는 환경에서 그리앱을 이용할 수 있도록 아래와 같이 알려드립니다.

그리앱 운영정책 위반에 대한 검토는 이용자 ‘신고’를 기반으로만 진행되며, 대화 내용은 기술적, 정책적으로 열람이 불가능합니다.

그리앱은 이용자의 ‘신고에 기반하여 제한적으로 운영정책 위반를 확인합니다.

그리앱 운영정책 위반에 대한 검토는 이용자 ‘신고’를 기반으로만 진행되며, 대화 내용은 기술적, 정책적으로 열람이 불가능합니다.

그리앱은 이용자의 ‘신고에 기반하여 제한적으로 운영정책 위반를 확인합니다.

`,
  },
  {
    id: 2,
    title: '재정관련 안내',
    date: '2025.00.00',
    content: '재정관련 공지사항 내용입니다.',
  },
  {
    id: 3,
    title: '사용관련 안내',
    date: '2025.00.05',
    content: '사용관련 공지사항 내용입니다.',
  },
];

export default function Announcement({ navigation }: Props) {
  const handleSelectAnnouncement = (id: number) => {
    navigation.navigate('AnnouncementDetail', { id });
  };

  return (
    <Container className='w-full'>
      <Header title='공지 사항' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px]`}>
          {ANNOUNCEMENTS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSelectAnnouncement(item.id)}
            >
              <View style={tw`flex-row items-center justify-between py-[20px]`}>
                <View style={tw`flex-1`}>
                  <Txt variant='bodyText' style={tw`mb-[8px]`}>
                    {item.title}
                  </Txt>
                  <Txt variant='bodySubText' color='dark_gray1'>
                    {item.date}
                  </Txt>
                </View>
                <Txt color='dark_gray1' style={tw`ml-[12px]`}>
                  {'›'}
                </Txt>
              </View>
              {index < ANNOUNCEMENTS.length - 1 && (
                <View style={tw`h-[1px] bg-light-gray-3`} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
