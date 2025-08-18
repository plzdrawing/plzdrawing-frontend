import { useState } from "react";
import { Container } from "@/src/components/common/container/Container";
import AlarmHeader from "./components/AlarmHeader";
import { AlarmData, AlarmList } from "./components/AlarmList";

export default function Alarm() {
  const [alarms, setAlarms] = useState<AlarmData[]>([
    {
      id: '1',
      alarmName: '요청서가 도착했어요',
      lastMessageTime: '지금',
      unreadCount: 1,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '2',
      alarmName: '요청서가 도착했어요',
      lastMessageTime: '어제',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '3',
      alarmName: '요청서가 도착했어요',
      lastMessageTime: '어제',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
    {
      id: '4',
      alarmName: '요청서가 도착했어요',
      lastMessageTime: '2025.02.03',
      unreadCount: 0,
      alarmMessage: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    },
  ]);

  return (
    <Container>
      <AlarmHeader />
      <AlarmList alarms={alarms} />
    </Container>
  );
}
