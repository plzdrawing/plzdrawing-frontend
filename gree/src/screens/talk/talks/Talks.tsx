import tw from '@/src/lib/tailwind';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import {
  ActivityIndicator,
  View,
  BackHandler,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/TabHeader';
import { TalkList, TalkData } from '@/src/screens/talk/talks/components/TalkList';
import { NoTalk } from '@/src/screens/talk/talks/components/NoTalk';
import { chatController } from '@/src/apis/controller/chat';
import { formatRelativeTime } from '@/src/utils/formatTime';

export default function Talks() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const [showTestModal, setShowTestModal] = useState(false);
  const [testPostId, setTestPostId] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTestRoom = async () => {
    const postId = parseInt(testPostId, 10);
    if (!postId || isNaN(postId)) {
      Alert.alert('입력 오류', '유효한 게시글 ID를 입력하세요.');
      return;
    }
    setIsCreating(true);
    try {
      const result = await chatController.createChatRoom({
        postId,
        description: testDescription || undefined,
      });
      setShowTestModal(false);
      setTestPostId('');
      setTestDescription('');
      refetch();
      navigation.navigate('Chatting', { chatRoomId: result.chatRoom.chatRoomId });
    } catch (e: any) {
      Alert.alert('실패', e?.response?.data?.message ?? '채팅방 생성에 실패했습니다.');
    } finally {
      setIsCreating(false);
    }
  };

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

      {/* 테스트용 채팅방 생성 FAB */}
      <TouchableOpacity
        onPress={() => setShowTestModal(true)}
        style={[
          tw`absolute bottom-[32px] right-[24px] w-[52px] h-[52px] rounded-full justify-center items-center`,
          {
            backgroundColor: '#FF6B35',
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text style={{ color: '#fff', fontSize: 24, lineHeight: 28 }}>+</Text>
      </TouchableOpacity>

      {/* 테스트용 채팅방 생성 모달 */}
      <Modal
        visible={showTestModal}
        transparent
        animationType='fade'
        onRequestClose={() => setShowTestModal(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 justify-center items-center bg-black/50`}
          activeOpacity={1}
          onPress={() => setShowTestModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[tw`bg-white rounded-[16px] p-[24px] mx-[32px] w-full`, { maxWidth: 340 }]}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 16, color: '#1A1A1A' }}>
              🧪 테스트 채팅방 생성
            </Text>

            <Text style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>게시글 ID (필수)</Text>
            <TextInput
              value={testPostId}
              onChangeText={setTestPostId}
              keyboardType='numeric'
              placeholder='예: 1'
              placeholderTextColor='#aaa'
              style={[
                tw`border border-gray-300 rounded-[8px] px-[12px] py-[10px] mb-[12px]`,
                { fontSize: 14, color: '#1A1A1A' },
              ]}
            />

            <Text style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>요청 설명 (선택)</Text>
            <TextInput
              value={testDescription}
              onChangeText={setTestDescription}
              placeholder='예: 강아지 그림을 부탁드려요.'
              placeholderTextColor='#aaa'
              multiline
              numberOfLines={3}
              style={[
                tw`border border-gray-300 rounded-[8px] px-[12px] py-[10px] mb-[20px]`,
                { fontSize: 14, color: '#1A1A1A', textAlignVertical: 'top', minHeight: 72 },
              ]}
            />

            <View style={tw`flex-row gap-[8px]`}>
              <TouchableOpacity
                onPress={() => setShowTestModal(false)}
                style={[
                  tw`flex-1 py-[12px] rounded-[8px] items-center`,
                  { backgroundColor: '#F0F0F0' },
                ]}
              >
                <Text style={{ fontSize: 14, color: '#666' }}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCreateTestRoom}
                disabled={isCreating}
                style={[
                  tw`flex-1 py-[12px] rounded-[8px] items-center`,
                  { backgroundColor: isCreating ? '#aaa' : '#FF6B35' },
                ]}
              >
                <Text style={{ fontSize: 14, color: '#fff', fontWeight: '600' }}>
                  {isCreating ? '생성 중...' : '채팅방 만들기'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
}
