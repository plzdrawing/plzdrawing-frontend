import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import { View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { AlarmIcon } from '@/assets/images';

interface TabHeaderProps {
  title1?: string;
  title2?: string;
  selectedId?: number;
  setSelectedId?: (id: number) => void;
  rightIcon?: React.ReactNode;
  onRightClick?: () => void;
}

export default function TabHeader({
  title1,
  title2,
  selectedId = 0,
  setSelectedId,
  rightIcon = <AlarmIcon />,
  onRightClick,
}: TabHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const tab = (title: string, id: number) => (
    <TouchableOpacity
      onPress={() => setSelectedId && setSelectedId(id)}
      style={tw`items-center justify-center px-[13px]`}
    >
      <View style={tw`items-center gap-[10px]`}>
        <Txt variant={selectedId === id ? 'mainTitleBold' : 'mainTitleLight'}>{title}</Txt>
        {selectedId === id ? (
          <View style={tw`w-[70px] h-[2px] bg-black rounded-[12px]`} />
        ) : (
          <View style={tw`w-[70px] h-[2px]`} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={tw`w-full flex-row items-center justify-between px-[31px] pt-[30px] bg-white border-b border-gray-200`}
    >
      <View style={tw`flex-row items-center gap-[17px]`}>
        {title1 && tab(title1, 0)}
        {title2 && tab(title2, 1)}
      </View>
      <TouchableOpacity
        onPress={onRightClick}
        style={tw`w-[20px] h-[18px] mb-[12px]`}
      >
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
}
