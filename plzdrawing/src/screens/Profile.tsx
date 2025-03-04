import { StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../components/common/button/PrimaryButton";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.colors.background}`,
    paddingVertical: 0,
    paddingHorizontal: 32,
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
