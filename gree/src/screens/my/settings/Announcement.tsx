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
    content: `안녕하세요 그린일 입니다.

그림 앱은 '미홍자 프라이버스 보증 차등수 원 초진'에 대해 안내합니다.',

1. 그림앱 요청정책 위반세에 대한 검토는 이용자가 '신고'를 기반으로만 진행되며, 대한 나름은 기술적, 정책적으로 열합이 되기를합니다.

그림앱은 이용자의 '신고'에 기반하여 제한적으로 운영 정책에 위반 위반을 했인합니다.

2. 그림앱 요청정책 위반세에 대한 검토는 이용자가 '신고'를 기반으로만 진행되며, 대한 나름은 기술적, 정책적으로 열합이 되기를합니다.`,
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
