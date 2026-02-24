import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import { useQuery } from "@tanstack/react-query";

import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import UserInfo from "@/src/screens/home/components/detail/UserInfo";
import PostContent from "@/src/screens/home/components/detail/PostContent";
import DrawingCarousel from "@/src/screens/home/components/detail/DrawingCarousel";
import DrawingInfoCard from "@/src/screens/home/components/detail/DrawingInfoCard";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import Txt from "@/src/components/ui/Txt";
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { postController } from "@/src/apis/controller/post";

type HomePostDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomePostDetail"
>;

function HomePostDetail({
  route,
  navigation,
}: HomePostDetailScreenProps) {
  const { postId } = route.params;

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postController.getPostDetails(postId),
  });

  // API 응답 → 컴포넌트 props 매핑
  const profileImage: string = post?.member?.profile?.profileUrl || '';
  const authorName: string   = post?.member?.nickname || '';
  const hashtags: string     = (post?.postTags ?? [])
    .map((pt: any) => `#${pt?.tag?.name}`)
    .join(' ');
  const body: string         = post?.content || '';
  const images: string[]     = (post?.images ?? [])
    .map((img: any) => img?.imageUrl)
    .filter(Boolean);

  // DrawingInfoCard 는 현재 API 에 개별 카드 데이터 없음 → 빈 배열
  const drawingInfos: any[] = [];

  const handleCardPress = (cardId: string) => {
    navigation.navigate('HomeDrawingCardDetail', { cardId, postId });
  };

  const handleButtonPress = () => {
    navigation.navigate("HomeRequest", { postId });
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#FFC311" />
      </View>
    );
  }

  if (isError || !post) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <HomeDetailHeader authorName="" onBackPress={() => navigation.goBack()} />
        <Txt variant="bodyText" color="dark_gray1">게시글을 불러올 수 없어요</Txt>
      </View>
    );
  }

  return (
    <View style={[tw`flex-1`, { paddingBottom: 10, backgroundColor: Colors.colors.white }]}>
      <HomeDetailHeader
        authorName={authorName}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={tw`p-[30px]`}>
          <UserInfo
            profileImage={profileImage}
            name={authorName}
            stats={''}
          />
          <PostContent hashtags={hashtags} body={body} />

          {images.length > 0 && (
            <DrawingCarousel images={images} />
          )}

          {drawingInfos.map((info) => (
            <TouchableOpacity
              key={info.id}
              onPress={() => handleCardPress(info.id)}
            >
              <DrawingInfoCard info={info} />
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
          onPress={handleButtonPress}
          variant="primary"
        />
      </View>
    </View>
  );
};

export default HomePostDetail;