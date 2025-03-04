import { Modal, StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { Container } from "../../components/common/container/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { useState } from "react";
import AlertModal from "@/src/components/common/modal/AlertModal";

export default function Talk() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleClickTalkButton = () => {
    navigation.navigate("Chatting");
  };

  const handleClickModalButton = () => {
    setModalVisible(true);
  };

  return (
    <Container>
      <PrimaryButton title="그림톡" onClick={handleClickTalkButton} />
      <PrimaryButton title="모달" onClick={handleClickModalButton} />
      {modalVisible && (
        <AlertModal
          title="모달"
          buttonTitle="확인"
          onClick={() => setModalVisible(false)}
        />
      )}
    </Container>
  );
}
