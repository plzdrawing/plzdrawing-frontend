import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';
import Header from '@/src/components/layout/header/Header';

import UserDetail from "@/src/screens/my/pages/profilePage/components/UserDetail";
import UserDrawings from "../../userProfile/UserDrawings";
import UserReviews from "../../userProfile/UserReviews";
import { BaseProfile } from "@/src/types/profile";

import { userApi } from "@/src/apis/user";

type FilterType = '그림' | '후기';

interface ProfileProps {
  isFromMyPage?: boolean;
  userId?: string;
  userProfile?: BaseProfile;
}

export default function Profile({ 
  isFromMyPage = false, 
  userId,
  userProfile 
}: ProfileProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('그림');
  const [user, setUser] = useState({
    id: "",
    name: userProfile?.name || "",
    intro: "",
    tags: userProfile?.hashtag || [] as string[],
    drawings: [],
    reviews: {
      drawNum: 0,
      rejectNum: 0,
      rating: 0,
      reviewNum: 0,
      reviewKeywords: [],
      reviews: [],
    },
  });

  // userProfile이 변경되면 user 상태 업데이트
  useEffect(() => {
    if (userProfile) {
      setUser(prev => ({
        ...prev,
        name: userProfile.name,
        tags: userProfile.hashtag,
      }));
    }
  }, [userProfile]);

  // isFromMyPage가 아닐 때만 userId로 데이터 fetch
  useEffect(() => {
    if (!isFromMyPage && userId) {
      const fetchUserData = async () => {
        try {
          const response = await userApi.getUserProfile(Number(userId));
          const data = response as any;
          
          if (data && (data.nickname || data.name)) {
            setUser({
              id: data.id || "",
              name: data.nickname || data.name || "사용자",
              intro: data.introduction || "",
              tags: data.hashtags || [],
              drawings: [],
              reviews: {
                drawNum: 0,
                rejectNum: 0,
                rating: 0,
                reviewNum: 0,
                reviewKeywords: [],
                reviews: [],
              },
            });
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId, isFromMyPage]);

  return (
    <>
      {!isFromMyPage && <Header />}
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <UserDetail
          userName={user.name}
          userIntroduction={user.intro}
          userTags={user.tags}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          isNoProfile={isFromMyPage}
        />
        {selectedFilter === '그림'
          ? <UserDrawings
              userName={user.name}
              drawings={user.drawings}
            />
          : <UserReviews
              drawNum={user.reviews.drawNum}
              rejectNum={user.reviews.rejectNum}
              rating={user.reviews.rating}
              reviewNum={user.reviews.reviewNum}
              reviewKeywords={user.reviews.reviewKeywords}
              reviews={user.reviews.reviews}
            />
        }
      </ScrollView>
    </>
  )
}
