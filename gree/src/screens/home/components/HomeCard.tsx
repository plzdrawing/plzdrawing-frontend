import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';
import ChipButton from '@/src/components/common/button/ChipButton';
import { LikeIconFilled, LikeIconEmpty } from '@/assets/images';

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
  onClickProfile?: () => void;
}

export default function HomeCard({
  profileImage,
  userName = '홍길동',
  drawingCount = 5,
  reviewCount = 3,
  starRating = 4.5,
  timeAgo = '5분 전',
  hashtags = ['귀여운', '낙서'],
  description = '소소한 그림 그려드려요!',
  sampleImage,
  estimatedTime = '10분',
  estimatedPrice = 3000,
  likeCount = 25,
  isLiked: initialIsLiked = false,
  onClickCard,
  onClickProfile,
}: HomeCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [profileImgError, setProfileImgError] = useState(false);
  const [sampleImgError, setSampleImgError] = useState(false);

  const hasProfileImg = !!profileImage?.trim() && !profileImgError;
  const hasSampleImg = !!sampleImage?.trim() && !sampleImgError;

  return (
    <TouchableOpacity
      style={tw`flex-col w-full p-[17px] rounded-[5px] bg-white border border-light-gray-2`}
      onPress={onClickCard}
    >
      <TouchableOpacity
        style={tw`flex-row items-center gap-[10px]`}
        onPress={onClickProfile}
        disabled={!onClickProfile}
      >
        {hasProfileImg ? (
          <Image
            source={{ uri: profileImage }}
            style={tw`w-[38px] h-[38px] rounded-[5px]`}
            onError={() => setProfileImgError(true)}
          />
        ) : (
          <View style={tw`w-[38px] h-[38px] rounded-[5px] bg-light-gray-2`} />
        )}
        <View style={tw`flex-1`}>
          <Txt variant="subtitleBold" color="black" numberOfLines={1} style={tw`mb-[2px]`}>
            {userName}
          </Txt>
          <Txt variant="secondaryText" color="dark_gray2" numberOfLines={1}>
            그림 {drawingCount}회 / 후기 {reviewCount}개 / 별점 {Number(starRating).toFixed(1)}점
          </Txt>
        </View>
      </TouchableOpacity>

      <Txt variant="secondaryText" color="dark_gray2" style={tw`my-[7px]`}>
        {timeAgo}
      </Txt>

      <Txt variant="bodySubText" color="highlight_orange">
        {hashtags?.map((tag) => `#${tag} `)}
      </Txt>

      <Txt variant="bodyText" color="black" style={tw`mt-[7px] mb-[17px]`}>
        {description}
      </Txt>

      {hasSampleImg ? (
        <Image
          source={{ uri: sampleImage }}
          style={tw`w-full h-[150px] bg-light-gray-2 mb-[17px]`}
          resizeMode="cover"
          onError={() => setSampleImgError(true)}
        />
      ) : (
        <View style={tw`w-full h-[150px] bg-light-gray-2 mb-[17px] rounded-[5px]`} />
      )}

      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row gap-[7px]`}>
          <ChipButton title={estimatedTime} isSelected={false} />
          <ChipButton title={`${estimatedPrice.toLocaleString()}원`} isSelected={false} />
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center gap-[7px]`}
          onPress={() => setIsLiked(!isLiked)}
        >
          {isLiked ? <LikeIconFilled /> : <LikeIconEmpty />}
          <Txt variant="secondaryText" color="dark_gray2">
            {likeCount}
          </Txt>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
