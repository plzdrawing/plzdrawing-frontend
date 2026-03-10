import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';

export default function NicknameSettingComplete() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Container>
      <Header />
      <Txt variant='headLineBold' align='left' style={{ marginTop: 43, paddingLeft: 32 }}>
        환영합니다:)
        {'\n'}
        {'\n'}
        소일거리 드로잉어플과 함께 {'\n'}
        소소한 일상을 즐겨보아요!
      </Txt>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title='시작하기'
            onClick={() => navigation.navigate('Main')}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
