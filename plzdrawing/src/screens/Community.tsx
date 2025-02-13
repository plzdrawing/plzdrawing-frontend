import { StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../components/common/button/PrimaryButton";
import Star from "../components/common/rating/Star";
import StarRating from "../components/common/rating/StarRating";

export default function Community() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="커뮤니티" />
      <StarRating/>
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
