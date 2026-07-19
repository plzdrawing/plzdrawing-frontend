import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';

interface Drawing {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  description: string;
  date: string;
}

export default function DrawingsList({ drawings }: { drawings: Drawing[] }) {
  return (
    <View style={tw`flex-col gap-[16px]`}>
      {drawings.map((drawing) => (
        <View
          key={drawing.id}
          style={[
            tw`rounded-[8px] p-[12px]`,
            {
              borderWidth: 1,
              borderColor: colors.colors.dark_gray1,
              backgroundColor: colors.colors.light_gray1,
            },
          ]}
        >
          {/* <img src={drawing.imageUrl} alt={drawing.description} /> */}
          <Txt>{drawing.description}</Txt>
          <Txt>Likes: {drawing.likes}</Txt>
          <Txt>Comments: {drawing.comments}</Txt>
          <Txt>Date: {drawing.date}</Txt>
        </View>
      ))}
    </View>
  )
}
