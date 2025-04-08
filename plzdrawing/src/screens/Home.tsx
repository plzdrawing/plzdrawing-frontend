import { StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../components/common/button/PrimaryButton";
import { Container } from "../components/common/container/Container";
import HomeHeader from "../components/home/HomeHeader";
import ScrollFilter from "../components/home/ScrollFilter";
import { Col } from "../components/common/flex/Flex";
import Txt from "../components/common/text/Txt";
import RadioFilter from "../components/home/RadioFilter";
import styled from "styled-components/native";
import { PencilIcon } from "@/assets/images";
import HomeCard from "../components/home/HomeCard";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [selectedId, setSelectedId] = useState(0);
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
                <HomeCard />
                <HomeCard />
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
