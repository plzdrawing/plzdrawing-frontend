import tw from '@/src/lib/tailwind';

import { View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/ui/Txt';
import { ProfileMenuItem } from '@/src/types/profile';

export default function MenuRow({
  text,
  icon,
  onPress
}: ProfileMenuItem) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-full py-[8.5px]`}
    >
      <View style={tw`flex-row items-center`}>
        {icon}
        <Txt variant='bodySubText' style={tw`${icon ? 'ml-[17px]' : ''}`}>
          {text}
        </Txt>
      </View>
    </TouchableOpacity>
  );
};
