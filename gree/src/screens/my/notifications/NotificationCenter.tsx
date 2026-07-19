import tw from '@/src/lib/tailwind';
import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import { alarmController } from '@/src/apis/controller/alarm';
import { useNotificationStore } from '@/src/stores/notificationStore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type NavProp = StackNavigationProp<RootStackParamList>;

export default function NotificationCenter() {
  const navigation = useNavigation<NavProp>();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotifications = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await alarmController.getNotifications(p, 20);
      const data = res?.data ?? res ?? [];
      if (p === 1) setNotifications(data);
      else setNotifications((prev) => [...prev, ...data]);
      const pagination = res?.pagination || null;
      if (pagination) setHasMore(pagination.page * pagination.limit < pagination.total);
      else setHasMore(data.length === 20);
      // update global unread count via store
      const unread = (data ?? []).filter((n: any) => !n.read).length;
      useNotificationStore.getState().setUnreadCount(unread);
    } catch (err) {
      console.error('getNotifications 실패', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(1);
  }, [fetchNotifications]);

  const handleLoadMore = () => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    fetchNotifications(next);
  };

  const handleMarkRead = async (id: number) => {
    try {
      await alarmController.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      // decrement global unread count if necessary
      const target = notifications.find((x) => x.id === id);
      if (target && !target.read) {
        useNotificationStore.getState().decrement(1);
      }
    } catch (err) {
      console.error('markAsRead 실패', err);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert('알림', '정말 삭제하시겠습니까?', [
      { text: '취소' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await alarmController.deleteNotification(id);
            const target = notifications.find((x) => x.id === id);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
            if (target && !target.read) useNotificationStore.getState().decrement(1);
          } catch (err) {
            console.error('deleteNotification 실패', err);
          }
        },
      },
    ]);
  };

  const handleMarkAllRead = async () => {
    try {
      await alarmController.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('markAllAsRead 실패', err);
    }
  };

  const handleDeleteAll = async () => {
    Alert.alert('알림', '모든 알림을 삭제하시겠습니까?', [
      { text: '취소' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await alarmController.deleteAllNotifications();
            setNotifications([]);
            setUnreadCount(0);
          } catch (err) {
            console.error('deleteAllNotifications 실패', err);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={tw`p-[12px] border-b border-light-gray-2 bg-white`}
      onPress={() => navigation.navigate('NotificationDetail', { id: Number(item.id) })}
    >
      <View style={tw`flex-row justify-between items-center`}> 
        <View style={tw`flex-1`}> 
          <Txt variant='bodyTextBold'>{item.title || '알림'}</Txt>
          <Txt variant='auxiliaryTextLight' color='dark_gray2'>{item.message || ''}</Txt>
        </View>
        <View style={tw`ml-[8px]`}> 
          <TouchableOpacity onPress={() => handleMarkRead(item.id)}>
            <Txt variant='auxiliaryTextLight' color={item.read ? 'dark_gray2' : 'black'}>{item.read ? '읽음' : '읽기'}</Txt>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={tw`mt-[6px]`}>
            <Txt variant='auxiliaryTextLight' color='dark_gray2'>삭제</Txt>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && notifications.length === 0) {
    return (
      <Container className='w-full'>
        <Header title='알림' />
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size='large' color='#FFC311' />
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title='알림' />
      <View style={tw`p-[12px] flex-row justify-end gap-[8px] bg-light-gray-1`}> 
        <TouchableOpacity onPress={handleMarkAllRead} style={tw`mr-[8px]`}>
          <Txt>모두읽음</Txt>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteAll}>
          <Txt>모두삭제</Txt>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        contentContainerStyle={tw`pb-[80px]`}
      />
    </Container>
  );
}
