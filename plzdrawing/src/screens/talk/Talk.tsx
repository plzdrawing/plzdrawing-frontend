import { Container } from "../../components/common/container/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { useState } from "react";
import HomeHeader from "@/src/components/home/HomeHeader";
import { TalkList, TalkData } from "./components/TalkList";
import { NoTalk } from "./components/NoTalk";

export default function Talk() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [talks, setTalks] = useState<TalkData[]>([
    {
      id: '1',
      unreadCount: 2,
      userName: '홍길동',
      lastMessageTime: '지금',
      lastMessage: '안녕하세요 :)  요청하신 반려동물 낙서 그림 작업완료했습니다 ! 확인 부탁드려요 !!!!!!!!',
    },
    {
      id: '2',
      unreadCount: 1,
      userName: '가나다라',
      lastMessageTime: '5분 전',
      lastMessage: '요청 감사드립니다 !',
    },
    {
      id: '3',
      unreadCount: 1,
      userName: '그림쟁이',
      lastMessageTime: '15분 전',
      lastMessage: '안녕하세요 :)  요청하신 반려동물 낙서 그림 작업완료했습니다 ! 확인 부탁드려요',
    },
    {
      id: '4',
      unreadCount: 0,
      userName: '낙서쟁이',
      lastMessageTime: '1시간 전',
      lastMessage: '안녕하세요 :)',
    },
  ]);

  const handleTalkPress = (talkId: string) => {
    navigation.navigate("Chatting");
  };

  return (
    <Container>
      <HomeHeader title="그림톡" />
      {talks.length > 0
        ? <TalkList talks={talks} onTalkPress={handleTalkPress} />
        : <NoTalk />
      }
    </Container>
  );
}
