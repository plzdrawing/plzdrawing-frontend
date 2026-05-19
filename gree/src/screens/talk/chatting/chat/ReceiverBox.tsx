import tw from '@/src/lib/tailwind';
import Colors from '@/src/constants/Colors';
import { View, Image, ViewProps } from 'react-native';
import Txt from '@/src/components/common/Txt';

interface ReceiverBoxProps extends ViewProps {
  message: string;
  imageUri?: string;
  profileImageUrl?: string;
  sentAt?: string;
}

const ReceiverBox = ({ message, imageUri, profileImageUrl, sentAt }: ReceiverBoxProps) => {
  return (
    <View style={tw`flex-row justify-start items-end gap-[17px] max-w-full`}>
      <Image
        style={[tw`w-[40px] h-[40px] rounded-[12px]`, { backgroundColor: Colors.colors.light_gray2 }]}
        source={profileImageUrl ? { uri: profileImageUrl } : undefined}
      />
      <View style={tw`flex-row items-end gap-[6px] max-w-full`}>
        {imageUri ? (
          <View
            style={[
              tw`relative rounded-[10px] overflow-hidden`,
              { borderWidth: 1, borderColor: Colors.colors.main_yellow },
            ]}
          >
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
          </View>
        ) : (
          <View
            style={[
              tw`justify-center items-start max-w-[78%] rounded-[10px] py-[10px] px-[20px] flex-shrink`,
              { backgroundColor: Colors.colors.sub_yellow, borderWidth: 1, borderColor: Colors.colors.main_yellow },
            ]}
          >
            <Txt>{message}</Txt>
          </View>
        )}

        {sentAt ? (
          <Txt variant='secondaryText' color='dark_gray1'>
            {sentAt}
          </Txt>
        ) : null}
      </View>
    </View>
  );
};

export default ReceiverBox;
