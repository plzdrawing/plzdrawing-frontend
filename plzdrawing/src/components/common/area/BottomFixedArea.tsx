import React, { useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from "react-native";

interface BottomFixedAreaProps {
  children: React.ReactNode;
}

const { width } = Dimensions.get("window");

export const BottomFixedArea: React.FC<BottomFixedAreaProps> = ({
  children,
}) => {
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {});
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {});

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        position: 'absolute',
        left: width * 0.5,
        bottom: 0,
        width: '100%',
        transform: [{ translateX: -width * 0.5 }],
        maxWidth: 840,
        zIndex: 100,
        flexDirection: 'column',
      }}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};
