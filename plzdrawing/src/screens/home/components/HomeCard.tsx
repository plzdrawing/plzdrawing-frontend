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
  profileImage: string;
  userName: string;
  drawingCount: number;
  reviewCount: number;
  starRating: number;
  timeAgo: string;
  hashtags: string[];
  description: string;
  sampleImage: string;
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
  sampleImage = '@/assets/images/sample.png',
  estimatedTime = '10분',
  estimatedPrice = 3000,
  likeCount = 25,
  isLiked: initialIsLiked = false,
  onClickCard,
  onClickRequest,
}: HomeCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleClickLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <TouchableOpacity
      style={tw`flex-col w-full p-[17px] rounded-[5px] bg-white border border-light-gray-2`}
      onPress={onClickCard}
    >
      <View style={tw`flex-row items-center justify-start gap-[7px]`}>
        <Image
          source={{ uri: profileImage }}
          style={tw`w-[38px] h-[38px] rounded-[5px] bg-light-gray-2`}
        />
        <Txt variant='subtitleBold' color='black'>
          {userName}
        </Txt>
        <Txt variant='secondaryText' color='dark_gray2'>
          그림 {drawingCount}회 / 후기 {reviewCount}개 / 별점 {starRating}점
        </Txt>
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

      <Image
        source={{ uri: sampleImage }} 
        style={tw`w-full h-[150px] bg-light-gray-2 mb-[17px]`}
        resizeMode='contain'
      />

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
