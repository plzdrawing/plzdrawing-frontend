import tw from '@/src/lib/tailwind';
import React from "react";
import { View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";

interface DrawingInfoCardProps {
  info: {
    id: string; // Unique identifier for the drawing info
    image: string;
    title: string;
    price: string;
    description: string;
  };
}

const DrawingInfoCard: React.FC<DrawingInfoCardProps> = ({ info }) => {
  return (
    <View
      style={[
        tw`rounded-[5px] p-[7px] flex-row items-center gap-[12px] mb-[16px]`,
        { backgroundColor: Colors.colors.white, borderWidth: 0.5, borderColor: '#d9d9d9' },
      ]}
    >
      <Image
        source={{ uri: info.image }}
        style={tw`w-[60px] h-[60px] rounded-[5px]`}
      />
      <View style={{ flex: 1 }}>
        <Txt variant="subtitleBold" style={{ marginBottom: 7 }}>
          {info.title}
        </Txt>
        <Txt variant="auxiliaryTextLight">
          {info.price}
          {"\n"}
          {info.description}
        </Txt>
      </View>
    </View>
  );
};

export default DrawingInfoCard;
