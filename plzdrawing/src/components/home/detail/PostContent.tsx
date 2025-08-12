import React from "react";
import styled from "styled-components/native";
import Txt from "@/src/components/common/text/Txt";

interface PostContentProps {
  hashtags: string;
  type?: "post" | "drawingCard";
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ hashtags, type="post", body }) => {
  return (
    <PostContentContainer>
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
    </PostContentContainer>
  );
};

const PostContentContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export default PostContent;
