import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import Txt from "../text/Txt";
import colors from "@/src/constants/Colors";

interface TextAreaFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (text: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
}

const TextAreaField = ({
  label = "",
  placeholder = "",
  value = "",
  onChange,
  onClear = () => {},
  readOnly = false,
}: TextAreaFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Txt variant="bodyText" color="text" style={styles.label}>
          {label}
        </Txt>
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[styles.input, readOnly && styles.readOnlyInput]}
        placeholderTextColor={colors.colors.dark_gray1}
        multiline
        textAlignVertical="top"
        numberOfLines={4}
        editable={!readOnly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  label: {
    paddingHorizontal: 4,
    paddingVertical: 7,
    fontSize: 16,
  },
  input: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: colors.colors.light_gray1,
  },
  readOnlyInput: {
    borderColor: colors.colors.light_gray3,
    backgroundColor: colors.colors.light_gray2,
  },
});

export default TextAreaField;
