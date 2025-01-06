import { StyleSheet, View } from "react-native";
import { PrimaryButton } from "@/src/components/button/PrimaryButton";
import colors from "@/src/constants/Colors";

export default function Talk() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="그림톡" />
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
