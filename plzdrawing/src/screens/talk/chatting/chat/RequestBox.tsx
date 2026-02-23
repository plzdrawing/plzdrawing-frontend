import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { View, Image, TouchableOpacity } from "react-native";

interface RequestBoxProps {
  type: "request" | "accept" | "reject" | "completePayment" | "check" | "feedback";
  imageUrl?: string;
  title?: string;
  price?: number;
  description?: string;
  message?: string;
  date?: string;
  feedbackCount?: string;
  /** 주 버튼(확인하기 등) 콜백 */
  onPrimaryPress?: () => void;
  /** 보조 버튼(취소하기 등) 콜백 */
  onSecondaryPress?: () => void;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
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
  onPrimaryPress,
  onSecondaryPress,
  disabled = false,
}: RequestBoxProps) {
  const content = getContentByType(type);
  const backgroundColor = type === "accept" || type === "check" ? Colors.colors.sub_yellow : Colors.colors.white;
  const borderColor = type === "accept" || type === "check" ? Colors.colors.main_yellow : Colors.colors.light_gray2;
  const hasProfileImage = type === "accept" || type === "reject" || type === "check";

  const boxContent = (
    <View
      style={[
        tw`max-w-[70%] p-[20px] rounded-[12px] gap-[12px]`,
        { borderWidth: 2, borderColor, backgroundColor, flexShrink: 1 },
      ]}
    >
      <Txt variant="auxiliaryTextBold" color="black" style={{ marginBottom: 12 }}>
        {content.title}
      </Txt>

      {content.hasImage && message && (
        <>
          <Image
            source={{ uri: imageUrl }}
            style={[tw`w-full h-[200px] rounded-[8px]`, { backgroundColor: Colors.colors.light_gray2 }]}
          />
          <View style={tw`w-full`}>
            <Txt variant="auxiliaryTextLight" color="icon_default">
              {message}
            </Txt>
          </View>
        </>
      )}

      {content.message && !content.hasImage && (
        <View style={tw`w-full`}>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {content.message}
          </Txt>
        </View>
      )}

      {content.additionalInfo && (
        <View style={tw`gap-[4px]`}>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            결제금액: {price}원
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            예상완료일자: {date}
          </Txt>
        </View>
      )}

      {content.feedbackInfo && (
        <View style={tw`gap-[4px]`}>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            남은 피드백 횟수: {feedbackCount}
          </Txt>
        </View>
      )}

      <View
        style={[tw`flex-row p-[16px] rounded-[8px] gap-[12px] items-center`, { backgroundColor: Colors.colors.white }]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={[tw`w-[52px] h-[52px] rounded-[8px]`, { backgroundColor: Colors.colors.light_gray2 }]}
        />
        <View style={tw`flex-1 gap-[4px]`}>
          <Txt variant="auxiliaryTextBold" color="black">
            {title}
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {price}원
          </Txt>
          <Txt variant="auxiliaryTextLight" color="icon_default">
            {description}
          </Txt>
        </View>
      </View>

      <View style={tw`flex-row gap-[8px] mt-[8px]`}>
        {content.secondaryButtonText && (
          <TouchableOpacity
            onPress={onSecondaryPress}
            disabled={disabled}
            style={[tw`flex-1 py-[12px] px-[24px] rounded-[8px] items-center`, { backgroundColor: Colors.colors.white, opacity: disabled ? 0.4 : 1 }]}
          >
            <Txt variant="auxiliaryTextLight" color="black">
              {content.secondaryButtonText}
            </Txt>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onPrimaryPress}
          disabled={disabled}
          style={[
            tw`py-[12px] px-[24px] rounded-[8px] items-center`,
            content.secondaryButtonText
              ? { flex: 1, alignSelf: 'stretch', backgroundColor: Colors.colors.main_yellow, opacity: disabled ? 0.4 : 1 }
              : { alignSelf: 'flex-end', minWidth: 100, backgroundColor: Colors.colors.main_yellow, opacity: disabled ? 0.4 : 1 },
          ]}
        >
          <Txt variant="auxiliaryTextLight" color="black">
            {content.buttonText}
          </Txt>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (hasProfileImage) {
    return (
      <View style={tw`flex-row items-start gap-[17px] max-w-full self-start`}>
        <Image
          source={{ uri: imageUrl }}
          style={[tw`w-[40px] h-[40px] rounded-[12px]`, { backgroundColor: Colors.colors.light_gray2 }]}
        />
        {boxContent}
      </View>
    );
  }

  return boxContent;
}
