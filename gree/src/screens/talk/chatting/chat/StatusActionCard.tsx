import tw from '@/src/lib/tailwind';
import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert, Image, Text } from 'react-native';
import Txt from '@/src/components/common/Txt';
import Colors from '@/src/constants/Colors';

type ChatStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'DRAFT_SENT'
  | 'COMPLETED'
  | 'REVIEWED'
  | 'CANCELLED';

type RenderType = 'system' | 'opponent';

interface StatusActionCardProps {
  status: ChatStatus;
  isArtist: boolean;
  loading?: boolean;
  onStatusChange: (next: ChatStatus) => void;
  onNavigateReview?: () => void;
  counterpart?: { nickname: string; profileImageUrl?: string } | null;
}

interface ActionConfig {
  message: string;
  renderType: RenderType;
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
          renderType: 'opponent',
          primary: { label: '수락하기', next: 'ACCEPTED' },
          secondary: { label: '거절하기', next: 'CANCELLED' },
        };
      }
      return null;

    case 'ACCEPTED':
      if (!isArtist) {
        return {
          message: '작가가 요청을 수락했어요. 결제를 진행해 주세요.',
          renderType: 'opponent',
          primary: { label: '수락 및 결제하기', next: 'PAID' },
          secondary: { label: '취소하기', next: 'CANCELLED' },
        };
      }
      return null;

    case 'PAID':
      return { message: '결제가 완료되어 그림 작업이 시작됩니다.', renderType: 'system' };

    case 'IN_PROGRESS':
      return null;

    case 'DRAFT_SENT':
      return { message: '그림 작업이 완료되었습니다.', renderType: 'system' };

    case 'COMPLETED':
      if (!isArtist) {
        return {
          message: '작업이 완료됐어요!\n마음에 드셨나요?',
          renderType: 'opponent',
          primary: {
            label: '후기 작성하기',
            onPress: onNavigateReview,
          },
        };
      }
      return null;

    case 'REVIEWED':
      return { message: '후기가 작성됐어요. 거래가 완료됐습니다 :)', renderType: 'system' };

    case 'CANCELLED':
      return { message: '취소된 거래입니다.', renderType: 'system' };

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
  counterpart,
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
    Alert.alert('정말 취소/거절하시겠어요?', undefined, [
      { text: '아니오', style: 'cancel' },
      {
        text: '네',
        style: 'destructive',
        onPress: () => onStatusChange(config.secondary!.next),
      },
    ]);
  };

  const hasPrimary = !!config.primary;
  const hasSecondary = !!config.secondary;

  // System 메시지 타입: 중앙 정렬 시스템 메시지
  if (config.renderType === 'system') {
    return (
      <View style={tw`w-full items-center py-[4px]`}>
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
          {config.message}
        </Text>
      </View>
    );
  }

  // Opponent 메시지 타입: 상대방 말풍선
  return (
    <View style={tw`flex-row justify-start items-start gap-[17px] max-w-full`}>
      <Image
        style={[tw`w-[40px] h-[40px] rounded-[12px]`, { backgroundColor: Colors.colors.light_gray2 }]}
        source={counterpart?.profileImageUrl ? { uri: counterpart.profileImageUrl } : undefined}
      />
      <View
        style={[
          tw`justify-start items-start max-w-[70%] rounded-[10px] py-[10px] px-[20px] flex-shrink`,
          { backgroundColor: Colors.colors.sub_yellow, borderWidth: 1, borderColor: Colors.colors.main_yellow },
        ]}
      >
        <Txt variant='auxiliaryTextLight'>{config.message}</Txt>

        {loading ? (
          <View style={tw`pt-[8px]`}>
            <ActivityIndicator size='small' color={Colors.colors.main_yellow} />
          </View>
        ) : hasPrimary || hasSecondary ? (
          <View style={tw`flex-row flex-wrap gap-[8px] pt-[10px]`}>
            {hasSecondary && (
              <TouchableOpacity
                onPress={handleSecondary}
                style={[
                  tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                  { backgroundColor: Colors.colors.white, borderWidth: 1, borderColor: Colors.colors.light_gray2 },
                ]}
              >
                <Txt variant='auxiliaryTextLight' color='dark_gray1'>
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
                <Txt variant='auxiliaryTextLight' color='black'>
                  {config.primary!.label}
                </Txt>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
}
