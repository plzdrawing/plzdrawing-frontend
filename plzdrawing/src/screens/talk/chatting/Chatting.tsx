import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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
  ActivityIndicator,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import ChatInput from '@/src/screens/talk/chatting/chat/ChatInput';
import SenderBox from '@/src/screens/talk/chatting/chat/SenderBox';
import ReceiverBox from '@/src/screens/talk/chatting/chat/ReceiverBox';
import TalkProcess from '@/src/screens/talk/chatting/chat/TalkProcess';
import StatusActionCard from '@/src/screens/talk/chatting/chat/StatusActionCard';
import * as ScreenCapture from 'expo-screen-capture';
import Colors from '@/src/constants/Colors';

// ────────────────────────────────────────────────────────────
// 메시지 타입
// ────────────────────────────────────────────────────────────
type MessageItem = {
  id: number;
  chatRoomId: number;
  senderId: number;
  type: 'TEXT' | 'IMAGE' | 'SYSTEM';
  content?: string;
  imageUrl?: string;
  isRead: boolean;
  sentAt: string;
  _optimistic?: boolean; // 낙관적 UI 임시 메시지 여부
};

const POLL_INTERVAL = 3_000; // 3초 폴링
const INITIAL_LIMIT = 30;    // 초기 로드 건수
const LOAD_MORE_LIMIT = 20;  // 위로 스크롤 시 추가 로드 건수

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
  // 폴링 시 afterId로 사용할 마지막 메시지 ID
  const lastMessageIdRef = useRef<number | undefined>(undefined);
  // 위로 스크롤 시 beforeId로 사용할 가장 오래된 메시지 ID
  const oldestMessageIdRef = useRef<number | undefined>(undefined);
  // 초기 로드 완료 여부
  const initialLoadDoneRef = useRef(false);

  // ────────────────────────────────────────────────────────────
  // 채팅방 상세 조회
  // ────────────────────────────────────────────────────────────
  const { data: roomDetail, refetch: refetchRoom } = useQuery({
    queryKey: ['chatRoom', chatRoomId],
    queryFn: () => chatController.getChatRoomDetail(chatRoomId),
    enabled: !!chatRoomId,
  });

  // 내 ID 판별
  // userStore.user가 없을 때를 대비해 memberController로 fallback 조회
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

  // userStore.user가 없을 때 API로 직접 내 정보 조회
  useEffect(() => {
    if (user || !roomDetail) return;
    import('@/src/apis/controller/member').then(({ memberController }) => {
      memberController.checkMyProfile().then((profile: any) => {
        const nickname = profile?.nickname;
        if (!nickname) return;
        const id =
          roomDetail.requester.nickname === nickname
            ? roomDetail.requester.id
            : roomDetail.artist.id;
        setResolvedMyId(id);
      }).catch(() => {});
    });
  }, [user, roomDetail]);

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
  // 메시지 누적 헬퍼 — 중복 제거 후 정렬
  // ────────────────────────────────────────────────────────────
  const mergeMessages = useCallback((incoming: MessageItem[], prepend = false) => {
    setMessages((prev) => {
      // 낙관적 메시지는 서버 응답으로 대체되면 제거
      const realIds = new Set(incoming.map((m) => m.id));
      const filtered = prev.filter((m) => !m._optimistic || !realIds.has(m.id));

      const merged = prepend
        ? [...incoming, ...filtered]
        : [...filtered, ...incoming];

      // id 기준 중복 제거 + 오름차순 정렬
      const deduped = Array.from(
        new Map(merged.map((m) => [m.id, m])).values()
      ).sort((a, b) => a.id - b.id);

      return deduped;
    });
  }, []);

  // ────────────────────────────────────────────────────────────
  // 읽음 처리 헬퍼
  // ────────────────────────────────────────────────────────────
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

  // ────────────────────────────────────────────────────────────
  // 초기 메시지 로드 (마운트 시 1회)
  // ────────────────────────────────────────────────────────────
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
          // 초기 로드 건수가 limit보다 적으면 더 이상 이전 메시지 없음
          if (data.length < INITIAL_LIMIT) setHasOlderMessages(false);
        } else {
          setHasOlderMessages(false);
        }
        initialLoadDoneRef.current = true;
        // 초기 로드 후 맨 아래로 스크롤
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: false }), 100);
      })
      .catch(() => {});
  }, [chatRoomId, markReadIfNeeded]);

  // ────────────────────────────────────────────────────────────
  // 폴링 — afterId로 새 메시지만 증분 조회
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!chatRoomId || !initialLoadDoneRef.current) return;

    const timer = setInterval(async () => {
      try {
        const params = lastMessageIdRef.current !== undefined
          ? { afterId: lastMessageIdRef.current, limit: LOAD_MORE_LIMIT }
          : { limit: INITIAL_LIMIT };

        const res = await chatController.getMessages(chatRoomId, params);
        const newMsgs = (res.data ?? []) as MessageItem[];

        if (newMsgs.length > 0) {
          mergeMessages(newMsgs);
          lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id;
          markReadIfNeeded(newMsgs);
          // 새 메시지 도착 시 맨 아래로 스크롤
          setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
        }
      } catch {
        // 폴링 실패 시 무시 (다음 주기에 재시도)
      }
    }, POLL_INTERVAL);

    return () => clearInterval(timer);
  }, [chatRoomId, mergeMessages, markReadIfNeeded]);

  // ────────────────────────────────────────────────────────────
  // 위로 스크롤 시 이전 메시지 로드 (beforeId)
  // ────────────────────────────────────────────────────────────
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

  // ────────────────────────────────────────────────────────────
  // 거래 상태 전환
  // ────────────────────────────────────────────────────────────
  const statusMutation = useMutation({
    mutationFn: (next: ChatRoomStatus) =>
      chatController.updateChatRoomStatus(chatRoomId, { status: next }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoom', chatRoomId] });
      refetchRoom();
      // 상태 변경 시 시스템 메시지가 생기므로 강제 전체 재조회
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

  // ────────────────────────────────────────────────────────────
  // 텍스트 메시지 전송 (낙관적 UI)
  // ────────────────────────────────────────────────────────────
  const handleSendMessage = async () => {
    const trimmed = sendMessage.trim();
    if (!trimmed) return;
    setSendMessage('');

    // 낙관적 메시지 임시 추가 (myId 없으면 -1로 처리, 폴링 시 실제 값으로 교체됨)
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
      const sent = await chatController.sendTextMessage(chatRoomId, trimmed) as unknown as MessageItem;
      // 낙관적 메시지를 실제 응답으로 교체
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...sent } : m))
      );
      lastMessageIdRef.current = sent.id;
    } catch {
      // 실패 시 낙관적 메시지 제거
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('전송 실패', '메시지 전송에 실패했습니다.');
    }
  };

  // ────────────────────────────────────────────────────────────
  // 이미지 메시지 전송 (presigned URL → S3 PUT → objectKey 전달)
  // ────────────────────────────────────────────────────────────
  const handleSendImage = async (imageUri: string) => {
    setIsOpenedMenu(false);

    // 낙관적 이미지 메시지 추가
    const tempId = Date.now();
    const optimistic: MessageItem = {
      id: tempId,
      chatRoomId,
      senderId: myId ?? -1,
      type: 'IMAGE',
      imageUrl: imageUri, // 로컬 URI로 미리 표시
      isRead: false,
      sentAt: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

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

      // 4. 메시지 서버 전송
      const sent = await chatController.sendImageMessage(chatRoomId, {
        objectKey,
        size,
        mimeType: 'image/png',
        width: 1200,
        height: 1200,
      }) as unknown as MessageItem;

      // 낙관적 메시지를 실제 응답(S3 URL)으로 교체
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...sent } : m))
      );
      lastMessageIdRef.current = sent.id;
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('전송 실패', '이미지 전송에 실패했습니다.');
    }
  };

  // ────────────────────────────────────────────────────────────
  // 키보드 / 스크린샷 방지
  // ────────────────────────────────────────────────────────────
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
            onScroll={({ nativeEvent }) => {
              // 스크롤 상단 근처일 때 이전 메시지 로드
              if (nativeEvent.contentOffset.y < 80) {
                loadOlderMessages();
              }
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
                {/* 이전 메시지 로딩 인디케이터 */}
                {isLoadingOlder && (
                  <View style={tw`w-full items-center py-[8px]`}>
                    <ActivityIndicator size="small" color={Colors.colors.dark_gray1} />
                  </View>
                )}
                {/* 더 이상 이전 메시지 없음 표시 */}
                {!hasOlderMessages && messages.length > 0 && (
                  <View style={tw`w-full items-center py-[4px]`}>
                    <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>
                      대화 시작
                    </Text>
                  </View>
                )}

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
