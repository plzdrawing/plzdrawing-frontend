import tw from '@/src/lib/tailwind';

import { 
  View, 
  Image, 
  Text,
  TouchableOpacity,
} from 'react-native';
import Txt from '@/src/components/ui/Txt';

interface TalkItemProps {
  id: string;
  userProfileImage?: string;
  unreadCount?: number;
  userName: string;
  lastMessageTime: string;
  lastMessage: string;
  onClickTalk: () => void;
}

export const TalkItem: React.FC<TalkItemProps> = ({
  id,
  userProfileImage,
  unreadCount = 0,
  userName,
  lastMessageTime = '',
  lastMessage,
  onClickTalk,
}) => {
  return (
    <TouchableOpacity 
      onPress={onClickTalk}
      style={tw`flex-row p-[12px] border-b border-light-gray-2`}
    >
      <View style={tw`relative mr-[17px]`}>
        <Image 
          source={{ uri: userProfileImage }} 
          style={tw`w-[60px] h-[60px] rounded-[5px] bg-light-gray-2`}
        />
        {unreadCount > 0 && (
          <View style={tw`absolute top-[-6px] left-[-6px] bg-main-yellow rounded-[10px] w-[15px] h-[15px] justify-center items-center`}>
            <Txt variant='secondaryText' color='white'>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Txt>
          </View>
        )}
      </View>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center gap-[7px] mb-[7px]`}>
          <Txt variant='bodyTextBold'>
            {userName} 님
          </Txt>
          <Txt variant='secondaryText' color='dark_gray1'>
            {lastMessageTime}
          </Txt>
        </View>
        
        <View style={tw`flex-row items-center`}>
          <Text numberOfLines={2} style={tw`mr-[6px]`}>
            <Txt variant='auxiliaryTextLight'>
              {lastMessage}
            </Txt>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
