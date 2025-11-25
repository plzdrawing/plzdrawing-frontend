import React from 'react';
import styled from 'styled-components/native';
import Txt from '@/src/components/common/text/Txt';
import DefaultButton from '@/src/components/common/button/DefaultButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';
import Colors from '@/src/constants/Colors';
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
    <Container>
      <ContentContainer>
        <GreeSuccess width={120} height={120} />
        <Txt variant="subtitleBold" style={{ marginTop: 17, marginBottom: 40 }}>
          {type === 'profile'
            ? '회원정보 수정 완료'
            : '비밀번호 변경 완료'
          }
        </Txt>
        <Txt variant="bodyText">
          {type === 'profile'
            ? '회원정보 수정이 성공적으로'
            : '비밀번호 변경이 성공적으로'
          }
        </Txt>
        <Txt variant="bodyText">
          완료되었습니다:)
        </Txt>

        <ButtonContainer>
          <DefaultButton
            title="확인"
            variant="primary"
            onPress={handleConfirm}
          />
        </ButtonContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${Colors.colors.white};
  padding: 40px;
`;

const ContentContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
