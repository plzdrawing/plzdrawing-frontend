import tw from '@/src/lib/tailwind';

import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Txt from '@/src/components/ui/Txt';

import { CloseIcon } from '@/assets/images';

interface AlarmItemProps {
  id: string;
  alarmTitle: string;
  lastMessageTime: string;
  unreadCount?: number;
  alarmMessage: string;
  isEditMode?: boolean;
  onDelete?: (id: string) => void;
}

export const AlarmItem: React.FC<AlarmItemProps> = ({
  id,
  alarmTitle,
  unreadCount = 0,
  lastMessageTime = '',
  alarmMessage,
  isEditMode = false,
  onDelete,
}) => {
  return (
    <TouchableOpacity style={tw`flex-row p-[12px] border-b border-light-gray-2`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between mb-[7px]`}>
          <View style={tw`flex flex-row gap-[7px] items-center`}>
            <Txt variant='bodyTextBold'>
              {alarmTitle}
            </Txt>
            <Txt variant='secondaryText' color='dark_gray1'>
              {lastMessageTime}
            </Txt>
          </View>

          {isEditMode ? (
            <TouchableOpacity 
              onPress={() => onDelete?.(id)}
              style={tw`bg-dark_gray1 rounded-[100px] w-[22px] h-[22px] justify-center items-center`}
            >
              <CloseIcon />
            </TouchableOpacity>
          ) : (
            unreadCount > 0 && (
              <View style={tw`bg-main-yellow rounded-[100px] w-[22px] h-[22px] justify-center items-center`}>
                <Txt variant='auxiliaryTextBold' color='white'>
                  N
                </Txt>
              </View>
            )
          )}
        </View>
        
        <View style={tw`flex-row items-center`}>
          <Text numberOfLines={2} style={tw`mr-[6px]`}>
            <Txt variant='auxiliaryTextLight'>
              {alarmMessage}
            </Txt>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
