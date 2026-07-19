import tw from '@/src/lib/tailwind';
import { useEffect, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import { authController } from '@/src/apis/controller/auth';
import { postController } from '@/src/apis/controller/post';
import { chatController } from '@/src/apis/controller/chat';

import * as ImagePicker from 'expo-image-picker';

import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

import { BackArrowIcon, CameraIcon } from '@/assets/images';

type RouteProps = RouteProp<RootStackParamList, 'HomePostDetail'>;

const MAX_LENGTH = 200;
const MAX_IMAGES = 5;
const AUTO_REQUEST_MESSAGE = '그림 요청이 도착했어요:) 요청서를 확인해볼까요?';

export default function HomePostDetail() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { postId } = route.params;

  const [requestText, setRequestText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [canEditPost, setCanEditPost] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkOwnership = async () => {
      try {
        const [post, me] = await Promise.all([
          postController.getPost(postId),
          authController.checkProfile(),
        ]);

        if (!isMounted) return;

        setCanEditPost(Number(post?.memberId) === Number(me?.id));
      } catch {
        if (!isMounted) return;
        setCanEditPost(false);
      }
    };

    checkOwnership();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const pickImage = async () => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert('안내', `사진은 최대 ${MAX_IMAGES}장까지 첨부할 수 있어요.`);
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('권한 필요', '사진 접근 권한을 허용해주세요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
      allowsEditing: false,
    });

    if (result.canceled || !result.assets?.length) return;

    const nextUri = result.assets[0].uri;
    if (!nextUri) return;

    setImages((prev) => [...prev, nextUri]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadAndSendImage = async (chatRoomId: number, imageUri: string) => {
    await chatController.sendImageMessage(chatRoomId, {
      uri: imageUri,
      name: `request-${Date.now()}.jpg`,
      type: 'image/jpeg',
    });
  };

  const handleSend = async () => {
    if (isSending) return;

    const trimmedRequest = requestText.trim();
    if (!trimmedRequest && images.length === 0) {
      Alert.alert('안내', '요청 내용을 입력하거나 참고 사진을 첨부해주세요.');
      return;
    }

    setIsSending(true);
    try {
      const created = await chatController.createChatRoom({
        postId: Number(postId),
        description: trimmedRequest || undefined,
      });

      const chatRoomId = created.chatRoom.chatRoomId;

      await chatController.sendTextMessage(chatRoomId, AUTO_REQUEST_MESSAGE);

      if (trimmedRequest) {
        await chatController.sendTextMessage(chatRoomId, `요청서: ${trimmedRequest}`);
      }

      for (const uri of images) {
        await uploadAndSendImage(chatRoomId, uri);
      }

      navigation.navigate('HomeRequestComplete', { chatRoomId });
    } catch (error: any) {
      console.error('Failed to send request:', error);
      Alert.alert('실패', error?.response?.data?.message ?? '요청 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container className='w-full'>
      <Header
        title='요청하기'
        leftIcon={<BackArrowIcon />}
        rightIcon={canEditPost ? <Txt variant='bodyText' color='dark_gray2'>수정</Txt> : undefined}
        onRightClick={canEditPost ? () => navigation.navigate('PostEditor', { postId }) : undefined}
        className='pb-[12px]'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] pt-[28px] pb-[140px]`}>
          <Txt variant='mainTitleBold' style={tw`mb-[14px]`}>
            요청 내용을 입력해주세요
          </Txt>

          <View style={tw`w-full rounded-[12px] border border-light-gray-2 bg-light-gray-1 px-[16px] py-[14px] mb-[24px]`}>
            <TextInput
              value={requestText}
              onChangeText={(text) => setRequestText(text.slice(0, MAX_LENGTH))}
              multiline
              placeholder='텍스트'
              placeholderTextColor={tw.color('dark-gray-1')}
              style={tw`min-h-[90px] text-[14px] text-black`}
              textAlignVertical='top'
              maxLength={MAX_LENGTH}
            />
            <Txt variant='bodySubText' color='dark_gray1' align='right'>
              {requestText.length}/{MAX_LENGTH}
            </Txt>
          </View>

          <Txt variant='mainTitleBold'>참고 사진이 있나요?</Txt>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[10px]`}>
            최대 {MAX_IMAGES}개
          </Txt>

          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={pickImage}
              style={tw`w-[58px] h-[58px] rounded-[8px] border border-light-gray-2 bg-light-gray-1 items-center justify-center mr-[8px]`}
            >
              <CameraIcon />
            </TouchableOpacity>

            {images.map((uri, index) => (
              <View key={`${uri}-${index}`} style={tw`mr-[8px]`}>
                <Image source={{ uri }} style={tw`w-[58px] h-[58px] rounded-[8px]`} />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={tw`absolute -top-[6px] -right-[6px] w-[16px] h-[16px] rounded-full bg-light-gray-2 items-center justify-center`}
                >
                  <Txt variant='secondaryText' color='white'>x</Txt>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <PrimaryButton
            title={isSending ? '보내는 중...' : '보내기'}
            color='sub_yellow'
            isValid={!isSending}
            onClick={handleSend}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
