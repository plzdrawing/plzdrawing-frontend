import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { 
  NavigationProp, 
  useNavigation, 
  useIsFocused,
} from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { 
  ScrollView,
  BackHandler,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/header/TabHeader';

import { 
  TalkList, 
  TalkData,
} from '@/src/screens/talk/talks/components/TalkList';
import { NoTalk } from '@/src/screens/talk/talks/components/NoTalk';

export default function Talk() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  
  // 그림톡 페이지에서 뒤로가기 시 그림홈으로 이동
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        (navigation as any).navigate('그림홈');
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused, navigation]);
  
  const [talks, setTalks] = useState<TalkData[]>([
    {
      id: '1',
      unreadCount: 2,
      userName: '홍길동',
      lastMessageTime: '지금',
      lastMessage: '안녕하세요 :)  요청하신 반려동물 낙서 그림 작업완료했습니다 ! 확인 부탁드려요 !!!!!!!! asdf',
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

  // const handleTalkPress = (talkId: string) => {
  const handleTalkPress = () => {
    navigation.navigate('Chatting');
  };

  return (
    <Container>
      <TabHeader title1='그림톡' />
      <ScrollView
        style={tw`w-full h-full bg-light-gray-1`}
        showsVerticalScrollIndicator={false}
      >
        {talks.length > 0
          ? <TalkList talks={talks} onClickTalk={handleTalkPress} />
          : <NoTalk />
        }
      </ScrollView>
    </Container>
  );
}
