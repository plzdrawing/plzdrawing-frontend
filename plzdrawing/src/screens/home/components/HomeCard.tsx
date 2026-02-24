import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { 
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Txt from '@/src/components/ui/Txt';
import ChipButton from '@/src/components/ui/button/ChipButton';

import {
  LikeIconFilled,
  LikeIconEmpty,
 } from '@/assets/images';

interface HomeCardProps {
  profileImage?: string;
  userName: string;
  drawingCount: number;
  reviewCount: number;
  starRating: number;
  timeAgo: string;
  hashtags: string[];
  description: string;
  sampleImage?: string;
  estimatedTime: string;
  estimatedPrice: number;
  likeCount: number;
  isLiked?: boolean;
  onClickCard?: () => void;
  onClickRequest?: () => void;
}

export default function HomeCard({
  profileImage,
  userName = '홍길동',
  drawingCount = 5,
  reviewCount = 3,
  starRating = 4.5,
  timeAgo = '5분 전',
  hashtags = ['귀여운', '낙서'],
  description = '소소한 그림 그려드려요!소소한 그림 그려드려요! 소소한 그림 그려드려요!',
  sampleImage,
  estimatedTime = '10분',
  estimatedPrice = 3000,
  likeCount = 25,
  isLiked: initialIsLiked = false,
  onClickCard,
  onClickRequest,
}: HomeCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [profileImgError, setProfileImgError] = useState(false);
  const [sampleImgError, setSampleImgError] = useState(false);

  const handleClickLike = () => {
    setIsLiked(!isLiked);
  };

  const hasProfileImg = !!profileImage?.trim() && !profileImgError;
  const hasSampleImg  = !!sampleImage?.trim()   && !sampleImgError;

  return (
    <TouchableOpacity
      style={tw`flex-col w-full p-[17px] rounded-[5px] bg-white border border-light-gray-2`}
      onPress={onClickCard}
    >
      {/* ─── 프로필 행 ─── */}
      <View style={tw`flex-row items-center gap-[10px]`}>
        {/* 프로필 이미지 */}
        {hasProfileImg ? (
          <Image
            source={{ uri: profileImage }}
            style={tw`w-[38px] h-[38px] rounded-[5px]`}
            onError={(e) => {
              console.warn('🖼️ [HomeCard] profileImage 로드 실패:', profileImage, e.nativeEvent);
              setProfileImgError(true);
            }}
          />
        ) : (
          <View style={tw`w-[38px] h-[38px] rounded-[5px] bg-light-gray-2`} />
        )}

        {/* 닉네임 + 통계 — flex:1 로 남은 공간 전부 차지 */}
        <View style={tw`flex-1`}>
          <Txt variant='subtitleBold' color='black' numberOfLines={1} style={tw`mb-[2px]`}>
            {userName}
          </Txt>
          <Txt variant='secondaryText' color='dark_gray2' numberOfLines={1}>
            그림 {drawingCount}회 / 후기 {reviewCount}개 / 별점 {Number(starRating).toFixed(1)}점
          </Txt>
        </View>
      </View>

      <Txt variant='secondaryText' color='dark_gray2' style={tw`my-[7px]`}>
        {timeAgo}
      </Txt>

      <Txt variant='bodySubText' color='highlight_orange'>
        {hashtags?.map((tag) => `#${tag} `)}
      </Txt>

      <Txt variant='bodyText' color='black' style={tw`mt-[7px] mb-[17px]`}>
        {description}
      </Txt>

      {hasSampleImg ? (
        <Image
          source={{ uri: sampleImage }}
          style={tw`w-full h-[150px] bg-light-gray-2 mb-[17px]`}
          resizeMode='cover'
          onLoad={() => console.log('✅ [HomeCard] sampleImage 로드 성공:', sampleImage)}
          onError={(e) => {
            console.warn('🖼️ [HomeCard] sampleImage 로드 실패:', sampleImage, e.nativeEvent);
            setSampleImgError(true);
          }}
        />
      ) : (
        <View style={tw`w-full h-[150px] bg-light-gray-2 mb-[17px] rounded-[5px]`} />
      )}

      <Txt variant='secondaryText' color='dark_gray2'>
        예상 소요시간
      </Txt>
      <Txt variant='auxiliaryTextLight' color='black' style={tw`mb-[9px]`}>
        {estimatedTime}
      </Txt>

      <Txt variant='secondaryText' color='dark_gray2'>
        예상금액
      </Txt>
      <Txt variant='subtitleBold' color='black'>
        \{estimatedPrice.toLocaleString()}
      </Txt>

      <View style={tw`flex-row items-center justify-between mt-[17px]`}>
        <TouchableOpacity
          style={tw`flex-row items-center justify-center gap-[7px]`}
          onPress={handleClickLike}
        >
          {isLiked ? <LikeIconFilled /> : <LikeIconEmpty />}
          <Txt variant='secondaryText' color='dark_gray2'>
            {likeCount}
          </Txt>
        </TouchableOpacity>

        <ChipButton
          title='요청하기'
          onClick={onClickRequest}
        />
      </View>
    </TouchableOpacity>
  );
}
