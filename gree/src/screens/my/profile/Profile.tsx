import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { ScrollView } from 'react-native';

import UserDetail from '@/src/screens/my/profile/components/UserDetail';
import UserDrawings from '@/src/screens/my/userProfile/UserDrawings';
import UserReviews from '@/src/screens/my/userProfile/UserReviews';
import { BaseProfile } from '@/src/types/profile';
import { memberController } from '@/src/apis/controller/member';
import { postController } from '@/src/apis/controller/post';

type FilterType = '그림' | '후기';

interface ProfileProps {
  isFromMyPage?: boolean;
  userId?: number;
  userProfile?: BaseProfile;
}

export default function Profile({ isFromMyPage = false, userId, userProfile }: ProfileProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('그림');
  const [isNoProfile, setIsNoProfile] = useState(false);

  const [user, setUser] = useState({
    imageUrl: userProfile?.imageUrl || '',
    name: userProfile?.name || '',
    intro: '',
    tags: userProfile?.hashtag || [] as string[],
    drawings: [] as any[],
    reviews: {
      drawNum: 0,
      rejectNum: 0,
      rating: 0,
      reviewNum: 0,
      reviewKeywords: [] as string[],
      reviews: [] as any[],
    },
  });

  useEffect(() => {
    if (userProfile) {
      setUser(prev => ({
        ...prev,
        imageUrl: userProfile.imageUrl,
        name: userProfile.name,
        tags: userProfile.hashtag,
      }));
    }
  }, [userProfile]);

  useEffect(() => {
    if (!isFromMyPage) return;
    const checkProfile = async () => {
      try {
        const profileData = await memberController.checkMyProfile();
        const hasNoProfile =
          !!profileData.nickname &&
          !profileData.introduce &&
          !profileData.profileImageUrl &&
          (!profileData.hashTags || profileData.hashTags.length === 0);

        setIsNoProfile(hasNoProfile);

        if (!hasNoProfile) {
          setUser(prev => ({
            ...prev,
            imageUrl: profileData.profileImageUrl || '',
            name: profileData.nickname || '',
            intro: profileData.introduce || '',
            tags: profileData.hashTags || [],
          }));
        } else {
          setUser(prev => ({ ...prev, name: profileData.nickname || '' }));
        }
      } catch (error) {
        console.error('Failed to check profile:', error);
      }
    };
    checkProfile();
  }, [isFromMyPage]);

  useEffect(() => {
    if (isFromMyPage || !userId) return;

    const loadPublicProfile = async () => {
      try {
        const [profileData, reviewSummary, reviewList, memberPosts] = await Promise.all([
          memberController.getPublicProfile(userId),
          memberController.getPublicReviewSummary(userId),
          memberController.getPublicReviews(userId, { page: 1, limit: 10 }),
          postController.getMemberPosts(userId, 1, 12),
        ]);

        const drawings = (memberPosts?.data ?? []).map((post: any) => ({
          id: String(post.contentId ?? post.id),
          imageUrl: post.thumbnailUrl ?? post.imageUrls?.[0] ?? '',
          likes: post.likeCount ?? 0,
          comments: post.commentCount ?? 0,
          description: post.explanation ?? post.content ?? '',
          date: post.createdAt ?? '',
        }));

        const reviews = (reviewList?.data ?? []).map((review: any) => ({
          id: review.id,
          userProfile: review.writerProfileImageUrl ?? '',
          userName: review.writerNickname ?? '사용자',
          date: review.createdAt ? String(review.createdAt).slice(0, 10) : '',
          content: review.content ?? '',
        }));

        setUser({
          imageUrl: profileData.profileImageUrl ?? '',
          name: profileData.nickname ?? '',
          intro: profileData.introduce ?? '',
          tags: profileData.hashTags ?? [],
          drawings,
          reviews: {
            drawNum: reviewSummary.completedWorkCount ?? 0,
            rejectNum: 0,
            rating: reviewSummary.averageStar ?? 0,
            reviewNum: reviewSummary.reviewCount ?? 0,
            reviewKeywords: (reviewSummary.topKeywords ?? []).map((keyword) => keyword.keyword),
            reviews,
          },
        });
      } catch (error) {
        console.error('Failed to load public profile:', error);
      }
    };

    loadPublicProfile();
  }, [isFromMyPage, userId]);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <UserDetail
        userProfileImage={user.imageUrl}
        userName={user.name}
        userIntroduction={user.intro}
        userTags={user.tags}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        isNoProfile={isFromMyPage ? isNoProfile : false}
        onUploadProfile={isFromMyPage ? () => navigation.navigate('ProfileEdit') : undefined}
      />
      {selectedFilter === '그림' ? (
        <UserDrawings userName={user.name} drawings={user.drawings} />
      ) : (
        <UserReviews
          drawNum={user.reviews.drawNum}
          rejectNum={user.reviews.rejectNum}
          rating={user.reviews.rating}
          reviewNum={user.reviews.reviewNum}
          reviewKeywords={user.reviews.reviewKeywords}
          reviews={user.reviews.reviews}
        />
      )}
    </ScrollView>
  );
}
