import { StyleSheet, View, ScrollView } from "react-native";
import PrimaryButton from "../components/common/button/PrimaryButton";
import { Col } from "../components/common/flex/Flex";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export default function Community() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfileButtonOnClick = () => {
    console.log("그림쟁이 프로필 가기 버튼 클릭");
    navigation.navigate("PainterProfile");
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Col padding={"32px"}>
        <PrimaryButton
          title={"그림쟁이 프로필 가기"}
          onClick={handleProfileButtonOnClick}
        />
      </Col>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  spacer: {
    height: 20,
  },
});
