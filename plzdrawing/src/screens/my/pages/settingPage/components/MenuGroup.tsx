import tw from '@/src/lib/tailwind';

import { View } from 'react-native';
import Txt from '@/src/components/common/text/Txt';
import MenuRow from "@/src/screens/my/pages/settingPage/components/MenuRow";
import colors from "@/src/constants/Colors";
import { ProfileMenuItem } from "@/src/types/profile";

interface MenuGroupProps {
  title: string;
  items: ProfileMenuItem[];
}

export default function MenuGroup({ title, items}: MenuGroupProps) {
  return (
    <View style={tw`mt-[17px] mb-[8.5px]`} >
      <Txt variant='auxiliaryTextLight' style={tw`mb-[8.5px]`}>
        {title}
      </Txt>
      {items.map((item) => (
        <MenuRow
          key={item.text}
          text={item.text}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};
