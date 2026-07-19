import tw from '@/src/lib/tailwind';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View, ScrollView, TouchableOpacity } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Txt from '@/src/components/common/Txt';

import { BackArrowIcon, GreeNormal } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'AppManagement'>;

export default function AppManagement({ navigation }: Props) {
  return (
    <Container className='w-full'>
      <Header title='앱 관리' leftIcon={<BackArrowIcon />} className='pb-[12px]' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`w-full flex-1 bg-light-gray-1`}
      >
        <View style={tw`px-[32px] py-[28px]`}>
          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[16px]`}>
            버전 정보
          </Txt>

          <View style={tw`flex-row items-center pb-[24px]`}>
            <View style={tw`w-[74px] h-[74px] rounded-[12px] bg-sub-yellow items-center justify-center overflow-hidden`}>
              <GreeNormal width={70} height={70} />
            </View>

            <View style={tw`ml-[16px]`}>
              <Txt variant='mainTitleBold' style={tw`mb-[4px]`}>
                그리
              </Txt>
              <Txt variant='bodySubText' color='dark_gray1'>
                25.09.10
              </Txt>
            </View>
          </View>

          <View style={tw`h-[1px] bg-light-gray-3 mb-[28px]`} />

          <Txt variant='bodySubText' color='dark_gray1' style={tw`mb-[16px]`}>
            앱 관리
          </Txt>

          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <Txt variant='bodyText'>이용약관</Txt>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}