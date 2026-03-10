import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { useUserStore } from '@/src/stores/userStore';
import { chatController, ChatRoomStatus } from '@/src/apis/controller/chat';
import { mapStatusToProcess } from '@/src/utils/formatTime';
import * as FileSystem from 'expo-file-system';
import * as ScreenCapture from 'expo-screen-capture';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import ChatInput from '@/src/screens/talk/chatting/chat/ChatInput';
import SenderBox from '@/src/screens/talk/chatting/chat/SenderBox';
import ReceiverBox from '@/src/screens/talk/chatting/chat/ReceiverBox';
import TalkProcess from '@/src/screens/talk/chatting/chat/TalkProcess';
import StatusActionCard from '@/src/screens/talk/chatting/chat/StatusActionCard';
import Colors from '@/src/constants/Colors';

type MessageItem = {
  id: number;
  chatRoomId: number;
  senderId: number;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  content?: string;
  imageUrl?: string;
  isRead: boolean;
  sentAt: string;
  _optimistic?: boolean;
};

const POLL_INTERVAL = 3_000;
const INITIAL_LIMIT = 30;
const LOAD_MORE_LIMIT = 20;

export default function Chatting() {
  const route = useRoute<RouteProp<RootStackParamList, 'Chatting'>>();
  const { chatRoomId } = route.params;

  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const [sendMessage, setSendMessage] = useState('');
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasOlderMessages, setHasOlderMessages] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);
  const lastMessageIdRef = useRef<number | undefined>(undefined);
  const oldestMessageIdRef = useRef<number | undefined>(undefined);
  const initialLoadDoneRef = useRef(false);

  // ── 채팅방 상세 조회
  const { data: roomDetail, refetch: refetchRoom } = useQuery({
    queryKey: ['chatRoom', chatRoomId],
    queryFn: () => chatController.getChatRoomDetail(chatRoomId),
    enabled: !!chatRoomId,
  });

  // ── 내 ID 판별
  const [resolvedMyId, setResolvedMyId] = useState<number | null>(null);

  const myId = useMemo(() => {
    if (!roomDetail) return resolvedMyId;
    if (user) {
      return roomDetail.requester.nickname === user.nickname
        ? roomDetail.requester.id
        : roomDetail.artist.id;
    }
    return resolvedMyId;
  }, [roomDetail, user, resolvedMyId]);

  useEffect(() => {
    if (user || !roomDetail) return;
    import('@/src/apis/controller/member').then(({ memberController }) => {
      memberController
        .checkMyProfile()
        .then((profile: any) => {
          const nickname = profile?.nickname;
          if (!nickname) return;
          const id =
            roomDetail.requester.nickname === nickname
              ? roomDetail.requester.id
              : roomDetail.artist.id;
          setResolvedMyId(id);
        })
        .catch(() => {});
    });
  }, [user, roomDetail]);

  const isArtist = useMemo(() => {
    if (!roomDetail || myId === null) return false;
    return roomDetail.artist.id === myId;
  }, [roomDetail, myId]);

  const counterpart = useMemo(() => {
    if (!roomDetail || myId === null) return null;
    return roomDetail.requester.id === myId ? roomDetail.artist : roomDetail.requester;
  }, [roomDetail, myId]);

  useEffect(() => {
    if (counterpart) {
      navigation.setOptions({ title: `${counterpart.nickname} 님` });
    }
  }, [counterpart, navigation]);

  // ── 메시지 누적 헬퍼 (중복 제거 + 정렬)
  const mergeMessages = useCallback((incoming: MessageItem[], prepend = false) => {
    setMessages((prev) => {
      const realIds = new Set(incoming.map((m) => m.id));
      const filtered = prev.filter((m) => !m._optimistic || !realIds.has(m.id));
      const merged = prepend ? [...incoming, ...filtered] : [...filtered, ...incoming];
      return Array.from(new Map(merged.map((m) => [m.id, m])).values()).sort(
        (a, b) => a.id - b.id,
      );
    });
  }, []);

  // ── 읽음 처리
  const markReadIfNeeded = useCallback(
    (newMessages: MessageItem[]) => {
      if (!myId) return;
      const unreadFromOther = newMessages.filter(
        (m) => !m.isRead && m.senderId !== myId,
      );
      if (!unreadFromOther.length) return;
      const lastId = unreadFromOther[unreadFromOther.length - 1].id;
      chatController.markAsRead(chatRoomId, { lastReadMessageId: lastId }).catch(() => {});
    },
    [chatRoomId, myId],
  );

  // ── 초기 메시지 로드
  useEffect(() => {
    if (initialLoadDoneRef.current || !chatRoomId) return;
    chatController
      .getMessages(chatRoomId, { limit: INITIAL_LIMIT })
      .then((res) => {
        const data = (res.data ?? []) as MessageItem[];
        if (data.length > 0) {
          setMessages(data);
          lastMessageIdRef.current = data[data.length - 1].id;
          oldestMessageIdRef.current = data[0].id;
          markReadIfNeeded(data);
          if (data.length < INITIAL_LIMIT) setHasOlderMessages(false);
        } else {
          setHasOlderMessages(false);
        }
        initialLoadDoneRef.current = true;
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: false }), 100);
      })
      .catch(() => {});
  }, [chatRoomId, markReadIfNeeded]);

  // ── 폴링 (afterId 증분)
  useEffect(() => {
    if (!chatRoomId || !initialLoadDoneRef.current) return;
    const timer = setInterval(async () => {
      try {
        const params =
          lastMessageIdRef.current !== undefined
            ? { afterId: lastMessageIdRef.current, limit: LOAD_MORE_LIMIT }
            : { limit: INITIAL_LIMIT };
        const res = await chatController.getMessages(chatRoomId, params);
        const newMsgs = (res.data ?? []) as MessageItem[];
        if (newMsgs.length > 0) {
          mergeMessages(newMsgs);
          lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id;
          markReadIfNeeded(newMsgs);
          setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
        }
      } catch {
        // 폴링 실패 시 다음 주기에 재시도
      }
    }, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [chatRoomId, mergeMessages, markReadIfNeeded]);

  // ── 위로 스크롤 시 이전 메시지 로드
  const loadOlderMessages = useCallback(async () => {
    if (isLoadingOlder || !hasOlderMessages || !oldestMessageIdRef.current) return;
    setIsLoadingOlder(true);
    try {
      const res = await chatController.getMessages(chatRoomId, {
        beforeId: oldestMessageIdRef.current,
        limit: LOAD_MORE_LIMIT,
      });
      const older = (res.data ?? []) as MessageItem[];
      if (older.length > 0) {
        mergeMessages(older, true);
        oldestMessageIdRef.current = older[0].id;
        if (older.length < LOAD_MORE_LIMIT) setHasOlderMessages(false);
      } else {
        setHasOlderMessages(false);
      }
    } catch {
      // 무시
    } finally {
      setIsLoadingOlder(false);
    }
  }, [chatRoomId, isLoadingOlder, hasOlderMessages, mergeMessages]);

  // ── 거래 상태 전환
  const statusMutation = useMutation({
    mutationFn: (next: ChatRoomStatus) =>
      chatController.updateChatRoomStatus(chatRoomId, { status: next }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoom', chatRoomId] });
      refetchRoom();
      const res = await chatController.getMessages(chatRoomId, {
        afterId: lastMessageIdRef.current,
        limit: LOAD_MORE_LIMIT,
      });
      const newMsgs = (res.data ?? []) as MessageItem[];
      if (newMsgs.length > 0) {
        mergeMessages(newMsgs);
        lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id;
      }
    },
    onError: () => Alert.alert('오류', '상태 변경에 실패했습니다. 다시 시도해 주세요.'),
  });

  // ── 텍스트 메시지 전송 (낙관적 UI)
  const handleSendMessage = async () => {
    const trimmed = sendMessage.trim();
    if (!trimmed) return;
    setSendMessage('');

    const tempId = Date.now();
    const optimistic: MessageItem = {
      id: tempId,
      chatRoomId,
      senderId: myId ?? -1,
      type: 'TEXT',
      content: trimmed,
      isRead: false,
      sentAt: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

    try {
      const sent = (await chatController.sendTextMessage(chatRoomId, trimmed)) as unknown as MessageItem;
      setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...sent } : m)));
      lastMessageIdRef.current = sent.id;
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('전송 실패', '메시지 전송에 실패했습니다.');
    }
  };

  // ── 이미지 메시지 전송 (presigned URL → S3 PUT → objectKey)
  const handleSendImage = async (imageUri: string) => {
    setIsOpenedMenu(false);

    const tempId = Date.now();
    const optimistic: MessageItem = {
      id: tempId,
      chatRoomId,
      senderId: myId ?? -1,
      type: 'IMAGE',
      imageUrl: imageUri,
      isRead: false,
      sentAt: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

    try {
      const { uploadUrl, objectKey } = await chatController.getImageUploadUrl(chatRoomId);
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const size = fileInfo.exists && 'size' in fileInfo ? (fileInfo.size ?? 0) : 0;

      const blob = await fetch(imageUri).then((r) => r.blob());
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': 'image/png' },
      });
      if (!uploadRes.ok) throw new Error('S3 upload failed');

      const sent = (await chatController.sendImageMessage(chatRoomId, {
        objectKey,
        size,
        mimeType: 'image/png',
        width: 1200,
        height: 1200,
      })) as unknown as MessageItem;

      setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...sent } : m)));
      lastMessageIdRef.current = sent.id;
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('전송 실패', '이미지 전송에 실패했습니다.');
    }
  };

  // ── 스크린샷 방지
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    return () => { ScreenCapture.allowScreenCaptureAsync(); };
  }, []);

  // ── 키보드 표시/숨김 시 스크롤 하단 유지
  useEffect(() => {
    const show = Keyboard.addListener('keyboardWillShow', () => {
      requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }));
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }));
    });
    return () => { show.remove(); hide.remove(); };
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView behavior='height' style={tw`flex-1 w-full flex flex-col`}>
        <SafeAreaView style={tw`flex flex-col justify-between flex-1`}>
          {/* 진행 상태 헤더 */}
          <TalkProcess
            imageUrl={roomDetail?.post.thumbnailUrl || undefined}
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
              onNavigateReview={() => Alert.alert('후기 작성', '후기 작성 화면으로 이동합니다.')}
            />
          )}

          {/* 메시지 목록 */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            style={tw`flex-1 w-full bg-light_gray1`}
            onScroll={({ nativeEvent }) => {
              if (nativeEvent.contentOffset.y < 80) loadOlderMessages();
            }}
            scrollEventThrottle={200}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsOpenedMenu(false);
                Keyboard.dismiss();
              }}
            >
              <View style={tw`flex items-end p-[17px_32px] gap-[17px] w-full bg-light_gray1`}>
                {isLoadingOlder && (
                  <View style={tw`w-full items-center py-[8px]`}>
                    <ActivityIndicator size='small' color={Colors.colors.dark_gray1} />
                  </View>
                )}
                {!hasOlderMessages && messages.length > 0 && (
                  <View style={tw`w-full items-center py-[4px]`}>
                    <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>대화 시작</Text>
                  </View>
                )}

                {messages.map((msg) => {
                  const isSender = msg.senderId === myId;

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
                      <SenderBox key={msg.id} message={msg.content ?? ''} imageUri={msg.imageUrl} />
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
