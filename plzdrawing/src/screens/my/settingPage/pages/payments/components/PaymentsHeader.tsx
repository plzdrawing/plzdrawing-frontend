import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { BackArrowIcon } from "@/assets/images";

interface PaymentsHeaderProps {
  selectedPayment?: { painterName: string; } | null;
  onBack?: () => void;
}

export default function PaymentsHeader({ selectedPayment, onBack }: PaymentsHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    if (selectedPayment && onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <BackButton onPress={handleBackPress}>
        <BackArrowIcon />
      </BackButton>
      <HeaderTitle>
        <Txt variant="mainTitleBold">
          {selectedPayment ? `${selectedPayment.painterName} 님` : '결제내역'}
        </Txt>
        {selectedPayment && (
          <Txt variant="bodyText">
            과의 결제내역
          </Txt>
        )}
      </HeaderTitle>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 30px 30px 23px 30px;
  margin-bottom: 4px;
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
