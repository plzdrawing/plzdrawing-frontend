import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';
import { noticeController } from '@/src/apis/controller/notice';
import { NoticeResponseDto } from '@/src/apis/api';
import { formatRelativeTime } from '@/src/utils/formatTime';

type Props = StackScreenProps<RootStackParamList, 'Announcement'>;

export default function Announcement({ navigation }: Props) {
  const [notices, setNotices] = useState<NoticeResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotices = async (p: number = 1) => {
    setLoading(p === 1);
    try {
      const res = await noticeController.getNotices(p, 10);
      const data = (res?.data ?? []) as NoticeResponseDto[];
      if (p === 1) setNotices(data);
      else setNotices((prev) => [...prev, ...data]);
      setHasMore(data.length === 10);
      setPage(p);
    } catch (err) {
      console.error('getNotices 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const handleSelectNotice = (id: number) => {
    navigation.navigate('AnnouncementDetail', { id });
  };

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    fetchNotices(page + 1);
  };

  if (loading && notices.length === 0) {
    return (
      <Container className='w-full'>
        <Header title='공지 사항' leftIcon={<BackArrowIcon />} className='pb-[12px]' />
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size='large' color='#FFC311' />
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title='공지 사항' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 500
          ) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={tw`px-[32px]`}>
          {notices.length === 0 ? (
            <View style={tw`items-center justify-center pt-[60px]`}>
              <Txt variant='bodyText' color='dark_gray1'>
                공지사항이 없습니다
              </Txt>
            </View>
          ) : (
            notices.map((notice, index) => (
              <TouchableOpacity
                key={notice.id}
                onPress={() => handleSelectNotice(notice.id)}
              >
                <View style={tw`flex-row items-center justify-between py-[20px]`}>
                  <View style={tw`flex-1`}>
                    <Txt variant='bodyText' style={tw`mb-[8px]`}>
                      {notice.title}
                    </Txt>
                    <Txt variant='bodySubText' color='dark_gray1'>
                      {formatRelativeTime(notice.createdAt)}
                    </Txt>
                  </View>
                  <Txt color='dark_gray1' style={tw`ml-[12px]`}>
                    {'›'}
                  </Txt>
                </View>
                {index < notices.length - 1 && (
                  <View style={tw`h-[1px] bg-light-gray-3`} />
                )}
              </TouchableOpacity>
            ))
          )}
          {loading && notices.length > 0 && (
            <View style={tw`py-[20px] items-center`}>
              <ActivityIndicator color='#FFC311' />
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}
