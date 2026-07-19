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
import ConfirmModal from '@/src/components/common/modal/ConfirmModal';
import AlertModal from '@/src/components/common/modal/AlertModal';

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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    try {
      await logout();
      navigation.navigate('LogoutComplete');
    } catch (error) {
      console.error('Logout failed:', error);
      setErrorModalVisible(true);
    }
  };

  const handleWithdrawConfirm = async () => {
    setShowWithdrawModal(false);
    try {
      await memberController.withdrawMember();
      await logout();
      navigation.navigate('WithdrawComplete');
    } catch (error) {
      console.error('Withdraw failed:', error);
      setErrorModalVisible(true);
    }
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
        <Setting
          userProfile={userProfile}
          onLogout={() => setShowLogoutModal(true)}
          onWithdraw={() => setShowWithdrawModal(true)}
        />
      )}

      {showLogoutModal && (
        <ConfirmModal
          modalTitle='로그아웃 하시겠습니까?'
          cancelTitle='취소'
          confirmTitle='확인'
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}

      {showWithdrawModal && (
        <ConfirmModal
          modalTitle='정말 회원탈퇴를 하시겠습니까?'
          cancelTitle='취소'
          confirmTitle='확인'
          onCancel={() => setShowWithdrawModal(false)}
          onConfirm={handleWithdrawConfirm}
        />
      )}

      {errorModalVisible && (
        <AlertModal
          modalTitle='요청 처리에 실패했습니다.'
          buttonTitle='확인'
          onClickButton={() => setErrorModalVisible(false)}
        />
      )}
    </Container>
  );
}
