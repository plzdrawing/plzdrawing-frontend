import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';
import ImageUploader from '@/src/components/ui/input/ImgUploader';
import Txt from '@/src/components/ui/Txt';
import TextField from '@/src/components/ui/input/TextField';
import Button from '@/src/components/ui/button/Button';

import { BackArrowIcon } from '@/assets/images';

import { memberController } from '@/src/apis/controller/member';

type ProfileUploadScreenProps = NativeStackScreenProps<
  RootStackParamList, 'ProfileUpload'
>;

export default function ProfileUpload({ route, navigation }: ProfileUploadScreenProps) {
  const [introduceText, setIntroduceText] = useState("");
  const [introduceState, setIntroduceState] = useState("");
  const [keywordText, setKeywordText] = useState("");
  const [keywordState, setKeywordState] = useState("");
  const [profileImages, setProfileImages] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const handleButtonPress = async () => {
    if (isUploading) return;
    
    // 해시태그 처리 (쉼표 또는 공백으로 구분)
    const hashtags = keywordText
      .split(/[,\s]+/)
      .filter(tag => tag.trim() !== '')
      .map(tag => tag.trim());

    try {
      setIsUploading(true);
      
      const imageUri = profileImages[0];
      // [수정] 파일명 뒤에 확장자가 없거나 webp일 경우를 대비해 처리
      const filename = imageUri.split('/').pop() || 'profile.jpg';
      
      // [!code ++] 확장자와 상관없이 서버 호환성을 위해 jpg/jpeg로 설정
      // (서버가 확장자로 검사하는 경우 통과하기 위함)
      const newName = filename.toLowerCase().endsWith('.webp') 
        ? filename.replace(/\.webp$/, '.jpg') 
        : filename;

      const imageFile = {
        uri: imageUri,
        name: newName,      // 이름을 .jpg로 변경
        type: 'image/jpeg', // MIME type을 jpeg로 강제
      } as any;
      
      await memberController.uploadProfile(
        imageFile,
        introduceText,
        hashtags,
      );
      
      console.log('프로필 업로드 성공');
      navigation.navigate("DrawingCardUpload");
    } catch (error) {
      console.error('프로필 업로드 실패:', error, introduceText, hashtags, profileImages);
      // TODO: 에러 모달 표시
    }
  };

  return (
    <Container className='w-full'>
      <Header 
        title='프로필 올리기'
        leftIcon={<BackArrowIcon />}
        className='pb-[12px]'
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={tw`flex-1`}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          style={tw`flex-1 bg-light-gray-1`}
          contentContainerStyle={tw`pb-[120px]`}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`px-[30px] pt-[17px]`}>
            <ImageUploader
              title='프로필 그림을 올려볼까요?'
              onImagesChange={setProfileImages}
              maxImages={1}
            />

            <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[17px]`}>
              간단한 소개를 해볼까요?
            </Txt>
            <TextField
              placeholder='한줄로 나를 어필해볼까요?'
              setState={setIntroduceState}
              value={introduceText}
              onChangeText={setIntroduceText}
              className='bg-light-gray-1'
            />

            <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[17px]`}>
              해시태그로 자신을 표현해주세요
            </Txt>
            <TextField
              placeholder='키워드로 나를 어필해볼까요?'
              setState={setKeywordState}
              value={keywordText}
              onChangeText={setKeywordText}
              className='bg-light-gray-1'
            />
          </View>
        </ScrollView>

        <View style={tw`fixed bottom-0 left-0 right-0 w-full items-center py-[17px] bg-light-gray-1`}>
          <Button
            title='저장하기'
            variant='default'
            onClick={handleButtonPress}
            className='w-[335px]'
            isValid={
              introduceText.trim() !== '' && 
              keywordText.trim() !== '' &&
              profileImages.length > 0
            }
            disabled={isUploading}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
}
  