import tw from '@/src/lib/tailwind';

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";

import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/header/Header';
import Txt from '@/src/components/ui/Txt';

type TosProps = NativeStackScreenProps<RootStackParamList, 'Tos'>;

export default function Tos({ route, navigation }: TosProps) {
  return (
    <Container>
      <Header title='이용약관' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={tw`mx-[32px] mt-[39px]`}
      >
        // TODO: pdf 다운로드
        <TouchableOpacity onPress={() => {}}>
          <Txt variant='secondaryText' color='dark_gray2' style={tw`underline`}>
            pdf 다운로드
          </Txt>
        </TouchableOpacity>

        <Txt variant='subtitleBold' style={tw`mt-[6px] mb-[27px]`}>
          제 1장 환영합니다!
        </Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`mx-[17px]`}>
          제 1조 (목적 및 정의) {'\n'}
          제 2조 (약관의 효력 및 변경) {'\n'}
          제 3조 (약관 외 준칙) {'\n'}
        </Txt>

        <Txt variant='subtitleBold' style={tw`mt-[30px] mb-[16px]`}>
          제 2장 통합서비스 이용계약
        </Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`mx-[17px]`}>
          제 4조 (계약의 성립) {'\n'}
          제 5조 (통합서비스 가입의 제한) {'\n'}
        </Txt>

        <Txt variant='subtitleBold' style={tw`mt-[30px] mb-[16px]`}>
          제 3장 통합서비스 이용
        </Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`mx-[17px]`}>
          제 6조 (다양한 서비스의 제공) {'\n'}
          제 7조 (통합서비스의 변경 및 종료) {'\n'}
          제 8조 (게시물의 관리) {'\n'}
          제 9조 (권리의 귀속 및 저작물의 이용) {'\n'}
          제 10조 (유료 서비스의 이용) {'\n'}
          제 11조 (게시판 이용 상거래) {'\n'}
          제 12조 (통합서비스 이용방법 및 주의점) {'\n'}
          제 13조 (이용 계약 해지) {'\n'}
          제 14조 (개인정보의 보호) {'\n'}
        </Txt>

        <Txt variant='subtitleBold' style={tw`mt-[30px] mb-[16px]`}>
          제 4장 기타
        </Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray2' style={tw`mx-[17px]`}>
          제 15조 (손해배상 등) {'\n'}
          제 16조 (청소년 보호) {'\n'}
          제 17조 (통지 및 공지) {'\n'}
          제 18조 (분쟁의 해결) {'\n'}
        </Txt>
      </ScrollView>
    </Container>
  );
}
