import tw from '@/src/lib/tailwind';
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Colors from "@/src/constants/Colors";
import { BackArrowIcon } from "@/assets/images";
import Txt from "@/src/components/ui/Txt";

interface HomeDetailHeaderProps {
  authorName?: string;
  title?: string;
  type?: "post" | "drawingCard" | "request" | "profileUpload" | "drawingCardUpload";
  onBackPress: () => void;
}

const HomeDetailHeader: React.FC<HomeDetailHeaderProps> = ({
  authorName,
  title = "",
  type = "post",
  onBackPress,
}) => {
  return (
    <View
      style={[
        tw`w-full flex-row items-center`,
        {
          paddingTop: 72,
          paddingRight: 0,
          paddingBottom: 12,
          paddingLeft: 16,
          backgroundColor: Colors.colors.white,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 4,
        },
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={tw`p-[8px]`}>
        <BackArrowIcon />
      </TouchableOpacity>
      <View style={tw`flex-row items-baseline ml-[10px]`}>
        {authorName && <Txt variant="mainTitleBold">{authorName} 님</Txt>}
        {(title && <Txt variant="mainTitleBold">{title}</Txt>) || (
          <Txt
            variant={
              type == "request" ||
              type == "profileUpload" ||
              type == "drawingCardUpload"
                ? "mainTitleBold"
                : "bodyText"
            }
            style={{ marginLeft: 7 }}
          >
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
        )}
      </View>
    </View>
  );
};

export default HomeDetailHeader;
