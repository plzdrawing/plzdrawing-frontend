import tw from '@/src/lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/types';
import { BaseProfile } from '@/src/types/profile';

import { View, ScrollView } from 'react-native';
import MyInfoSection from '@/src/screens/my/settings/components/MyInfoSection';
import GreeCoinSection from '@/src/screens/my/settings/components/GreeCoinSection';
import MenuGroup from '@/src/screens/my/settings/components/MenuGroup';

import {
  AlarmIcon,
  MegaphoneIcon,
  QuestionIcon,
  MultipleFileIcon,
  MenuCircleIcon,
  PasswordChangeIcon,
} from '@/assets/images';

interface SettingProps {
  userProfile: BaseProfile;
  onLogout: () => void;
}

export default function Setting({ userProfile, onLogout }: SettingProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView
      contentContainerStyle={tw`w-full px-[32px] pt-[18px] pb-[40px] bg-light-gray-1`}
      showsVerticalScrollIndicator={false}
    >
      <MyInfoSection
        profile={userProfile}
        onEditClick={() => navigation.navigate('ProfileEdit')}
      />

      <GreeCoinSection amount={20} onCharge={() => {}} />
      <View style={tw`mt-[17px] h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='설정'
        items={[{ text: '알림 설정', icon: <AlarmIcon />, onPress: () => navigation.navigate('AlarmNotification') }]}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='정보 및 지원'
        items={[
          { text: '공지 사항', icon: <MegaphoneIcon />, onPress: () => navigation.navigate('Announcement') },
          { text: '고객 센터', icon: <QuestionIcon />, onPress: () => {} },
          { text: '1:1 문의', icon: <QuestionIcon />, onPress: () => {} },
          { text: '앱 관리', icon: <MultipleFileIcon />, onPress: () => {} },
        ]}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='계정 설정'
        items={[
          { text: '비밀번호 변경', icon: <PasswordChangeIcon />, onPress: () => {} },
          { text: '환전계좌 관리/등록', icon: <MenuCircleIcon />, onPress: () => {} },
        ]}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='계정'
        items={[
          { text: '로그아웃', onPress: onLogout },
          { text: '회원탈퇴', onPress: () => {} },
        ]}
      />
    </ScrollView>
  );
}
