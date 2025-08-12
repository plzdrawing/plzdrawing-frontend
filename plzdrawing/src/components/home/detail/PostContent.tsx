import React from "react";
import styled from "styled-components/native";
import Txt from "@/src/components/common/text/Txt";

interface PostContentProps {
  hashtags: string;
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ hashtags, body }) => {
  return (
    <PostContentContainer>
      <Txt
        variant="bodySubText"
        color="dark_gray2"
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
