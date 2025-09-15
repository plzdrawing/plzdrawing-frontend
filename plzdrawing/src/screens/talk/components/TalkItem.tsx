import React from 'react';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';

interface TalkItemProps {
  id: string;
  userProfileImage?: string;
  unreadCount?: number;
  userName: string;
  lastMessageTime: string;
  lastMessage: string;
  onPress: () => void;
}

export const TalkItem: React.FC<TalkItemProps> = ({
  id,
  userProfileImage,
  unreadCount = 0,
  userName,
  lastMessageTime = '',
  lastMessage,
  onPress,
}) => {
  return (
    <TalkItemContainer onPress={onPress}>
      <ProfileImageContainer>
        <ProfileImage source={{ uri: userProfileImage }} />
        {unreadCount > 0 && (
          <UnreadBadge>
            <Txt color="white" variant="secondaryText">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Txt>
          </UnreadBadge>
        )}
      </ProfileImageContainer>

      <ContentContainer>
        <TopRow>
          <Txt variant="bodyTextBold">
            {userName} 님
          </Txt>
          <Txt color="dark_gray1" variant="secondaryText">
            {lastMessageTime}
          </Txt>
        </TopRow>
        
        <BottomRow>
          <LastMessage numberOfLines={2}>
            <Txt variant="auxiliaryTextLight">
              {lastMessage}
            </Txt>
          </LastMessage>
        </BottomRow>
      </ContentContainer>
    </TalkItemContainer>
  );
};

const TalkItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.colors.light_gray2};
`;

const ProfileImageContainer = styled.View`
  position: relative;
  margin-right: 17px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background-color: ${colors.colors.light_gray1};
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin-bottom: 7px;
`;

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LastMessage = styled.Text`
  margin-right: 6px;
`;

const UnreadBadge = styled.View`
  position: absolute;
  top: -6px;
  left: -6px;
  background-color: ${colors.colors.main_yellow};
  border-radius: 10px;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
`;
