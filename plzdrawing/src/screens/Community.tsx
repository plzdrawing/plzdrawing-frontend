import { StyleSheet, View, ScrollView } from "react-native";
import PrimaryButton from "../components/common/button/PrimaryButton";
import StarRating from "../components/common/rating/StarRating";
import { Col } from "../components/common/flex/Flex";
import Card from "../components/common/card/Card";
import React from "react";
import CheckRequirementPrice from "../components/common/post/CheckRequirementPrice";
import CheckFeedBack from "../components/common/post/CheckFeedBack";
import CheckPainting from "../components/common/post/CheckPainting";

export default function Community() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <Col padding={"32px"}>
        <CheckPainting />
        <View style={styles.spacer} />
        <CheckFeedBack />
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
