import tw from '@/src/lib/tailwind';

import Colors from "@/src/constants/Colors";
import { useState } from "react";
import Txt from "@/src/components/ui/Txt";
import { ViewProps, Image, View, Text } from "react-native";

interface SenderBoxProps extends ViewProps {
  message: string;
  imageUri?: string;
}

const SenderBox = (props: SenderBoxProps) => {
  const { message, imageUri } = props;
  return (
    <View style={tw`flex-row justify-end items-center`}>
      {imageUri ? (
        <View
          style={[
            tw`relative max-w-[70%] rounded-[10px] overflow-hidden`,
            { borderWidth: 1, borderColor: Colors.colors.main_yellow },
          ]}
        >
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200, resizeMode: 'cover' }}
          />
          <View style={tw`absolute top-0 left-0 right-0 bottom-0`}>
            <Text style={[tw`absolute`, { top: 20, left: 20, color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 }]}>Gree</Text>
            <Text style={[tw`absolute`, { top: 80, left: 80, color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 }]}>Gree</Text>
            <Text style={[tw`absolute`, { top: 140, left: 140, color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 }]}>Gree</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            tw`justify-center items-start max-w-[70%] rounded-[10px] py-[10px] px-[20px]`,
            { backgroundColor: Colors.colors.white, borderWidth: 1, borderColor: Colors.colors.main_yellow },
          ]}
        >
          <Txt>{message}</Txt>
        </View>
      )}
    </View>
  );
};

export default SenderBox;
