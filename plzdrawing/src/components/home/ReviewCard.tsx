import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "../common/text/Txt";
import { Col, Row } from "../common/flex/Flex";
import { StyleSheet, View } from "react-native";
import { CommentIcon, LikeIcon } from "@/assets/images";

export default function ReviewCard() {
  return (
    <CardContainer>
      <Col gap={17}>
        {/* 리뷰어 프로필 */}
        <Row justifyContent="flex-start" alignItems="center" gap={8.5}>
          <ProfileImage />
          <Row alignItems="center" justifyContent="flex-start" gap={7}>
            <Txt variant="subtitleBold" color="black">
              홍길동
            </Txt>
            <Txt variant="secondaryText" color="dark_gray2">
              5분 전
            </Txt>
          </Row>
        </Row>

        {/* 그림쟁이 프로필 */}
        <View style={{ marginHorizontal: 10, width: "90%" }}>
          <Row justifyContent="flex-start" alignItems="center" gap={8.5} padding={"7px 7px"} style={[styles.borderedRow]}>
            <ProfileImage />
            <Row alignItems="center" justifyContent="flex-start" gap={7}>
              <Txt variant="subtitleBold" color="black">
                동길이
              </Txt>
              <Txt variant="secondaryText" color="dark_gray2">
                그린 그림 5회
              </Txt>
            </Row>
          </Row>
        </View>

        {/* 리뷰 내용 */}
        <Col gap={12}>
          <Txt variant="bodyText" color="black">
            너무 빠르고 예쁘게 잘 그려주셨고 요청사항도 잘 들어주셨어요!{"\n"}
            그리고 너무 친절하십니당 &gt; &lt;
          </Txt>
          <ReviewImage source={require("@/assets/images/sample.png")} />
        </Col>

        {/* 하단 아이콘 */}
         <Row style={{ width: "auto" }} justifyContent="flex-start" gap={12}>
            <Row style={{ width: "auto" }} alignItems="center" gap={7}>
              <CommentIcon />
              <Txt variant="secondaryText" color="dark_gray2">
                12
              </Txt>
            </Row>
            <Row style={{ width: "auto" }} alignItems="center" gap={7}>
              <LikeIcon />
              <Txt variant="secondaryText" color="dark_gray2">
                23
              </Txt>
            </Row>
          </Row>
        </Col>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 17px;
  width: 100%;
  padding: 17px;
  border-radius: 5px;
  background-color: ${Colors.colors.white};
  border: 1px solid ${Colors.colors.light_gray2};
`;

const ProfileImage = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray2};
`;

const ReviewImage = styled.Image`
  width: 100%;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray1};
  object-fit: scale-down;
  margin-top: 10px;
`;

const styles = StyleSheet.create({
  borderedRow: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.colors.light_gray2,
  },
});
