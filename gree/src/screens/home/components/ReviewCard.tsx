import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { LikeIconFilled, LikeIconEmpty } from '@/assets/images';

interface ReviewCardProps {
  reviewerProfileImage?: string;
  reviewerName?: string;
  timeAgo?: string;
  painterProfileImage?: string;
  painterName?: string;
  painterDrawingCount?: number;
  description?: string;
  likeCount?: number;
  isLiked?: boolean;
  onClickPainter?: () => void;
}

export default function ReviewCard({
  reviewerProfileImage,
  reviewerName = '홍길동',
  timeAgo = '5분 전',
  painterProfileImage,
  painterName = '동길이',
  painterDrawingCount = 5,
  description = '너무 빠르고 예쁘게 잘 그려주셨어요!',
  likeCount = 23,
  isLiked: initialIsLiked = false,
  onClickPainter,
}: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  return (
    <View
      style={tw`flex-col w-full p-[17px] rounded-[5px] bg-white border border-light-gray-2`}
    >
      <View style={tw`flex-row items-center justify-start gap-[7px]`}>
        <Image
          source={{ uri: reviewerProfileImage }}
          style={tw`w-[38px] h-[38px] rounded-[5px] bg-light-gray-2`}
        />
        <Txt variant="subtitleBold" color="black">
          {reviewerName}
        </Txt>
        <Txt variant="secondaryText" color="dark_gray2">
          {timeAgo}
        </Txt>
      </View>

      <TouchableOpacity
        style={tw`flex-row items-center my-[17px] mx-[19px] gap-[7px] border border-light-gray-2 p-[7px] rounded-[5px]`}
        onPress={onClickPainter}
      >
        <Image
          source={{ uri: painterProfileImage }}
          style={tw`w-[38px] h-[38px] rounded-[5px] bg-light-gray-2`}
        />
        <Txt variant="subtitleBold" color="black">
          {painterName}
        </Txt>
        <Txt variant="secondaryText" color="dark_gray2">
          그린 그림 {painterDrawingCount}회
        </Txt>
      </TouchableOpacity>

      <Txt variant="bodyText" color="black" style={tw`mt-[7px] mb-[17px]`}>
        {description}
      </Txt>

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
  );
}
