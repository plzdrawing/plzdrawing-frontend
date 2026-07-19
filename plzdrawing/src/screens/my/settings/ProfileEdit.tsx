import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View, ScrollView } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';
import Txt from '@/src/components/ui/Txt';
import TextField from '@/src/components/ui/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/ui/button/Button';
import ProfileImageUploader from '@/src/components/ui/input/ProfileImgUploader';

import { BackArrowIcon } from '@/assets/images';

import { memberController } from '@/src/apis/controller/member';

type ProfileEditProps = NativeStackScreenProps<
  RootStackParamList, 'ProfileEdit'
>;

export default function ProfileEdit({ route, navigation }: ProfileEditProps) {
  const [nickname, setNickname] = useState('');
  const [nicknameState, setNicknameState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [introduction, setIntroduction] = useState('');
  const [introductionState, setIntroductionState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [hashtags, setHashtags] = useState('');
  const [hashtagState, setHashtagState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // 초기 데이터
  const [initialData, setInitialData] = useState({
    nickname: '',
    introduction: '',
    hashtags: '',
    imageUrl: '',
  });

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await memberController.checkMyProfile();
        const data = response as any;
        
        if (data && data.nickname) {
          const hashtagsStr = (data.hashtags || []).join(' ');
          setNickname(data.nickname || '');
          setIntroduction(data.introduction || '');
          setHashtags(hashtagsStr);
          
          setInitialData({
            nickname: data.nickname || '',
            introduction: data.introduction || '',
            hashtags: hashtagsStr,
            imageUrl: data.profileImageUrl || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 변경사항 확인
  const hasChanges = () => {
    return (
      nickname !== initialData.nickname ||
      introduction !== initialData.introduction ||
      hashtags !== initialData.hashtags ||
      newImageUri !== null
    );
  };

  // 저장 처리
  const handleSave = async () => {
    if (!hasChanges()) return;
    
    setIsSaving(true);
    try {
      const imageFile = newImageUri 
        ? { uri: newImageUri, name: 'profile.jpg', type: 'image/jpeg' } as unknown as File 
        : undefined;
      
      if (imageFile) {
        await memberController.editProfile(
          imageFile,
          nickname || initialData.nickname,
          introduction || initialData.introduction,
          hashtags.split(' ').filter(tag => tag.trim()) || initialData.hashtags.split(' ').filter(tag => tag.trim()),
        );
      } else {
        await memberController.editProfile(
          {} as File,
          nickname || initialData.nickname,
          introduction || initialData.introduction,
          hashtags.split(' ').filter(tag => tag.trim()) || initialData.hashtags.split(' ').filter(tag => tag.trim()),
        );
      }
      
      // 성공 후 Profile 페이지로 이동
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('프로필 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-white`}>
        <Header
          title='프로필 수정'
          leftIcon={<BackArrowIcon />}
          className='pb-[12px]'
        />
        <Txt variant='bodyText' style={tw`text-center mt-[50px]`}>
          로딩 중...
        </Txt>
      </View>
    );
  }

  return (
    <Container className='w-full'>
      <Header
        title='프로필 수정'
        leftIcon={<BackArrowIcon />}
        className='pb-[12px]'
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`p-[32px] w-full flex-1 bg-light-gray-1`}
      >
        <ProfileImageUploader
          initialImageUrl={initialData.imageUrl}
          onImageSelected={setNewImageUri}
        />

        <Txt variant='subtitleBold' style={tw`mt-[22px] mb-[14px]`}>
          닉네임
        </Txt>
        <TextField
          placeholder={initialData.nickname || '닉네임을 입력하세요'}
          state={nicknameState}
          setState={setNicknameState}
          value={nickname}
          onChangeText={setNickname}
        />

        <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[14px]`}>
          한 줄 소개
        </Txt>
        <TextField
          placeholder={initialData.introduction || '자기소개를 입력하세요'}
          state={introductionState}
          setState={setIntroductionState}
          value={introduction}
          onChangeText={setIntroduction}
        />

        <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[14px]`}>
          해시태그
        </Txt>
        <TextField
          placeholder={initialData.hashtags || '#태그를 입력하세요'}
          state={hashtagState}
          setState={setHashtagState}
          value={hashtags}
          onChangeText={setHashtags}
        />
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <Button
            isValid={hasChanges()}
            title='확인'
            onClick={handleSave}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
