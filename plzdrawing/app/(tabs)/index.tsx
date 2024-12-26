import { Button, StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import { useState } from "react";

export default function TabOneScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{count}</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Button title="-" onPress={() => setCount(count - 1)} />
        <Button title="+" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
