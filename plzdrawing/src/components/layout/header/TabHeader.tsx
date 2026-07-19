import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/ui/Txt';

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

  const tab = (title: string, id: number) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedId && setSelectedId(id)}
        style={tw`items-center justify-center px-[13px]`}
      >
        <View style={tw`items-center gap-[10px]`}>
          <Txt variant={selectedId === id ? 'mainTitleBold' : 'mainTitleLight'}>
            {title}
          </Txt>
          {selectedId === id ? selectBorder() : unSelectBorder()}
        </View>
      </TouchableOpacity>
    );
  };
  const selectBorder = () => {
    return <View style={tw`w-full w-[70px] h-[2px] bg-black rounded-[12px]`} />;
  };
  const unSelectBorder = () => {
    return <View style={tw`w-full w-[70px] h-[2px]`} />;
  };

  return (
    <View style={tw`w-full flex-row items-center justify-between px-[31px] pt-[30px] bg-white border-b border-b-[1px] border-gray-200`}>
      <View style={tw`flex-row items-center gap-[17px]`}>
        {title1 && tab(title1, 0)}
        {title2 && tab(title2, 1)}
      </View>
      <TouchableOpacity
        onPress={onRightClick || (() => navigation.navigate('Alarm'))}
        style={tw`w-[20px] h-[18px] mb-[12px]`}
      >
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};
