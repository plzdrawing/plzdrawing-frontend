import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { ScrollView } from 'react-native';
import Header from '@/src/components/layout/header/Header';

import UserDetail from "@/src/screens/my/pages/profilePage/components/UserDetail";
import UserDrawings from "../../userProfile/UserDrawings";
import UserReviews from "../../userProfile/UserReviews";
import { BaseProfile } from "@/src/types/profile";

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
