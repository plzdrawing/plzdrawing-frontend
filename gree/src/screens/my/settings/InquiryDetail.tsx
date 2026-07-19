import tw from '@/src/lib/tailwind';
import { useEffect, useMemo, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import ConfirmModal from '@/src/components/common/modal/ConfirmModal';

import { BackArrowIcon } from '@/assets/images';
import { deleteInquiry, getInquiryById, InquiryItem } from './inquiryMock';

type Props = StackScreenProps<RootStackParamList, 'InquiryDetail'>;

function formatDate(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function getStatusText(status: InquiryItem['status']) {
  return status === 'ANSWERED' || status === 'CLOSED' ? '답변 완료' : '답변 예정';
}

export default function InquiryDetail({ navigation, route }: Props) {
  const [inquiry, setInquiry] = useState<InquiryItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setInquiry(getInquiryById(route.params.id));
  }, [route.params.id]);

  const statusText = useMemo(
    () => (inquiry ? getStatusText(inquiry.status) : '답변 예정'),
    [inquiry],
  );

  const handleDelete = () => {
    if (!inquiry) return;

    deleteInquiry(inquiry.id);
    setShowDeleteConfirm(false);
    navigation.navigate('Inquiry', { initialTab: 'history', showDeletedModal: true });
  };

  if (!inquiry) {
    return (
      <Container className='w-full bg-light-gray-1'>
        <Header title='1:1 문의 상세' leftIcon={<BackArrowIcon />} className='pb-[18px]' />
        <View style={tw`flex-1 items-center justify-center`}>
          <Txt variant='bodyText' color='dark_gray1'>문의를 찾을 수 없어요.</Txt>
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full bg-light-gray-1'>
      <Header
        title='1:1 문의 상세'
        leftIcon={<BackArrowIcon />}
        className='pb-[18px]'
        rightIcon={(
          <View style={tw`w-[24px] h-[24px] items-center justify-center`}>
            <Ionicons name='trash-outline' size={26} color='#767A7A' />
          </View>
        )}
        onRightClick={() => setShowDeleteConfirm(true)}
      />

      <ScrollView style={tw`flex-1 px-[24px] pt-[26px]`} showsVerticalScrollIndicator={false}>
        <Txt variant='headLineBold'>{inquiry.title}</Txt>
        <View style={tw`flex-row items-center mt-[8px]`}>
          <Txt variant='bodySubText' color='dark_gray1'>
            {formatDate(inquiry.createdAt)} |
          </Txt>
          <Txt variant='bodySubText' color={statusText === '답변 완료' ? 'highlight_orange' : 'dark_gray1'}>
            {' '}
            {statusText}
          </Txt>
        </View>

        <Txt variant='mainTitleLight' style={tw`mt-[20px] mb-[34px] leading-[42px]`}>
          {inquiry.content}
        </Txt>

        <View style={tw`h-[1px] bg-light-gray-3 mb-[34px]`} />

        <Txt variant='mainTitleLight' style={tw`leading-[42px] mb-[60px]`}>
          {inquiry.answer ?? '아직 등록된 답변이 없어요.'}
        </Txt>
      </ScrollView>

      {showDeleteConfirm && (
        <ConfirmModal
          modalTitle='1:1 문의를 삭제하시겠습니까?'
          cancelTitle='취소'
          confirmTitle='확인'
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </Container>
  );
}
