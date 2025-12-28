import tw from '@/src/lib/tailwind';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';
import { BaseProfile } from '@/src/types/profile';

import { View, ScrollView } from 'react-native';
import MyInfoSection from '@/src/screens/my/pages/settingPage/components/MyInfoSection';
import MenuGroup from '@/src/screens/my/pages/settingPage/components/MenuGroup';

import {
  AlarmIcon,
  MegaphoneIcon,
  QuestionIcon,
  MultipleFileIcon,
  MenuCircleIcon,
  PasswordChangeIcon,
} from "@/assets/images";

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SettingProps {
  userProfile: BaseProfile;
  onLogout: () => void;
}

export default function Setting({ userProfile, onLogout }: SettingProps) {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  
  return (
    <ScrollView
      contentContainerStyle={tw`w-full px-[32px] pt-[18px] pb-[40px] bg-light-gray-1`}
      showsVerticalScrollIndicator={false}
    >
      <MyInfoSection
        profile={userProfile}
        onEditClick={() => navigation.navigate('ProfileEdit')}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='설정'
        items={[{ text: '알림 설정', icon: <AlarmIcon />, onPress: () => {navigation.navigate('AlarmSetting')} }]}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='정보 및 지원'
        items={[
          { text: '공지 사항', icon: <MegaphoneIcon />, onPress: () => {navigation.navigate('Notice')} },
          { text: '고객 센터', icon: <QuestionIcon />, onPress: () => {navigation.navigate('CustomerService')} },
          { text: '1:1 문의', icon: <QuestionIcon />, onPress: () => {} },
          { text: '앱 관리', icon: <MultipleFileIcon />, onPress: () => {navigation.navigate('Tos')} },
          { text: '결제 내역', icon: <MenuCircleIcon />, onPress: () => {navigation.navigate('Payments')} },
        ]}
      />
      <View style={tw`h-[1px] w-full bg-light-gray-3`} />

      <MenuGroup
        title='계정 설정'
        items={[{ text: '비밀번호 변경', icon: <PasswordChangeIcon />, onPress: () => {navigation.navigate('EditPassword')} }]}
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
