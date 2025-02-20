import { StyleSheet, View } from "react-native";
import colors from "@/src/constants/Colors";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import { Container } from "../../components/common/container/Container";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

export default function Talk() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleClickTalkButton = () => {
    navigation.navigate("Chatting");
  };

  return (
    <Container>
      <PrimaryButton title="그림톡" onClick={handleClickTalkButton} />
    </Container>
  );
}
