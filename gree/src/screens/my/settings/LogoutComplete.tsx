import tw from '@/src/lib/tailwind';

import { StackScreenProps } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

import { GreeNormal } from '@/assets/images';

type Props = StackScreenProps<RootStackParamList, 'LogoutComplete'>;

export default function LogoutComplete({ navigation }: Props) {
  const moveToSplash = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'LoginSplash' }] })
    );
  };

  return (
    <Container className='w-full bg-light-gray-1'>
      <View style={tw`flex-1 items-center justify-center px-[32px] pb-[140px]`}>
        <View style={tw`w-[124px] h-[124px] rounded-[8px] bg-sub-yellow items-center justify-center mb-[22px] overflow-hidden`}>
          <GreeNormal width={120} height={120} />
        </View>

        <Txt variant='headLineBold' align='center' style={tw`mb-[18px]`}>
          로그아웃 완료
        </Txt>

        <Txt variant='mainTitleLight' color='dark_gray1' align='center'>
          로그아웃이 성공적으로{`\n`}완료되었습니다 :)
        </Txt>
      </View>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <PrimaryButton title='확인' color='sub_yellow' onClick={moveToSplash} />
        </View>
      </BottomFixedArea>
    </Container>
  );
}