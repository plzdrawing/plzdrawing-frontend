import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import Txt from "../common/text/Txt";
import { Col, Row } from "../common/flex/Flex";
import { CommentIcon, LikeIcon } from "@/assets/images";

const HomeCard = () => {
  return (
    <CardContainer>
      <Col gap={17}>
        <Col gap={7}>
          <Row justifyContent="flex-start" gap={8.5} alignItems="center">
            <ImageContainer />
            <Row justifyContent="flex-start" gap={7} alignItems="center">
              <Txt variant="subtitleBold" color="black">
                홍길동
              </Txt>
              <Txt variant="secondaryText" color="dark_gray2">
                그림 5회/후기 3개/ 별점 4.5점
              </Txt>
            </Row>
          </Row>
          <Txt variant="secondaryText" color="dark_gray2">
            5분전
          </Txt>
          <Txt variant="bodySubText" color="dark_gray2">
            #귀여운 #낙서
          </Txt>
          <Txt variant="bodyText" color="black">
            소소한 그림 그려드려요!소소한 그림 그려드려요! 소소한 그림
            그려드려요!
          </Txt>
        </Col>
        <DrawingContainer source={require("@/assets/images/sample.png")} />
        <Row justifyContent="space-between" alignItems="center">
          <Col style={{ width: "auto" }}>
            <Txt variant="secondaryText" color="dark_gray2">
              예상 소요시간
            </Txt>
            <Txt variant="auxiliaryTextLight" color="black">
              1시간 내외
            </Txt>
          </Col>
          <RequestButton>
            <Txt variant="bodyText" color="dark_gray2">
              요청하기
            </Txt>
          </RequestButton>
        </Row>
        <Col style={{ width: "auto" }}>
          <Txt variant="secondaryText" color="dark_gray2">
            예상금액
          </Txt>
          <Txt variant="subtitleBold" color="black">
            \3,000
          </Txt>
        </Col>
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
              25
            </Txt>
          </Row>
        </Row>
      </Col>
    </CardContainer>
  );
};

export default HomeCard;

const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 17px;
  border-radius: 5px;
  background-color: ${Colors.colors.white};
  border: 1px solid ${Colors.colors.light_gray2};
`;

const ImageContainer = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray2};
`;

const DrawingContainer = styled.Image`
  width: 100%;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray1};
  object-fit: scale-down;
  padding: 10px;
`;

const RequestButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 15px;
  border-radius: 12px;
  border: 1px solid ${Colors.colors.light_gray2};
`;
