import React from "react";
import {
  StyleProp,
  TextStyle,
  Text,
  TextProps as RNTextProps,
} from "react-native";
import colors from "@/src/constants/Colors";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  weight?: "bold" | "light";
  align?: "center" | "left" | "right";
  color?: keyof typeof colors.colors; // Colors 객체의 키를 타입으로
  size?: number; // 텍스트 크기
  lineheight?: number; // 텍스트 높이
}

export default function Txt({
  children,
  style,
  weight = "light",
  color = "black", // 기본 색상
  size = 14, // 기본 크기
  lineheight,
  ...props
}: TextProps) {
  return (
    <Text
      {...props}
      numberOfLines={1}
      style={[
        style,
        {
          fontSize: size,
          color: colors.colors[color], // Colors 객체에서 색상 가져오기
          fontFamily: weight === "bold" ? "Ssurround" : "SsurroundAir",
          textAlign: props.align,
          lineHeight: lineheight ? lineheight : size * 1.2,
        },
      ]}
    >
      {children}
    </Text>
  );
}
