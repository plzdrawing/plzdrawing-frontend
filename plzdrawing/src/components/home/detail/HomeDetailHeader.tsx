import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import { BackArrowIcon } from "@/assets/images";
import Txt from "@/src/components/common/text/Txt";

interface HomeDetailHeaderProps {
  authorName?: string;
  type?: "post" | "drawingCard" | "request" | "profileUpload" | "drawingCardUpload";
  onBackPress: () => void;
}

const HomeDetailHeader: React.FC<HomeDetailHeaderProps> = ({
  authorName,
  type = "post",
  onBackPress,
}) => {
  return (
    <HeaderContainer>
      <BackButton onPress={onBackPress}>
        <BackArrowIcon />
      </BackButton>
      <HeaderTitleContainer>
        {authorName && <Txt variant="mainTitleBold">{authorName} 님</Txt>}
        <Txt variant={type == "request" || type == "profileUpload" || type == "drawingCardUpload" ? "mainTitleBold" : "bodyText"} style={{ marginLeft: 7 }}>
          {type === "post"
            ? "의 게시글"
            : type === "drawingCard"
            ? "의 그림 카드"
            : type === "request"
            ? "요청하기"
            : type === "drawingCardUpload"
            ? "그림카드 올리기"
            : "프로필 업로드"}
        </Txt>
      </HeaderTitleContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  width: 100%;
  padding: 72px 0 12px 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.colors.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-left: 10px;
`;

export default HomeDetailHeader;
