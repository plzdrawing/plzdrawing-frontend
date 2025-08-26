import React from 'react';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

type FilterType = '그림' | '후기';

interface UserDetailProps {
  userName: string;
  userIntroduction: string;
  userTags: string[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function UserDetail({ 
  userName, 
  userIntroduction, 
  userTags, 
  selectedFilter, 
  onFilterChange 
}: UserDetailProps) {
  const handleFilterPress = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <DetailWrapper>
      <ProfileImage />
      <Txt variant='mainTitleBold'>{userName} 님</Txt>
      <Txt variant='bodyText'>{userIntroduction}</Txt>
      <Txt color='dark_gray1' variant='bodyText'>{userTags.join(", ")}</Txt>
      <PostButtonContainer>
        <PrimaryButton
          title='게시글 보러가기'
          color='sub_yellow'
          onPress={() => {}}
        />
      </PostButtonContainer>
      <FilterButtonContainer>
        <FilterButton 
          isSelected={selectedFilter === '그림'}
          onPress={() => handleFilterPress('그림')}
        >
          <Txt variant={selectedFilter === '그림' ? 'bodyTextBold' : 'bodyText'}>
            그림
          </Txt>
          <FilterButtonBorder isSelected={selectedFilter === '그림'} />
        </FilterButton>
        <FilterButton 
          isSelected={selectedFilter === '후기'}
          onPress={() => handleFilterPress('후기')}
        >
          <Txt variant={selectedFilter === '후기' ? 'bodyTextBold' : 'bodyText'}>
            후기
          </Txt>
          <FilterButtonBorder isSelected={selectedFilter === '후기'} />
        </FilterButton>
      </FilterButtonContainer>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  width: 100%;
  padding: 16px 0 4px 0;
  background-color: ${colors.colors.light_gray1};
`;

const ProfileImage = styled.View`
  width: 120px;
  height: 120px;
  margin: 17px 0 10px 0;
  border: 1px solid ${colors.colors.dark_gray1};
  border-radius: 5px;
  background-color: ${colors.colors.light_gray3};
`;

const PostButtonContainer = styled.View`
  width: 100%;
  margin: 27px 0 46px 0;
  padding: 0 66px;
`;

const FilterButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.colors.light_gray2};
`;

interface FilterButtonProps {
  isSelected: boolean;
}

const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
  flex: 1;
  align-items: center;
  padding: 7px;
`;

const FilterButtonBorder = styled.View<FilterButtonProps>`
  position: absolute;
  bottom: 0;
  width: 31px;
  height: 2px;
  border-radius: 10px;
  background-color: ${({ isSelected }: FilterButtonProps) => 
    isSelected ? colors.colors.black : 'transparent'};
`;
