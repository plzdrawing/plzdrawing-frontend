import React from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  style?: object;
};

export function ExternalLink({ href, children, style }: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      if (Platform.OS === "web") {
        // 웹 플랫폼에서는 기본 브라우저로 열기
        window.open(href, "_blank");
      } else {
        // 네이티브 플랫폼에서는 In-App 브라우저로 열기
        const supported = await Linking.canOpenURL(href);
        if (supported) {
          await WebBrowser.openBrowserAsync(href);
        } else {
          Alert.alert("Error", "Cannot open the link.");
        }
      }
    } catch (error) {
      console.error("Failed to open link:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.link, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    padding: 10,
  },
  text: {
    color: "#007AFF", // 기본 링크 색상
    textDecorationLine: "underline",
  },
});
