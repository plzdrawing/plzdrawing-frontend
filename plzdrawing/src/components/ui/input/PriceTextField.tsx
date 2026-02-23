import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import Colors from "@/src/constants/Colors";

interface PriceTextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (formattedValue: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
  state?: "empty" | "filled" | "error";
  setState?: (state: "empty" | "filled" | "error") => void;
}

const PriceTextField = ({
  label = "",
  placeholder = "0",
  value = "",
  onChange,
  onClear = () => {},
  readOnly = false,
  state = "empty",
  setState = () => {},
  ...rest
}: PriceTextFieldProps) => {
  const colors = Colors.colors;
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value) {
      const numericValue = extractNumber(value);
      if (numericValue) {
        const formattedValue = formatNumber(parseInt(numericValue, 10));
        setDisplayValue(formattedValue);
      } else {
        setDisplayValue("");
      }
    }
  }, [value]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  const extractNumber = (str: string) => {
    return str.replace(/[^0-9]/g, "").replace("원", "");
  };

  const handleChange = (text: string) => {
    const numericValue = extractNumber(text);

    if (numericValue === "") {
      setDisplayValue("");
      onChange("");
      setState("empty");
    } else {
      const formattedValue = formatNumber(parseInt(numericValue, 10));
      setDisplayValue(formattedValue);
      onChange(numericValue);
      setState("filled");
    }
  };

  const getBorderColor = () => {
    switch (state) {
      case "filled":
        return colors.main_yellow;
      case "error":
        return colors.error_red;
      default:
        return colors.light_gray2;
    }
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={displayValue}
        onChangeText={handleChange}
        editable={!readOnly}
        keyboardType="numeric"
        style={{
          fontSize: 14,
          fontWeight: '300',
          color: colors.black,
          backgroundColor: Colors.colors.light_gray1,
          fontFamily: "SsurroundAir",
          width: '100%',
          height: 48,
          paddingVertical: 15,
          paddingHorizontal: 11,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: getBorderColor(),
        }}
        onFocus={() => {
          if (state === "empty") {
            setState("filled");
          }
        }}
        onBlur={() => {
          if (!displayValue || displayValue.length <= 0) {
            setState("empty");
          }
        }}
        {...rest}
      />
    </View>
  );
};

export default PriceTextField;
