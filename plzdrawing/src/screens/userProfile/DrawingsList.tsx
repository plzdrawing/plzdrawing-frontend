import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';

interface Drawing {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  description: string;
  date: string;
}

export default function DrawingsList({ drawings }: { drawings: Drawing[] }) {
  return (
    <ListWrapper>
      {drawings.map((drawing) => (
        <DrawingContainer key={drawing.id}>
          {/* <img src={drawing.imageUrl} alt={drawing.description} /> */}
          <Txt>{drawing.description}</Txt>
          <Txt>Likes: {drawing.likes}</Txt>
          <Txt>Comments: {drawing.comments}</Txt>
          <Txt>Date: {drawing.date}</Txt>
        </DrawingContainer>
      ))}
    </ListWrapper>
  )
}

const ListWrapper = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DrawingContainer = styled.View`
  border: 1px solid ${colors.colors.dark_gray1};
  border-radius: 8px;
  padding: 12px;
  background-color: ${colors.colors.light_gray1};
`;
