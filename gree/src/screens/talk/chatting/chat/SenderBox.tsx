import tw from '@/src/lib/tailwind';
import Colors from '@/src/constants/Colors';
import { View, Image, ViewProps } from 'react-native';
import Txt from '@/src/components/common/Txt';

interface SenderBoxProps extends ViewProps {
  message: string;
  imageUri?: string;
  sentAt?: string;
}

const SenderBox = ({ message, imageUri, sentAt }: SenderBoxProps) => {
  return (
    <View style={tw`w-full flex-row justify-end items-end gap-[6px]`}>
      {sentAt ? (
        <Txt variant='secondaryText' color='dark_gray1'>
          {sentAt}
        </Txt>
      ) : null}

      {imageUri ? (
        <View
          style={[
            tw`rounded-[10px] overflow-hidden`,
            { borderWidth: 1, borderColor: Colors.colors.main_yellow },
          ]}
        >
          <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
        </View>
      ) : (
        <View
          style={[
            tw`justify-center items-start min-w-[140px] max-w-[78%] rounded-[10px] py-[10px] px-[20px]`,
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
