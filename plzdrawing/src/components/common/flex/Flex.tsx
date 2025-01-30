import React from "react";
import styled from "styled-components/native";
import { ViewStyle, StyleProp, View } from "react-native";

interface FlexProps {
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  padding?: React.CSSProperties["padding"];
  margin?: React.CSSProperties["margin"];
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const StyledRow = styled(View)<FlexProps>`
  flex-direction: row;
  width: 100%;
  justify-content: ${({ justifyContent }: FlexProps) =>
    justifyContent || "flex-start"};
  align-items: ${({ alignItems }: FlexProps) => alignItems || "flex-start"};
  padding: ${({ padding }: FlexProps) => padding || "0px"};
  margin: ${({ margin }: FlexProps) => margin || "0px"};
  gap: ${({ gap }: FlexProps) => `${gap}px` || "0px"};
`;

const StyledCol = styled(View)<FlexProps>`
  flex-direction: column;
  width: 100%;
  justify-content: ${({ justifyContent }: FlexProps) =>
    justifyContent || "flex-start"};
  align-items: ${({ alignItems }: FlexProps) => alignItems || "flex-start"};
  padding: ${({ padding }: FlexProps) => padding || "0px"};
  margin: ${({ margin }: FlexProps) => margin || "0px"};
  gap: ${({ gap }: FlexProps) => `${gap}px` || "0px"};
`;

export const Row = (props: FlexProps) => {
  const { children, ...rest } = props;

  return <StyledRow {...rest}>{children}</StyledRow>;
};

export const Col = (props: FlexProps) => {
  const { children, ...rest } = props;

  return <StyledCol {...rest}>{children}</StyledCol>;
};
