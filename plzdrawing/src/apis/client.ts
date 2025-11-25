import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://13.124.246.36:8080';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (Request Interceptor)
apiClient.interceptors.request.use(
  async (config: any) => { // config 타입을 any 또는 InternalAxiosRequestConfig로 설정
    const token = await AsyncStorage.getItem('accessToken');

    // 토큰이 있다면 헤더에 추가
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (Response Interceptor)
apiClient.interceptors.response.use(
  async (response) => {
    // Set-Cookie 헤더에서 토큰 추출
    const setCookieHeader = response.headers['set-cookie'];
    
    if (setCookieHeader) {
      console.log('Set-Cookie headers:', setCookieHeader);
      
      // Set-Cookie는 배열 또는 문자열일 수 있음
      const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      
      for (const cookie of cookies) {
        // access_token 추출
        if (cookie.includes('access_token=')) {
          const match = cookie.match(/access_token=([^;]+)/);
          if (match && match[1]) {
            const token = match[1];
            console.log('Found access_token in cookie:', token.substring(0, 20) + '...');
            await AsyncStorage.setItem('accessToken', token);
          }
        }
        
        // refresh_token 추출
        if (cookie.includes('refresh_token=')) {
          const match = cookie.match(/refresh_token=([^;]+)/);
          if (match && match[1]) {
            const refreshToken = match[1];
            console.log('Found refresh_token in cookie');
            await AsyncStorage.setItem('refreshToken', refreshToken);
          }
        }
      }
    }
    
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 시 토큰 갱신 또는 로그아웃 처리
    if (error.response?.status === 401) {
      console.log('Authentication error: Token might be expired.');
      // TODO: 토큰 갱신 로직 또는 로그인 화면으로 리디렉션
    }
    
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
