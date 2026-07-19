import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

type RouteProps = RouteProp<RootStackParamList, 'NicknameSettingSplash'>;

export default function NicknameSettingSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { email, password, agreements } = route.params;

  return (
    <Container>
      <Header />
      <Txt variant='headLineBold' align='left' style={{ marginTop: 43, paddingLeft: 32 }}>
        감사합니다. {'\n'}
        인증이 완료되었어요!
        {'\n'}
        {'\n'}
        이제 프로필을 만들어보아요:)
      </Txt>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title='프로필 만들기'
            color='sub_yellow'
            onClick={() => navigation.navigate('NicknameSetting', { email, password, agreements })}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
