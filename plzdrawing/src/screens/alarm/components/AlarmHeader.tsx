import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";
import { BackArrowIcon } from "@/assets/images"; 

export default function AlarmHeader() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAlarmPress = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BackArrowIcon onPress={handleAlarmPress} />
      <Txt variant="mainTitleBold">알림함</Txt>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 17px;
  padding: 30px 30px 23px 30px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.colors.seperator};
`;
