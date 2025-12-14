import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Container } from "@/src/components/common/container/Container";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import UserDetail from "./UserDetail";
import UserDrawings from "./UserDrawings";
import UserReviews from "./UserReviews";
import { userApi } from "@/src/apis/user";
import { GreeSad } from "@/assets/images";

type FilterType = '그림' | '후기';

interface UserProfileProps {
  isFromMyPage?: boolean;
  userId?: string;
}

export default function UserProfile({ isFromMyPage = false, userId }: UserProfileProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('그림');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    intro: "",
    tags: [] as string[],
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getMe();
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <Container>
        {!isFromMyPage && <Header backgroundColor={colors.colors.light_gray1} />}
      </Container>
    );
  }

  return (
    <Container>
      {!isFromMyPage && <Header backgroundColor={colors.colors.light_gray1} />}
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
          isOwner={isFromMyPage}
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
    </Container>
  )
}
