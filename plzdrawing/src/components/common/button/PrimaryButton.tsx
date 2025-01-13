import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import Txt from "../text/Txt";
import colors from "@/src/constants/Colors";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  isBorder?: boolean;
  color?: keyof typeof colors.button;
  onClick?: () => void;
}

export const PrimaryButton = ({
  title,
  color = "primaryBackground",
  onClick,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onClick}
      style={[styles.button, { backgroundColor: colors.button[color] }]}
    >
      <Txt style={styles.text} size={16}>
        {title}
      </Txt>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFE18D",
    borderRadius: 12,
    alignItems: "center",
  },
  border: {
    borderWidth: 2,
    borderColor: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "regular",
    color: "black",
  },
});
