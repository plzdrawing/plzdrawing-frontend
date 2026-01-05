import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../apiClient';
import {
  UpsertProfileRequest,
  ProfileInfoResponse,
  UpdateProfileRequest,
} from '../api';

const BASE_URL = 'http://13.124.246.36:8080';

export const memberController = {
  // 프로필 업로드: POST
  uploadProfile: async (multipartFile: any, profileData: UpsertProfileRequest) => {
    const token = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();

    // 1. 이미지 파일 추가
    formData.append('multipartFile', {
      uri: multipartFile.uri,
      name: multipartFile.name,
      type: multipartFile.type,
    } as any);

    // 2. 프로필 정보 (JSON) 추가
    const profileJson = JSON.stringify({
      introduce: profileData.introduce,
      hashTag: profileData.hashTag,
    });

    formData.append('profile', {
      string: profileJson,
      type: 'application/json',
    } as any);

    // 3. 전송
    const response = await fetch(`${BASE_URL}/api/member/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
          const errorJson = JSON.parse(errorText);
          console.error('Upload Failed JSON:', errorJson);
      } catch (e) {
          console.error('Upload Failed Text:', errorText);
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  },

  // 마이페이지 사용자 정보 조회: GET
  checkMyPage: async () => {
    const response = await apiClient.get<ProfileInfoResponse>('/api/member/v1/me');
    return response.data;
  },

  // 프로필 수정: PATCH
  editProfile: async (multipartFile: any, profile: UpdateProfileRequest) => {
    const token = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();

    // 1. 이미지 파일이 있는 경우에만 추가
    if (multipartFile) {
      formData.append('multipartFile', {
        uri: multipartFile.uri,
        name: multipartFile.name,
        type: multipartFile.type,
      } as any);
    }

    // 2. 프로필 정보 (JSON) 구성 - nickname 추가됨
    // (profile 객체에 nickname 타입이 정의되어 있다고 가정)
    const profileObj: any = {
      nickname: profile.nickname, // ✨ 추가된 부분
      introduce: profile.introduce,
      hashTag: profile.hashTag,
    };

    const profileJson = JSON.stringify(profileObj);

    // 3. 'profile' 키로 JSON 데이터 추가 (Type 명시 필수)
    formData.append('profile', {
      string: profileJson,
      type: 'application/json',
    } as any);

    // 4. 전송 (PATCH)
    const response = await fetch(`${BASE_URL}/api/member/v1/profile`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type은 자동 설정되도록 생략
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Edit Profile Failed:', response.status, errorText);
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  },

  // 회원 탈퇴: DELETE
  withdrawMember: async () => {
    const response = await apiClient.delete('/api/member/v1/withdraw');
    return response.data;
  },
};
