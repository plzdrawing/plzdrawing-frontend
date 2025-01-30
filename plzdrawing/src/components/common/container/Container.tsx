import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: `${Colors.colors.background}`,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
