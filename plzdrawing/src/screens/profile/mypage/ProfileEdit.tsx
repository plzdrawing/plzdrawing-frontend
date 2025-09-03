import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";

type ProfileEditProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileEdit"
>;

export default function ProfileEdit({ route, navigation }: ProfileEditProps) {
  return (
    <Container>
      <HomeDetailHeader
        title="프로필 수정"
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
