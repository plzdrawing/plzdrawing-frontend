import tw from '@/src/lib/tailwind';
import React from "react";
import { View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";

interface UserInfoProps {
  profileImage: string;
  name: string;
  stats: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ profileImage, name, stats }) => {
  return (
    <View style={tw`w-full flex-row items-center gap-[7px] mb-[16px]`}>
      <Image
        source={{ uri: profileImage }}
        style={[tw`w-[38px] h-[38px] rounded-[5px]`, { backgroundColor: Colors.colors.light_gray2 }]}
      />
      <Txt variant="subtitleBold">
        {name}
      </Txt>
      <Txt variant="secondaryText" color="dark_gray2">
        {stats}
      </Txt>
    </View>
  );
};

export default UserInfo;