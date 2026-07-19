import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import Txt from "@/src/components/ui/Txt";
import PostContent from "@/src/screens/home/components/detail/PostContent";
import DrawingCarousel from "@/src/screens/home/components/detail/DrawingCarousel";
import DrawingInfoCard from "@/src/screens/home/components/detail/DrawingInfoCard";
import DrawingCardInfoBox from "@/src/screens/home/components/detail/DrawingCardInfoBox";
import { View, ScrollView, TouchableOpacity } from "react-native";
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
    <View style={[tw`flex-1`, { paddingBottom: 10, backgroundColor: Colors.colors.white }]}>
      <HomeDetailHeader
        authorName={cardData.author}
        type="drawingCard"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={tw`flex-1`} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={tw`p-[30px]`}>
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
          <View style={tw`w-full flex-col gap-[12px] mb-[37px]`}>
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
          </View>
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
        </View>
      </ScrollView>

      <View
        style={[tw`absolute bottom-0 w-full`, {
          height: 92,
          paddingTop: 9,
          paddingHorizontal: 57,
          paddingBottom: 20,
          backgroundColor: Colors.colors.white,
          borderTopWidth: 1,
          borderTopColor: '#f9f9f9',
        }]}
      >
        <DefaultButton
          title="요청하기"
          onPress={() => {
            handleButtonPress(route.params.postId);
            console.log("클릭");
          }}
          variant="primary"
        />
      </View>
    </View>
  );
};

export default HomeDrawingCardDetail;