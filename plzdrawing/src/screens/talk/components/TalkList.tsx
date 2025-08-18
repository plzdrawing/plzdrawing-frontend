import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { TalkItem } from './TalkItem';

export interface TalkData {
  id: string;
  userProfileImage?: string;
  unreadCount?: number;
  userName: string;
  lastMessageTime: string;
  lastMessage: string;
}

interface TalkListProps {
  talks: TalkData[];
  onTalkPress: (talkId: string) => void;
}

export const TalkList: React.FC<TalkListProps> = ({ talks, onTalkPress }) => {
  const renderTalkItem: ListRenderItem<TalkData> = ({ item }) => (
    <TalkItem
      id={item.id}
      userProfileImage={item.userProfileImage}
      userName={item.userName}
      lastMessage={item.lastMessage}
      lastMessageTime={item.lastMessageTime}
      unreadCount={item.unreadCount}
      onPress={() => onTalkPress(item.id)}
    />
  );

  return (
    <StyledFlatList
      data={talks}
      renderItem={renderTalkItem}
      keyExtractor={(item: TalkData) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const StyledFlatList = styled(FlatList<TalkData>)`
  display: flex;
  flex: 1;
  width: 100%;
  margin: 17px 0;
  padding: 0 32px;
  background-color: var(--1, #F9F9F9);
`;
