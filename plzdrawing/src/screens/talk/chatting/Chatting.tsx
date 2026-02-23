import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';
import { useUserStore } from '@/src/stores/userStore';
import { chatController, ChatRoomStatus } from '@/src/apis/controller/chat';
import { mapStatusToProcess } from '@/src/utils/formatTime';
import * as FileSystem from 'expo-file-system';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Text,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import ChatInput from '@/src/screens/talk/chatting/chat/ChatInput';
import SenderBox from '@/src/screens/talk/chatting/chat/SenderBox';
import ReceiverBox from '@/src/screens/talk/chatting/chat/ReceiverBox';
import TalkProcess from '@/src/screens/talk/chatting/chat/TalkProcess';
import StatusActionCard from '@/src/screens/talk/chatting/chat/StatusActionCard';
import * as ScreenCapture from 'expo-screen-capture';
import Colors from '@/src/constants/Colors';

export default function Chatting() {
  const route = useRoute<RouteProp<RootStackParamList, 'Chatting'>>();
  const { chatRoomId } = route.params;

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const [sendMessage, setSendMessage] = useState('');
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // ────────────────────────────────────────────────────────────
  // 채팅방 상세 조회
  // ────────────────────────────────────────────────────────────
  const { data: roomDetail, refetch: refetchRoom } = useQuery({
    queryKey: ['chatRoom', chatRoomId],
    queryFn: () => chatController.getChatRoomDetail(chatRoomId),
    enabled: !!chatRoomId,
  });

  // 내 ID 판별: userStore nickname과 requester/artist nickname 비교
  const myId = useMemo(() => {
    if (!roomDetail || !user) return null;
    return roomDetail.requester.nickname === user.nickname
      ? roomDetail.requester.id
      : roomDetail.artist.id;
  }, [roomDetail, user]);

  // 작가인지 여부
  const isArtist = useMemo(() => {
    if (!roomDetail || myId === null) return false;
    return roomDetail.artist.id === myId;
  }, [roomDetail, myId]);

  // 상대방 정보
  const counterpart = useMemo(() => {
    if (!roomDetail || myId === null) return null;
    return roomDetail.requester.id === myId
      ? roomDetail.artist
      : roomDetail.requester;
  }, [roomDetail, myId]);

  // 헤더 타이틀 설정
  useEffect(() => {
    if (counterpart) {
      navigation.setOptions({ title: `${counterpart.nickname} 님` });
    }
  }, [counterpart, navigation]);

  // ────────────────────────────────────────────────────────────
  // 메시지 목록 조회 (3초 폴링)
  // ────────────────────────────────────────────────────────────
  const { data: messagesData, refetch: refetchMessages } = useQuery({
    queryKey: ['messages', chatRoomId],
    queryFn: () => chatController.getMessages(chatRoomId, { limit: 50 }),
    enabled: !!chatRoomId,
    refetchInterval: 3_000,
  });

  const messages = messagesData?.data ?? [];

  // 새 메시지 도착 시 읽음 처리
  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg.isRead && lastMsg.senderId !== myId) {
      chatController.markAsRead(chatRoomId, { lastReadMessageId: lastMsg.id }).catch(() => {});
    }
  }, [messages, myId, chatRoomId]);

  // ────────────────────────────────────────────────────────────
  // 거래 상태 전환
  // ────────────────────────────────────────────────────────────
  const statusMutation = useMutation({
    mutationFn: (next: ChatRoomStatus) =>
      chatController.updateChatRoomStatus(chatRoomId, { status: next }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoom', chatRoomId] });
      refetchRoom();
      refetchMessages();
    },
    onError: () => Alert.alert('오류', '상태 변경에 실패했습니다. 다시 시도해 주세요.'),
  });

  // ────────────────────────────────────────────────────────────
  // 텍스트 메시지 전송
  // ────────────────────────────────────────────────────────────
  const sendTextMutation = useMutation({
    mutationFn: (content: string) => chatController.sendTextMessage(chatRoomId, content),
    onSuccess: () => refetchMessages(),
    onError: () => Alert.alert('전송 실패', '메시지 전송에 실패했습니다.'),
  });

  const handleSendMessage = () => {
    const trimmed = sendMessage.trim();
    if (!trimmed) return;
    setSendMessage('');
    sendTextMutation.mutate(trimmed);
  };

  // ────────────────────────────────────────────────────────────
  // 이미지 메시지 전송 (presigned URL → S3 PUT → objectKey 전달)
  // ────────────────────────────────────────────────────────────
  const handleSendImage = async (imageUri: string) => {
    setIsOpenedMenu(false);
    try {
      // 1. Presigned URL 발급
      const { uploadUrl, objectKey } = await chatController.getImageUploadUrl(chatRoomId);

      // 2. 파일 크기 조회
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const size =
        fileInfo.exists && 'size' in fileInfo ? (fileInfo.size ?? 0) : 0;

      // 3. S3 업로드
      const blob = await fetch(imageUri).then((r) => r.blob());
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': 'image/png' },
      });
      if (!uploadRes.ok) throw new Error('S3 upload failed');

      // 4. 메시지 서버 전송 (width/height는 리사이즈 기준 1200px)
      await chatController.sendImageMessage(chatRoomId, {
        objectKey,
        size,
        mimeType: 'image/png',
        width: 1200,
        height: 1200,
      });
      refetchMessages();
    } catch {
      Alert.alert('전송 실패', '이미지 전송에 실패했습니다.');
    }
  };

  // ────────────────────────────────────────────────────────────
  // 스크롤 / 키보드 / 스크린샷 방지
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    const preventScreenCapture = async () => {
      await ScreenCapture.preventScreenCaptureAsync();
    };
    preventScreenCapture();
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', () => {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [scrollViewRef]);

  // ────────────────────────────────────────────────────────────
  // 렌더링
  // ────────────────────────────────────────────────────────────
  return (
    <Container>
      <KeyboardAvoidingView
        behavior="height"
        style={tw`flex-1 w-full flex flex-col`}
      >
        <SafeAreaView style={tw`flex flex-col justify-between flex-1`}>
          {/* 진행 상태 헤더 */}
          <TalkProcess
            imageUrl={roomDetail?.post.thumbnailUrl ?? ''}
            title={roomDetail?.post.title ?? ''}
            price={roomDetail?.paidAmount ?? roomDetail?.price ?? 0}
            process={roomDetail ? mapStatusToProcess(roomDetail.status) : 'request'}
          />

          {/* 상태 전환 액션 카드 */}
          {roomDetail && (
            <StatusActionCard
              status={roomDetail.status}
              isArtist={isArtist}
              loading={statusMutation.isPending}
              onStatusChange={(next) => statusMutation.mutate(next)}
              onNavigateReview={() =>
                Alert.alert('후기 작성', '후기 작성 화면으로 이동합니다.')
              }
            />
          )}

          {/* 메시지 목록 */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            style={tw`flex-1 w-full bg-light_gray1`}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsOpenedMenu(false);
                Keyboard.dismiss();
              }}
            >
              <View style={tw`flex items-end p-[17px_32px] gap-[17px] w-full bg-light_gray1`}>
                {messages.map((msg) => {
                  const isSender = msg.senderId === myId;

                  // 시스템 메시지
                  if (msg.type === 'SYSTEM') {
                    return (
                      <View key={msg.id} style={tw`w-full items-center py-[4px]`}>
                        <Text
                          style={[
                            tw`text-center px-[12px] py-[4px] rounded-[10px]`,
                            {
                              color: Colors.colors.dark_gray1,
                              fontSize: 12,
                              backgroundColor: Colors.colors.light_gray2,
                            },
                          ]}
                        >
                          {msg.content}
                        </Text>
                      </View>
                    );
                  }

                  if (isSender) {
                    return (
                      <SenderBox
                        key={msg.id}
                        message={msg.content ?? ''}
                        imageUri={msg.imageUrl}
                      />
                    );
                  }
                  return (
                    <ReceiverBox
                      key={msg.id}
                      message={msg.content ?? ''}
                      imageUri={msg.imageUrl}
                      profileImageUrl={counterpart?.profileImageUrl}
                    />
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* 입력창 */}
          <ChatInput
            message={sendMessage}
            setMessage={setSendMessage}
            handleSendMessage={handleSendMessage}
            handleSendImage={handleSendImage}
            isOpenMenu={isOpenedMenu}
            setIsOpenMenu={setIsOpenedMenu}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
}
