import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 기본 설정
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 토큰이 있다면 헤더에 추가
    const token = null; // TODO: AsyncStorage에서 토큰 가져오기
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    
    // 401 에러 처리 (인증 만료)
    if (error.response?.status === 401) {
      // TODO: 로그아웃 처리 또는 토큰 갱신
      console.log('Authentication expired');
    }
    
    // 네트워크 에러 처리
    if (!error.response) {
      console.error('Network Error: Unable to connect to server');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;