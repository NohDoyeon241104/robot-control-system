// 사용자 역할
export type UserRole = 'ADMIN' | 'OPERATOR' | 'VIEWER'

// 사용자 정보
export interface User {
  userId: number
  username: string
  email: string
  role: UserRole
  createdAt: string
}

// 로그인 요청
export interface LoginRequest {
  username: string
  password: string
}

// 로그인 응답
export interface LoginResponse {
  userId: number
  username: string
  role: UserRole
  token: string
  refreshToken: string
}
