import { StyleSheet, View } from "react-native";
import { PrimaryButton } from "@/src/components/common/button/PrimaryButton";
import colors from "@/src/constants/Colors";
import Header from "@/src/components/common/header/Header";
import React from "react";
import Txt from "@/src/components/common/text/Txt";
import { BottomFixedArea } from "@/src/components/common/area/BottomFixedArea";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function LoginSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleStartButtonOnClick = () => {
    console.log("first time login");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Txt
        size={24}
        weight="bold"
        align="left"
        lineheight={31}
        style={{ marginTop: 43, paddingLeft: 32 }}
      >
        오랜만이에요 :) <br /> <br />
        소일거리 드로잉어플과 함께 <br />
        소소한 일상을 즐겨보아요!
      </Txt>
      <BottomFixedArea>
        <View style={styles.separator} />
        <View style={styles.buttonContainer}>
          <PrimaryButton title="시작하기" onClick={handleStartButtonOnClick} />
        </View>
      </BottomFixedArea>
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
