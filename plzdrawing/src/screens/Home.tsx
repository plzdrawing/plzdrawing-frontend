import { StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../components/common/button/PrimaryButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="그림홈" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.colors.background}`,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
