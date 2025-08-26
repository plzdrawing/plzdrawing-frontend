import React from 'react';
import styled from 'styled-components/native';
import Txt from '@/src/components/common/text/Txt';
import { NoTalkImage } from '@/assets/images'; 

export const NoTalk: React.FC = () => {
  return (
    <Container>
      <NoTalkImage />
      <TextContainer>
        <Txt>
          아직 그림톡이 없어요!
        </Txt>
        <Txt color="dark_gray2" variant="default" align="center">
          마음에 드는 그림쟁이를 찾아{'\n'}그림톡을 시작해 보세요
        </Txt>
      </TextContainer>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.View`
  align-items: center;
  gap: 16px;
  margin-top: 17px;
`;
