import tw from '@/src/lib/tailwind';
import { useEffect, useState } from 'react';
import { View, ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
import ConfirmModal from '@/src/components/common/modal/ConfirmModal';
import { AddIcon } from '@/assets/images';

import { postController } from '@/src/apis/controller/post';

type RouteProps = RouteProp<RootStackParamList, 'PostEditor'>;

export default function PostEditor() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const postId = route.params?.postId;
  const isEditMode = !!postId;

  const [images, setImages] = useState<ImageFile[]>([]);
  const [title, setTitle] = useState('');
  const [titleState, setTitleState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [content, setContent] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  const [timeTakenState, setTimeTakenState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [priceInput, setPriceInput] = useState('');
  const [priceInputState, setPriceInputState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [tagInput, setTagInput] = useState('');
  const [tagInputState, setTagInputState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [category, setCategory] = useState<'REQUEST' | 'DRAWING'>('DRAWING');
  const [isLoading, setIsLoading] = useState(false);
  const [isPrefilling, setIsPrefilling] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadPostForEdit = async () => {
      if (!postId) return;

      setIsPrefilling(true);
      try {
        const post: any = await postController.getPost(postId);
        const postTitle = post?.title ?? '';
        const postContent = post?.content ?? '';
        const postTimeTaken = post?.timeTaken ?? '';
        const postPrice = typeof post?.price === 'number' ? String(post.price) : '';
        const postHashTags: string[] = Array.isArray(post?.postTags)
          ? post.postTags
              .map((item: any) => item?.tag?.name ?? item?.name)
              .filter((tag: string | undefined) => !!tag)
          : [];

        setTitle(postTitle);
        setTitleState(postTitle ? 'filled' : 'empty');
        setContent(postContent);
        setTimeTaken(postTimeTaken);
        setTimeTakenState(postTimeTaken ? 'filled' : 'empty');
        setPriceInput(postPrice);
        setPriceInputState(postPrice ? 'filled' : 'empty');
        setHashTags(postHashTags);
      } catch (error) {
        console.error('게시글 정보 조회 실패:', error);
        Alert.alert('오류', '게시글 정보를 불러오지 못했습니다.');
      } finally {
        setIsPrefilling(false);
      }
    };

    loadPostForEdit();
  }, [postId]);

  const isValid = images.length > 0 && title.trim().length > 0 && content.trim().length > 0 && hashTags.length > 0;

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
    if (!isValid || isLoading || isPrefilling) return;
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      if (isEditMode && postId) {
        console.log('[PostEditor] 게시글 수정:', {
          postId,
          imagesCount: images.length,
          title: title.trim(),
          content: content.trim(),
          hashTags,
        });
        await postController.updatePost(postId, {
          newImages: images.length > 0 ? images : undefined,
          title: title.trim(),
          content: content.trim(),
          hashTag: hashTags,
        });
      } else {
        // category가 DRAWING이면 timeTaken과 price 포함
        // 주의: 백엔드에서 timeTaken과 price를 허용하지 않으므로 undefined로 전송
        console.log('[PostEditor] 게시글 생성 준비:', {
          imagesCount: images.length,
          title: title.trim(),
          content: content.trim(),
          timeTaken: timeTaken.trim() || undefined,
          price: priceInput.trim() ? Number(priceInput.trim()) : undefined,
          hashTags,
          category,
        });

        await postController.createPost(
          images,
          title.trim(),
          content.trim(),
          undefined,
          undefined,
          hashTags,
          category,
        );
      }
      navigation.goBack();
    } catch (error) {
      console.error('게시글 저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!postId || isLoading || isPrefilling) return;

    setIsLoading(true);
    try {
      await postController.deletePost(postId);
      navigation.goBack();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      Alert.alert('오류', '게시글을 삭제하지 못했습니다.');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <Container>
      <Header title={isEditMode ? '게시글 수정' : '게시글 올리기'} />
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
          <Txt variant='subtitleBold'>간단한 그림 설명을 해주세요</Txt>
          <TextField
            placeholder='30자 이내로 작성해주세요'
            state={titleState}
            setState={setTitleState}
            validation={(text) => setTitle(text)}
            value={title}
            onChangeText={(text) => setTitle(text)}
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

        {!isEditMode && (
          <>
            {/* 금액 */}
            <View style={tw`gap-[9px]`}>
              <Txt variant='subtitleBold'>금액 (선택)</Txt>
              <TextField
                placeholder='예: 10000'
                state={priceInputState}
                setState={setPriceInputState}
                validation={(text) => setPriceInput(text.replace(/[^0-9]/g, ''))}
                value={priceInput}
                onChangeText={(text) => setPriceInput(text.replace(/[^0-9]/g, ''))}
                keyboardType='numeric'
                returnKeyType='done'
              />
            </View>

            {/* 소요시간 */}
            <View style={tw`gap-[9px]`}>
              <Txt variant='subtitleBold'>소요시간 (선택)</Txt>
              <TextField
                placeholder='예: 3일, 1주일'
                state={timeTakenState}
                setState={setTimeTakenState}
                validation={(text) => setTimeTaken(text)}
                value={timeTaken}
                onChangeText={(text) => setTimeTaken(text)}
                returnKeyType='done'
              />
            </View>
          </>
        )}
      </ScrollView>

      <BottomFixedArea>
        <View style={tw`px-[20px] py-[12px] gap-[10px] bg-white`}>
          <PrimaryButton
            title={isLoading ? (isEditMode ? '수정 중...' : '업로드 중...') : isEditMode ? '수정하기' : '업로드'}
            isValid={isValid && !isLoading && !isPrefilling}
            onClick={handleSubmit}
          />
          {isEditMode && (
            <TouchableOpacity
              onPress={() => setShowDeleteConfirm(true)}
              disabled={isLoading || isPrefilling}
              style={tw`w-full py-[10px] px-[20px] rounded-[12px] items-center border border-error-red bg-white`}
            >
              <Txt variant='bodyText' color='error_red' align='center'>
                게시글 삭제
              </Txt>
            </TouchableOpacity>
          )}
        </View>
      </BottomFixedArea>

      {showDeleteConfirm && (
        <ConfirmModal
          modalTitle='정말 게시글을 삭제하시겠습니까?'
          cancelTitle='취소'
          confirmTitle='삭제'
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </Container>
  );
}
