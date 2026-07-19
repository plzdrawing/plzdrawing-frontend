import tw from '@/src/lib/tailwind';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, TextInput, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQueryClient } from '@tanstack/react-query';

import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import { RootStackParamList } from '@/src/navigation/types';
import { reviewController } from '@/src/apis/controller/review';

const KEYWORDS = ['귀여워요', '친절해요', '섬세해요', '빠르게 작업해요', '소통이 잘돼요'];

type ReviewCreateRoute = RouteProp<RootStackParamList, 'ReviewCreate'>;
type ReviewCreateNavigation = StackNavigationProp<RootStackParamList, 'ReviewCreate'>;

const starValues = [1, 2, 3, 4, 5] as const;

function mapStarToApi(star: number): 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' {
  if (star <= 1) return 'ONE';
  if (star === 2) return 'TWO';
  if (star === 3) return 'THREE';
  if (star === 4) return 'FOUR';
  return 'FIVE';
}

export default function ReviewCreate() {
  const navigation = useNavigation<ReviewCreateNavigation>();
  const route = useRoute<ReviewCreateRoute>();
  const queryClient = useQueryClient();
  const { chatRoomId, receiverNickname } = route.params;

  const [selectedStar, setSelectedStar] = useState<number>(5);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return selectedStar >= 1 && !isSubmitting;
  }, [selectedStar, isSubmitting]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => {
      if (prev.includes(keyword)) return prev.filter((k) => k !== keyword);
      if (prev.length >= 3) {
        Alert.alert('안내', '키워드는 최대 3개까지 선택할 수 있어요.');
        return prev;
      }
      return [...prev, keyword];
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      await reviewController.createReview({
        chatRoomId,
        star: mapStarToApi(selectedStar),
        keywords: selectedKeywords.length ? selectedKeywords : undefined,
        content: content.trim() || undefined,
      });

      queryClient.invalidateQueries({ queryKey: ['chatRoom', chatRoomId] });
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });

      Alert.alert('후기 작성 완료', '후기가 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e: any) {
      Alert.alert('실패', e?.response?.data?.message ?? '후기 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className='w-full'>
      <Header title='후기 올리기' className='pb-[12px]' />
      <ScrollView style={tw`flex-1 w-full bg-light-gray-1`} contentContainerStyle={tw`px-[32px] pt-[20px] pb-[32px]`}>
        <Txt variant='mainTitleBold' style={tw`mb-[8px]`}>
          {receiverNickname ? `${receiverNickname}님과의 거래는 어땠나요?` : '거래는 어땠나요?'}
        </Txt>

        <View style={tw`flex-row mb-[20px]`}>
          {starValues.map((star) => (
            <Pressable key={star} onPress={() => setSelectedStar(star)} style={tw`mr-[6px]`}>
              <Txt style={{ fontSize: 28, color: star <= selectedStar ? '#FFC311' : '#D6D6D6' }}>★</Txt>
            </Pressable>
          ))}
        </View>

        <Txt variant='subtitleBold' style={tw`mb-[10px]`}>
          키워드 (최대 3개)
        </Txt>
        <View style={tw`flex-row flex-wrap mb-[20px]`}>
          {KEYWORDS.map((keyword) => {
            const selected = selectedKeywords.includes(keyword);
            return (
              <Pressable
                key={keyword}
                onPress={() => toggleKeyword(keyword)}
                style={[
                  tw`px-[12px] py-[8px] rounded-[20px] mr-[8px] mb-[8px]`,
                  { backgroundColor: selected ? '#FFC311' : '#FFFFFF' },
                ]}
              >
                <Txt variant='auxiliaryTextLight' color='black'>
                  {keyword}
                </Txt>
              </Pressable>
            );
          })}
        </View>

        <Txt variant='subtitleBold' style={tw`mb-[10px]`}>
          후기 (최대 200자)
        </Txt>
        <View style={tw`w-full rounded-[12px] border border-light-gray-2 bg-white px-[16px] py-[12px] mb-[24px]`}>
          <TextInput
            value={content}
            onChangeText={(text) => setContent(text.slice(0, 200))}
            multiline
            placeholder='후기를 남겨주세요'
            placeholderTextColor={tw.color('dark-gray-1')}
            textAlignVertical='top'
            style={tw`min-h-[100px] text-[14px] text-black`}
          />
          <Txt variant='bodySubText' color='dark_gray1' align='right'>
            {content.length}/200
          </Txt>
        </View>

        <PrimaryButton
          title={isSubmitting ? '등록중...' : '후기 등록하기'}
          isValid={canSubmit}
          disabled={!canSubmit}
          onClick={handleSubmit}
        />
      </ScrollView>
    </Container>
  );
}
