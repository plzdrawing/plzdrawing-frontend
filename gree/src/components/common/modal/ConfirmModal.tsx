import tw from '@/src/lib/tailwind';
import { Modal, View, TouchableOpacity } from 'react-native';
import Txt from '@/src/components/common/Txt';

interface ConfirmModalProps {
  modalTitle: string;
  cancelTitle?: string;
  confirmTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  modalTitle,
  cancelTitle = '취소',
  confirmTitle = '확인',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal transparent visible animationType='fade' onRequestClose={onCancel}>
      <View style={tw`flex-1 justify-center items-center bg-black/30`}>
        <View style={tw`w-[326px] bg-white rounded-[12px] overflow-hidden`}>
          <View style={tw`h-[82px] justify-center items-center px-[20px]`}>
            <Txt variant='subtitleBold' align='center'>
              {modalTitle}
            </Txt>
          </View>

          <View style={tw`h-[1px] bg-light-gray-3`} />

          <View style={tw`flex-row h-[50px]`}>
            <TouchableOpacity style={tw`flex-1 justify-center items-center`} onPress={onCancel}>
              <Txt variant='bodyText' color='dark_gray2'>
                {cancelTitle}
              </Txt>
            </TouchableOpacity>

            <View style={tw`w-[1px] bg-light-gray-3`} />

            <TouchableOpacity style={tw`flex-1 justify-center items-center`} onPress={onConfirm}>
              <Txt variant='bodyText'>
                {confirmTitle}
              </Txt>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}