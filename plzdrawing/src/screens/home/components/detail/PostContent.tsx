import tw from '@/src/lib/tailwind';
import React from "react";
import { View } from "react-native";
import Txt from "@/src/components/ui/Txt";

interface PostContentProps {
  hashtags: string;
  type?: "post" | "drawingCard";
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ hashtags, type="post", body }) => {
  return (
    <View style={tw`w-full mb-[20px]`}>
      <Txt
        variant="bodySubText"
        color={type === "post" ? "dark_gray2" : "highright_orange"}
        style={{ marginBottom: 8 }}
      >
        {hashtags}
      </Txt>
      <Txt variant="bodyText" style={{ marginBottom: 8 }}>
        {body}
      </Txt>
    </View>
  );
};

export default PostContent;
