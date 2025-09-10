import React from "react";
import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import Txt from "@/src/components/common/text/Txt";
import PostContent from "@/src/components/home/detail/PostContent";
import DrawingCarousel from "@/src/components/home/detail/DrawingCarousel";
import DrawingInfoCard from "@/src/components/home/detail/DrawingInfoCard";
import DrawingCardInfoBox from "@/src/components/home/detail/DrawingCardInfoBox";
import { TouchableOpacity } from "react-native";
import { DrawingCardData } from "@/src/types/post";

type HomeDrawingCardDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomeDrawingCardDetail"
>;

function HomeDrawingCardDetail ({ 
  route,
  navigation,
}: HomeDrawingCardDetailScreenProps) {
  // const { cardId } = route.params; // You'll use this to fetch data

  // Dummy data - in a real app, this would be fetched based on postId
  const cardData: DrawingCardData = {
    author: "홍길동",
    title: "귀여운 그림",
    hashtags: "#반려동물 #낙서 #빠르게",
    body: "귀여운 그림 그려드려요:)\n반려동물 그림이나 낙서같은 그림 환영합니다\n빠른 시간내에 가능해요 !",
    mainImage: "https://placehold.co/326x207",
    price: 1000,
    estimatedTime: 10,
    revisions: false, 
    drawingInfos: [
      {
        id: "card_abc_1",
        image: "https://placehold.co/60x60/FFE18D/000000?text=1",
        title: "귀여운 그림",
        price: "1000원",
        description: "30분 예상 / 수정 불가",
      },
      {
        id: "card_abc_2",
        image: "https://placehold.co/60x60/A9C8E8/000000?text=2",
        title: "캐릭터 스케치",
        price: "2500원",
        description: "1시간 예상 / 수정 1회",
      },
    ],
  };

  const handleCardPress = (cardId: string, postId: string) => {
    navigation.navigate("HomeDrawingCardDetail", { cardId, postId });
  };

  const handleButtonPress = (postId: string) => {
    navigation.navigate("HomeRequest", { postId });
  };

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeDetailHeader
        authorName={cardData.author}
        type="drawingCard"
        onBackPress={() => navigation.goBack()}
      />
      <StyledScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ContentContainer>
          <Txt variant="mainTitleBold" style={{ marginBottom: 20 }}>
            {cardData.title}
          </Txt>
          <PostContent
            hashtags={cardData.hashtags}
            type="drawingCard"
            body={cardData.body}
          />
          <DrawingCarousel
            images={[
              cardData.mainImage,
              cardData.mainImage,
              cardData.mainImage,
            ]}
          />
          <InfoGrid>
            <DrawingCardInfoBox
              label="예상금액"
              value={`${cardData.price}원`}
            />
            <DrawingCardInfoBox
              label="예상 소요시간"
              value={`${cardData.estimatedTime}분`}
            />
            <DrawingCardInfoBox
              label="그림 수정"
              value={cardData.revisions == false ? "불가능" : "가능"}
            />
          </InfoGrid>
          <Txt
            variant="bodyText"
            color="dark_gray2"
            style={{ marginBottom: 20 }}
          >
            다른 그림카드 보러가기
          </Txt>

          {cardData.drawingInfos.map((info) => (
            <TouchableOpacity
              key={info.id}
              onPress={() => handleCardPress(info.id, route.params.postId)}
            >
              <DrawingInfoCard key={info.id} info={info} />
            </TouchableOpacity>
          ))}
        </ContentContainer>
      </StyledScrollView>

      <FooterContainer>
        <DefaultButton
          title="요청하기"
          onPress={() => {
            handleButtonPress(route.params.postId);
            console.log("클릭");
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

const InfoGrid = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 12px;
  margin-bottom: 37px;
`;

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 92px;
  padding: 9px 57px;
  padding-bottom: 20px;
  background-color: ${Colors.colors.white};
  border-top-width: 1px;
  border-top-color: #f9f9f9;
`;

export default HomeDrawingCardDetail;