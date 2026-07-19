import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import { View, Alert } from 'react-native';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';
import Header from '@/src/components/layout/Header';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';
import TextField from '@/src/components/common/input/TextField';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import { authController } from '@/src/apis/controller/auth';

type RouteProps = RouteProp<RootStackParamList, 'NicknameSetting'>;

export default function NicknameSetting() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProps>();
  const { email, password, agreements } = route.params;

  const [nickName, setNickName] = useState('');
  const [textFieldState, setTextFieldState] = useState<'empty' | 'filled' | 'error' | 'failed'>('empty');

  const handleNextButtonOnClick = async () => {
    if (!nickName.trim()) return;
    try {
      await authController.signup({
        email,
        password,
        nickname: nickName,
      });
      navigation.navigate('NicknameSettingComplete');
    } catch (error: any) {
      Alert.alert('회원가입 실패', error?.response?.data?.message ?? '다시 시도해 주세요.');
    }
  };

  return (
    <Container>
      <Header />
      <View style={tw`gap-[98px] p-[43px_32px]`}>
        <Txt variant='headLineBold' align='left'>
          사용할 별명을 입력해주세요. {'\n'}
        </Txt>
        <View style={tw`gap-[17px]`}>
          <Txt variant='bodySubText' align='left'>
            별명
          </Txt>
          <TextField
            placeholder='별명은 이후에 변경할 수 있어요.'
            state={textFieldState}
            setState={setTextFieldState}
            content={nickName}
            validation={(text) => setNickName(text)}
          />
        </View>
      </View>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title='다음'
            color='sub_yellow'
            isValid={!!nickName.trim()}
            onClick={handleNextButtonOnClick}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
