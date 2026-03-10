import tw from '@/src/lib/tailwind';
import { FlatList, ListRenderItem } from 'react-native';
import { TalkItem } from '@/src/screens/talk/talks/components/TalkItem';

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
  onClickTalk: (talkId: string) => void;
}

export const TalkList: React.FC<TalkListProps> = ({ talks, onClickTalk }) => {
  const renderTalkItem: ListRenderItem<TalkData> = ({ item }) => (
    <TalkItem
      id={item.id}
      userProfileImage={item.userProfileImage}
      userName={item.userName}
      lastMessage={item.lastMessage}
      lastMessageTime={item.lastMessageTime}
      unreadCount={item.unreadCount}
      onClickTalk={() => onClickTalk(item.id)}
    />
  );

  return (
    <FlatList
      data={talks}
      renderItem={renderTalkItem}
      keyExtractor={(item: TalkData) => item.id}
      showsVerticalScrollIndicator={false}
      style={tw`w-full pt-[20px] px-[32px]`}
    />
  );
};
