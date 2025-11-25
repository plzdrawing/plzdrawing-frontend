import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "../common/text/Txt";
import { Image } from "react-native";

interface RequestBoxProps {
  type: "request" | "accept" | "reject" | "completePayment" | "check" | "feedback";
  imageUrl?: string;
  title?: string;
  price?: number;
  description?: string;
  message?: string;
  date?: string;
  feedbackCount?: string;
}

const getContentByType = (type: RequestBoxProps["type"]) => {
  switch (type) {
    case "request":
      return {
        title: "그림 요청이 도착했어요 :)",
        buttonText: "확인하기",
      };
    case "accept":
      return {
        title: "홍길동 님이 요청을 수락했습니다 :)",
        message: "동길이 님의 결제를 기다리고 있어요.",
        additionalInfo: true,
        buttonText: "수락 못 결제하기",
        secondaryButtonText: "취소하기",
      };
    case "reject":
      return {
        title: "요청을 거절되었습니다.\n다음에 다시 만나요 :)",
        message: "사유: 죄송합니다! 제가 감자기 해야할 일이 생겨서요! 다음에 더...",
        buttonText: "수정하기",
      };
    case "completePayment":
      return {
        title: "결제완료!\n홍길동 님! 잘부탁드려요 :)",
        additionalInfo: true,
        buttonText: "확인하기",
      };
    case "check":
      return {
        title: "이건 어떠세요?",
        message: "고양이 는 이만큼 이번 됐까요?",
        hasImage: true,
        buttonText: "확인하기",
      };
    case "feedback":
      return {
        title: "피드백을 보냈습니다",
        message: '"비행기 고양이 는 조금 더 키워주세요 ㅎㅎ"',
        feedbackInfo: true,
        buttonText: "확인하기",
      };
    default:
      return {
        title: "",
        buttonText: "확인하기",
      };
  }
};

export default function RequestBox({
  type,
  imageUrl = "",
  title = "귀여운 그림",
  price = 1000,
  description = "30분 예상 / 수정...",
  message,
  date = "24.03.20",
  feedbackCount = "1/1",
}: RequestBoxProps) {
  const content = getContentByType(type);
  const backgroundColor = type === "accept" || type === "check" ? Colors.colors.sub_yellow : Colors.colors.white;
  const borderColor = type === "accept" || type === "check" ? Colors.colors.main_yellow : Colors.colors.light_gray2;
  const hasProfileImage = type === "accept" || type === "reject" || type === "check";

  const boxContent = (
    <RequestContainer backgroundColor={backgroundColor} borderColor={borderColor}>
      <Txt variant="auxiliaryTextBold" color="black" style={{ marginBottom: 12 }}>
        {content.title}
      </Txt>

      {content.hasImage && message && (
        <>
          <MessageImage source={{ uri: imageUrl }} />
          <MessageText>
            <Txt variant="auxiliaryTextLight" color="icon_default">
              {message}
            </Txt>
          </MessageText>
        </>
      )}

      {content.message && !content.hasImage && (
        <MessageText>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {content.message}
          </Txt>
        </MessageText>
      )}

      {content.additionalInfo && (
        <InfoText>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            결제금액: {price}원
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            예상완료일자: {date}
          </Txt>
        </InfoText>
      )}

      {content.feedbackInfo && (
        <FeedbackInfo>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            남은 피드백 횟수: {feedbackCount}
          </Txt>
        </FeedbackInfo>
      )}

      <CardContainer>
        <ProfileImage source={{ uri: imageUrl }} />
        <CardContent>
          <Txt variant="auxiliaryTextBold" color="black">
            {title}
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {price}원
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {description}
          </Txt>
        </CardContent>
      </CardContainer>

      <ButtonContainer>
        {content.secondaryButtonText && (
          <SecondaryButton>
            <Txt variant="auxiliaryTextLight" color="black">
              {content.secondaryButtonText}
            </Txt>
          </SecondaryButton>
        )}
        <PrimaryButton hasTwoButtons={!!content.secondaryButtonText}>
          <Txt variant="auxiliaryTextLight" color="black">
            {content.buttonText}
          </Txt>
        </PrimaryButton>
      </ButtonContainer>
    </RequestContainer>
  );

  if (hasProfileImage) {
    return (
      <WrapperWithProfile>
        <SenderProfileImage source={{ uri: imageUrl }} />
        {boxContent}
      </WrapperWithProfile>
    );
  }

  return boxContent;
}

const WrapperWithProfile = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 17px;
  max-width: 100%;
  align-self: flex-start;
`;

const SenderProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${Colors.colors.light_gray2};
`;

const RequestContainer = styled.View<{ backgroundColor: string; borderColor: string }>`
  max-width: 70%;
  padding: 20px;
  border-radius: 12px;
  border-width: 2;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
  background-color: ${(props: { backgroundColor: string }) => props.backgroundColor};
  gap: 12px;
  flex-shrink: 1;
`;

const MessageImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background-color: ${Colors.colors.light_gray2};
`;

const MessageText = styled.View`
  width: 100%;
`;

const InfoText = styled.View`
  gap: 4px;
`;

const FeedbackInfo = styled.View`
  gap: 4px;
`;

const CardContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${Colors.colors.white};
  border-radius: 8px;
  gap: 12px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background-color: ${Colors.colors.light_gray2};
`;

const CardContent = styled.View`
  flex: 1;
  gap: 4px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
`;

const PrimaryButton = styled.TouchableOpacity<{ hasTwoButtons?: boolean }>`
  flex: ${(props: { hasTwoButtons?: boolean }) => props.hasTwoButtons ? 1 : 0};
  padding: 12px 24px;
  background-color: ${Colors.colors.white};
  border-radius: 8px;
  align-items: center;
  align-self: ${(props: { hasTwoButtons?: boolean }) => props.hasTwoButtons ? 'stretch' : 'flex-end'};
  ${(props: { hasTwoButtons?: boolean }) => !props.hasTwoButtons && 'min-width: 100px;'}
`;

const SecondaryButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px 24px;
  background-color: ${Colors.colors.white};
  border-radius: 8px;
  align-items: center;
`;
