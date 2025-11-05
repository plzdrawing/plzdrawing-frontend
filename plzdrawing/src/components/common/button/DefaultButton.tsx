import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Txt from "../text/Txt";
import colors from "@/src/constants/Colors";

interface DefaultButtonProps {
  title: string;
  onPress: () => void;
  variant?: "default" | "primary";
  disabled?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
}

export default function DefaultButton({
  title,
  onPress,
  variant = "default",
  disabled = false,
  isLoading = false,
  isValid = true,
}: DefaultButtonProps) {
  // 배경색에 알파값 적용
    const getBackgroundColor = () => {
      const baseColor = colors.colors["sub_yellow"];
      if (isValid) return baseColor;
      
      // HEX to RGBA 변환 (35% 투명도)
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, 0.35)`;
    };

  const getButtonStyle = () => {
    const baseStyle = variant === "primary" ? styles.primaryButton : styles.defaultButton;
    return {
      ...baseStyle,
      backgroundColor: variant === "primary" ? getBackgroundColor() : baseStyle.backgroundColor,
    };
  };

  const buttonContent = (
    <View style={getButtonStyle()}>
      {isLoading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFF" : colors.colors.sub_green2}
        />
      ) : (
        <Txt
          variant="bodyText"
          color={variant === "primary" ? "black" : "icon_default"}
        >
          {title}
        </Txt>
      )}
    </View>
  );

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        disabled={disabled || isLoading}
        background={TouchableNativeFeedback.Ripple("#ccc", false)}
      >
        {buttonContent}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
      >
        {buttonContent}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: colors.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.colors.light_gray3,
  },
  primaryButton: {
    backgroundColor: colors.colors.sub_yellow,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.colors.main_yellow,
    borderWidth: 1,
  },
});
