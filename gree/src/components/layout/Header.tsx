import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import { View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { BackArrowIcon } from '@/assets/images';

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  onRightClick?: () => void;
  className?: string;
}

export default function Header({
  title,
  leftIcon = <BackArrowIcon />,
  onLeftClick,
  rightIcon,
  onRightClick,
  className = '',
}: HeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={tw`w-full flex-row items-center justify-between px-[20px] pt-[30px] bg-white ${className}`}
    >
      <View style={tw`flex-row items-center gap-[2px]`}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onLeftClick ? onLeftClick : () => navigation.goBack()}
            style={tw`w-[40px] h-[40px] flex-row items-center justify-center`}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
        {title && (
          <Txt variant="mainTitleBold" align="center">
            {title}
          </Txt>
        )}
      </View>

      {rightIcon && (
        <TouchableOpacity
          onPress={onRightClick}
          style={tw`w-[40px] h-[40px] flex-row items-center justify-center`}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
}
