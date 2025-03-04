import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "../text/Txt";
import { Col } from "../flex/Flex";

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
    <Col>
      <PriceTextInput
        placeholder={placeholder}
        placeholderTextColor={colors.dark_gray1}
        value={displayValue}
        onChangeText={handleChange}
        editable={!readOnly}
        keyboardType="numeric"
        borderColor={getBorderColor()}
        color={colors.black}
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
    </Col>
  );
};

const PriceTextInput = styled(TextInput)`
  font-size: 14px;
  font-weight: 300;
  color: ${(props: { color: string }) => props.color};
  background-color: ${Colors.colors.light_gray1};
  font-family: "SsurroundAir";
  outline: none;
  width: 100%;
  height: 48px;
  padding: 15px 11px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
`;

export default PriceTextField;
