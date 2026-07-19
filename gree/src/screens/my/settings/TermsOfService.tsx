import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon } from '@/assets/images';
import { termsController } from '@/src/apis/controller/terms';
import { TermResponseDto } from '@/src/apis/api';

type Props = StackScreenProps<RootStackParamList, 'TermsOfService'>;

export default function TermsOfService({}: Props) {
  const [terms, setTerms] = useState<TermResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const res = await termsController.getTerms();
        setTerms(res || []);
      } catch (err) {
        console.error('getTerms 실패', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) {
    return (
      <Container className='w-full'>
        <Header title='이용약관' leftIcon={<BackArrowIcon />} className='pb-[12px]' />
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size='large' color='#FFC311' />
        </View>
      </Container>
    );
  }

  return (
    <Container className='w-full'>
      <Header title='이용약관' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] py-[28px]`}>
          {terms.length === 0 ? (
            <View style={tw`items-center justify-center pt-[60px]`}>
              <Txt variant='bodyText' color='dark_gray1'>
                이용약관이 없습니다
              </Txt>
            </View>
          ) : (
            terms.map((term) => (
              <View key={term.id} style={tw`mb-[30px]`}>
                <Txt variant='mainTitleBold' style={tw`mb-[18px]`}>
                  {term.title}
                </Txt>
                <Txt variant='bodyText' style={tw`leading-[22px] whitespace-pre-wrap`}>
                  {term.content}
                </Txt>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Container>
  );
}