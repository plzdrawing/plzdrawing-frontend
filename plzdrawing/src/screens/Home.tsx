import { TouchableOpacity } from "react-native";
import colors from "@/src/constants/Colors";
import { Container } from "../components/common/container/Container";
import HomeHeader from "../components/home/HomeHeader";
import { Col } from "../components/common/flex/Flex";
import RadioFilter from "../components/home/RadioFilter";
import styled from "styled-components/native";
import { PencilIcon } from "@/assets/images";
import HomeCard from "../components/home/HomeCard";
import { useState } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
        style={{ backgroundColor: colors.colors.light_gray1, height: "100%" }}
      >
        <RadioFilter />
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <Col gap={17} style={{ paddingBottom: 10 }}>
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
              <></>
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
  background-color: ${colors.colors.sub_yellow};
  border: 1px solid ${colors.colors.main_yellow};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;