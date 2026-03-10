import tw from '@/src/lib/tailwind';
import { Pressable, TouchableOpacityProps } from 'react-native';
import Txt from '@/src/components/common/Txt';
import Colors from '@/src/constants/Colors';

interface PrimaryButtonProps extends TouchableOpacityProps {
  isValid?: boolean;
  title: string;
  color?: keyof typeof Colors.colors;
  onClick?: () => void;
}

const PrimaryButton = ({
  isValid = true,
  title,
  color = 'main_yellow',
  onClick,
  ...rest
}: PrimaryButtonProps) => {
  const getBackgroundColor = () => {
    const baseColor = Colors.colors[color];
    if (isValid) return baseColor;
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.35)`;
  };

  return (
    <Pressable
      {...rest}
      onPress={onClick}
      style={[
        tw`w-full py-[10px] px-[20px] rounded-[12px] items-center`,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: isValid ? 0 : 1,
          borderColor: isValid ? undefined : Colors.colors.main_yellow,
        },
      ]}
    >
      <Txt variant='bodyText' color='black' align='center'>
        {title}
      </Txt>
    </Pressable>
  );
};

export default PrimaryButton;
