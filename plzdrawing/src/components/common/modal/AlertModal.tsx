import tw from '@/src/lib/tailwind';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Txt from '@/src/components/common/text/Txt';

interface AlertModalProps {
  modalTitle?: string;
  buttonTitle?: string;
  onClickButton?: () => void;
}

const { width, height } = Dimensions.get('window');

export default function AlertModal({
  modalTitle,
  buttonTitle,
  onClickButton,
}: AlertModalProps) {
  return (
    <View style={[
      tw`absolute top-0 left-0 justify-center items-center bg-black/30 z-[1000]`,
      { width, height }
    ]}>
      <View style={tw`w-[326px] h-[150px] flex-col justify-between items-center bg-white rounded-[12px]`}>
        <View style={tw`justify-center items-center w-full h-[95px]`}>
          <Txt variant='subtitleBold' align='center'>
            {modalTitle}
          </Txt>
        </View>
        
        <TouchableOpacity 
          style={tw`w-full border-t border-light-gray-3 rounded-b-[12px] h-[55px] justify-center items-center`}
          onPress={onClickButton}
        >
          <Txt variant='bodyText' align='center'>
            {buttonTitle}
          </Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
};
