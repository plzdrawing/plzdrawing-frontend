import tw from '@/src/lib/tailwind';
import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
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

type RenderType = 'system' | 'opponent' | 'sender';

export type ChatUiAction =
  | 'ACCEPT_REQUEST'
  | 'REJECT_REQUEST'
  | 'PAY'
  | 'REQUEST_PRICE_CHANGE'
  | 'CANCEL'
  | 'START_WORK'
  | 'SEND_DRAFT'
  | 'CONFIRM_DRAFT'
  | 'REQUEST_REVISION';

interface StatusActionCardProps {
  stage: ChatStatus;
  currentStatus: ChatStatus;
  isArtist: boolean;
  loading?: boolean;
  onAction: (action: ChatUiAction) => void;
  onNavigateReview?: () => void;
  counterpart?: { nickname: string; profileImageUrl?: string } | null;
  requesterNickname?: string;
  artistNickname?: string;
  requestInfo?: { thumbnailUrl?: string; title?: string; description?: string } | null;
}

interface ActionConfig {
  title?: string;
  message: string;
  renderType: RenderType;
  requestInfo?: { thumbnailUrl?: string; title?: string; description?: string } | null;
  primary?: { label: string; action?: ChatUiAction; onPress?: () => void; disabled?: boolean };
  secondary?: { label: string; action?: ChatUiAction; disabled?: boolean };
  tertiary?: { label: string; action?: ChatUiAction; disabled?: boolean };
}

function getConfig(
  stage: ChatStatus,
  currentStatus: ChatStatus,
  isArtist: boolean,
  requestInfo?: { thumbnailUrl?: string; title?: string; description?: string } | null,
  onNavigateReview?: () => void,
  requesterNickname?: string,
  artistNickname?: string,
): ActionConfig | null {
  const requesterName = requesterNickname ?? '요청자';
  const artistName = artistNickname ?? '작가';

  switch (stage) {
    case 'REQUESTED':
      return {
        title: '그림 요청이 도착했어요:) 요청서를 확인해볼까요?',
        message: requestInfo?.description ?? requestInfo?.title ?? '',
        requestInfo,
        renderType: isArtist ? 'opponent' : 'sender',
        primary: isArtist
          ? currentStatus === 'REQUESTED'
            ? { label: '수락하기', action: 'ACCEPT_REQUEST' }
            : { label: '수락하기', disabled: true }
          : undefined,
        secondary: isArtist
          ? currentStatus === 'REQUESTED'
            ? { label: '거절하기', action: 'REJECT_REQUEST' }
            : { label: '거절하기', disabled: true }
          : undefined,
      };

    case 'ACCEPTED':
      return {
        title: `${artistName}님이 요청을 수락했습니다:)`,
        message: `${requesterName}님의 결제를 기다리고 있어요.`,
        renderType: isArtist ? 'sender' : 'opponent',
        primary: !isArtist
          ? currentStatus === 'ACCEPTED'
            ? { label: '결제하기', action: 'PAY' }
            : { label: '결제하기', disabled: true }
          : undefined,
        secondary: !isArtist
          ? currentStatus === 'ACCEPTED'
            ? { label: '가격 변경 요청', action: 'REQUEST_PRICE_CHANGE' }
            : { label: '가격 변경 요청', disabled: true }
          : undefined,
        tertiary: !isArtist
          ? currentStatus === 'ACCEPTED'
            ? { label: '취소하기', action: 'CANCEL' }
            : { label: '취소하기', disabled: true }
          : undefined,
      };

    case 'PAID':
      return {
        title: `${requesterName}님이 결제를 완료했습니다:)`,
        message: `${artistName}님이 작업을 시작할 예정이에요.`,
        renderType: isArtist ? 'opponent' : 'sender',
        primary: isArtist
          ? currentStatus === 'PAID'
            ? { label: '작업 시작', action: 'START_WORK' }
            : { label: '확인하기', disabled: true }
          : undefined,
      };

    case 'IN_PROGRESS':
      return {
        message: `${artistName}님이 작업을 진행 중이에요.`,
        renderType: isArtist ? 'sender' : 'opponent',
        primary: isArtist
          ? currentStatus === 'IN_PROGRESS'
            ? { label: '완성그림 보내기', action: 'SEND_DRAFT' }
            : { label: '완성그림 보내기', disabled: true }
          : undefined,
      };

    case 'DRAFT_SENT':
      return {
        message: '그림 작업이 완료되었습니다.',
        renderType: isArtist ? 'sender' : 'opponent',
        primary: !isArtist
          ? currentStatus === 'DRAFT_SENT'
            ? { label: '확인하기', action: 'CONFIRM_DRAFT' }
            : { label: '확인하기', disabled: true }
          : undefined,
        secondary: !isArtist
          ? currentStatus === 'DRAFT_SENT'
            ? { label: '수정 요청', action: 'REQUEST_REVISION' }
            : { label: '수정 요청', disabled: true }
          : undefined,
      };

    case 'COMPLETED':
      return {
        message: '그림이 마음에 드셨나요?\n후기를 작성하러 가볼까요?',
        renderType: isArtist ? 'sender' : 'opponent',
        primary: !isArtist
          ? currentStatus === 'COMPLETED'
            ? {
                label: '후기 작성하기',
                onPress: onNavigateReview,
              }
            : {
                label: '후기 작성하기',
                disabled: true,
              }
          : undefined,
      };

    case 'REVIEWED':
      return {
        message: '후기가 작성됐어요. 거래가 완료됐습니다 :)',
        renderType: isArtist ? 'opponent' : 'sender',
      };

    case 'CANCELLED':
      return {
        message: '취소된 거래입니다.',
        renderType: isArtist ? 'opponent' : 'sender',
      };

    default:
      return null;
  }
}

export default function StatusActionCard({
  stage,
  currentStatus,
  isArtist,
  loading = false,
  onAction,
  onNavigateReview,
  counterpart,
  requesterNickname,
  artistNickname,
  requestInfo,
}: StatusActionCardProps) {
  const config = getConfig(
    stage,
    currentStatus,
    isArtist,
    requestInfo,
    onNavigateReview,
    requesterNickname,
    artistNickname,
  );
  if (!config) return null;

  const handlePrimary = (config: ActionConfig) => {
    if (!config.primary) return;
    if (config.primary.disabled) return;
    if (config.primary.onPress) {
      config.primary.onPress();
      return;
    }
    if (config.primary.action) {
      Alert.alert(
        config.primary.label,
        `${config.primary.label}를 진행할까요?`,
        [
          { text: '취소', style: 'cancel' },
          { text: '확인', onPress: () => onAction(config.primary!.action!) },
        ],
      );
    }
  };

  const handleSecondary = (config: ActionConfig) => {
    if (!config.secondary) return;
    if (config.secondary.disabled || !config.secondary.action) return;
    Alert.alert('정말 취소/거절하시겠어요?', undefined, [
      { text: '아니오', style: 'cancel' },
      {
        text: '네',
        style: 'destructive',
        onPress: () => onAction(config.secondary!.action!),
      },
    ]);
  };

  const handleTertiary = (config: ActionConfig) => {
    if (!config.tertiary) return;
    if (config.tertiary.disabled || !config.tertiary.action) return;
    Alert.alert('정말 취소하시겠어요?', undefined, [
      { text: '아니오', style: 'cancel' },
      {
        text: '네',
        style: 'destructive',
        onPress: () => onAction(config.tertiary!.action!),
      },
    ]);
  };

  const renderCard = (config: ActionConfig) => {
    const hasPrimary = !!config.primary;
    const hasSecondary = !!config.secondary;
    const hasTertiary = !!config.tertiary;

    if (config.renderType === 'system') {
      return null;
    }

    if (config.renderType === 'sender') {
      return (
        <View style={tw`flex-row justify-end items-start max-w-full`}>
          <View
            style={[
              tw`justify-start items-start max-w-[70%] rounded-[10px] py-[10px] px-[20px] flex-shrink`,
              { backgroundColor: Colors.colors.white, borderWidth: 1, borderColor: Colors.colors.main_yellow },
            ]}
          >
            {config.title ? (
              <Txt variant='bodyTextBold' color='black'>
                {config.title}
              </Txt>
            ) : null}

            {config.requestInfo?.thumbnailUrl ? (
              <Image
                source={{ uri: config.requestInfo.thumbnailUrl }}
                style={[tw`w-[160px] h-[120px] rounded-[8px] mt-[10px]`, { backgroundColor: Colors.colors.light_gray2 }]}
              />
            ) : null}

            {config.message ? (
              <View style={config.title || config.requestInfo?.thumbnailUrl ? tw`mt-[10px]` : undefined}>
                <Txt variant='auxiliaryTextLight'>{config.message}</Txt>
              </View>
            ) : null}

            {hasPrimary || hasSecondary || hasTertiary ? (
              <View style={tw`flex-row flex-wrap gap-[8px] pt-[10px]`}>
                {hasTertiary && (
                  <TouchableOpacity
                    onPress={() => handleTertiary(config)}
                    disabled={!!config.tertiary?.disabled || loading}
                    style={[
                      tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                      {
                        backgroundColor: Colors.colors.white,
                        borderWidth: 1,
                        borderColor: Colors.colors.error_red,
                        opacity: config.tertiary?.disabled || loading ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Txt variant='auxiliaryTextLight' color='error_red'>
                      {config.tertiary!.label}
                    </Txt>
                  </TouchableOpacity>
                )}

                {hasSecondary && (
                  <TouchableOpacity
                    onPress={() => handleSecondary(config)}
                    disabled={!!config.secondary?.disabled || loading}
                    style={[
                      tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                      {
                        backgroundColor: Colors.colors.white,
                        borderWidth: 1,
                        borderColor: Colors.colors.light_gray2,
                        opacity: config.secondary?.disabled || loading ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Txt variant='auxiliaryTextLight' color='dark_gray1'>
                      {config.secondary!.label}
                    </Txt>
                  </TouchableOpacity>
                )}

                {hasPrimary && (
                  <TouchableOpacity
                    onPress={() => handlePrimary(config)}
                    disabled={!!config.primary?.disabled || loading}
                    style={[
                      tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                      {
                        backgroundColor: Colors.colors.main_yellow,
                        opacity: config.primary?.disabled || loading ? 0.5 : 1,
                      },
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
          {config.title ? (
            <Txt variant='bodyTextBold' color='black'>
              {config.title}
            </Txt>
          ) : null}

          {config.requestInfo?.thumbnailUrl ? (
            <Image
              source={{ uri: config.requestInfo.thumbnailUrl }}
              style={[tw`w-[160px] h-[120px] rounded-[8px] mt-[10px]`, { backgroundColor: Colors.colors.light_gray2 }]}
            />
          ) : null}

          {config.message ? (
            <View style={config.title || config.requestInfo?.thumbnailUrl ? tw`mt-[10px]` : undefined}>
              <Txt variant='auxiliaryTextLight'>{config.message}</Txt>
            </View>
          ) : null}

          {hasPrimary || hasSecondary || hasTertiary ? (
            <View style={tw`flex-row flex-wrap gap-[8px] pt-[10px]`}>
              {hasTertiary && (
                <TouchableOpacity
                  onPress={() => handleTertiary(config)}
                  disabled={!!config.tertiary?.disabled || loading}
                  style={[
                    tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                    {
                      backgroundColor: Colors.colors.white,
                      borderWidth: 1,
                      borderColor: Colors.colors.error_red,
                      opacity: config.tertiary?.disabled || loading ? 0.5 : 1,
                    },
                  ]}
                >
                  <Txt variant='auxiliaryTextLight' color='error_red'>
                    {config.tertiary!.label}
                  </Txt>
                </TouchableOpacity>
              )}

              {hasSecondary && (
                <TouchableOpacity
                  onPress={() => handleSecondary(config)}
                  disabled={!!config.secondary?.disabled || loading}
                  style={[
                    tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                    {
                      backgroundColor: Colors.colors.white,
                      borderWidth: 1,
                      borderColor: Colors.colors.light_gray2,
                      opacity: config.secondary?.disabled || loading ? 0.5 : 1,
                    },
                  ]}
                >
                  <Txt variant='auxiliaryTextLight' color='dark_gray1'>
                    {config.secondary!.label}
                  </Txt>
                </TouchableOpacity>
              )}
              {hasPrimary && (
                <TouchableOpacity
                  onPress={() => handlePrimary(config)}
                  disabled={!!config.primary?.disabled || loading}
                  style={[
                    tw`py-[8px] px-[14px] rounded-[8px] items-center justify-center`,
                    {
                      backgroundColor: Colors.colors.main_yellow,
                      opacity: config.primary?.disabled || loading ? 0.5 : 1,
                    },
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
  };

  return <View style={tw`w-full`}>{renderCard(config)}</View>;
}
