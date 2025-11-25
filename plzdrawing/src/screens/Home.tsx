import React, { useState, useEffect } from "react";
import { TouchableOpacity, BackHandler } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container } from "@/src/components/common/container/Container";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Col } from "@/src/components/common/flex/Flex";
import SearchFilter from "@/src/components/home/SearchFilter";
import HomeCard from "@/src/components/home/HomeCard";
import ReviewCard from "@/src/components/home/ReviewCard";
import Colors from "@/src/constants/Colors";
import { PencilIcon } from "@/assets/images";

type RootStackParamList = {
  Home: undefined;
  HomePostDetail: { postId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HomePostDetail"
>;

export default function Home() {
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();
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

  /**
   * Handles navigation to the detail screen.
   * @param postId - The ID of the post to display.
   */
  const handleCardPress = (postId: string) => {
    navigation.navigate("HomePostDetail", { postId });
  };

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeHeader
        title="그려드려요"
        title2="그림쟁이후기"
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Col
        justifyContent="flex-start"
        alignItems="center"
        padding="24px 32px"
        gap={20}
        style={{ backgroundColor: Colors.colors.light_gray1, height: "100%" }}
      >
        <SearchFilter selectedId={selectedId} />
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <Col gap={17} style={{ paddingBottom: 50 }}>
            {selectedId === 0 ? (
              <>
                {/* Each card is now wrapped in a TouchableOpacity to handle presses */}
                {/* A unique postId is passed for each card */}
                <TouchableOpacity onPress={() => handleCardPress("post-id-1")}>
                  <HomeCard />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCardPress("post-id-2")}>
                  <HomeCard />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <ReviewCard />
                <ReviewCard />
              </>
            )}
          </Col>
        </ScrollContainer>
      </Col>
      <PlusButton>
        <PencilIcon />
      </PlusButton>
    </Container>
  );
}

const PlusButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  right: 32px;
  width: 57px;
  height: 57px;
  border-radius: 28.5px;
  background-color: ${Colors.colors.sub_yellow};
  border: 1px solid ${Colors.colors.main_yellow};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;