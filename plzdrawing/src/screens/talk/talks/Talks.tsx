import tw from '@/src/lib/tailwind';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { 
  NavigationProp, 
  useNavigation, 
  useIsFocused,
} from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { 
  ActivityIndicator,
  View,
  BackHandler,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/header/TabHeader';

import { 
  TalkList, 
  TalkData,
} from '@/src/screens/talk/talks/components/TalkList';
import { NoTalk } from '@/src/screens/talk/talks/components/NoTalk';

import { chatController } from '@/src/apis/controller/chat';
import { formatRelativeTime } from '@/src/utils/formatTime';

export default function Talks() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  
  // 그림톡 페이지에서 뒤로가기 시 그림홈으로 이동
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        (navigation as any).navigate('그림홈');
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused, navigation]);

  const { data: roomList, isLoading, refetch } = useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => chatController.getChatRooms({ page: 1, limit: 50 }),
    refetchInterval: 10_000,
    enabled: isFocused,
  });

  // 포커스 복귀 시 목록 갱신
  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused, refetch]);

  const talks: TalkData[] = useMemo(() => {
    if (!roomList?.data) return [];
    return roomList.data.map((room) => ({
      id: String(room.chatRoomId),
      userProfileImage: room.counterpart.profileImageUrl,
      userName: room.counterpart.nickname,
      unreadCount: room.unreadCount,
      lastMessage:
        room.lastMessage?.type === 'IMAGE'
          ? '📷 이미지'
          : room.lastMessage?.type === 'SYSTEM'
          ? '📋 시스템 메시지'
          : room.lastMessage?.content ?? '',
      lastMessageTime: room.lastMessage?.sentAt
        ? formatRelativeTime(room.lastMessage.sentAt)
        : formatRelativeTime(room.updatedAt),
    }));
  }, [roomList]);

  const handleTalkPress = (talkId: string) => {
    navigation.navigate('Chatting', { chatRoomId: Number(talkId) });
  };

  return (
    <Container>
      <TabHeader title1='그림톡' />
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator />
        </View>
      ) : talks.length > 0 ? (
        <TalkList talks={talks} onClickTalk={handleTalkPress} />
      ) : (
        <NoTalk />
      )}
    </Container>
  );
}
