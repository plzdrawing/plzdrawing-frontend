import tw from '@/src/lib/tailwind';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/ui/Txt';
import BottomFixedArea from '@/src/components/layout/BottomFixedArea';
import Button from '@/src/components/ui/button/Button';

import { GreeSuccess } from '@/assets/images';

type EditSuccessNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditSuccessRouteProp = RouteProp<RootStackParamList, 'EditSuccess'>;

export default function EditSuccess() {
  const navigation = useNavigation<EditSuccessNavigationProp>();
  const route = useRoute<EditSuccessRouteProp>();
  
  const { type } = route.params;

  const handleConfirm = () => {
    // Profile 화면으로 돌아가기 (2번 goBack: EditPassword/EditAccount -> Profile)
    navigation.goBack();
    navigation.goBack();
  };

  return (
    <Container className='justify-center items-center w-full'>
      <GreeSuccess width={120} height={120} />

      <Txt variant='subtitleBold' style={tw`mt-[17px] mb-[40px]`}>
        {type === 'profile'
          ? '회원정보 수정 완료'
          : '비밀번호 변경 완료'
        }
      </Txt>

      <Txt variant='bodyText' color='dark_gray2'>
        {type === 'profile'
          ? '회원정보 수정이 성공적으로'
          : '비밀번호 변경이 성공적으로'
        }
      </Txt>
      <Txt variant='bodyText' color='dark_gray2'>
        완료되었습니다:)
      </Txt>

      <BottomFixedArea>
        <View style={tw`w-full px-[57px] py-[10px]`}>
          <Button
            title='확인'
            variant='default'
            onClick={handleConfirm}
          />
        </View>
      </BottomFixedArea>
    </Container>
  )
}
