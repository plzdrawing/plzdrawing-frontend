import tw from '@/src/lib/tailwind';
import { useEffect, useMemo, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';
import { InquiryResponseDto } from '@/src/apis/api';

import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/common/button/Button';
import AlertModal from '@/src/components/common/modal/AlertModal';

import { BackArrowIcon, CameraIcon, DrawerIcon } from '@/assets/images';
import { addInquiry, getInquiryList, InquiryItem } from './inquiryMock';

type Props = StackScreenProps<RootStackParamList, 'Inquiry'>;

type InquiryTab = 'create' | 'history';
type HistoryPeriod = '1개월 간' | '6개월 간' | '12개월 간';

const CATEGORY_OPTIONS: Array<{ label: string; value: InquiryResponseDto['category'] }> = [
  { label: '그림톡', value: 'DRAWING' },
  { label: '그림쟁이 후기', value: 'REVIEW' },
  { label: '프로필 수정', value: 'ACCOUNT' },
  { label: '결제', value: 'PAYMENT' },
  { label: '기타', value: 'ETC' },
];

const PERIOD_OPTIONS: HistoryPeriod[] = ['1개월 간', '6개월 간', '12개월 간'];

function formatDate(isoString: string) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function getStatusText(status: InquiryResponseDto['status']) {
  if (status === 'ANSWERED') return '답변 완료';
  if (status === 'IN_PROGRESS') return '답변 진행중';
  if (status === 'CLOSED') return '답변 완료';
  return '답변 예정';
}

function withinMonths(isoString: string, months: number) {
  const createdAt = new Date(isoString);
  const target = new Date();
  target.setMonth(target.getMonth() - months);
  return createdAt >= target;
}

export default function Inquiry({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<InquiryTab>('create');

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<InquiryResponseDto['category'] | null>(
    null,
  );

  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<HistoryPeriod>('1개월 간');
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  useEffect(() => {
    setInquiries(getInquiryList());
  }, [activeTab]);

  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  useEffect(() => {
    if (route.params?.showDeletedModal) {
      setShowDeletedModal(true);
      navigation.setParams({ showDeletedModal: undefined });
    }
  }, [navigation, route.params?.showDeletedModal]);

  const selectedCategoryLabel = useMemo(
    () => CATEGORY_OPTIONS.find((item) => item.value === selectedCategory)?.label ?? null,
    [selectedCategory],
  );

  const maxLength = 200;
  const canSubmit = !!selectedCategory && content.trim().length > 0;

  const filteredInquiries = useMemo(() => {
    const months = selectedPeriod === '1개월 간' ? 1 : selectedPeriod === '6개월 간' ? 6 : 12;
    return inquiries.filter((item) => withinMonths(item.createdAt, months));
  }, [inquiries, selectedPeriod]);

  const handleTabChange = (tab: InquiryTab) => {
    Keyboard.dismiss();
    setIsCategoryOpen(false);
    setIsPeriodOpen(false);
    setActiveTab(tab);
  };

  const handleSubmit = () => {
    if (!canSubmit || !selectedCategory) return;

    addInquiry({ category: selectedCategory, content, imageUrls: [] });
    setContent('');
    setSelectedCategory(null);
    setIsFocused(false);
    setActiveTab('history');
    setSelectedPeriod('1개월 간');
    setInquiries(getInquiryList());
  };

  const isWriteTab = activeTab === 'create';

  return (
    <Container className='w-full bg-light-gray-1'>
      <Header title='1:1 문의' leftIcon={<BackArrowIcon />} className='pb-[18px]' />

      <View style={tw`w-full flex-row border-b border-light-gray-3 bg-light-gray-1`}>
        <TouchableOpacity
          style={tw`flex-1 items-center justify-center py-[16px]`}
          onPress={() => handleTabChange('create')}
        >
          <Txt variant={isWriteTab ? 'mainTitleBold' : 'mainTitleLight'}>문의하기</Txt>
          {isWriteTab && <View style={tw`mt-[6px] h-[3px] w-[60px] rounded-full bg-black`} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 items-center justify-center py-[16px]`}
          onPress={() => handleTabChange('history')}
        >
          <Txt variant={!isWriteTab ? 'mainTitleBold' : 'mainTitleLight'}>문의내역</Txt>
          {!isWriteTab && <View style={tw`mt-[6px] h-[3px] w-[60px] rounded-full bg-black`} />}
        </TouchableOpacity>
      </View>

      <Pressable
        style={tw`flex-1`}
        onPress={() => {
          setIsCategoryOpen(false);
          setIsPeriodOpen(false);
          Keyboard.dismiss();
        }}
      >
        {isWriteTab ? (
          <View style={tw`flex-1 px-[24px] pt-[24px] pb-[120px]`}>
            <View style={tw`relative z-20`}>
              <TouchableOpacity
                style={tw`h-[56px] flex-row items-center justify-between px-[20px] rounded-[18px] border border-light-gray-2 bg-light-gray-1`}
                onPress={() => setIsCategoryOpen((prev) => !prev)}
                activeOpacity={0.8}
              >
                <Txt variant='mainTitleLight' color={selectedCategoryLabel ? 'black' : 'dark_gray2'}>
                  {selectedCategoryLabel ?? '카테고리를 선택해주세요'}
                </Txt>
                <DrawerIcon />
              </TouchableOpacity>

              {isCategoryOpen && (
                <View style={tw`absolute top-[64px] left-[0px] right-[0px] rounded-[18px] border border-light-gray-2 bg-white overflow-hidden shadow`}>
                  {CATEGORY_OPTIONS.map((item, index) => {
                    const selected = item.value === selectedCategory;
                    return (
                      <TouchableOpacity
                        key={item.value}
                        style={[
                          tw`h-[58px] flex-row items-center justify-between px-[20px] bg-white`,
                          index < CATEGORY_OPTIONS.length - 1 ? tw`border-b border-light-gray-3` : null,
                        ]}
                        onPress={() => {
                          setSelectedCategory(item.value);
                          setIsCategoryOpen(false);
                        }}
                      >
                        <Txt variant='bodyText' color={selected ? 'black' : 'light_gray2'}>
                          {selected ? '✓' : ''}
                        </Txt>
                        <Txt variant='mainTitleLight' color={selected ? 'highlight_orange' : 'black'}>
                          {item.label}
                        </Txt>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            <View
              style={[
                tw`mt-[18px] h-[244px] rounded-[18px] border bg-light-gray-1 px-[20px] pt-[20px]`,
                isFocused ? tw`border-main-yellow` : tw`border-light-gray-2`,
              ]}
            >
              <TextInput
                multiline
                maxLength={maxLength}
                placeholder='문의 내용을 입력해주세요'
                placeholderTextColor='#A8A8A8'
                value={content}
                onChangeText={setContent}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={tw`flex-1 text-[16px] leading-[22px] text-black font-ssurround-air`}
                textAlignVertical='top'
              />
              <Txt
                variant='mainTitleLight'
                color='dark_gray1'
                style={tw`absolute right-[20px] bottom-[20px]`}
              >
                {content.length}/{maxLength}
              </Txt>
            </View>

            <Txt variant='mainTitleLight' color='dark_gray2' style={tw`mt-[20px] mb-[14px]`}>
              이미지 파일 최대 3개를 첨부할 수 있어요
            </Txt>

            <TouchableOpacity
              style={tw`w-[100px] h-[100px] rounded-[12px] border border-light-gray-2 items-center justify-center`}
              activeOpacity={0.9}
            >
              <CameraIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-1 px-[24px] pt-[24px]`}>
            <View style={tw`relative z-20`}>
              <TouchableOpacity
                style={tw`h-[56px] flex-row items-center justify-between px-[20px] rounded-[18px] border border-light-gray-2 bg-light-gray-1`}
                onPress={() => setIsPeriodOpen((prev) => !prev)}
                activeOpacity={0.8}
              >
                <Txt variant='mainTitleLight'>{selectedPeriod}</Txt>
                <DrawerIcon />
              </TouchableOpacity>

              {isPeriodOpen && (
                <View style={tw`absolute top-[64px] left-[0px] right-[0px] rounded-[18px] border border-light-gray-2 bg-white overflow-hidden shadow`}>
                  {PERIOD_OPTIONS.map((item, index) => {
                    const selected = item === selectedPeriod;
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[
                          tw`h-[58px] flex-row items-center justify-between px-[20px] bg-white`,
                          index < PERIOD_OPTIONS.length - 1 ? tw`border-b border-light-gray-3` : null,
                        ]}
                        onPress={() => {
                          setSelectedPeriod(item);
                          setIsPeriodOpen(false);
                        }}
                      >
                        <Txt variant='bodyText' color={selected ? 'black' : 'light_gray2'}>
                          {selected ? '✓' : ''}
                        </Txt>
                        <Txt variant='mainTitleLight' color={selected ? 'highlight_orange' : 'black'}>
                          {item}
                        </Txt>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {filteredInquiries.length === 0 ? (
              <View style={tw`flex-1 items-center justify-center pb-[160px]`}>
                <Txt variant='mainTitleLight' color='dark_gray2'>
                  {selectedPeriod} 문의내역이 없어요
                </Txt>
              </View>
            ) : (
              <ScrollView style={tw`mt-[20px]`} showsVerticalScrollIndicator={false}>
                {filteredInquiries.map((item) => {
                  const statusText = getStatusText(item.status);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={tw`py-[20px] border-b border-light-gray-3`}
                      activeOpacity={0.85}
                      onPress={() => navigation.navigate('InquiryDetail', { id: item.id })}
                    >
                      <View style={tw`flex-row items-center flex-wrap mb-[10px]`}>
                        <Txt variant='headLineBold'>{item.title}</Txt>
                        <Txt variant='bodySubText' color='dark_gray1' style={tw`ml-[12px]`}>
                          {formatDate(item.createdAt)} |
                        </Txt>
                        <Txt
                          variant='bodySubText'
                          color={statusText === '답변 완료' ? 'highlight_orange' : 'dark_gray1'}
                          style={tw`ml-[4px]`}
                        >
                          {statusText}
                        </Txt>
                      </View>

                      <Txt variant='bodyText' numberOfLines={2}>
                        {item.content}
                      </Txt>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}
      </Pressable>

      {isWriteTab && (
        <BottomFixedArea>
          <View style={tw`px-[24px] pb-[16px] bg-light-gray-1`}>
            <Button title='전송하기' isValid={canSubmit} onClick={handleSubmit} />
          </View>
        </BottomFixedArea>
      )}

      {showDeletedModal && (
        <AlertModal
          modalTitle='1:1 문의가 삭제되었습니다'
          buttonTitle='확인'
          onClickButton={() => setShowDeletedModal(false)}
        />
      )}
    </Container>
  );
}
