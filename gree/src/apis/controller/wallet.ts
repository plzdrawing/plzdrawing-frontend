import apiClient from '../apiClient';
import {
  WalletSummaryResponseDto,
  WalletTransactionPageResponseDto,
  CoinProductResponseDto,
  CreateCoinProductDto,
  UpdateCoinProductDto,
  CreateCoinOrderDto,
  CoinOrderResponseDto,
  ConfirmCoinOrderDto,
  CoinOrderPageResponseDto,
  CancelCoinOrderDto,
} from '../api';

export const walletController = {
  // 내 지갑 조회
  getMyWallet: async () => {
    const response = await apiClient.get<WalletSummaryResponseDto>('/api/wallet/v1/me');
    return response.data;
  },

  // 내 거래 내역 조회
  getMyTransactions: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<WalletTransactionPageResponseDto>(
      '/api/wallet/v1/transactions',
      { params: { page, limit } },
    );
    return response.data;
  },

  // 코인 상품 목록 조회
  getCoinProducts: async () => {
    const response = await apiClient.get<CoinProductResponseDto[]>('/api/wallet/v1/coin-products');
    return response.data;
  },

  // 코인 상품 생성 (관리자)
  createCoinProduct: async (data: CreateCoinProductDto) => {
    const response = await apiClient.post<CoinProductResponseDto>(
      '/api/wallet/v1/coin-products',
      data,
    );
    return response.data;
  },

  // 코인 상품 업데이트 (관리자)
  updateCoinProduct: async (productId: number, data: UpdateCoinProductDto) => {
    const response = await apiClient.patch<CoinProductResponseDto>(
      `/api/wallet/v1/coin-products/${productId}`,
      data,
    );
    return response.data;
  },

  // 코인 상품 조회 (관리자)
  getCoinProductForAdmin: async (productId: number) => {
    const response = await apiClient.get<CoinProductResponseDto>(
      `/api/wallet/v1/admin/coin-products/${productId}`,
    );
    return response.data;
  },

  // 코인 상품 목록 조회 (관리자)
  getCoinProductsForAdmin: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<CoinOrderPageResponseDto>(
      '/api/wallet/v1/admin/coin-products',
      { params: { page, limit } },
    );
    return response.data;
  },

  // 코인 주문 생성
  createCoinOrder: async (data: CreateCoinOrderDto) => {
    const response = await apiClient.post<CoinOrderResponseDto>('/api/wallet/v1/coin-orders', data);
    return response.data;
  },

  // 코인 주문 조회
  getCoinOrder: async (orderId: number) => {
    const response = await apiClient.get<CoinOrderResponseDto>(
      `/api/wallet/v1/coin-orders/${orderId}`,
    );
    return response.data;
  },

  // 코인 주문 목록 조회
  getCoinOrders: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<CoinOrderPageResponseDto>('/api/wallet/v1/coin-orders', {
      params: { page, limit },
    });
    return response.data;
  },

  // 코인 주문 결제 확인
  confirmCoinOrder: async (orderId: number, data: ConfirmCoinOrderDto) => {
    const response = await apiClient.patch<CoinOrderResponseDto>(
      `/api/wallet/v1/coin-orders/${orderId}/confirm`,
      data,
    );
    return response.data;
  },

  // 코인 주문 취소
  cancelCoinOrder: async (orderId: number, data: CancelCoinOrderDto) => {
    const response = await apiClient.patch<CoinOrderResponseDto>(
      `/api/wallet/v1/coin-orders/${orderId}/cancel`,
      data,
    );
    return response.data;
  },

  // 코인 주문 조회 (관리자)
  getCoinOrderForAdmin: async (orderId: number) => {
    const response = await apiClient.get<CoinOrderResponseDto>(
      `/api/wallet/v1/admin/coin-orders/${orderId}`,
    );
    return response.data;
  },

  // 코인 주문 목록 조회 (관리자)
  getCoinOrdersForAdmin: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get<CoinOrderPageResponseDto>(
      '/api/wallet/v1/admin/coin-orders',
      { params: { page, limit } },
    );
    return response.data;
  },
};
