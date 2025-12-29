import { useState, useEffect, useCallback } from 'react';

import { BackHandler } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserProfile from "@/src/screens/my/pages/profilePage/Profile";
import { BaseProfile, ProfileMenuItem } from "@/src/types/profile";
import { RootStackParamList } from "@/src/types/navigation";

import Container from "@/src/components/layout/Container";
import TabHeader from '@/src/components/layout/header/TabHeader';
import Setting from '@/src/screens/my/pages/settingPage/Setting';

import { userApi } from "@/src/apis/user";
import { authController } from '@/src/apis/controller/auth';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function My() {
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();
  const [userProfile, setUserProfile] = useState<BaseProfile>({
    name: "",
    imageUrl: "",
    hashtag: [],
  });

  // 사용자 정보 조회 - 화면이 포커스될 때마다 새로고침
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await userApi.getMyProfile();
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
      await authController.logout();
      
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      
      console.log('logout success');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginSplash' }],
        })
      );
    } catch (error) {
      console.error('Logout failed:', error);
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

  return (
    <Container className='w-full'>
      <TabHeader
        title1='프로필'
        title2='설정'
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        onRightClick={() => navigation.navigate('Alarm')}
      />
      {selectedId === 0
        ? <UserProfile 
            isFromMyPage={true}
            userProfile={userProfile}
          />
        : <Setting 
            userProfile={userProfile}
            onLogout={handleLogout}
          />
      }
    </Container>
  );
}
