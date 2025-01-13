import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Txt from "../text/Txt";
import { BackArrowIcon, CloseIcon } from "@/assets/images";

interface HeaderProps {
  title?: string;
  type?: "close" | "back";
  onClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ type = "back", onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick} style={styles.backButton}>
        <View style={styles.iconContainer}>
          {type === "back" ? (
            <BackArrowIcon width={24} height={24} />
          ) : (
            <CloseIcon width={24} height={24} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
