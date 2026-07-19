import React from 'react';
import { StyleProp, TextStyle, Text, TextProps as RNTextProps } from 'react-native';
import colors from '@/src/constants/Colors';
import FontStyles from '@/src/constants/Fonts';

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: keyof typeof FontStyles;
  align?: 'center' | 'left' | 'right';
  height?: number;
  color?: keyof typeof colors['colors'] | keyof typeof colors['tab'];
  numberOfLines?: number;
}

export default function Txt({
  children,
  style,
  color = 'black',
  variant,
  align = 'left',
  height,
  ...props
}: TextProps) {
  const fontStyle = variant && FontStyles[variant] ? FontStyles[variant] : FontStyles.default;

  return (
    <Text
      {...props}
      numberOfLines={props.numberOfLines}
      style={[
        style,
        {
          fontSize: fontStyle.fontSize,
          color:
            colors.colors[color as keyof typeof colors['colors']] ||
            colors.tab[color as keyof typeof colors['tab']],
          fontFamily: fontStyle.fontFamily,
          textAlign: align,
          lineHeight: height ? height : fontStyle.lineHeight,
        },
      ]}
    >
      {children}
    </Text>
  );
}
