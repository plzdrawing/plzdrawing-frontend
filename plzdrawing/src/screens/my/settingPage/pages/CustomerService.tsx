import tw from '@/src/lib/tailwind';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View, ScrollView } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';

type CustomerServiceProps = NativeStackScreenProps<RootStackParamList, 'CustomerService'>;

export default function CustomerService({ 
  route, 
  navigation 
}: CustomerServiceProps) {
  // TODO: 고객센터 내용 추가
  return (
    <Container>
      <Header title='고객센터' />
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
    </Container>
  );
}
