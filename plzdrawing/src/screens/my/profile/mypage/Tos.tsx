import styled from "styled-components/native";
import HomeDetailHeader from "@/src/screens/home/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";

type TosProps = NativeStackScreenProps<RootStackParamList, "Tos">;

export default function Tos({ route, navigation }: TosProps) {
  return (
    <Container>
      <HomeDetailHeader
        title="이용약관"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollContainer showsVerticalScrollIndicator={false}></ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
