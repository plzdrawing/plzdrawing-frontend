import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserStore } from '@/src/stores/userStore';
import { chatController, ChatRoomStatus, ChatImageSendError } from '@/src/apis/controller/chat';
import { mapStatusToProcess } from '@/src/utils/formatTime';
import * as ScreenCapture from 'expo-screen-capture';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import ChatInput from '@/src/screens/talk/chatting/chat/ChatInput';
import SenderBox from '@/src/screens/talk/chatting/chat/SenderBox';
import ReceiverBox from '@/src/screens/talk/chatting/chat/ReceiverBox';
import TalkProcess from '@/src/screens/talk/chatting/chat/TalkProcess';
import StatusActionCard from '@/src/screens/talk/chatting/chat/StatusActionCard';
import type { ChatUiAction } from '@/src/screens/talk/chatting/chat/StatusActionCard';
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
const CHAT_STATUSES: ChatRoomStatus[] = [
  'REQUESTED',
  'ACCEPTED',
  'PAID',
  'IN_PROGRESS',
  'DRAFT_SENT',
  'COMPLETED',
  'REVIEWED',
  'CANCELLED',
];

export default function Chatting() {
  const route = useRoute<RouteProp<RootStackParamList, 'Chatting'>>();
  const { chatRoomId } = route.params;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Chatting'>>();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const [sendMessage, setSendMessage] = useState('');
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasOlderMessages, setHasOlderMessages] = useState(true);
  const [androidKeyboardInset, setAndroidKeyboardInset] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const lastMessageIdRef = useRef<number | undefined>(undefined);
  const oldestMessageIdRef = useRef<number | undefined>(undefined);
  const initialLoadDoneRef = useRef(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

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
        setInitialLoadDone(true);
        setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: false }), 100);
      })
      .catch((e) => console.error('[Chatting] 초기 메시지 로드 실패:', e?.response?.status ?? e?.message));
  }, [chatRoomId, markReadIfNeeded]);

  // ── 폴링 (afterId 증분)
  useEffect(() => {
    if (!chatRoomId || !initialLoadDone) return;
    const timer = setInterval(async () => {
      try {
        await refetchRoom();

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
  }, [chatRoomId, initialLoadDone, mergeMessages, markReadIfNeeded, refetchRoom]);

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

  const formatEstimatedDate = (daysToAdd = 3) => {
    const next = new Date();
    next.setDate(next.getDate() + daysToAdd);
    const y = next.getFullYear();
    const m = String(next.getMonth() + 1).padStart(2, '0');
    const d = String(next.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // ── 거래 상태 액션 실행
  const actionMutation = useMutation({
    mutationFn: async (action: ChatUiAction) => {
      switch (action) {
        case 'ACCEPT_REQUEST': {
          const fallbackPrice = roomDetail?.price && roomDetail.price > 0 ? roomDetail.price : 1000;
          return chatController.acceptChatRoom(chatRoomId, {
            price: fallbackPrice,
            estimatedAt: formatEstimatedDate(3),
            feedbackCount: 2,
          });
        }
        case 'REJECT_REQUEST':
          return chatController.rejectChatRoom(chatRoomId, {
            reasons: ['요청 불가'],
            reasonText: '요청을 진행하기 어려워 거절했습니다.',
          });
        case 'PAY':
          return chatController.payChatRoom(chatRoomId, { paymentMethod: 'TOSS_PAY' });
        case 'REQUEST_PRICE_CHANGE': {
          const currentPrice = roomDetail?.price ?? 1000;
          const nextPrice = Math.max(1, currentPrice);
          return chatController.requestPriceChange(chatRoomId, {
            price: nextPrice,
            estimatedAt: formatEstimatedDate(3),
            feedbackCount: 2,
            reason: '요청 사항 변경에 따른 금액 조정 요청입니다.',
          });
        }
        case 'CANCEL':
          return chatController.cancelChatRoom(chatRoomId);
        case 'START_WORK':
          return chatController.startWork(chatRoomId);
        case 'SEND_DRAFT':
          return chatController.updateChatRoomStatus(chatRoomId, { status: 'DRAFT_SENT' });
        case 'CONFIRM_DRAFT':
          return chatController.confirmDrawing(chatRoomId);
        case 'REQUEST_REVISION':
          return chatController.requestRevision(chatRoomId, {
            content: '수정 요청드립니다. 디테일을 조금 더 반영해주세요.',
          });
        default:
          return chatController.getChatRoomDetail(chatRoomId);
      }
    },
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

  const leaveChatRoomMutation = useMutation({
    mutationFn: () => chatController.deleteChatRoom(chatRoomId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
      await queryClient.invalidateQueries({ queryKey: ['chatRoom', chatRoomId] });
      Alert.alert('완료', '채팅방을 나갔습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    },
    onError: (e: any) => {
      Alert.alert('실패', e?.response?.data?.message ?? '채팅방 나가기에 실패했습니다.');
    },
  });

  const handleLeaveChatRoom = () => {
    if (leaveChatRoomMutation.isPending) return;

    Alert.alert('채팅방 나가기', '정말 이 채팅방을 나가시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '나가기',
        style: 'destructive',
        onPress: () => leaveChatRoomMutation.mutate(),
      },
    ]);
  };

  const handleTestStatusChange = () => {
    if (actionMutation.isPending) return;
    Alert.alert(
      '🧪 테스트',
      '상태를 CANCELLED로 변경하시겠어요?\n(이후 삭제 테스트 가능)',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '변경',
          onPress: () => actionMutation.mutate('CANCEL'),
        },
      ],
    );
  };

  const handleSendFinalDrawing = () => {
    if (actionMutation.isPending) return;
    Alert.alert('완성그림 보내기', '상태를 DRAFT_SENT로 변경하시겠어요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '변경',
        onPress: () => actionMutation.mutate('SEND_DRAFT'),
      },
    ]);
  };

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
    } catch (e: any) {
      console.error('[Chatting] 텍스트 전송 실패:', e?.response?.status ?? e?.message);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('전송 실패', `메시지 전송에 실패했습니다. (${e?.response?.status ?? e?.message ?? '네트워크 오류'})`);
    }
  };

  // ── 이미지 메시지 전송
  const handleSendImage = async (image: {
    uri: string;
    name: string;
    type: string;
    width: number;
    height: number;
    size?: number;
  }) => {
    setIsOpenedMenu(false);

    const tempId = Date.now();
    const optimistic: MessageItem = {
      id: tempId,
      chatRoomId,
      senderId: myId ?? -1,
      type: 'IMAGE',
      imageUrl: image.uri,
      isRead: false,
      sentAt: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

    try {
      const sent = (await chatController.sendImageMessage(chatRoomId, {
        uri: image.uri,
        name: image.name,
        type: image.type,
        width: image.width,
        height: image.height,
        size: image.size,
      })) as unknown as MessageItem;

      setMessages((prev) => prev.map((m) => (m.id === tempId ? { ...sent } : m)));
      lastMessageIdRef.current = sent.id;
    } catch (e: any) {
      console.error('[Chatting] 이미지 전송 실패:', e?.response?.status ?? e?.message);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));

      if (e instanceof ChatImageSendError) {
        const stageLabel: Record<
          ChatImageSendError['stage'],
          string
        > = {
          READ_LOCAL_FILE: '1단계: 로컬 파일 읽기',
          ISSUE_UPLOAD_URL: '2단계: 업로드 URL 발급',
          UPLOAD_TO_S3: '3단계: S3 업로드',
          SEND_IMAGE_MESSAGE: '4단계: 이미지 메시지 전송',
        };

        const detail = e.detail ?? e.message ?? '원인을 확인할 수 없습니다.';
        const statusText = e.statusCode ? ` (HTTP ${e.statusCode})` : '';

        Alert.alert(
          '이미지 전송 실패',
          `${stageLabel[e.stage]}${statusText}\n${detail}`,
        );
        return;
      }

      Alert.alert('전송 실패', `이미지 전송에 실패했습니다. (${e?.response?.status ?? e?.message ?? '네트워크 오류'})`);
    }
  };

  // ── 스크린샷 방지
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    return () => { ScreenCapture.allowScreenCaptureAsync(); };
  }, []);

  // ── 키보드 표시/숨김 시 스크롤 하단 유지
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      if (Platform.OS === 'android') {
        setAndroidKeyboardInset(Math.max(0, e.endCoordinates.height - 8));
      }
      requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }));
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'android') {
        setAndroidKeyboardInset(0);
      }
      requestAnimationFrame(() => scrollViewRef.current?.scrollToEnd({ animated: true }));
    });
    return () => { show.remove(); hide.remove(); };
  }, []);

  const formatDateLabel = useCallback((dateString: string) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }, []);

  const formatTimeLabel = useCallback((dateString: string) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';
    const h = `${d.getHours()}`.padStart(2, '0');
    const m = `${d.getMinutes()}`.padStart(2, '0');
    return `${h}:${m}`;
  }, []);

  const isSameDate = useCallback((a: string, b: string) => {
    const da = new Date(a);
    const db = new Date(b);
    if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) return false;
    return (
      da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate()
    );
  }, []);

  const isRequestCardSystemMessage = useCallback((msg: MessageItem) => {
    if (msg.type !== 'SYSTEM' || !msg.content) return false;
    try {
      const parsed = JSON.parse(msg.content);
      return parsed?.kind === 'REQUEST_CARD';
    } catch {
      return false;
    }
  }, []);

  const parseSystemStatusStage = useCallback((msg: MessageItem): ChatRoomStatus | null => {
    if (msg.type !== 'SYSTEM' || !msg.content) return null;

    if (isRequestCardSystemMessage(msg)) return 'REQUESTED';

    const raw = msg.content;
    const upperRaw = raw.toUpperCase();

    try {
      const parsed = JSON.parse(raw);
      const candidates = [
        parsed?.status,
        parsed?.nextStatus,
        parsed?.toStatus,
        parsed?.changedTo,
        parsed?.data?.status,
        parsed?.payload?.status,
      ];

      for (const candidate of candidates) {
        if (typeof candidate === 'string' && CHAT_STATUSES.includes(candidate as ChatRoomStatus)) {
          return candidate as ChatRoomStatus;
        }
      }
    } catch {
      // non-json system messages
    }

    const matched = CHAT_STATUSES.find((s) => upperRaw.includes(s));
    if (matched) return matched;

    if (raw.includes('수락')) return 'ACCEPTED';
    if (raw.includes('결제') && raw.includes('완료')) return 'PAID';
    if (raw.includes('작업') && raw.includes('진행')) return 'IN_PROGRESS';
    if (raw.includes('작업') && raw.includes('완료')) return 'DRAFT_SENT';
    if (raw.includes('후기')) return 'REVIEWED';
    if (raw.includes('취소') || raw.includes('거절')) return 'CANCELLED';

    return null;
  }, [isRequestCardSystemMessage]);

  const requestCardFromMessage = useMemo(() => {
    const requestMsg = messages.find(isRequestCardSystemMessage);
    if (!requestMsg?.content) return null;
    try {
      const parsed = JSON.parse(requestMsg.content);
      return {
        thumbnailUrl: roomDetail?.post.thumbnailUrl,
        title: parsed?.title ?? roomDetail?.post.title,
        description: parsed?.description ?? roomDetail?.description,
      };
    } catch {
      return null;
    }
  }, [messages, isRequestCardSystemMessage, roomDetail]);

  const hasRequestCardAnchor = useMemo(
    () => messages.some(isRequestCardSystemMessage),
    [messages, isRequestCardSystemMessage],
  );

  const isLegacyRequestGuideMessage = useCallback((msg: MessageItem) => {
    if (msg.type !== 'TEXT') return false;
    const content = (msg.content ?? '').trim();
    if (!content) return false;

    return (
      content.includes('그림 요청이 도착했어요') ||
      /^요청서\s*:/.test(content)
    );
  }, []);

  const shouldHideMessage = useCallback(
    (msg: MessageItem) => {
      if (hasRequestCardAnchor && isLegacyRequestGuideMessage(msg)) return true;
      if (msg.type === 'SYSTEM' && !parseSystemStatusStage(msg)) return true;
      return false;
    },
    [hasRequestCardAnchor, isLegacyRequestGuideMessage, parseSystemStatusStage],
  );

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={tw`flex-1 w-full flex flex-col`}
      >
        <View style={tw`flex flex-col justify-between flex-1`}>
          {/* 상단 헤더 */}
          <Header title={counterpart ? `${counterpart.nickname} 님 과의 그림톡` : '그림톡'} />

          {/* 진행 상태 헤더 */}
          <TalkProcess
            imageUrl={roomDetail?.post.thumbnailUrl || undefined}
            title={roomDetail?.post.title ?? ''}
            price={roomDetail?.paidAmount ?? roomDetail?.price ?? 0}
            process={roomDetail ? mapStatusToProcess(roomDetail.status as any) : 'request'}
          />

          {/* 메시지 목록 */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            style={tw`flex-1 w-full bg-light-gray-1`}
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
              <View style={tw`flex items-stretch p-[17px_32px] gap-[17px] w-full bg-light-gray-1`}>
                {isLoadingOlder && (
                  <View style={tw`w-full items-center py-[8px]`}>
                    <ActivityIndicator size='small' color={Colors.colors.dark_gray1} />
                  </View>
                )}

                {messages.map((msg, index) => {
                  const prevVisible =
                    index > 0
                      ? [...messages.slice(0, index)].reverse().find((m) => !shouldHideMessage(m))
                      : undefined;
                  const showDateDivider = !prevVisible || !isSameDate(prevVisible.sentAt, msg.sentAt);
                  const isSender = msg.senderId === myId;
                  const systemStage = parseSystemStatusStage(msg);

                  if (isRequestCardSystemMessage(msg) && roomDetail) {
                    return (
                      <View key={msg.id} style={tw`w-full gap-[8px]`}>
                        {showDateDivider ? (
                          <View style={tw`w-full items-center py-[4px]`}>
                            <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>
                              {formatDateLabel(msg.sentAt)}
                            </Text>
                          </View>
                        ) : null}

                        <StatusActionCard
                          stage='REQUESTED'
                          currentStatus={roomDetail.status as ChatRoomStatus}
                          isArtist={isArtist}
                          loading={actionMutation.isPending}
                          onAction={(action) => actionMutation.mutate(action)}
                          onNavigateReview={() =>
                            navigation.navigate('ReviewCreate', {
                              chatRoomId,
                              receiverNickname: counterpart?.nickname,
                            })
                          }
                          counterpart={counterpart}
                          requesterNickname={roomDetail.requester.nickname}
                          artistNickname={roomDetail.artist.nickname}
                          requestInfo={
                            requestCardFromMessage ?? {
                              thumbnailUrl: roomDetail.post.thumbnailUrl,
                              title: roomDetail.post.title,
                              description: roomDetail.description,
                            }
                          }
                        />
                      </View>
                    );
                  }

                  if (msg.type === 'SYSTEM' && systemStage && roomDetail) {
                    if (systemStage === 'REQUESTED') return null;

                    return (
                      <View key={msg.id} style={tw`w-full gap-[8px]`}>
                        {showDateDivider ? (
                          <View style={tw`w-full items-center py-[4px]`}>
                            <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>
                              {formatDateLabel(msg.sentAt)}
                            </Text>
                          </View>
                        ) : null}

                        <StatusActionCard
                          stage={systemStage}
                          currentStatus={roomDetail.status as ChatRoomStatus}
                          isArtist={isArtist}
                          loading={actionMutation.isPending}
                          onAction={(action) => actionMutation.mutate(action)}
                          onNavigateReview={() =>
                            navigation.navigate('ReviewCreate', {
                              chatRoomId,
                              receiverNickname: counterpart?.nickname,
                            })
                          }
                          counterpart={counterpart}
                          requesterNickname={roomDetail.requester.nickname}
                          artistNickname={roomDetail.artist.nickname}
                          requestInfo={
                            requestCardFromMessage ?? {
                              thumbnailUrl: roomDetail.post.thumbnailUrl,
                              title: roomDetail.post.title,
                              description: roomDetail.description,
                            }
                          }
                        />
                      </View>
                    );
                  }

                  if (shouldHideMessage(msg)) {
                    return null;
                  }

                  if (isSender) {
                    return (
                      <View key={msg.id} style={tw`w-full gap-[8px]`}>
                        {showDateDivider ? (
                          <View style={tw`w-full items-center py-[4px]`}>
                            <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>
                              {formatDateLabel(msg.sentAt)}
                            </Text>
                          </View>
                        ) : null}
                        <SenderBox
                          message={msg.content ?? ''}
                          imageUri={msg.imageUrl}
                          sentAt={formatTimeLabel(msg.sentAt)}
                        />
                      </View>
                    );
                  }

                  return (
                    <View key={msg.id} style={tw`w-full gap-[8px]`}>
                      {showDateDivider ? (
                        <View style={tw`w-full items-center py-[4px]`}>
                          <Text style={{ fontSize: 11, color: Colors.colors.dark_gray1 }}>
                            {formatDateLabel(msg.sentAt)}
                          </Text>
                        </View>
                      ) : null}

                      <ReceiverBox
                        message={msg.content ?? ''}
                        imageUri={msg.imageUrl}
                        profileImageUrl={counterpart?.profileImageUrl}
                        sentAt={formatTimeLabel(msg.sentAt)}
                      />
                    </View>
                  );
                })}

                {roomDetail && !hasRequestCardAnchor && (
                  <StatusActionCard
                    stage={roomDetail.status as ChatRoomStatus}
                    currentStatus={roomDetail.status as ChatRoomStatus}
                    isArtist={isArtist}
                    loading={actionMutation.isPending}
                    onAction={(action) => actionMutation.mutate(action)}
                    onNavigateReview={() =>
                      navigation.navigate('ReviewCreate', {
                        chatRoomId,
                        receiverNickname: counterpart?.nickname,
                      })
                    }
                    counterpart={counterpart}
                    requesterNickname={roomDetail.requester.nickname}
                    artistNickname={roomDetail.artist.nickname}
                    requestInfo={{
                      thumbnailUrl: roomDetail.post.thumbnailUrl,
                      title: roomDetail.post.title,
                      description: roomDetail.description,
                    }}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* 입력창 */}
          <View style={Platform.OS === 'android' ? { paddingBottom: androidKeyboardInset } : undefined}>
            <ChatInput
              message={sendMessage}
              setMessage={setSendMessage}
              handleSendMessage={handleSendMessage}
              handleSendImage={handleSendImage}
              canSendFinalDrawing={isArtist && roomDetail?.status === 'IN_PROGRESS'}
              onSendFinalDrawing={handleSendFinalDrawing}
              isSendingFinalDrawing={actionMutation.isPending}
              onLeaveChatRoom={handleLeaveChatRoom}
              isLeavingChatRoom={leaveChatRoomMutation.isPending}
              onTestStatusChange={handleTestStatusChange}
              isTestStatusChanging={actionMutation.isPending}
              isOpenMenu={isOpenedMenu}
              setIsOpenMenu={setIsOpenedMenu}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
