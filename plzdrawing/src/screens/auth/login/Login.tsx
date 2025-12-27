import tw from '@/src/lib/tailwind';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

import { View } from 'react-native';
import Container from '@/src/components/common/container/Container';
import Txt from '@/src/components/common/text/Txt';
import Button from '@/src/components/ui/button/Button';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginKakao = () => {};
  const handleLoginGoogle = () => {};
  const handleLoginApple = () => {};
  const handleLoginEmail = () => {
    navigation.navigate('Login');
  };

  const handleSignupEmail = () => {
    navigation.navigate('EmailSignup');
  };
  
  return (
    <Container className='px-[32px] pt-[71px] pb-[97px]'>
      <Txt variant='headLineBold' style={tw`mb-[67px]`}>
        안녕하세요 :) {'\n'}
        '그리'입니다.
      </Txt>

      <View style={tw`gap-[17px]`}>
        <Txt variant='bodySubText'>
          먼저 로그인이 필요해요.
        </Txt>
        <Button
          variant='auth'
          loginType='kakao'
          onClick={handleLoginKakao}
        />
        <Button
          variant='auth'
          loginType='google'
          onClick={handleLoginGoogle}
        />
        <Button
          variant='auth'
          loginType='apple'
          onClick={handleLoginApple}
        />
        <Button
          variant='auth'
          loginType='email'
          title='이메일 로그인'
          onClick={handleLoginEmail}
        />
        <View style={tw`h-[1px] w-full bg-separator`} />
      </View>

      <View style={tw`mt-[50px] gap-[17px]`}>
        <Txt variant='bodySubText'>
          소일거리 드로잉이 처음이신가요?
        </Txt>
        <Button
          variant='auth'
          loginType='signup'
          title='이메일 회원가입'
          onClick={handleSignupEmail}
        />
      </View>
    </Container>
  );
}
