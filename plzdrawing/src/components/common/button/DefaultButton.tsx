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
}

const DefaultButton = ({
  title,
  onPress,
  variant = "default",
  disabled = false,
  isLoading = false,
}: DefaultButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton;
      default:
        return styles.defaultButton;
    }
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

export default DefaultButton;
