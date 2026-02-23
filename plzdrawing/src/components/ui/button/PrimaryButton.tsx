import tw from '@/src/lib/tailwind';
import React from "react";
import { Pressable, TouchableOpacityProps } from "react-native";
import Txt from "../Txt"; // Txt 컴포넌트 경로에 맞게 수정
import Colors from "@/src/constants/Colors";

interface PrimaryButtonProps extends TouchableOpacityProps {
  isValid?: boolean;
  title: string;
  color?: keyof typeof Colors.colors;
  onClick?: () => void;
}

const PrimaryButton = ({
  isValid = true,
  title,
  color = "main_yellow",
  onClick,
  ...rest
}: PrimaryButtonProps) => {
  // 배경색에 알파값 적용
  const getBackgroundColor = () => {
    const baseColor = Colors.colors[color];
    if (isValid) return baseColor;
    
    // HEX to RGBA 변환 (35% 투명도)
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
          zIndex: 200,
        },
      ]}
    >
      <Txt variant="bodyText" color="black" align="center">
        {title}
      </Txt>
    </Pressable>
  );
};

export default PrimaryButton;
