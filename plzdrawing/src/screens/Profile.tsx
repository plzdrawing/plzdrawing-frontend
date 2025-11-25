import { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import styled from "styled-components/native";
import colors from "@/src/constants/Colors";
import HomeHeader from "@/src/components/home/HomeHeader";
import { Col } from "@/src/components/common/flex/Flex";
import { BaseProfile, ProfileMenuItem } from "@/src/types/profile";
import {
  AlarmIcon,
  LanguageIcon,
  MegaphoneIcon,
  MenuCircleIcon,
  MultipleFileIcon,
  PasswordChangeIcon,
  QuestionIcon,
} from "@/assets/images";
import ProfileInfoSection from "@/src/screens/profile/mypage/ProfileInfoSection";
import MenuGroup from "@/src/screens/profile/mypage/ProfileMenuGroup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Colors from "@/src/constants/Colors";

type RootStackParamList = {
  Profile: undefined;
  AlarmSetting: undefined;
  CustomerService: undefined;
  Notice: undefined;
  ProfileEdit: undefined;
  Tos: undefined;
  EditAccount: undefined;
  EditPassword: { email: string };
  Payments: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;
export default function Profile() {
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();
  const [userEmail, setUserEmail] = useState("test@plz.com");

  // 마이 페이지에서 뒤로가기 시 그림홈으로 이동
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        (navigation as any).navigate('그림홈');
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused, navigation]);

  const profleData: BaseProfile = {
    name: "똥강아지",
    imageUrl: "",
    hashtag: ["#귀여운", "#낙서"],
  };

  const settingsMenuItems: ProfileMenuItem[] = [
    { icon: <AlarmIcon />, text: "알림 설정", onPress: () => {navigation.navigate("AlarmSetting")} },
    { icon: <LanguageIcon />, text: "언어 설정", onPress: () => {} },
  ];

  const supportMenuItems: ProfileMenuItem[] = [
    { icon: <MegaphoneIcon />, text: "공지사항", onPress: () => {navigation.navigate("Notice");} },
    { icon: <QuestionIcon />, text: "고객센터", onPress: () => {navigation.navigate("CustomerService")} },
    { icon: <QuestionIcon />, text: "1:1 문의하기", onPress: () => {} },
    { icon: <MultipleFileIcon />, text: "이용약관", onPress: () => {navigation.navigate("Tos");} },
    { icon: <MenuCircleIcon />, text: "결제내역", onPress: () => {navigation.navigate("Payments");} },
  ];

  const accountMenuItems: ProfileMenuItem[] = [
    { icon: <MenuCircleIcon />, text: "회원정보 수정", onPress: () => {navigation.navigate("EditAccount")} },
    { icon: <PasswordChangeIcon />, text: "비밀번호 변경",
      onPress: () => {
        if (userEmail) { // 이메일이 있는지 확인
          navigation.navigate("EditPassword", { email: userEmail });
        } else {
          console.error("사용자 정보(이메일)를 불러올 수 없습니다.");
        }
      }
    },
  ];

  const loginMenuItems: ProfileMenuItem[] = [
    { text: "로그아웃", onPress: () => {} },
    { text: "회원탈퇴", onPress: () => {} },
  ];

  return (
    <Container>
      <HomeHeader
        title="마이"
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Col
          justifyContent="flex-start"
          padding="32px"
          gap={18}
          style={{ flex: 1, backgroundColor: colors.colors.light_gray1, paddingTop: 16 }}
        >
          <ProfileInfoSection
            profile={profleData}
            onEditPress={() => navigation.navigate("ProfileEdit")}
          />

          <MenuGroup
            title="설정"
            items={settingsMenuItems}
            showSeparator={false}
          />
          <MenuGroup title="정보 및 지원" items={supportMenuItems} />
          <MenuGroup title="계정 설정" items={accountMenuItems} />
          <MenuGroup title="로그인" items={loginMenuItems} />
        </Col>
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  padding-top: 60px;
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
