import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import { View, Keyboard, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {
  CameraIcon,
  DrawerIcon,
  FileIcon,
  PictureIcon,
  SendIcon,
} from '@/assets/images';
import Colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/Txt';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleSendImage: (image: {
    uri: string;
    name: string;
    type: string;
    width: number;
    height: number;
    size?: number;
  }) => void;
  canSendFinalDrawing?: boolean;
  onSendFinalDrawing?: () => void;
  isSendingFinalDrawing?: boolean;
  onLeaveChatRoom?: () => void;
  isLeavingChatRoom?: boolean;
  onTestStatusChange?: () => void;
  isTestStatusChanging?: boolean;
  isOpenMenu?: boolean;
  setIsOpenMenu?: (isOpenMenu: boolean) => void;
}

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  handleSendImage,
  canSendFinalDrawing = false,
  onSendFinalDrawing,
  isSendingFinalDrawing = false,
  onLeaveChatRoom,
  isLeavingChatRoom = false,
  onTestStatusChange,
  isTestStatusChanging = false,
  isOpenMenu = false,
  setIsOpenMenu = () => {},
}: ChatInputProps) => {
  const MIN_INPUT_HEIGHT = 40;
  const MAX_INPUT_HEIGHT = 132;
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);

  const handleOpenMenu = () => {
    Keyboard.dismiss();
    setIsOpenMenu(!isOpenMenu);
  };

  const addWatermark = async (
    uri: string,
  ): Promise<{ uri: string; width: number; height: number }> => {
    try {
      const resized = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      );
      return { uri: resized.uri, width: resized.width, height: resized.height };
    } catch {
      return { uri, width: 0, height: 0 };
    }
  };

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        const transformed = await addWatermark(asset.uri);
        const width = transformed.width > 0 ? transformed.width : (asset.width ?? 0);
        const height = transformed.height > 0 ? transformed.height : (asset.height ?? 0);

        handleSendImage({
          uri: transformed.uri,
          name: asset.fileName ?? `chat-${Date.now()}.jpg`,
          type: 'image/jpeg',
          width,
          height,
          size: asset.fileSize,
        });
      }
    } catch {
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
    }
  };

  const iconStyle = (color: string, borderWidth = 0) => ({
    width: 45,
    height: 45,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: color,
    borderWidth,
    borderColor: Colors.colors.light_gray2,
    borderRadius: 12,
  });

  return (
    <View>
      <View style={tw`flex-row p-[12px] px-[18px] items-end justify-between gap-[6px] bg-white`}>
        <TouchableOpacity onPress={handleOpenMenu}>
          <View style={iconStyle(Colors.colors.main_yellow)}>
            <CameraIcon />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder='메시지를 입력하세요'
          value={message}
          onChangeText={setMessage}
          multiline
          onContentSizeChange={(e) => {
            const next = Math.max(
              MIN_INPUT_HEIGHT,
              Math.min(MAX_INPUT_HEIGHT, Math.ceil(e.nativeEvent.contentSize.height + 6)),
            );
            setInputHeight(next);
          }}
          blurOnSubmit={false}
          returnKeyType='send'
          textAlignVertical='top'
          scrollEnabled={inputHeight >= MAX_INPUT_HEIGHT}
          style={{
            flex: 1,
            color: Colors.colors.black,
            backgroundColor: Colors.colors.sub_yellow,
            fontFamily: 'SsurroundAir',
            minHeight: MIN_INPUT_HEIGHT,
            maxHeight: MAX_INPUT_HEIGHT,
            height: inputHeight,
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <View style={iconStyle(Colors.colors.sub_yellow)}>
            <SendIcon />
          </View>
        </TouchableOpacity>
      </View>

      {isOpenMenu && (
        <View style={tw`p-[15px] px-[32px] gap-[12px]`}>
          <View style={tw`flex-row gap-[14px] items-center`}>
            <View style={iconStyle(Colors.colors.light_gray1, 1)}>
              <FileIcon />
            </View>
            <Txt variant='bodyText' color='black'>
              파일 보내기
            </Txt>
          </View>
          <TouchableOpacity onPress={handlePickImage}>
            <View style={tw`flex-row gap-[14px] items-center`}>
              <View style={iconStyle(Colors.colors.light_gray1, 1)}>
                <PictureIcon />
              </View>
              <Txt variant='bodyText' color='black'>
                사진 보내기
              </Txt>
            </View>
          </TouchableOpacity>
          <View style={tw`flex-row gap-[14px] items-center`}>
            <View style={iconStyle(Colors.colors.light_gray1, 1)}>
              <CameraIcon />
            </View>
            <Txt variant='bodyText' color='black'>
              직접 촬영하기
            </Txt>
          </View>
          {canSendFinalDrawing ? (
            <TouchableOpacity
              onPress={() => {
                setIsOpenMenu(false);
                onSendFinalDrawing?.();
              }}
              disabled={isSendingFinalDrawing}
            >
              <View style={tw`flex-row gap-[14px] items-center`}>
                <View style={iconStyle(Colors.colors.light_gray1, 1)}>
                  <Txt variant='auxiliaryTextLight' color='dark_gray2'>
                    🎨
                  </Txt>
                </View>
                <Txt variant='bodyText' color='black'>
                  {isSendingFinalDrawing ? '완성그림 전송 중...' : '완성그림 보내기'}
                </Txt>
              </View>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(false);
              onTestStatusChange?.();
            }}
            disabled={isTestStatusChanging}
          >
            <View style={tw`flex-row gap-[14px] items-center`}>
              <View style={iconStyle(Colors.colors.light_gray1, 1)}>
                <Txt variant='auxiliaryTextLight' color='dark_gray2'>
                  🧪
                </Txt>
              </View>
              <Txt variant='bodyText' color='dark_gray2'>
                {isTestStatusChanging ? '상태 변경 중...' : '상태 변경 (CANCELLED)'}
              </Txt>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsOpenMenu(false);
              onLeaveChatRoom?.();
            }}
            disabled={isLeavingChatRoom}
          >
            <View style={tw`flex-row gap-[14px] items-center`}>
              <View style={iconStyle(Colors.colors.light_gray1, 1)}>
                <DrawerIcon />
              </View>
              <Txt variant='bodyText' color='error_red'>
                {isLeavingChatRoom ? '채팅방 나가는 중...' : '채팅방 나가기'}
              </Txt>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatInput;
