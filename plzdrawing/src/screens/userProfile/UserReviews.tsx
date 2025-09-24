import React from 'react';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';
import IcStar from '@/assets/images/ic-star-empty.svg';

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
    <Wrapper>
      <NumbersContainer>
        <Txt variant='auxiliaryTextLight'>그림 그려준 횟수: {drawNum}회</Txt>
        <Txt variant='auxiliaryTextLight'>거절 횟수: {rejectNum}회</Txt>
      </NumbersContainer>
      <RatingContainer>
        <IcStar />
        <Txt variant='bodyTextBold'>{rating}점</Txt>
        <Txt color='dark_gray2' variant='bodySubText'>평가 {reviewNum}개</Txt>
      </RatingContainer>
      <KeywordsContainer>
        {reviewKeywords.map((keyword) => (
          <Keyword key={keyword}>
            <Txt>{keyword}</Txt>
          </Keyword>
        ))}
      </KeywordsContainer>
      {reviews.map((review) => (
        <ReviewItem key={review.id}>
          <ProfileImage source={{ uri: review.userProfile }} />
          <ReviewContainer>
            <UserContainer>
              <Txt variant='bodyTextBold'>{review.userName} 님</Txt>
              <Txt color='dark_gray2' variant='secondaryText'>{review.date}</Txt>
            </UserContainer>
            <Txt variant='auxiliaryTextLight'>{review.content}</Txt>
          </ReviewContainer>
        </ReviewItem>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.View`
  width: 100%;
  gap: 17px;
  padding: 17px 32px;
  background-color: ${colors.colors.light_gray1};
`;

const NumbersContainer = styled.View``;

const RatingContainer = styled.View`
  display: flex;
  gap: 7px;
  flex-direction: row;
  align-items: center;
`;

const KeywordsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Keyword = styled.View`
  margin: 3px;
  padding: 10px 20px;
  border: 1px solid ${colors.colors.light_gray3};
  background-color: ${colors.colors.white};
`;

const ReviewItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.colors.light_gray2};
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 17px;
  background-color: ${colors.colors.light_gray3};
`;

const ReviewContainer = styled.View`
  flex: 1;
  gap: 7px;
`;

const UserContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`;
