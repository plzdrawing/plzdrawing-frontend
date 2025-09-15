import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { AlarmItem } from './AlarmItem';

export interface AlarmData {
  id: string;
  alarmName: string;
  lastMessageTime: string;
  unreadCount?: number;
  alarmMessage: string;
}

interface AlarmListProps {
  alarms: AlarmData[];
}

export const AlarmList: React.FC<AlarmListProps> = ({ alarms }) => {
  const renderAlarmItem: ListRenderItem<AlarmData> = ({ item }) => (
    <AlarmItem
      id={item.id}
      alarmName={item.alarmName}
      lastMessageTime={item.lastMessageTime}
      unreadCount={item.unreadCount}
      alarmMessage={item.alarmMessage}
    />
  );

  return (
    <StyledFlatList
      data={alarms}
      renderItem={renderAlarmItem}
      keyExtractor={(item: AlarmData) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const StyledFlatList = styled(FlatList<AlarmData>)`
  display: flex;
  flex: 1;
  width: 100%;
  margin: 17px 0;
  padding: 0 32px;
  background-color: var(--1, #F9F9F9);
`;
