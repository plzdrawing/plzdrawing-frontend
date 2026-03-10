import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import { View, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import TextAreaField from '@/src/components/common/input/TextAreaField';
import ImgUploader, { ImageFile } from '@/src/components/common/input/ImgUploader';
import ChipButton from '@/src/components/common/button/ChipButton';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import { AddIcon } from '@/assets/images';

import { postController } from '@/src/apis/controller/post';

export default function PostUpload() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [images, setImages] = useState<ImageFile[]>([]);
  const [title, setTitle] = useState('');
  const [titleState, setTitleState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagInputState, setTagInputState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#+/, '');
    if (!trimmed) return;
    if (hashTags.includes(trimmed)) return;
    setHashTags((prev) => [...prev, trimmed]);
    setTagInput('');
    setTagInputState('empty');
    Keyboard.dismiss();
  };

  const handleRemoveTag = (tag: string) => {
    setHashTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!isValid || isLoading) return;
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      await postController.uploadPost(images, title.trim(), content.trim(), hashTags);
      navigation.goBack();
    } catch (error) {
      console.error('게시글 업로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header title='게시글 업로드' />
      <ScrollView
        style={tw`flex-1 w-full`}
        contentContainerStyle={tw`px-[20px] pt-[20px] pb-[120px] gap-[24px]`}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        {/* 이미지 */}
        <ImgUploader maxImages={3} onImagesChange={setImages} />

        {/* 제목 */}
        <View style={tw`gap-[9px]`}>
          <Txt variant='subtitleBold'>제목</Txt>
          <TextField
            placeholder='제목을 입력해 주세요'
            state={titleState}
            setState={setTitleState}
            validation={(text) => setTitle(text)}
          />
        </View>

        {/* 내용 */}
        <TextAreaField
          label='내용'
          placeholder='내용을 입력해 주세요'
          value={content}
          onChange={setContent}
          maxLength={2000}
        />

        {/* 해시태그 */}
        <View style={tw`gap-[9px]`}>
          <Txt variant='subtitleBold'>해시태그</Txt>
          <View style={tw`flex-row items-center gap-[8px]`}>
            <View style={tw`flex-1`}>
              <TextField
                placeholder='태그 입력 후 추가 버튼을 눌러 주세요'
                state={tagInputState}
                setState={setTagInputState}
                validation={(text) => setTagInput(text)}
                value={tagInput}
                onChangeText={(text) => setTagInput(text)}
                onSubmitEditing={handleAddTag}
                returnKeyType='done'
              />
            </View>
            <TouchableOpacity
              onPress={handleAddTag}
              style={tw`w-[46px] h-[52px] rounded-[12px] bg-sub-yellow items-center justify-center`}
            >
              <AddIcon />
            </TouchableOpacity>
          </View>
          {hashTags.length > 0 && (
            <View style={tw`flex-row flex-wrap gap-[8px] mt-[4px]`}>
              {hashTags.map((tag) => (
                <ChipButton
                  key={tag}
                  title={`#${tag}`}
                  isSelected
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`px-[20px] py-[12px]`}>
          <PrimaryButton
            title={isLoading ? '업로드 중...' : '업로드'}
            isValid={isValid && !isLoading}
            onClick={handleSubmit}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
