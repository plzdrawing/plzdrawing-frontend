import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/src/stores/authStore';

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
// Zustand store에서 동기적으로 토큰을 읽어 헤더에 주입 (AsyncStorage await 불필요)
apiClient.interceptors.request.use(
  (config: any) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
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
    // Set-Cookie 헤더에서 토큰 추출 후 Zustand store에 저장
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      let newAccessToken: string | null = null;
      let newRefreshToken: string | null = null;

      for (const cookie of cookies) {
        if (cookie.includes('access_token=')) {
          const match = cookie.match(/access_token=([^;]+)/);
          if (match?.[1]) newAccessToken = match[1];
        }
        if (cookie.includes('refresh_token=')) {
          const match = cookie.match(/refresh_token=([^;]+)/);
          if (match?.[1]) newRefreshToken = match[1];
        }
      }

      if (newAccessToken) {
        const { setAuth, setTokens } = useAuthStore.getState();
        if (newRefreshToken) {
          await setAuth(newAccessToken, newRefreshToken);
        } else {
          await setTokens(newAccessToken);
        }
        console.log('🍪 Token from cookie saved to store');
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
        await useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      // 이미 토큰 갱신 중인 경우
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('🔄 Access token expired. Attempting to refresh...');
        const { refreshToken, setTokens, logout } = useAuthStore.getState();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await apiClient.post(
          '/api/auth/v1/token/refresh',
          { refreshToken },
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        // store에 이미 cookie 인터셉터에서 저장됐을 수 있으므로 store에서 최신 값 확인
        let newAccessToken = useAuthStore.getState().accessToken;

        // cookie가 없는 경우 응답 body에서 직접 추출
        if (!newAccessToken && response.data?.accessToken) {
          const newRefreshToken = response.data?.refreshToken;
          await setTokens(response.data.accessToken, newRefreshToken);
          newAccessToken = response.data.accessToken;
        }

        if (newAccessToken) {
          console.log('✅ Token refreshed successfully');
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          throw new Error('Failed to get new access token');
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        await useAuthStore.getState().logout();
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
