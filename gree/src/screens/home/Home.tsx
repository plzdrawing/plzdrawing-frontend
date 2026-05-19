import tw from '@/src/lib/tailwind';
import { useState, useEffect, useCallback } from 'react';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  Alert,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ListRenderItem,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/TabHeader';
import HomeFilter from '@/src/screens/home/components/HomeFilter';
import HomeCard from '@/src/screens/home/components/HomeCard';
import ReviewCard from '@/src/screens/home/components/ReviewCard';
import { reviewController } from '@/src/apis/controller/review';
import { Review } from '@/src/apis/api';

import { PencilIcon, EmptyBox } from '@/assets/images';
import Txt from '@/src/components/common/Txt';

import { postController } from '@/src/apis/controller/post';
import { LatestContentsResponse } from '@/src/apis/api';
import { RootStackParamList } from '@/src/navigation/types';
import { formatRelativeTime } from '@/src/utils/formatTime';

const PAGE_LIMIT = 10;

// 그림쟁이후기 더미 (기존) — replaced by API-driven reviews
const DUMMY_REVIEWS = Array.from({ length: 5 }, (_, i) => ({ id: String(i) }));

export default function Home() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const [selectedId, setSelectedId] = useState(0);
  const [filter, setFilter] = useState('최신순');

  // 그림홈에서 뒤로가기 → 앱 종료
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

  // ──────────────────────────────────────────────
  // 그려드려요 탭 : 무한스크롤
  // ──────────────────────────────────────────────
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['posts', 'latest', filter],
    queryFn: ({ pageParam }) =>
      postController.getLatestPosts(pageParam as number, PAGE_LIMIT),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage as any;
      return page * limit < total ? page + 1 : undefined;
    },
    enabled: selectedId === 0 && isFocused,
  });

  // 포커스 복귀 시 새로고침
  useEffect(() => {
    if (isFocused && selectedId === 0) refetch();
  }, [isFocused]);

  const posts: LatestContentsResponse[] =
    data?.pages.flatMap((page: any) => page.data ?? []) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCardPress = (item: LatestContentsResponse) => {
    navigation.navigate('HomePostDetail', {
      postId: String(item.contents.contentId),
      userName: item.uploader.nickname,
      price: item.contents.price,
      sampleImage: item.contents.imageUrls?.find(Boolean) || undefined,
    });
  };

  const handleProfilePress = async (item: LatestContentsResponse) => {
    try {
      const post = await postController.getPost(String(item.contents.contentId));
      const memberId = Number((post as any)?.memberId);

      if (!memberId) {
        Alert.alert('안내', '사용자 정보를 확인할 수 없습니다.');
        return;
      }

      navigation.navigate('UserProfile', { memberId });
    } catch (error) {
      console.error('프로필 이동 실패:', error);
      Alert.alert('오류', '프로필 페이지로 이동할 수 없습니다.');
    }
  };

  // ──────────────────────────────────────────────
  // 공통 헤더 (FlatList ListHeaderComponent)
  // ──────────────────────────────────────────────
  const ListHeader = (
    <HomeFilter
      selectedId={selectedId}
      className='my-[17px]'
      onFilterChange={setFilter}
    />
  );

  // ──────────────────────────────────────────────
  // 그려드려요 탭 렌더링
  // ──────────────────────────────────────────────
  const renderPost: ListRenderItem<LatestContentsResponse> = ({ item }) => {
    const { uploader, contents } = item;
    return (
      <View style={tw`mb-[17px]`}>
        <HomeCard
          profileImage={uploader.profileImageUrl || undefined}
          userName={uploader.nickname}
          drawingCount={uploader.drawingCount}
          reviewCount={uploader.reviewCount}
          starRating={uploader.star}
          timeAgo={formatRelativeTime(contents.createdAt)}
          hashtags={contents.tags}
          description={contents.explanation}
          sampleImage={contents.imageUrls?.find(Boolean) || undefined}
          estimatedTime={contents.timeTaken}
          estimatedPrice={contents.price}
          likeCount={contents.likeCount}
          onClickCard={() => handleCardPress(item)}
          onClickProfile={() => handleProfilePress(item)}
        />
      </View>
    );
  };

  const PostFooter = () =>
    isFetchingNextPage ? (
      <View style={tw`py-[20px] items-center`}>
        <ActivityIndicator color='#FFC311' />
      </View>
    ) : null;

  const PostEmpty = () =>
    !isLoading ? (
      <View style={tw`flex-1 items-center justify-center pt-[60px] gap-[12px]`}>
        <EmptyBox />
        <Txt variant='bodyText' color='dark_gray1'>
          아직 게시글이 없어요
        </Txt>
      </View>
    ) : null;

  // ──────────────────────────────────────────────
  // 그림쟁이후기 탭 렌더링
  // ──────────────────────────────────────────────
  const renderReview: ListRenderItem<{ id: string }> = () => (
    <View style={tw`mb-[17px]`}>
      <ReviewCard />
    </View>
  );

  // 실제 최신 리뷰 불러오기
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await reviewController.getLatestReviews(1, PAGE_LIMIT);
        // controller returns { data: Review[], pagination: {...} }
        setReviews(res.data ?? []);
      } catch (err) {
        console.error('getLatestReviews 실패', err);
      } finally {
        setReviewsLoading(false);
      }
    };

    if (isFocused && selectedId === 1) fetchReviews();
  }, [isFocused, selectedId]);

  const renderReviewItem: ListRenderItem<Review> = ({ item }) => (
    <View style={tw`mb-[17px]`}>
      <ReviewCard
        reviewerProfileImage={item.writer?.profile?.profileUrl}
        reviewerName={item.writer?.nickname}
        timeAgo={formatRelativeTime(item.createdAt)}
        painterProfileImage={item.receiver?.profile?.profileUrl}
        painterName={item.receiver?.nickname}
        painterDrawingCount={item.receiver?.posts?.length ?? 0}
        description={item.content}
        likeCount={0}
        onClickPainter={() =>
          navigation.navigate('UserProfile', { memberId: Number(item.receiverId) })
        }
      />
    </View>
  );

  return (
    <Container className='w-full'>
      <TabHeader
        title1='그려드려요'
        title2='그림쟁이후기'
        selectedId={selectedId}
        setSelectedId={(id) => {
          setSelectedId(id);
          setFilter('최신순');
        }}
      />

      {/* 그려드려요 */}
      {selectedId === 0 && (
        <>
          {isLoading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size='large' color='#FFC311' />
            </View>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item) => String(item.contents.contentId)}
              renderItem={renderPost}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={<PostFooter />}
              ListEmptyComponent={<PostEmpty />}
              contentContainerStyle={tw`px-[32px] pb-[80px]`}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.4}
              style={tw`w-full bg-light-gray-1`}
            />
          )}
        </>
      )}

      {/* 그림쟁이후기 */}
      {selectedId === 1 && (
        <>
          {reviewsLoading ? (
            <View style={tw`flex-1 justify-center items-center`}> 
              <ActivityIndicator size='large' color='#FFC311' />
            </View>
          ) : (
            <FlatList
              data={reviews}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderReviewItem}
              ListHeaderComponent={ListHeader}
              contentContainerStyle={tw`px-[32px] pb-[80px]`}
              showsVerticalScrollIndicator={false}
              style={tw`w-full bg-light-gray-1`}
            />
          )}
        </>
      )}

      {/* FAB: 게시글 작성 */}
      <TouchableOpacity
        style={tw`
          absolute bottom-[16px] right-[32px] w-[57px] h-[57px] rounded-[28.5px]
          bg-sub-yellow border border-main-yellow justify-center items-center
        `}
        onPress={() => navigation.navigate('PostEditor')}
      >
        <PencilIcon />
      </TouchableOpacity>
    </Container>
  );
}
