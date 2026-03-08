import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/src/stores/authStore';

const API_BASE_URL = 'https://plzdrawing.o-r.kr';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 — Zustand store에서 토큰 읽어 헤더 주입
apiClient.interceptors.request.use(
  (config: any) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 응답 인터셉터 — 쿠키 토큰 저장 및 401 시 자동 갱신
apiClient.interceptors.response.use(
  async (response) => {
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
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/api/auth/v1/token/refresh')) {
        await useAuthStore.getState().logout();
        return Promise.reject(error);
      }

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
        const { refreshToken, setTokens, logout } = useAuthStore.getState();
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await apiClient.post(
          '/api/auth/v1/token/refresh',
          { refreshToken },
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        let newAccessToken = useAuthStore.getState().accessToken;
        if (!newAccessToken && response.data?.accessToken) {
          await setTokens(response.data.accessToken, response.data?.refreshToken);
          newAccessToken = response.data.accessToken;
        }

        if (newAccessToken) {
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } else {
          await logout();
          return Promise.reject(new Error('Token refresh failed'));
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
