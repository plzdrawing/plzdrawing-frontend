import { Modal, StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { Container } from "../../components/common/container/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { useState } from "react";
import AlertModal from "@/src/components/common/modal/AlertModal";
import HomeHeader from "@/src/components/home/HomeHeader";

export default function Talk() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClickTalkButton = () => {
    navigation.navigate("Chatting");
  };

  const handleClickModalButton = () => {};

  return (
    <Container>
      <HomeHeader title="그림톡" />
    </Container>
  );
}
