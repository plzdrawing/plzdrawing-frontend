import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface BottomFixedAreaProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const detectIOS = Platform.OS === "ios";
const { width } = Dimensions.get("window");

export const BottomFixedArea: React.FC<BottomFixedAreaProps> = ({
  children,
  containerStyle,
}) => {
  const [isKeypadOpen, setIsKeypadOpen] = React.useState(false);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setIsKeypadOpen(true);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeypadOpen(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const style = useMemo(() => {
    if (!detectIOS) {
      return undefined;
    }
    return {
      bottom: isKeypadOpen ? -keyboardHeight : 0,
    };
  }, [isKeypadOpen, keyboardHeight]);

  return (
    <KeyboardAvoidingView
      style={[styles.fixedAreaContainer, style, containerStyle]}
      behavior={detectIOS ? "padding" : undefined}
    >
      <View style={styles.contentContainer}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fixedAreaContainer: {
    position: "absolute",
    left: width * 0.5,
    right: "auto",
    bottom: 0,
    width: "100%",
    transform: [{ translateX: -width * 0.5 }],
    maxWidth: 840,
    zIndex: 1000,
    flexDirection: "column",
    pointerEvents: "none",
  },
  contentContainer: {
    pointerEvents: "auto",
  },
});
