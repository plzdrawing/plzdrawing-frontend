import tw from '@/src/lib/tailwind';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import { GreeNormal } from '@/assets/images';

type RouteProps = RouteProp<RootStackParamList, 'HomeRequestComplete'>;

export default function HomeRequestComplete() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { chatRoomId: _chatRoomId } = route.params;

  const moveToHome = () => {
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
  };

  return (
    <Container className='w-full bg-light-gray-1'>
      <View style={tw`flex-1 items-center justify-center px-[32px] pb-[140px]`}>
        <View style={tw`w-[110px] h-[110px] rounded-[8px] bg-sub-yellow items-center justify-center mb-[20px] overflow-hidden`}>
          <GreeNormal width={106} height={106} />
        </View>

        <Txt variant='headLineBold' align='center' style={tw`mb-[14px]`}>
          요청 완료
        </Txt>

        <Txt variant='mainTitleLight' color='dark_gray1' align='center'>
          요청이 성공적으로 완료되었습니다.{`\n`}답변을 기다려볼까요?
        </Txt>
      </View>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px] pb-[20px]`}>
          <PrimaryButton
            title='확인'
            color='sub_yellow'
            onClick={moveToHome}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
