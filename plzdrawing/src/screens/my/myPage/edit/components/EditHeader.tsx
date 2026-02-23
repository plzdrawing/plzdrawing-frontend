import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { BackArrowIcon } from "@/assets/images";
import { View, TouchableOpacity } from "react-native";

interface ProfileEditHeaderProps {
  type: "userProfile" | "password"
  onBack: () => void;
}

export default function EditHeader({ type, onBack }: ProfileEditHeaderProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        tw`w-full flex-row items-center p-[30px_30px_23px_30px] my-[4px]`,
        {
          backgroundColor: '#fff',
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
        {type === "userProfile" 
          ? <Txt variant="mainTitleBold">회원정보 수정</Txt>
          : <Txt variant="mainTitleBold">비밀번호 변경</Txt>
        }
      </View>
    </View>
  );
}
