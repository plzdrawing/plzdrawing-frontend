// import Colors from "@/src/constants/Colors";
// import React, { useMemo, useState } from "react";
// import {
//   ViewStyle,
//   StyleProp,
//   Dimensions,
//   Keyboard,
//   Platform,
// } from "react-native";
// import styled from "styled-components/native";

// interface BottomFixedAreaProps {
//   children: React.ReactNode;
// }
// const { width } = Dimensions.get("window");

// export const BottomFixedArea: React.FC<BottomFixedAreaProps> = ({
//   children,
// }) => {
//   React.useEffect(() => {
//     const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {});

//     const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {});

//     return () => {
//       showSubscription.remove();
//       hideSubscription.remove();
//     };
//   }, []);

//   return (
//     <FixedAreaContainer behavior={"padding"}>
//       <ContentContainer>{children}</ContentContainer>
//     </FixedAreaContainer>
//   );
// };

// const FixedAreaContainer = styled.KeyboardAvoidingView`
//   position: absolute;
//   left: ${width * 0.5}px;
//   right: auto;
//   bottom: 0;
//   width: 100%;
//   transform: translateX(${-width * 0.5}px);
//   max-width: 840px;
//   z-index: 100;
//   flex-direction: column;
// `;

// const ContentContainer = styled.SafeAreaView``;

import React, { useEffect } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
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
      behavior={"padding"}
      className="absolute bottom-0 z-50 flex-col w-full max-w-[840px] left-1/2 -translate-x-1/2"
    >
      <SafeAreaView>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};
