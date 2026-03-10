import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image } from 'react-native';

import Txt from '@/src/components/common/Txt';
import { BaseProfile } from '@/src/types/profile';

interface MyInfoSectionProps {
  profile: BaseProfile;
  onEditClick: () => void;
}

export default function MyInfoSection({ profile, onEditClick }: MyInfoSectionProps) {
  const [imageHeaders, setImageHeaders] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getHeaders = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) setImageHeaders({ Authorization: `Bearer ${token}` });
    };
    getHeaders();
  }, []);

  return (
    <View style={tw`w-full flex-row items-center mt-[17px] mb-[17px]`}>
      {profile.imageUrl ? (
        <Image
          source={{ uri: profile.imageUrl, headers: imageHeaders }}
          style={tw`w-[102px] h-[102px] rounded-[5px] bg-white border border-light-gray-2 mr-[17px]`}
        />
      ) : (
        <View style={tw`w-[102px] h-[102px] rounded-[5px] bg-light-gray-2 border border-light-gray-2 mr-[17px]`} />
      )}
      <View>
        <Txt variant='mainTitleBold'>{profile.name}</Txt>
        <View style={tw`flex-row items-center mt-[8px] mb-[16px] flex-wrap`}>
          {profile.hashtag.map((item, index) => (
            <Txt key={index} variant='bodyText' color='dark_gray2' style={{ marginRight: 4 }}>
              {item.startsWith('#') ? item : `#${item}`}
            </Txt>
          ))}
        </View>
        <View
          style={tw`px-[16px] py-[8px] border border-light-gray-2 rounded-[8px]`}
          onTouchEnd={onEditClick}
        >
          <Txt variant='bodySubText'>프로필 편집</Txt>
        </View>
      </View>
    </View>
  );
}
