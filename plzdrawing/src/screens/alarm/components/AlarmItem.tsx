import React from 'react';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';

interface AlarmItemProps {
  id: string;
  alarmName: string;
  lastMessageTime: string;
  unreadCount?: number;
  alarmMessage: string;
}

export const AlarmItem: React.FC<AlarmItemProps> = ({
  id,
  alarmName,
  unreadCount = 0,
  lastMessageTime = '',
  alarmMessage,
}) => {
  return (
    <TalkItemContainer>
      <ContentContainer>
        <TopRow>
          <LeftSection>
          <Txt variant="bodyTextBold">
            {alarmName}
          </Txt>
          <Txt color="dark_gray1" variant="secondaryText">
              {lastMessageTime}
            </Txt>
          </LeftSection>
          <RightSection>
            {unreadCount > 0 && (
              <UnreadBadge>
                <Txt color="white" variant="secondaryText">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Txt>
              </UnreadBadge>
            )}
          </RightSection>
        </TopRow>
        
        <BottomRow>
          <LastMessage numberOfLines={2}>
            <Txt variant="auxiliaryTextLight">
              {alarmMessage}
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

const ContentContainer = styled.View`
  flex: 1;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`;

const LeftSection = styled.View`
  display: flex;
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;

const RightSection = styled.View``;

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LastMessage = styled.Text`
  margin-right: 6px;
`;

const UnreadBadge = styled.View`
  background-color: ${colors.colors.main_yellow};
  border-radius: 10px;
  width: 15px;
  height: 15px;
  justify-content: center;
  align-items: center;
`;
