import { StyleSheet, View } from "react-native";
import { PrimaryButton } from "@/src/components/common/button/PrimaryButton";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React from "react";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";

export default function Login() {
  return (
    <View style={styles.container}>
      <Header type="close" />
      <Txt
        size={24}
        weight="bold"
        align="left"
        lineheight={31}
        style={{ marginTop: 43, paddingLeft: 32 }}
      >
        안녕하세요 :) <br />
        소일거리 드로잉입니다.
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: `${colors.colors.background}`,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 57,
    paddingBottom: 3,
    paddingTop: 10,
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: colors.colors.seperator,
  },
});
