import tw from '@/src/lib/tailwind';
import {
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';
import Txt from '@/src/components/common/text/Txt';

interface AlertModalProps {
  modalTitle?: string;
  buttonTitle?: string;
  onClickButton?: () => void;
}

export default function AlertModal({
  modalTitle,
  buttonTitle,
  onClickButton,
}: AlertModalProps) {
  return (
    <Modal
      transparent={true}
      visible={true}
      animationType='fade'
      onRequestClose={onClickButton}
    >
      <View style={tw`flex-1 justify-center items-center bg-black/30`}>
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
    </Modal>
  );
};
