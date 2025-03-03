import { StyleSheet, View } from "react-native";
import PrimaryButton from "../components/common/button/PrimaryButton";
import StarRating from "../components/common/rating/StarRating";
import { Col } from "../components/common/flex/Flex";
import Card from "../components/common/card/Card";
import React from "react";
import CheckRequirementPrice from "../components/common/post/CheckRequirementPrice";

export default function Community() {
  return (
    <Col padding={"32px"}>
      <CheckRequirementPrice />
    </Col>
  );
}
