import React from 'react';
import tw from '@/src/lib/tailwind';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';
import { EmptyStar, FilledStar } from '@/assets/images';
import { View, Image } from 'react-native';

interface UserReviewsProps {
  drawNum: number;
  rejectNum: number;
  rating: number;
  reviewNum: number;
  reviewKeywords: string[];
  reviews: {
    id: number;
    userProfile: string;
    userName: string;
    date: string;
    content: string;
  }[];
}

export default function UserReviews({
  drawNum,
  rejectNum,
  rating,
  reviewNum,
  reviewKeywords,
  reviews,
}: UserReviewsProps) {
  return (
    <View style={[tw`w-full gap-[17px] p-[17px_32px]`, { backgroundColor: colors.colors.light_gray1 }]}>
      <View>
        <Txt variant='auxiliaryTextLight'>그림 그려준 횟수: {drawNum}회</Txt>
        <Txt variant='auxiliaryTextLight'>거절 횟수: {rejectNum}회</Txt>
      </View>
      <View style={tw`flex-row items-center gap-[7px]`}>
        <EmptyStar />
        <Txt variant='bodyTextBold'>{rating}점</Txt>
        <Txt color='dark_gray2' variant='bodySubText'>평가 {reviewNum}개</Txt>
      </View>
      <View style={tw`flex-row flex-wrap`}>
        {reviewKeywords.map((keyword) => (
          <View key={keyword} style={[tw`m-[3px] py-[10px] px-[20px]`, { borderWidth: 1, borderColor: colors.colors.light_gray3, backgroundColor: colors.colors.white }]}>
            <Txt>{keyword}</Txt>
          </View>
        ))}
      </View>
      {reviews.map((review) => (
        <View key={review.id} style={[tw`flex-row items-center p-[12px]`, { borderBottomWidth: 1, borderBottomColor: colors.colors.light_gray2 }]}>
          <Image source={{ uri: review.userProfile }} style={[tw`w-[60px] h-[60px] mr-[17px]`, { backgroundColor: colors.colors.light_gray3 }]} />
          <View style={tw`flex-1 gap-[7px]`}>
            <View style={tw`flex-row items-center gap-[7px]`}>
              <Txt variant='bodyTextBold'>{review.userName} 님</Txt>
              <Txt color='dark_gray2' variant='secondaryText'>{review.date}</Txt>
            </View>
            <Txt variant='auxiliaryTextLight'>{review.content}</Txt>
          </View>
        </View>
      ))}
    </View>
  )
}
