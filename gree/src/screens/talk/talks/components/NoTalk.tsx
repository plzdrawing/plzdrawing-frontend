import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { GreeSad } from '@/assets/images';

export const NoTalk: React.FC = () => {
  return (
    <View style={tw`flex justify-center items-center w-full gap-[17px] mt-[50%]`}>
      <GreeSad />
      <Txt>아직 그림톡이 없어요!</Txt>
      <Txt variant='default' color='dark_gray2' align='center'>
        마음에 드는 그림쟁이를 찾아{'\n'}
        그림톡을 시작해 보세요
      </Txt>
    </View>
  );
};
