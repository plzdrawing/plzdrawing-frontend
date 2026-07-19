import tw from '@/src/lib/tailwind';
import { View } from "react-native";
import Txt from "@/src/components/ui/Txt";

type DrawingCardInfoBoxProps = {
  label: string;
  value: string;
};

const DrawingCardInfoBox = ({ label, value }:DrawingCardInfoBoxProps) => (
  <View style={tw`flex-1 items-start`}>
    <Txt variant="bodyText">
      {label}
    </Txt>
    <Txt variant="bodyTextBold" style={{ marginTop: 4 }}>
      {value}
    </Txt>
  </View>
);

export default DrawingCardInfoBox;
