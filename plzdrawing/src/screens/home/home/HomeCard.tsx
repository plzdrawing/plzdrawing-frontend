import tw from '@/src/lib/tailwind';

import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import Txt from "@/src/components/ui/Txt";
import { CommentIcon, LikeIcon } from "@/assets/images";
import { View, Dimensions } from "react-native";

const HomeCard = () => {
  const { width } = Dimensions.get("window");

  return (
    <CardContainer>
      <View style={tw`gap-[17px]`}>
        <View style={tw`gap-[7px]`}>
          <View style={tw`flex-row justify-start gap-[8.5px] items-center`}>
            <ImageContainer />
            <View style={tw`flex-row justify-start gap-[7px] items-center`}>
              <Txt variant="subtitleBold" color="black">
                홍길동
              </Txt>
              <Txt variant="secondaryText" color="dark_gray2">
                그림 5회/후기 3개/ 별점 4.5점
              </Txt>
            </View>
          </View>
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
        </View>
        <DrawingContainer source={require("@/assets/images/sample.png")} />
        <View style={tw`flex-row justify-between items-center`}>
          <View style={{ width: "auto" }}>
            <Txt variant="secondaryText" color="dark_gray2">
              예상 소요시간
            </Txt>
            <Txt variant="auxiliaryTextLight" color="black">
              1시간 내외
            </Txt>
          </View>
          <RequestButton>
            <Txt variant="bodyText" color="dark_gray2">
              요청하기
            </Txt>
          </RequestButton>
        </View>
        <View style={{ width: "auto" }}>
          <Txt variant="secondaryText" color="dark_gray2">
            예상금액
          </Txt>
          <Txt variant="subtitleBold" color="black">
            \3,000
          </Txt>
        </View>
        <View style={{ width: "auto" }}>
          <View style={tw`flex-row justify-start gap-[7px]`}>
            <CommentIcon />
            <Txt variant="secondaryText" color="dark_gray2">
              12
            </Txt>
          </View>
          <View style={tw`flex-row justify-start gap-[7px]`}>
            <LikeIcon />
            <Txt variant="secondaryText" color="dark_gray2">
              25
            </Txt>
          </View>
        </View>
      </View>
    </CardContainer>
  );
};

export default HomeCard;

const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: ${Dimensions.get("window").width - 64}px;
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
