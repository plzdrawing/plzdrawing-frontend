import tw from '@/src/lib/tailwind';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';

import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import Button from '@/src/components/common/button/Button';

type Props = StackScreenProps<RootStackParamList, 'ResetPasswordComplete'>;

export default function ResetPasswordComplete({ navigation }: Props) {
  return (
    <Container className='w-full'>
      <View style={tw`flex-1 px-[32px] py-[60px] items-center justify-center`}>
        <View style={tw`items-center mb-[60px]`}>
          <Txt variant='mainTitleBold' style={tw`mb-[20px] text-center`}>
            비밀번호가 성공적으로
          </Txt>
          <Txt variant='mainTitleBold' style={tw`mb-[20px] text-center`}>
            초기화되었습니다
          </Txt>
          <Txt variant='bodyText' color='dark_gray1' style={tw`text-center`}>
            새 비밀번호로 로그인해주세요
          </Txt>
        </View>

        <View style={tw`flex-1`} />

        <Button
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'EmailLogin' }],
            })
          }
        >
          로그인하기
        </Button>
      </View>
    </Container>
  );
}
