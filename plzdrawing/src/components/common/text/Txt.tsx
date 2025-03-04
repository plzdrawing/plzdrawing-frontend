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
  height?: number;
  color?: keyof typeof colors["colors"] | keyof typeof colors["tab"];
  numberOfLines?: number;
}

export default function Txt({
  children,
  style,
  color = "black", // 기본 색상
  variant,
  height,
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
          color: colors.colors[color as keyof typeof colors["colors"]] || colors.tab[color as keyof typeof colors["tab"]], // Colors 객체에서 색상 가져오기
          fontFamily: variant
            ? FontStyles[variant].fontFamily
            : FontStyles.default.fontFamily,
          textAlign: props.align,
          lineHeight: height
            ? height
            : variant
            ? FontStyles[variant].lineHeight
            : FontStyles.default.lineHeight,
        },
      ]}
    >
      {children}
    </Text>
  );
}
