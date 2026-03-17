import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import FontStyles from '@/src/constants/Fonts';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/common/button/Button';
import ProfileImageUploader from '@/src/components/common/input/ProfileImgUploader';
import AlertModal from '@/src/components/common/modal/AlertModal';

import { BackArrowIcon } from '@/assets/images';
import { memberController } from '@/src/apis/controller/member';

type Props = StackScreenProps<RootStackParamList, 'ProfileEdit'>;

const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/;

export default function ProfileEdit({ navigation }: Props) {
  const [nickname, setNickname] = useState('');
  const [nicknameState, setNicknameState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [nicknameErrors, setNicknameErrors] = useState<string[]>([]);

  const [introduction, setIntroduction] = useState('');
  const [introductionState, setIntroductionState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [introductionError, setIntroductionError] = useState('');

  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtagErrors, setHashtagErrors] = useState<string[]>([]);
  const [hashtagInputHasError, setHashtagInputHasError] = useState(false);
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [initialData, setInitialData] = useState({
    nickname: '',
    introduction: '',
    hashtags: [] as string[],
    imageUrl: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await memberController.checkMyProfile();
        const data = response as any;
        if (data?.nickname) {
          const tags = (data.hashTags || data.hashtags || []) as string[];
          setNickname(data.nickname || '');
          setNicknameState(data.nickname ? 'filled' : 'empty');
          setIntroduction(data.introduce || '');
          setIntroductionState(data.introduce ? 'filled' : 'empty');
          setHashtagList(tags);
          setInitialData({
            nickname: data.nickname || '',
            introduction: data.introduce || '',
            hashtags: tags,
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

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    const errors: string[] = [];
    if (text.length > 0) {
      if (SPECIAL_CHAR_REGEX.test(text)) errors.push('특수문자 사용금지');
      if (text.length > 20) errors.push('20자 이내로 입력해주세요');
    }
    setNicknameErrors(errors);
    setNicknameState(text.length === 0 ? 'empty' : errors.length > 0 ? 'error' : 'filled');
  };

  const handleIntroductionChange = (text: string) => {
    setIntroduction(text);
    if (text.length === 0) {
      setIntroductionState('empty');
      setIntroductionError('');
    } else if (text.length > 30) {
      setIntroductionState('error');
      setIntroductionError('30자 이내로 입력해주세요');
    } else {
      setIntroductionState('filled');
      setIntroductionError('');
    }
  };

  const handleHashtagInputChange = (text: string) => {
    setHashtagInput(text);
    const errors: string[] = [];
    if (text.length > 0) {
      if (SPECIAL_CHAR_REGEX.test(text)) errors.push('특수문자 사용금지');
      if (text.length > 10) errors.push('각 문자열 10자 이내');
    }
    setHashtagErrors(errors);
    setHashtagInputHasError(errors.length > 0);
  };

  const handleAddHashtag = () => {
    const trimmed = hashtagInput.trim();
    if (!trimmed || hashtagInputHasError) return;
    if (hashtagList.length >= 5) {
      setHashtagErrors(['#문자열 5개 이하']);
      setHashtagInputHasError(true);
      return;
    }
    setHashtagList([...hashtagList, trimmed]);
    setHashtagInput('');
    setHashtagInputHasError(false);
    setHashtagErrors([]);
  };

  const handleRemoveHashtag = (index: number) => {
    setHashtagList(hashtagList.filter((_, i) => i !== index));
  };

  const isFormValid = () =>
    nicknameState !== 'error' &&
    nicknameState !== 'failed' &&
    introductionState !== 'error' &&
    introductionState !== 'failed' &&
    !hashtagInputHasError;

  const hasChanges = () =>
    nickname !== initialData.nickname ||
    introduction !== initialData.introduction ||
    JSON.stringify(hashtagList) !== JSON.stringify(initialData.hashtags) ||
    newImageUri !== null;

  const handleSave = async () => {
    if (!hasChanges() || !isFormValid() || isSaving) return;
    setIsSaving(true);
    try {
      const imageFile = newImageUri
        ? { uri: newImageUri, name: 'profile.jpg', type: 'image/jpeg' }
        : {};

      await memberController.editProfile(
        imageFile,
        nickname || initialData.nickname,
        introduction || initialData.introduction,
        hashtagList,
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container className='w-full'>
        <Header title='프로필 수정' leftIcon={<BackArrowIcon />} className='pb-[12px]' />
        <Txt variant='bodyText' style={tw`text-center mt-[50px]`}>
          로딩 중...
        </Txt>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      {showSuccessModal && (
        <AlertModal
          modalTitle='프로필 수정이 완료되었습니다 :)'
          buttonTitle='확인'
          onClickButton={() => navigation.goBack()}
        />
      )}
      <Header title='프로필 수정' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

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
          onChangeText={handleNicknameChange}
        />
        {nicknameErrors.map((msg, i) => (
          <Txt key={i} variant='bodySubText' color='error_red' style={tw`ml-[20px] mt-[4px]`}>{msg}</Txt>
        ))}

        <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[14px]`}>
          한 줄 소개
        </Txt>
        <TextField
          placeholder={initialData.introduction || '자기소개를 입력하세요'}
          state={introductionState}
          setState={setIntroductionState}
          value={introduction}
          onChangeText={handleIntroductionChange}
          errorMessage={introductionError}
        />

        <Txt variant='subtitleBold' style={tw`mt-[27px] mb-[14px]`}>
          해시태그
        </Txt>

        <View style={tw`gap-[9px]`}>
          {/* Input row: # prefix + text input + 확인 button */}
          <View
            style={[
              tw`flex-row items-center w-full rounded-[12px] border bg-white`,
              hashtagInputHasError ? tw`border-error-red` : tw`border-light-gray-2`,
            ]}
          >
            <Txt variant='bodySubText' color='highlight_orange' style={tw`ml-[16px]`}>
              #
            </Txt>
            <TextInput
              style={[tw`flex-1 px-[8px] py-[17.5px]`, FontStyles.bodySubText, { color: '#000000' }]}
              placeholder='태그를 입력하세요'
              placeholderTextColor={tw.color('dark-gray-1')}
              value={hashtagInput}
              onChangeText={handleHashtagInputChange}
              onSubmitEditing={handleAddHashtag}
              returnKeyType='done'
            />
            <TouchableOpacity
              onPress={handleAddHashtag}
              disabled={!hashtagInput.trim() || hashtagInputHasError}
              style={[
                tw`mr-[8px] px-[14px] py-[8px] rounded-[8px]`,
                !hashtagInput.trim() || hashtagInputHasError
                  ? tw`bg-sub-yellow/35`
                  : tw`bg-sub-yellow`,
              ]}
            >
              <Txt variant='bodySubText' color='black'>확인</Txt>
            </TouchableOpacity>
          </View>

          {hashtagErrors.map((msg, i) => (
            <Txt key={i} variant='bodySubText' color='error_red' style={tw`ml-[20px]`}>{msg}</Txt>
          ))}

          {/* Hashtag chips */}
          {hashtagList.length > 0 && (
            <View style={tw`flex-row flex-wrap gap-[8px]`}>
              {hashtagList.map((tag, index) => (
                <View
                  key={index}
                  style={tw`flex-row items-center bg-white border border-light-gray-2 rounded-[20px] px-[12px] py-[7px]`}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveHashtag(index)}
                    style={tw`w-[18px] h-[18px] rounded-full bg-light-gray-2 items-center justify-center mr-[6px]`}
                  >
                    <Txt variant='auxiliaryTextBold' color='dark_gray2'>✕</Txt>
                  </TouchableOpacity>
                  <Txt variant='bodySubText' color='black'>#{tag}</Txt>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={tw`h-[120px]`} />
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <Button
            isValid={hasChanges() && isFormValid() && !isSaving}
            title={isSaving ? '저장 중...' : '확인'}
            onClick={handleSave}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
