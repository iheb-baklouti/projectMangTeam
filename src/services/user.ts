import { LoginCredentials, AuthResponse, ApiResponse, User } from '../types';
import { request } from './apiClient';
export const associationId = '67a5ca2f6b19fb93c41a8162';
export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    return request<ApiResponse<{ accessToken: string; refreshToken: string }>>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });
  },

  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await request({
          method: 'POST',
          url: '/auth/logout',
          data: { refreshToken },
        });
      }
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
    return request<ApiResponse<{ accessToken: string }>>({
      method: 'POST',
      url: '/auth/refresh',
      data: { refreshToken },
    });
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return request<ApiResponse<User>>({
      method: 'GET',
      url: '/auth/loadme',
    });
  },
};
