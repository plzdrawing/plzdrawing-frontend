import tw from '@/src/lib/tailwind';

import { 
  FlatList, 
  ListRenderItem,
} from 'react-native';

import { AlarmItem } from '@/src/screens/alarm/components/AlarmItem';

export interface AlarmData {
  id: string;
  alarmTitle: string;
  lastMessageTime: string;
  unreadCount?: number;
  alarmMessage: string;
}

interface AlarmListProps {
  alarms: AlarmData[];
  isEditMode?: boolean;
  onDeleteAlarm?: (id: string) => void;
}

export const AlarmList: React.FC<AlarmListProps> = ({ alarms, isEditMode = false, onDeleteAlarm }) => {
  const renderAlarmItem: ListRenderItem<AlarmData> = ({ item }) => (
    <AlarmItem
      id={item.id}
      alarmTitle={item.alarmTitle}
      lastMessageTime={item.lastMessageTime}
      unreadCount={item.unreadCount}
      alarmMessage={item.alarmMessage}
      isEditMode={isEditMode}
      onDelete={onDeleteAlarm}
    />
  );

  return (
    <FlatList
      data={alarms}
      renderItem={renderAlarmItem}
      keyExtractor={(item: AlarmData) => item.id}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 w-full my-[17px] px-[32px]`}
    />
  );
};
