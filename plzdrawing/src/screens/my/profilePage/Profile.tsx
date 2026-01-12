import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';

import { ScrollView } from 'react-native';
import Header from '@/src/components/layout/header/Header';

import UserDetail from '@/src/screens/my/profilePage/components/UserDetail';
import UserDrawings from '@/src/screens/my/userProfile/UserDrawings';
import UserReviews from '@/src/screens/my/userProfile/UserReviews';

import { BaseProfile } from '@/src/types/profile';

import { memberController } from '@/src/apis/controller/member';

type FilterType = '그림' | '후기';

interface ProfileProps {
  isFromMyPage?: boolean;
  userId?: string;
  userProfile?: BaseProfile;
}

export default function Profile({ 
  isFromMyPage = false, 
  userId,
  userProfile 
}: ProfileProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('그림');
  const [isNoProfile, setIsNoProfile] = useState(false);
  
  const [user, setUser] = useState({
    id: '',
    imageUrl: userProfile?.imageUrl || '',
    name: userProfile?.name || '',
    intro: '',
    tags: userProfile?.hashtag || [] as string[],
    drawings: [],
    reviews: {
      drawNum: 0,
      rejectNum: 0,
      rating: 0,
      reviewNum: 0,
      reviewKeywords: [],
      reviews: [],
    },
  });

  useEffect(() => {
    if (userProfile) {
      setUser(prev => ({
        ...prev,
        imageUrl: userProfile.imageUrl,
        name: userProfile.name,
        tags: userProfile.hashtag,
      }));
    }
  }, [userProfile]);

  // 마이페이지일 때 서버에서 프로필 정보 다시 확인
  useEffect(() => {
    const checkProfile = async () => {
      if (isFromMyPage) {
        try {
          const profileData = await memberController.checkMyProfile();
          console.log('📋 Profile data from API:', profileData);
          
          const hasNoProfile = 
            !!profileData.nickname && 
            !profileData.introduce && 
            !profileData.profileImageUrl && 
            (!profileData.hashTags || profileData.hashTags.length === 0);
          
          setIsNoProfile(hasNoProfile);
          
          if (!hasNoProfile) {
            console.log('✓ Setting user profile with image:', profileData.profileImageUrl);
            setUser(prev => ({
              ...prev,
              imageUrl: profileData.profileImageUrl || '',
              name: profileData.nickname || '',
              intro: profileData.introduce || '',
              tags: profileData.hashTags || [],
            }));
          } else {
            setUser(prev => ({
              ...prev,
              name: profileData.nickname || '',
            }));
          }
        } catch (error) {
          console.error('❌ Failed to check profile:', error);
        }
      }
    };
    
    checkProfile();
  }, [isFromMyPage]);

  const handleUploadProfile = () => {
    navigation.navigate('ProfileUpload');
  };

  return (
    <>
      {!isFromMyPage && <Header />}
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <UserDetail
          userProfileImage={user.imageUrl}
          userName={user.name}
          userIntroduction={user.intro}
          userTags={user.tags}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          isNoProfile={isNoProfile}
          onUploadProfile={handleUploadProfile}
        />
        {selectedFilter === '그림'
          ? <UserDrawings
              userName={user.name}
              drawings={user.drawings}
            />
          : <UserReviews
              drawNum={user.reviews.drawNum}
              rejectNum={user.reviews.rejectNum}
              rating={user.reviews.rating}
              reviewNum={user.reviews.reviewNum}
              reviewKeywords={user.reviews.reviewKeywords}
              reviews={user.reviews.reviews}
            />
        }
      </ScrollView>
    </>
  )
}
