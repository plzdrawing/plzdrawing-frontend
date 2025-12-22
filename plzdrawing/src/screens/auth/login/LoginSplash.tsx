import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import Container from '@/src/components/common/container/Container';
import Txt from '@/src/components/common/text/Txt';
import BottomFixedArea from '@/src/components/common/area/BottomFixedArea';
import Button from '@/src/components/ui/button/Button';

import { GreeNormal } from '@/assets/images';

import { RootStackParamList } from '@/src/types/navigation';

export default function LoginSplash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStartButtonOnClick = () => {
    navigation.navigate("Signup");
  };

  return (
    <Container className={'items-center justify-center'}>
      <GreeNormal />

      <Txt
        variant='mainTitleBold'
        align='center'
        style={tw`mt-[9px] mb-[10px]`}
      >
        환영합니다 :) {'\n'}{'\n'}
        '그리'와 함께 {'\n'}
        소소한 일상을 즐겨보아요!
      </Txt>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px]`}>
          <Button
            title='시작하기'
            onClick={handleStartButtonOnClick}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
