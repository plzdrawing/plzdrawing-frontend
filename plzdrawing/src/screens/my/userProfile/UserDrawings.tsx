import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';
import { GreeSad } from '@/assets/images';

interface UserDrawingsProps {
  userName: string;
  drawings: {
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
    description: string;
    date: string;
  }[];
}

export default function UserDrawings({ drawings }: UserDrawingsProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (drawings.length === 0) {
    return (
      <DrawingsWrapper>
        <EmptyStateContainer>
          <GreeSad width={120} height={120} />
          <Txt variant='bodyText' color='dark_gray2' style={{ marginTop: 9 }}>
            아직 게시글이 없어요!
          </Txt>
        </EmptyStateContainer>
      </DrawingsWrapper>
    );
  }

  return (
    <DrawingsWrapper>
      <GridContainer>
        {drawings.map((item) => (
          <DrawingSquare
            key={item.id}
            onPress={() => {
              // navigation.navigate('DrawingsList');
            }}
          />
        ))}
      </GridContainer>
    </DrawingsWrapper>
  )
}

const DrawingsWrapper = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.colors.light_gray1};
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 7px;
  padding-vertical: 17px;
  padding-horizontal: 34px;
`;

const DrawingSquare = styled.View`
  width: 103px;
  height: 103px;
  border-radius: 8px;
  background-color: ${colors.colors.white};
  border: 1px solid ${colors.colors.light_gray2};
`;

const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;
