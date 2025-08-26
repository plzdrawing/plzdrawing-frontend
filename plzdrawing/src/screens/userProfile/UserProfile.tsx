import { useState } from "react";
import { ScrollView } from "react-native";
import { Container } from "@/src/components/common/container/Container";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import UserDetail from "./UserDetail";
import UserDrawings from "./UserDrawings";
import UserReviews from "./UserReviews";

type FilterType = '그림' | '후기';

export default function UserProfile() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('그림');
  
  const user = {
    id: "1",
    name: "홍길동",
    intro: "안녕하세요. 동물 그림쟁입니다:)",
    tags: ["#귀여운", "#낙서", "#동물그림"],
    drawings: Array.from({ length: 12 }, (_, index) => ({
      id: `drawing-${index}`,
      imageUrl: '',
      likes: 43,
      comments: 12,
      description: '많이 찾아주시는 고양이 그림 낙서형태로 그려봤어요 :)',
      date: '2025년 6월 18일',
    })),
    reviews: {
      drawNum: 7,
      rejectNum: 0,
      rating: 5.0,
      reviewNum: 2,
      reviewKeywords: ["귀여워요", "원하는 대로 그려줘요", "친절해요"],
      reviews: [
        {
          id: 1,
          userProfile: "https://example.com/user1.jpg",
          userName: "홍길동",
          date: "5분 전",
          content: "요청대로 그려줘요 :) 친절하시구 만족합니당 ㅎㅎ",
        },
        {
          id: 2,
          userProfile: "https://example.com/user2.jpg",
          userName: "홍길동",
          date: "하루 전",
          content: "요청대로 그려줘요 :) 친절하시구 만족합니당 ㅎㅎ",
        },
      ],
    },
  }

  return (
    <Container>
      <Header backgroundColor={colors.colors.light_gray1} />
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
