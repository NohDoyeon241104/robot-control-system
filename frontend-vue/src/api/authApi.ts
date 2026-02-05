import apiClient from './index'
import type { ApiResponse, LoginRequest, LoginResponse } from '@/types'

export const authApi = {
  // 로그인
  login: (credentials: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials),
  
  // 로그아웃
  logout: () =>
    apiClient.post<ApiResponse<void>>('/auth/logout'),
  
  // 토큰 갱신
  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<LoginResponse>>('/auth/refresh', { refreshToken })
}
