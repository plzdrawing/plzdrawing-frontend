import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";

import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import UserInfo from "@/src/screens/home/components/detail/UserInfo";
import PostContent from "@/src/screens/home/components/detail/PostContent";
import DrawingCarousel from "@/src/screens/home/components/detail/DrawingCarousel";
import DrawingInfoCard from "@/src/screens/home/components/detail/DrawingInfoCard";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import Txt from "@/src/components/ui/Txt";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { PostData } from "@/src/types/post";

type HomePostDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomePostDetail"
>;

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
    navigation.navigate('HomeDrawingCardDetail', { cardId, postId });
  };

   const handleButtonPress = (postId: string) => {
     navigation.navigate("HomeRequest", { postId });
   };


  return (
    <View style={[tw`flex-1`, { paddingBottom: 10, backgroundColor: Colors.colors.white }]}>
      <HomeDetailHeader
        authorName={postData.author}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={tw`p-[30px]`}>
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

          {postData.drawingInfos.map((info) => (
            <TouchableOpacity
              key={info.id}
              onPress={() => handleCardPress(info.id, route.params.postId)}
            >
              <DrawingInfoCard key={info.id} info={info} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => navigation.navigate("UserProfile")}
            style={[tw`py-[10px] px-[25px] rounded-[12px] self-center mt-[57px]`, { borderWidth: 1, borderColor: '#d9d9d9' }]}
          >
            <Txt variant="bodyText" color="dark_gray2">
              프로필 보기
            </Txt>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={[tw`absolute bottom-0 w-full`, {
          height: 92,
          paddingTop: 9,
          paddingHorizontal: 57,
          paddingBottom: 34,
          backgroundColor: Colors.colors.white,
          borderTopWidth: 1,
          borderTopColor: '#f9f9f9',
        }]}
      >
        <DefaultButton
          title="요청하기"
          onPress={() => {
            handleButtonPress(route.params.postId);
          }}
          variant="primary"
        />
      </View>
    </View>
  );
};

export default HomePostDetail;