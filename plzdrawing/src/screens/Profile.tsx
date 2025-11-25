import { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
import Colors from "@/src/constants/Colors";
import { userApi } from "@/src/apis/user";
import { authApi } from "@/src/apis/auth";
import { CommonActions } from "@react-navigation/native";
import React from "react";

type RootStackParamList = {
  Profile: undefined;
  AlarmSetting: undefined;
  CustomerService: undefined;
  Notice: undefined;
  ProfileEdit: undefined;
  Tos: undefined;
  EditAccount: undefined;
  EditPassword: undefined;
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
  const [userProfile, setUserProfile] = useState<BaseProfile>({
    name: "",
    imageUrl: "",
    hashtag: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 조회 - 화면이 포커스될 때마다 새로고침
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await userApi.getMe();
          console.log('User data response:', response);
        
        // any로 캐스팅하여 실제 API 응답 구조 처리
        const data = response as any;
        
        // 실제 응답 구조: { nickname, hashtags, introduction, profileImageUrl }
        if (data && (data.nickname || data.hashtags)) {
          console.log('Mapping profile data:', {
            nickname: data.nickname,
            profileImageUrl: data.profileImageUrl,
            hashtags: data.hashtags
          });
          
          setUserProfile({
            name: data.nickname || "사용자",
            imageUrl: data.profileImageUrl || "",
            hashtag: data.hashtags || [],
          });
          
          console.log('UserProfile set to:', {
            name: data.nickname,
            imageUrl: data.profileImageUrl,
            hashtag: data.hashtags
          });
        } 
        // ApiResponse 구조인 경우: { success, data }
        else if (data?.success && data?.data) {
          setUserProfile({
            name: data.data.nickname || data.data.name || "사용자",
            imageUrl: data.data.profileImageUrl || data.data.profileImage || "",
            hashtag: data.data.hashtags || data.data.tags || [],
          });
        } else {
          // 데이터가 없을 때 기본값 설정
          console.log('No user data, using default values');
          setUserProfile({
            name: "사용자",
            imageUrl: "",
            hashtag: ["#프로필", "#미작성"],
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // 에러 발생 시에도 기본값 설정
        setUserProfile({
          name: "사용자",
          imageUrl: "",
          hashtag: ["#프로필", "#미작성"],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    }, [])
  );

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

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await authApi.logout();
      
      // AsyncStorage에서 토큰 삭제
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      
      // 로그인 화면으로 이동 (뒤로가기 방지)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginSplash' }],
        })
      );
    } catch (error) {
      console.error('Logout failed:', error);
      // 에러가 발생해도 로컬 토큰은 삭제하고 로그인 화면으로 이동
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginSplash' }],
        })
      );
    }
  };

  const settingsMenuItems: ProfileMenuItem[] = [
    { icon: <AlarmIcon />, text: "알림 설정", onPress: () => {navigation.navigate("AlarmSetting")} },
    // { icon: <LanguageIcon />, text: "언어 설정", onPress: () => {} },
  ];

  const supportMenuItems: ProfileMenuItem[] = [
    { icon: <MegaphoneIcon />, text: "공지사항", onPress: () => {navigation.navigate("Notice");} },
    { icon: <QuestionIcon />, text: "고객센터", onPress: () => {navigation.navigate("CustomerService")} },
    { icon: <QuestionIcon />, text: "1:1 문의하기", onPress: () => {} },
    { icon: <MultipleFileIcon />, text: "앱 관리", onPress: () => {navigation.navigate("Tos");} },
    { icon: <MenuCircleIcon />, text: "결제내역", onPress: () => {navigation.navigate("Payments");} },
  ];

  const accountMenuItems: ProfileMenuItem[] = [
    // { icon: <MenuCircleIcon />, text: "회원정보 수정", onPress: () => {navigation.navigate("EditAccount")} },
    { icon: <PasswordChangeIcon />, text: "비밀번호 변경",
      onPress: () => {
        navigation.navigate("EditPassword");
      }
    },
  ];

  const loginMenuItems: ProfileMenuItem[] = [
    { text: "로그아웃", onPress: handleLogout },
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
            profile={userProfile}
            onEditPress={() => navigation.navigate("ProfileEdit")}
          />

          <MenuGroup title="설정" items={settingsMenuItems} />
          <MenuGroup title="정보 및 지원" items={supportMenuItems} />
          <MenuGroup title="계정 설정" items={accountMenuItems} />
          <MenuGroup title="계정" items={loginMenuItems} />
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
