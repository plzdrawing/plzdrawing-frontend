import tw from '@/src/lib/tailwind';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View, ScrollView } from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';

type NoticeProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;

export default function Notice({ 
  route, 
  navigation 
}: NoticeProps) {
  // TODO: 공지 사항 내용 추가
  return (
    <Container>
      <Header title='공지 사항' />
      <ScrollView showsVerticalScrollIndicator={false}>

      </ScrollView>
    </Container>
  );
}
