import React from "react";
import {
  StyleProp,
  TextStyle,
  Text,
  TextProps as RNTextProps,
} from "react-native";
import colors from "@/src/constants/Colors";
import FontStyles from "@/src/constants/Fonts";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof FontStyles;
  align?: "center" | "left" | "right";
  color?: keyof typeof colors.colors; // Colors 객체의 키를 타입으로
  numberOfLines?: number;
}

export default function Txt({
  children,
  style,
  color = "black", // 기본 색상
  variant,
  ...props
}: TextProps) {
  return (
    <Text
      {...props}
      numberOfLines={props.numberOfLines}
      style={[
        style,
        {
          fontSize: variant
            ? FontStyles[variant].fontSize
            : FontStyles.default.fontSize,
          color: colors.colors[color], // Colors 객체에서 색상 가져오기
          fontFamily: variant
            ? FontStyles[variant].fontFamily
            : FontStyles.default.fontFamily,
          textAlign: props.align,
          lineHeight: variant ? FontStyles[variant].lineHeight : undefined,
        },
      ]}
    >
      {children}
    </Text>
  );
}
