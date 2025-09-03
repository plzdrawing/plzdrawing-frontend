import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";
import { BackArrowIcon } from "@/assets/images";

interface ProfileEditHeaderProps {
  type: "userProfile" | "password"
  onBack: () => void;
}

export default function ProfileEditHeader({ type, onBack }: ProfileEditHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BackButton onPress={handleBackPress}>
        <BackArrowIcon />
      </BackButton>
      <HeaderTitle>
        {type === "userProfile" 
          ? <Txt variant="mainTitleBold">회원정보 수정</Txt>
          : <Txt variant="mainTitleBold">비밀번호 변경</Txt>
        }
      </HeaderTitle>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 30px 30px 23px 30px;
  margin: 4px 0;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.colors.seperator};
  /* box shadow for iOS */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  /* box shadow for Android */
  elevation: 4;
`;

const BackButton = styled.TouchableOpacity`
  margin-right: 17px;
`;

const HeaderTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
