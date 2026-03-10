import { useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BaseProfile } from '@/src/types/profile';
import { RootStackParamList } from '@/src/navigation/types';

import Container from '@/src/components/layout/Container';
import TabHeader from '@/src/components/layout/TabHeader';
import Profile from '@/src/screens/my/profile/Profile';
import Setting from '@/src/screens/my/settings/Setting';

import { memberController } from '@/src/apis/controller/member';
import { useUserStore } from '@/src/stores/userStore';
import { useAuthStore } from '@/src/stores/authStore';

export default function My() {
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const setUser = useUserStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const [userProfile, setUserProfile] = useState<BaseProfile>({
    name: '',
    imageUrl: '',
    hashtag: [],
  });

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          const data = await memberController.checkMyProfile() as any;
          if (data) {
            setUserProfile({
              name: data.nickname || '사용자',
              imageUrl: data.profileImageUrl || '',
              hashtag: data.hashTags || data.hashtags || [],
            });
            setUser(data);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUserProfile({ name: '사용자', imageUrl: '', hashtag: [] });
        }
      };
      fetchUserData();
    }, [])
  );

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

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'LoginSplash' }] })
    );
  };

  return (
    <Container className='w-full'>
      <TabHeader
        title1='프로필'
        title2='설정'
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      {selectedId === 0 ? (
        <Profile isFromMyPage={true} userProfile={userProfile} />
      ) : (
        <Setting userProfile={userProfile} onLogout={handleLogout} />
      )}
    </Container>
  );
}
