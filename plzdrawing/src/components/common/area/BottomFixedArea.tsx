import Colors from "@/src/constants/Colors";
import React, { useMemo } from "react";
import {
  ViewStyle,
  StyleProp,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";
import styled from "styled-components/native";

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

  return (
    <FixedAreaContainer behavior={"padding"} isKeypadOpen={isKeypadOpen}>
      <ContentContainer>{children}</ContentContainer>
    </FixedAreaContainer>
  );
};

const FixedAreaContainer = styled.KeyboardAvoidingView`
  position: absolute;
  left: ${width * 0.5}px;
  right: auto;
  bottom: 0;
  width: 100%;
  transform: translateX(${-width * 0.5}px);
  max-width: 840px;
  z-index: 100;
  flex-direction: column;
`;

const ContentContainer = styled.SafeAreaView``;
