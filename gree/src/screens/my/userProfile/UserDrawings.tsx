import tw from '@/src/lib/tailwind';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/Txt';
import { GreeSad } from '@/assets/images';
import { View, TouchableOpacity } from 'react-native';

interface UserDrawingsProps {
  userName: string;
  drawings: {
    id: string;
    imageUrl: string;
    likes: number;
    comments: number;
    description: string;
    date: string;
  }[];
}

export default function UserDrawings({ drawings }: UserDrawingsProps) {
  if (drawings.length === 0) {
    return (
      <View style={[tw`w-full h-full`, { backgroundColor: colors.colors.light_gray1 }]}>
        <View style={tw`items-center justify-center py-[60px] px-[20px]`}>
          <GreeSad width={120} height={120} />
          <Txt variant='bodyText' color='dark_gray2' style={{ marginTop: 9 }}>
            아직 게시글이 없어요!
          </Txt>
        </View>
      </View>
    );
  }

  return (
    <View style={[tw`w-full h-full`, { backgroundColor: colors.colors.light_gray1 }]}>
      <View style={tw`flex-row flex-wrap justify-start gap-[7px] py-[17px] px-[34px]`}>
        {drawings.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[tw`w-[103px] h-[103px] rounded-[8px]`, { backgroundColor: colors.colors.white, borderWidth: 1, borderColor: colors.colors.light_gray2 }]}
          />
        ))}
      </View>
    </View>
  );
}
