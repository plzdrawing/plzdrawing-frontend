import styled from "styled-components/native";
import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";

type NoticeProps = NativeStackScreenProps<RootStackParamList, "Notice">;

export default function Notice({ route, navigation }: NoticeProps) {
  return (
    <Container>
      <HomeDetailHeader
        title="공지사항"
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
