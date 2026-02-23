import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * 실패 시 1회 재시도 (기본값 3회는 모바일에서 UX가 좋지 않음)
       */
      retry: 1,
      /**
       * 5분 동안은 데이터를 fresh 상태로 유지 — 같은 query를 다시 mount해도 재요청 안 함
       * 무한스크롤/피드처럼 자주 바뀌는 데이터는 각 query에서 staleTime: 0 으로 override
       */
      staleTime: 1000 * 60 * 5,
      /**
       * 10분 뒤 캐시에서 가비지 컬렉션
       */
      gcTime: 1000 * 60 * 10,
    },
    mutations: {
      retry: 0,
    },
  },
});
