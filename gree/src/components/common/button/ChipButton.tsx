import tw from '@/src/lib/tailwind';
import { Pressable, PressableProps } from 'react-native';
import Txt from '@/src/components/common/Txt';

interface ChipButtonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ChipButton({
  title,
  isSelected = false,
  onClick,
  className,
}: ChipButtonProps) {
  return (
    <Pressable
      style={[
        tw`px-[15px] py-[3px] rounded-[12px] border items-center justify-center`,
        isSelected ? tw`bg-sub-yellow border-2 border-main-yellow` : tw`bg-white border-light-gray-2`,
        className ? tw`${className}` : {},
      ]}
      onPress={onClick}
    >
      <Txt variant="bodyText" color={isSelected ? 'black' : 'dark_gray2'}>
        {title}
      </Txt>
    </Pressable>
  );
}
