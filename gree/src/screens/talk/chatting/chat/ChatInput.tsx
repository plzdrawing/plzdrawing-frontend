import tw from '@/src/lib/tailwind';
import { View, Keyboard, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {
  AddIcon,
  CameraIcon,
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
  handleSendImage: (imageUri: string) => void;
  isOpenMenu?: boolean;
  setIsOpenMenu?: (isOpenMenu: boolean) => void;
}

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  handleSendImage,
  isOpenMenu = false,
  setIsOpenMenu = () => {},
}: ChatInputProps) => {
  const handleOpenMenu = () => {
    Keyboard.dismiss();
    setIsOpenMenu(!isOpenMenu);
  };

  const addWatermark = async (uri: string): Promise<string> => {
    try {
      const resized = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.PNG },
      );
      return resized.uri;
    } catch {
      return uri;
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const watermarkedUri = await addWatermark(result.assets[0].uri);
        handleSendImage(watermarkedUri);
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
      <View style={tw`flex-row p-[12px] px-[18px] items-center justify-between gap-[6px] bg-white`}>
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
          numberOfLines={4}
          style={{
            flex: 1,
            color: Colors.colors.black,
            backgroundColor: Colors.colors.sub_yellow,
            fontFamily: 'SsurroundAir',
            height: 45,
            borderRadius: 12,
            paddingVertical: 13.5,
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
        </View>
      )}
    </View>
  );
};

export default ChatInput;
