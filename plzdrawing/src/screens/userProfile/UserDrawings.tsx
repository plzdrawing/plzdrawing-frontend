import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';

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
  background-color: ${colors.colors.light_gray1};
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px;
  padding: 10px;
`;

const DrawingSquare = styled.View`
  width: 103px;
  height: 103px;
  border-radius: 8px;
  background-color: ${colors.colors.white};
  border: 1px solid ${colors.colors.light_gray2};
`;
