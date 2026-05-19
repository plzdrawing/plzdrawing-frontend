import tw from '@/src/lib/tailwind';
import { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import { alarmController } from '@/src/apis/controller/alarm';
import { useNotificationStore } from '@/src/stores/notificationStore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

type RouteProps = RouteProp<RootStackParamList, 'NotificationDetail'>;

export default function NotificationDetail() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await alarmController.getNotification(id);
        setDetail(res);
        // mark as read if not already and update global count
        if (res && !res.read) {
          try {
            await alarmController.markAsRead(id);
            useNotificationStore.getState().decrement(1);
          } catch (e) {
            // ignore
          }
        }
      } catch (err) {
        console.error('getNotification 실패', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <Container className='w-full'>
        <Header title='알림 상세' />
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size='large' color='#FFC311' />
        </View>
      </Container>
    );
  }

  if (!detail) {
    return (
      <Container className='w-full'>
        <Header title='알림 상세' />
        <View style={tw`flex-1 justify-center items-center`}>
          <Txt>알림을 불러올 수 없습니다.</Txt>
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title='알림 상세' />
      <ScrollView style={tw`p-[16px]`}>
        <Txt variant='bodyTextBold'>{detail.title}</Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`mt-[8px]`}>{detail.createdAt}</Txt>
        <Txt style={tw`mt-[16px]`}>{detail.message}</Txt>
      </ScrollView>
    </Container>
  );
}
