import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { 
  View, 
  ScrollView,
  TouchableOpacity,
  BackHandler ,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/header/TabHeader';
import HomeFilter from '@/src/screens/home/components/HomeFilter';

import HomeCard from '@/src/screens/home/components/HomeCard';
import ReviewCard from '@/src/screens/home/components/ReviewCard';

import { PencilIcon } from '@/assets/images';

type RootStackParamList = {
  Home: undefined;
  HomePostDetail: { postId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, 'HomePostDetail'
  >;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [selectedId, setSelectedId] = useState(0);
  const isFocused = useIsFocused();

  // 그림홈에서 뒤로가기 버튼 처리 - 앱 종료 (그림홈이 포커스되어 있을 때만)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused]);

  const handleCardPress = (postId: string) => {
    navigation.navigate('HomePostDetail', { postId });
  };

  return (
    <Container className='w-full'>
      <TabHeader
        title1='그려드려요'
        title2='그림쟁이후기'
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <ScrollView 
        style={tw`w-full h-full px-[32px] bg-light-gray-1`}
        showsVerticalScrollIndicator={false}
      >
        <HomeFilter selectedId={selectedId} className='my-[17px]' />

        <View style={tw`gap-[17px] pb-[50px]`}>
          {selectedId === 0 ? (
            // 그려드려요
            <>
              <HomeCard
                profileImage="https://example.com/profile1.jpg"
                userName='홍길동'
                drawingCount={5}
                reviewCount={10}
                starRating={4.8}
                timeAgo='5분 전'
                hashtags={['귀여운', '낙서']}
                description='소소한 그림 그려드려요!소소한 그림 그려드려요! 소소한 그림 그려드려요!'
                sampleImage="https://example.com/sample1.png"
                estimatedTime='15분'
                estimatedPrice={5000}
                likeCount={42}
                isLiked={true}
                onClickCard={() => handleCardPress("post-id-1")}
              />
              <HomeCard
                profileImage="https://example.com/profile2.jpg"
                userName='김철수'
                drawingCount={3}
                reviewCount={5}
                starRating={4.5}
                timeAgo='10분 전'
                hashtags={['풍경화', '디지털']}
                description='멋진 풍경화 그려드립니다!'
                sampleImage="https://example.com/sample2.png"
                estimatedTime='30분'
                estimatedPrice={10000}
                likeCount={15}
                isLiked={false}
                onClickCard={() => handleCardPress("post-id-2")}
              />
            </>
          ) : (
            // 그림쟁이후기
            <>
              <ReviewCard />
              <ReviewCard />
            </>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={tw`
          absolute bottom-[16px] right-[32px] w-[57px] h-[57px] rounded-[28.5px]
          bg-sub-yellow border border-main-yellow justify-center items-center
        `}
        onPress = {() => {
          // TODO: 게시글 업로드
        }}
      >
        <PencilIcon />
      </TouchableOpacity>
    </Container>
  );
}
