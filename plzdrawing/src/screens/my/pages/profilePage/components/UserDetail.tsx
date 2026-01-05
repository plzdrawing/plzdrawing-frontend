import tw from '@/src/lib/tailwind';

import React from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Txt from '@/src/components/ui/Txt';
import Button from '@/src/components/ui/button/Button';

import { GreeProfile } from '@/assets/images';

type FilterType = '그림' | '후기';

interface UserDetailProps {
  userProfileImage?: string;
  userName: string;
  userIntroduction: string;
  userTags: string[];
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  isNoProfile?: boolean;
  onUploadProfile?: () => void;
}

export default function UserDetail({ 
  userProfileImage,
  userName, 
  userIntroduction, 
  userTags, 
  selectedFilter, 
  onFilterChange,
  isNoProfile = false,
  onUploadProfile,
}: UserDetailProps) {
  const handleFilterPress = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <View style={tw`flex-col items-center pt-[24px] bg-light-gray-1`}>
      <View style={tw`flex-col items-center w-full`}>
        {userProfileImage ? (
          <Image
            source={{ uri: userProfileImage }}
            style={tw`w-[120px] h-[120px] mt-[17px] mb-2.5 rounded-[5px]`}
          />
        ) : (
          <View style={tw`w-[120px] h-[120px] mt-[17px] mb-2.5 border-[2px] border-light-gray-2 rounded-[5px] justify-center items-center bg-white`}>
            <GreeProfile width={115} height={115} />
          </View>
        )}

        <Txt variant='mainTitleBold'>{userName} 님</Txt>

        {isNoProfile && (
          <Button
            title='프로필 올리기'
            variant='default'
            onClick={onUploadProfile}
            className='w-[224px] mt-[12px] mb-[16px]'
          />
        ) || (
          <>
            <Txt variant='bodyText'>
              {userIntroduction}
            </Txt>
            <Txt color='dark_gray2' variant='bodyText'>
              {userTags.join(' ')}
            </Txt>
          </>
        )}
      </View>
      
      <View style={tw`w-full flex-row border-b border-light-gray-2`}>
        <TouchableOpacity 
          onPress={() => handleFilterPress('그림')}
          style={tw`flex-1 items-center py-[7px]`}
        >
          <Txt variant={selectedFilter === '그림' ? 'bodyTextBold' : 'bodyText'}>
            그림
          </Txt>
          <View style={tw`absolute bottom-0 w-[31px] h-[2px] rounded-[10px] ${selectedFilter === '그림' ? 'bg-black' : 'bg-transparent'}`} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleFilterPress('후기')}
          style={tw`flex-1 items-center py-[7px]`}
        >
          <Txt variant={selectedFilter === '후기' ? 'bodyTextBold' : 'bodyText'}>
            후기
          </Txt>
          <View style={tw`absolute bottom-0 w-[31px] h-[2px] rounded-[10px] ${selectedFilter === '후기' ? 'bg-black' : 'bg-transparent'}`} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
