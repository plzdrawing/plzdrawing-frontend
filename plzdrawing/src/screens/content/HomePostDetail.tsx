import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";

import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import UserInfo from "@/src/components/home/detail/UserInfo";
import PostContent from "@/src/components/home/detail/PostContent";
import DrawingCarousel from "@/src/components/home/detail/DrawingCarousel";
import DrawingInfoCard from "@/src/components/home/detail/DrawingInfoCard";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import Txt from "@/src/components/common/text/Txt";

type HomePostDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomePostDetail"
>;

interface PostData {
  author: string;
  authorStats: string;
  hashtags: string;
  body: string;
  profileImage: string;
  mainImage: string;
  drawingInfo: {
    image: string;
    title: string;
    price: string;
    description: string;
  };
}

function HomePostDetail({
  route,
  navigation,
}: HomePostDetailScreenProps) {
  // const { postId } = route.params; // You'll use this to fetch data

  // Dummy data - in a real app, this would be fetched based on postId
  const postData: PostData = {
    author: "홍길동",
    authorStats: "그림 5회/후기 3개/ 별점 4.5점",
    hashtags: "#귀여운 #낙서",
    body: "소소한 그림 그려드려요!소소한 그림 그려드려요! 소소한 그림 그려드려요!",
    profileImage: "https://placehold.co/38x38",
    mainImage: "https://placehold.co/326x207",
    drawingInfo: {
      image: "https://placehold.co/60x60",
      title: "귀여운 그림",
      price: "1000원",
      description: "30분 예상 / 수정 불가",
    },
  };

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeDetailHeader
        authorName={postData.author}
        onBackPress={() => navigation.goBack()}
      />

      <StyledScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ContentContainer>
          <UserInfo
            profileImage={postData.profileImage}
            name={postData.author}
            stats={postData.authorStats}
          />
          <PostContent hashtags={postData.hashtags} body={postData.body} />
          <DrawingCarousel
            images={[
              postData.mainImage,
              postData.mainImage,
              postData.mainImage,
            ]}
          />
          <DrawingInfoCard info={postData.drawingInfo} />

          <ProfileButton>
            <Txt variant="bodyText" color="dark_gray2">
              프로필 보기
            </Txt>
          </ProfileButton>
        </ContentContainer>
      </StyledScrollView>

      <FooterContainer>
        <DefaultButton
          title="요청하기"
          onPress={() => {
            // Handle request action)}
          }}
          variant="primary"
        />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  padding: 30px;
`;

const ProfileButton = styled.TouchableOpacity`
  padding: 10px 25px;
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  align-self: center;
  margin-top: 57px;
`;

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 92px;
  padding: 9px 57px;
  padding-bottom: 34px;
  background-color: ${Colors.colors.white};
  border-top-width: 1px;
  border-top-color: #f9f9f9;
`;

export default HomePostDetail;