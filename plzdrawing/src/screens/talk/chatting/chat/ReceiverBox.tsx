import tw from '@/src/lib/tailwind';

import Colors from "@/src/constants/Colors";
import { useState } from "react";
import Txt from "@/src/components/ui/Txt";
import { View, Image, ViewProps } from "react-native";

interface ReceiverBoxProps extends ViewProps {
  message: string;
}

const ReceiverBox = (props: ReceiverBoxProps) => {
  const { message } = props;
  return (
    <View style={tw`flex-row justify-start items-start gap-[17px] max-w-full`}>
      <Image
        style={[tw`w-[40px] h-[40px] rounded-[12px]`, { backgroundColor: Colors.colors.light_gray2 }]}
        source={undefined}
      />
      <View
        style={[
          tw`justify-center items-start max-w-[70%] rounded-[10px] py-[10px] px-[20px] flex-shrink`,
          { backgroundColor: Colors.colors.sub_yellow, borderWidth: 1, borderColor: Colors.colors.main_yellow },
        ]}
      >
        <Txt>{message}</Txt>
      </View>
    </View>
  );
};

export default ReceiverBox;
