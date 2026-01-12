import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'http://13.124.246.36:8080';
const API_BASE_URL = 'https://plzdrawing.o-r.kr';

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
      console.log('🔑 Token found and added to headers:', token.substring(0, 20) + '...');
    } else {
      console.log('⚠️ No access token found in AsyncStorage');
    }
    
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 대기 중인 요청들을 저장할 배열
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

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
  async (error) => {
    const originalRequest = error.config;
    
    // 401 Unauthorized 에러이고, 토큰 재발급 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 토큰 재발급 API 자체가 실패한 경우는 처리하지 않음
      if (originalRequest.url?.includes('/api/auth/v1/token/refresh')) {
        console.log('Refresh token is invalid. Logging out...');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중인 경우
      if (isRefreshing) {
        // 대기열에 추가하고 토큰 갱신이 완료될 때까지 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Access token expired. Attempting to refresh...');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Refresh Token을 Header와 Body 모두에 보내서 서버 스펙에 맞춥니다.
        const response = await apiClient.post('/api/auth/v1/token/refresh', 
          { 
            refreshToken: refreshToken,
          }, 
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        // 새 토큰 추출 로직
        let newAccessToken = await AsyncStorage.getItem('accessToken');

        // 2. 저장된 게 없다면 응답 Body에서 직접 추출 (서버가 JSON으로 줄 경우 대비)
        if (!newAccessToken && response.data?.accessToken) {
          await AsyncStorage.setItem('accessToken', response.data.accessToken);
          
          // Refresh Token도 갱신된다면 같이 저장
          if (response.data?.refreshToken) {
            await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
          }
        }

        if (newAccessToken) {
          console.log('Token refreshed successfully');
          processQueue(null, newAccessToken);

          // 실패했던 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          throw new Error('Failed to get new access token');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        
        // 재발급 실패 시 로그아웃
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
