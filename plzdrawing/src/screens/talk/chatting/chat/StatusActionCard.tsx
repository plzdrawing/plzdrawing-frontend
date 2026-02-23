/**
 * StatusActionCard
 * TalkProcess 바로 아래 고정 표시되는 상태 전환 액션 카드.
 * 현재 채팅방 status + 사용자 역할(isArtist)에 따라 다른 버튼/안내를 렌더링한다.
 */
import tw from '@/src/lib/tailwind';
import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Txt from '@/src/components/ui/Txt';
import Colors from '@/src/constants/Colors';

type ChatStatus =
  | 'REQUESTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED';

interface StatusActionCardProps {
  status: ChatStatus;
  isArtist: boolean;
  loading?: boolean;
  onStatusChange: (next: ChatStatus) => void;
  /** 후기 작성 화면으로 이동 */
  onNavigateReview?: () => void;
}

interface ActionConfig {
  message: string;
  primary?: { label: string; next?: ChatStatus; onPress?: () => void };
  secondary?: { label: string; next: ChatStatus };
}

function getConfig(
  status: ChatStatus,
  isArtist: boolean,
  onNavigateReview?: () => void,
): ActionConfig | null {
  switch (status) {
    case 'REQUESTED':
      if (isArtist) {
        return {
          message: '그림 요청이 도착했어요 :)',
          primary: { label: '수락하기', next: 'IN_PROGRESS' },
          secondary: { label: '거절하기', next: 'CANCELLED' },
        };
      }
      return {
        message: '작가의 수락을 기다리고 있어요.',
        secondary: { label: '요청 취소', next: 'CANCELLED' },
      };

    case 'PAID':
      if (isArtist) {
        return {
          message: '결제가 완료됐어요!\n작업을 시작해볼까요 :)',
          primary: { label: '작업 시작하기', next: 'IN_PROGRESS' },
        };
      }
      return { message: '결제가 완료됐어요 :) 작가가 곧 시작할 거예요.' };

    case 'IN_PROGRESS':
      if (isArtist) {
        return {
          message: '작업이 진행중이에요!',
          primary: { label: '작업 완료하기', next: 'COMPLETED' },
        };
      }
      return { message: '작가가 열심히 작업중이에요 :)' };

    case 'COMPLETED':
      if (!isArtist) {
        return {
          message: '작업이 완료됐어요!\n마음에 드셨나요?',
          primary: {
            label: '후기 작성하기',
            onPress: onNavigateReview,
            next: 'REVIEWED',
          },
        };
      }
      return { message: '작업이 완료됐어요! 후기를 기다리고 있어요 :)' };

    case 'REVIEWED':
      return { message: '후기가 작성됐어요. 거래가 완료됐습니다 :)' };

    case 'CANCELLED':
      return { message: '취소된 거래입니다.' };

    default:
      return null;
  }
}

export default function StatusActionCard({
  status,
  isArtist,
  loading = false,
  onStatusChange,
  onNavigateReview,
}: StatusActionCardProps) {
  const config = getConfig(status, isArtist, onNavigateReview);
  if (!config) return null;

  const handlePrimary = () => {
    if (!config.primary) return;
    if (config.primary.onPress) {
      config.primary.onPress();
      return;
    }
    if (config.primary.next) {
      Alert.alert(
        config.primary.label,
        `상태를 "${config.primary.label}" 으로 변경하시겠어요?`,
        [
          { text: '취소', style: 'cancel' },
          { text: '확인', onPress: () => onStatusChange(config.primary!.next!) },
        ],
      );
    }
  };

  const handleSecondary = () => {
    if (!config.secondary) return;
    Alert.alert(
      config.secondary.label,
      '정말 취소/거절하시겠어요?',
      [
        { text: '아니오', style: 'cancel' },
        { text: '네', style: 'destructive', onPress: () => onStatusChange(config.secondary!.next) },
      ],
    );
  };

  const hasPrimary = !!config.primary;
  const hasSecondary = !!config.secondary;
  const hasButton = hasPrimary || hasSecondary;

  return (
    <View
      style={[
        tw`flex-row items-center px-[32px] py-[12px] gap-[12px]`,
        { backgroundColor: Colors.colors.sub_yellow, borderBottomWidth: 1, borderBottomColor: Colors.colors.main_yellow },
      ]}
    >
      <Txt variant="auxiliaryTextLight" style={tw`flex-1`}>
        {config.message}
      </Txt>

      {loading ? (
        <ActivityIndicator size="small" color={Colors.colors.main_yellow} />
      ) : hasButton ? (
        <View style={tw`flex-row gap-[8px]`}>
          {hasSecondary && (
            <TouchableOpacity
              onPress={handleSecondary}
              style={[
                tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                { backgroundColor: Colors.colors.white, borderWidth: 1, borderColor: Colors.colors.light_gray2 },
              ]}
            >
              <Txt variant="auxiliaryTextLight" color="dark_gray1">
                {config.secondary!.label}
              </Txt>
            </TouchableOpacity>
          )}
          {hasPrimary && (
            <TouchableOpacity
              onPress={handlePrimary}
              style={[
                tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                { backgroundColor: Colors.colors.main_yellow },
              ]}
            >
              <Txt variant="auxiliaryTextLight" color="black">
                {config.primary!.label}
              </Txt>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
}
