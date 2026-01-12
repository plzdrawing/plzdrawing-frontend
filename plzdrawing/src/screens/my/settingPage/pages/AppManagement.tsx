import tw from '@/src/lib/tailwind';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View, TouchableOpacity } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';
import Txt from '@/src/components/ui/Txt';

import { GreeApp } from '@/assets/images';

type AppManagementProps = NativeStackScreenProps<RootStackParamList, 'AppManagement'>;

export default function AppManagement({ 
  route, 
  navigation 
}: AppManagementProps) {
  return (
    <Container>
      <Header title='앱 관리' />
      <View style={tw`px-[32px] mt-[58px] w-full`}>
        <Txt variant='auxiliaryTextLight'>
          버전 정보
        </Txt>

        <View style={tw`flex-row gap-[11px] w-full mt-[21px] border-b border-light-gray-3 pb-[14px]`}>
          <GreeApp width={84} height={85} />
          <View style={tw`gap-[7px]`}>
            <Txt variant='subtitleBold'>
              그리
            </Txt>
            <Txt variant='auxiliaryTextLight' color='light_gray2'>
              25.09.10
            </Txt>
          </View>
        </View>

        <Txt variant='auxiliaryTextLight' style={tw`mt-[41px]`}>
          앱 관리
        </Txt>

        <TouchableOpacity onPress={() => navigation.navigate('Tos')}>
          <Txt variant='bodyText' style={tw`mt-[21px]`}>
            이용약관
          </Txt>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
