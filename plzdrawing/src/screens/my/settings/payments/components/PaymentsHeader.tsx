import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { BackArrowIcon } from "@/assets/images";
import { View, TouchableOpacity } from "react-native";

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
    <View
      style={[
        tw`w-full flex-row items-center p-[30px_30px_23px_30px] mb-[4px]`,
        {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: Colors.colors.seperator,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 4,
        },
      ]}
    >
      <TouchableOpacity onPress={handleBackPress} style={tw`mr-[17px]`}>
        <BackArrowIcon />
      </TouchableOpacity>
      <View style={tw`flex-row items-center gap-[4px]`}>
        <Txt variant="mainTitleBold">
          {selectedPayment ? `${selectedPayment.painterName} 님` : '코인상점'}
        </Txt>
        {selectedPayment && (
          <Txt variant="bodyText">
            과의 결제내역
          </Txt>
        )}
      </View>
    </View>
  );
}
