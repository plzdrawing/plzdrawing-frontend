import tw from '@/src/lib/tailwind';
import { useState } from 'react';

import { ScrollView } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';

import { 
  AlarmData, 
  AlarmList, 
} from '@/src/screens/alarm/components/AlarmList';

import { 
  BackArrowIcon,
  MenuCircleIcon,
} from '@/assets/images';

export default function Alarm() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [alarms, setAlarms] = useState<AlarmData[]>([
    {
      id: '1',
      alarmTitle: '요청서가 도착했어요',
      lastMessageTime: '지금',
      unreadCount: 1,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '2',
      alarmTitle: '요청서가 도착했어요',
      lastMessageTime: '어제',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '3',
      alarmTitle: '요청서가 도착했어요',
      lastMessageTime: '어제',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '4',
      alarmTitle: '요청서가 도착했어요',
      lastMessageTime: '2025.02.03',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
  ]);

  const handleDeleteAlarm = (id: string) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <Container>
      <Header
        title='알림함'
        leftIcon={<BackArrowIcon />}
        rightIcon={<MenuCircleIcon />}
        onRightClick={() => setIsEditMode(!isEditMode)}
        className='pb-[12px]'
      />
      <ScrollView
        style={tw`w-full h-full bg-light-gray-1`}
        showsVerticalScrollIndicator={false}
      >
        <AlarmList 
          alarms={alarms} 
          isEditMode={isEditMode}
          onDeleteAlarm={handleDeleteAlarm}
        />
      </ScrollView>
    </Container>
  );
}
