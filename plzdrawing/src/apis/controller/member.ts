import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../apiClient';
import {
  ProfileInfoResponse,
} from '../api';

const BASE_URL = 'http://13.124.246.36:8080';

export const memberController = {
  // 프로필 업로드: POST
  uploadProfile: async (file: any, introduce: string, hashTag: string[]) => {
    const token = await AsyncStorage.getItem('accessToken');
    const UPLOAD_URL = 'https://plzdrawing.o-r.kr/api/member/profile'; 

    const formData = new FormData();

    // 1. 파일 추가 (키 이름: file)
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);

    // 2. 소개글 추가 (키 이름: introduce)
    formData.append('introduce', introduce);

    // 3. 해시태그 추가 (키 이름: hashTag)
    if (hashTag && Array.isArray(hashTag)) {
      hashTag.forEach((tag) => {
        formData.append('hashTag', tag);
      });
    }

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type은 fetch가 자동 설정하므로 생략
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload Error Body:', errorText);
      throw new Error(`Profile upload failed with status ${response.status}`);
    }

    return await response.json();
  },

  // 프로필 수정: PATCH
  editProfile: async (file: any, nickname: string, introduce: string, hashTag: string[]) => {
    const token = await AsyncStorage.getItem('accessToken');
    const UPDATE_URL = 'https://plzdrawing.o-r.kr/api/member/v1/profile';

    const formData = new FormData();

    if (file && file.uri) {
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    }

    // 개별 필드로 추가
    formData.append('nickname', nickname);
    formData.append('introduce', introduce);

    if (hashTag && Array.isArray(hashTag)) {
      hashTag.forEach((tag) => {
        formData.append('hashTag', tag);
      });
    }

    const response = await fetch(UPDATE_URL, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update Error Body:', errorText);
      throw new Error(`Profile update failed with status ${response.status}`);
    }

    return await response.json();
  },

  // 내 프로필 조회: GET
  checkMyProfile: async () => {
    const response = await apiClient.get<ProfileInfoResponse>('/api/member/v1/me');
    return response.data;
  },

  // 닉네임 중복 확인: GET
  checkNicknameDuplicate: async (nickname: string) => {
    const response = await apiClient.get(`/api/member/check-nickname`, {
      params: { nickname },
    });
    return response.data;
  },

  // 회원 탈퇴: DELETE
  withdrawMember: async () => {
    const response = await apiClient.delete('/api/member/v1/withdraw');
    return response.data;
  },
};
