import { StyleSheet, View } from "react-native";
import PrimaryButton from "../components/common/button/PrimaryButton";
import StarRating from "../components/common/rating/StarRating";
import { Col } from "../components/common/flex/Flex";
import Card from "../components/common/card/Card";
import React from "react";

export default function Community() {
  return (
    <Col padding={"32px"}>
      <PrimaryButton title="커뮤니티" />
      <StarRating />
      <Col gap={10}>
        <Card
          variant="requestAccepted"
          imageUrl="https://i.pinimg.com/474x/6b/cc/86/6bcc86e9c69199e841cd65de630c2758.jpg"
          onPress={() => console.log("누름")}
        />
        <Card
          variant="itemRegistered"
          imageUrl="https://i.pinimg.com/474x/6b/cc/86/6bcc86e9c69199e841cd65de630c2758.jpg"
          hashtags={["#기여움", "#스냅샷"]}
          price="3,000"
          onPress={() => console.log("누름")}
        />
        <Card
          variant="requestCompleted"
          imageUrl="https://i.pinimg.com/474x/6b/cc/86/6bcc86e9c69199e841cd65de630c2758.jpg"
        />
      </Col>
    </Col>
  );
}

const styles = StyleSheet.create({
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
